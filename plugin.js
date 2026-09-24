// Recursive Detach Components plugin for Penpot.
// Recursively detaches every component instance found inside the currently selected board(s)/shape(s).

penpot.ui.open("Detach All Instances", "index.html", { width: 280, height: 250 })


/**
 * Walks a shape tree depth-first (children before parent) and detaches every shape that is the root of a component copy instance.
 * Bottom-up order makes sure nested instances (a component instance placed inside another component instance) get detached too, since we
 * only ever act on the current node after its whole subtree has already been visited.
 */
function detachRecursive(shape, stats) 
{
    if (!shape) 
    {
        return
    }

    const children = shape.children ? [...shape.children] : []
    
    for (const child of children) 
    {
        detachRecursive(child, stats)
    }

    const is_copy_root =
        typeof shape.isComponentCopyInstance === "function" &&
        typeof shape.isComponentRoot === "function" &&
        shape.isComponentCopyInstance() &&
        shape.isComponentRoot()

    if (is_copy_root) 
    {
        try 
        {
            shape.detach()
            stats.detached += 1
        } 
        catch (err) 
        {
            stats.errors += 1
            console.error("[Recursive Detach] failed to detach shape", shape.id, err)
        }
    }
}


function runDetach() 
{
    const selection = penpot.selection

    if (!selection || selection.length === 0) 
    {
        penpot.ui.sendMessage({ type: "result", ok: false, message: "Nothing selected. Select one or more boards/shapes first." })
        return
    }

    const stats = { detached: 0, errors: 0 }

    selection.forEach(it => detachRecursive(it, stats))

    const message =
        stats.detached === 0
            ? "No component instances found inside the selection."
            : `Detached ${stats.detached} instance${stats.detached === 1 ? "" : "s"}.` + (stats.errors ? ` (${stats.errors} failed. See console.` : "")

    penpot.ui.sendMessage({ type: "result", ok: true, message })
}



penpot.ui.onMessage((message) => 
{
    if (message && message.type === "run-detach") 
    {
        runDetach()
    }
});

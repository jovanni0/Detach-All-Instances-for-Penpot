# Detach All Instances for Penpot

Recursively detaches every component instance found inside the currently selected board(s) or shape(s), including instances nested inside other instances.

Install the plugin with the link: https://detach-all-instances.penpot.jovanni0.dev/manifest.json

## Using it

1. Select one or more boards (or any shapes/groups) on the canvas.
2. Click **"Detach all instances in selection"** in the plugin panel.
3. The status line reports how many instances were detached.

## Notes

- This performs a single canvas mutation per detached instance. If you have a huge tree of nested instances, consider testing on a duplicate/backup file first, since detaching is not easily reversible once you close the tab (though `Ctrl+Z` will undo it within the same session).
- If Penpot's plugin API changes method names in a future release, check `https://doc.plugins.penpot.app/` for the current `Shape`/`Group` interface and adjust `plugin.js` accordingly.

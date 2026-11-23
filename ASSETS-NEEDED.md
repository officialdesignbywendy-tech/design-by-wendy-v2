# Images

All images used by the site are now included in `public/images/` (and the tool icons in `public/tools/`).
The pointer files in `src/assets/**/*.asset.json` now point to these local files, so nothing depends on Lovable's image storage.

## Things to know
- **Hero portrait (`public/images/wendy-portrait.png`)** is a background-removed version I made from the portrait you sent earlier (1080 x 1350). It works, but if you have your original transparent cut-out at higher resolution, replace this file with it (keep the same file name).
- Large photos were resized to at most 1800 px on the long edge so the site loads quickly. Your originals were not changed.
- **Not included (not used by the site):** `wendy-about-artboard.jpg`, `wendy-portrait-2.png`, and the four Naija Dance `detail-*.jpg` images. Their pointer files still refer to Lovable storage but nothing displays them.
- Removed at your request: the "Welcome to August" and "Resume Design" projects, and PicsArt from the tools list.

## Replacing an image later
Overwrite the file inside `public/images/...` using the same name, or run
`node scripts/localize-assets.mjs "folder-with-new-images"` to re-match by file name.

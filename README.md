# ArtVision

A static art gallery concept built with HTML, CSS, and vanilla JavaScript. It runs on GitHub Pages.

The gallery images, artist names, and testimonials are sample content used to show the layout. They do not describe a real collective or real endorsements. Replace them with credited work and verified quotes before using this design for a real gallery.

## What it does

- Responsive gallery with category filters for paintings, sculptures, and digital art
- Lightbox viewer with C/WebAssembly filters: grayscale, sepia, and invert
- Carousel with JavaScript controls and CSS fallbacks when WASM does not load
- JSON-LD schema, Open Graph tags, WebP images, and lazy loading

## Files

| Path | Purpose |
|---|---|
| `index.html` | Page structure and content |
| `css/style.css` | Styles and theme variables |
| `js/script.js` | Gallery, lightbox, and carousel behavior |
| `js/wasm-bridge.js` | WASM loader |
| `wasm/filters.c` | C source for the three filters |
| `wasm/Makefile` | Emscripten build command |
| `filters.wasm` | Pre-compiled filter module |

## Rebuild the filter module

```bash
cd wasm
make
```

This requires [Emscripten](https://emscripten.org).

## Links

- Live site: https://fidelcedric.github.io/artvision/
- Source: https://github.com/fidelcedric/artvision

## License

MIT — see [LICENSE](LICENSE).

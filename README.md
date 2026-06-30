# ArtVision — Contemporary Art Collective

A responsive art gallery website built for a contemporary African art collective based in Nairobi, Kenya.

## Features

- **Responsive design** — mobile, tablet, desktop (320px–4K)
- **Image gallery** with category filtering (paintings, sculptures, digital art)
- **Lightbox viewer** with interactive **C/WebAssembly image filters** (grayscale, sepia, invert)
- **Testimonial carousel** with auto-advance and manual controls
- **SEO-optimized** — JSON-LD schema, OG tags, semantic HTML
- **Performance** — WebP images, lazy loading, Intersection Observer animations

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Styling | Custom CSS with CSS variables |
| Image processing | **C → WebAssembly** (Emscripten) |
| Icons | Font Awesome 6 |
| Fonts | Inter + Playfair Display (Google Fonts) |
| Deployment | GitHub Pages |

## C / WebAssembly Integration

Image filters are written in C and compiled to WebAssembly via Emscripten:

- `wasm/filters.c` — grayscale, sepia, and invert pixel functions
- `wasm/Makefile` — emcc build command
- `js/wasm-bridge.js` — WASM loader and JS glue
- `filters.wasm` — pre-compiled binary (7.5 KB)

Filters apply in real-time to gallery images inside the lightbox. Falls back to CSS filters if WASM fails to load.

### Rebuild WASM

```bash
cd wasm
make
```

Requires [Emscripten](https://emscripten.org).

## Live Demo

**[fidelcedric.github.io/artvision](https://fidelcedric.github.io/artvision/)**

## License

MIT

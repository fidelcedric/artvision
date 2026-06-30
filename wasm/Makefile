all:
	emcc filters.c -O3 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_FUNCTIONS='["_apply_grayscale","_apply_sepia","_apply_invert","_malloc","_free"]' --no-entry -o ../filters.wasm

clean:
	rm -f ../filters.wasm

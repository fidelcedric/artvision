var Module = null;
window.wasmReady = false;

(function initWasm() {
    fetch('filters.wasm')
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (bytes) {
            return WebAssembly.instantiate(bytes, {
                env: {
                    memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
                    __memory_base: 0,
                    __table_base: 0,
                    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
                    __indirect_function_table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
                    emscripten_memcpy: function (dest, src, num) {
                        var mem = new Uint8Array(wasm.instance.exports.memory.buffer);
                        mem.set(mem.slice(src, src + num), dest);
                    },
                    memset: function (ptr, val, num) {
                        var mem = new Uint8Array(wasm.instance.exports.memory.buffer);
                        mem.fill(val, ptr, ptr + num);
                    },
                    emscripten_resize_heap: function () { return true; },
                    __cxa_throw: function () {},
                    __cxa_begin_catch: function () { return 0; },
                    __cxa_end_catch: function () {},
                    __cxa_find_matching_catch: function () { return 0; },
                    _abort: function () {},
                    _emscripten_tls_init: function () {}
                }
            });
        })
        .then(function (instance) {
            var exp = instance.exports;
            Module = {
                _apply_grayscale: exp.apply_grayscale,
                _apply_sepia: exp.apply_sepia,
                _apply_invert: exp.apply_invert,
                _malloc: exp.malloc,
                _free: exp.free,
                HEAPU8: new Uint8Array(exp.memory.buffer)
            };
            window.Module = Module;
            window.wasmReady = true;
        })
        .catch(function (e) {
            console.warn('WASM not available, using CSS filter fallback', e);
        });
})();

#include <stdint.h>

void apply_grayscale(uint8_t* data, int width, int height) {
    int len = width * height;
    for (int i = 0; i < len; i++) {
        int idx = i * 4;
        uint8_t gray = (uint8_t)((data[idx] * 77 + data[idx + 1] * 150 + data[idx + 2] * 29) >> 8);
        data[idx] = gray;
        data[idx + 1] = gray;
        data[idx + 2] = gray;
    }
}

void apply_sepia(uint8_t* data, int width, int height) {
    int len = width * height;
    for (int i = 0; i < len; i++) {
        int idx = i * 4;
        uint8_t r = data[idx], g = data[idx + 1], b = data[idx + 2];
        data[idx]   = (r * 393 + g * 769 + b * 189) >> 10;
        if (data[idx] > 255) data[idx] = 255;
        data[idx + 1] = (r * 349 + g * 686 + b * 168) >> 10;
        if (data[idx + 1] > 255) data[idx + 1] = 255;
        data[idx + 2] = (r * 272 + g * 534 + b * 131) >> 10;
        if (data[idx + 2] > 255) data[idx + 2] = 255;
    }
}

void apply_invert(uint8_t* data, int width, int height) {
    int len = width * height;
    for (int i = 0; i < len; i++) {
        int idx = i * 4;
        data[idx] = 255 - data[idx];
        data[idx + 1] = 255 - data[idx + 1];
        data[idx + 2] = 255 - data[idx + 2];
    }
}

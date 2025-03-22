import { describe, it, expect} from "vitest";
import {compressCanvasData, decompressCanvasData} from "../src/scripts/db.ts";

describe("canvas compression", () => {
    it("should compress and decompress canvas data losslessly", () => {
        const testData = new Uint8ClampedArray([0xff, 0xff, 0xff, 0x00, 0x00, 0x1b, 0x00, 0xff]);
        console.log("original data", testData);
        const compressed = compressCanvasData(testData);
        console.log("compressed data", compressed);
        expect(decompressCanvasData(compressed)).toEqual(testData);
    });
});
import { describe, it, expect} from "vitest";
import {compressCanvasData, decompressCanvasData} from "../src/scripts/db.ts";

describe("canvas compression", () => {
    it("should compress and decompress canvas data set 1 losslessly", () => {
        const testData = new Uint8ClampedArray(256).fill(0xff);
        console.log("original data 1", testData);
        const compressed = compressCanvasData(testData);
        console.log("compressed data 1", compressed);
        expect(decompressCanvasData(compressed)).toEqual(testData);
    });
    it("should compress and decompress canvas data set 2 losslessly", () => {
        const testData = new Uint8ClampedArray([0xff]);
        const compressed = compressCanvasData(testData);
        console.log("compressed data 2", compressed);
        expect(decompressCanvasData(compressed)).toEqual(testData);
    });
});
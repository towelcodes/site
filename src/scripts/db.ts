import { PostgrestClient } from "@supabase/postgrest-js";
import type {Database} from "./db.types.ts";
import { POSTGREST_ENDPOINT, POSTGREST_KEY } from "astro:env/client";

export const postgrest = new PostgrestClient<Database["public"]["Tables"]>(POSTGREST_ENDPOINT, {
    headers: {"apikey": POSTGREST_KEY}
});

export function hexToU8IntClampedArray(hex: string): Uint8ClampedArray {
    hex = hex.startsWith("\\x") ? hex.slice(2) : hex;
    // @ts-ignore
    const bytes = new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    return new Uint8ClampedArray(bytes);
}

export function u8IntClampedArrayToHex(arr: Uint8ClampedArray): string {
    let hex = "\\x";
    arr.forEach((byte) => hex += byte.toString(16).padStart(2, "0"));
    return hex;
}

// TODO use WASM instead so it's faster
export function compressCanvasData(data: Uint8ClampedArray): Uint8ClampedArray {
    let last = 0x00;
    let count = 0;

    let array: Uint8ClampedArray[] = [];

    data.forEach((v) => {
        if (v == last) {
            if (count < 255) {
                count ++;
                return;
            }
            array.push(new Uint8ClampedArray([last, count]));
            count = 1;
            last = v;
            return;
        }

        // append the last n times to the array
        if (count != 0) {
            array.push(new Uint8ClampedArray([last, count]));
        }

        count = 1;
        last = v;
    });

    if (count != 0) {
        array.push(new Uint8ClampedArray([last, count]));
    }

    let arr = new Uint8ClampedArray(array.length * 2);
    array.forEach((v, i) => {
        arr[2*i] = v[0];
        arr[(2*i)+1] = v[1];
    });

    return arr;
}

export function decompressCanvasData(data: Uint8ClampedArray): Uint8ClampedArray {
    let key = data.filter((v, i) => (i % 2) == 0);
    let val = data.filter((v, i) => (i % 2) == 1);
    let array = new Uint8ClampedArray(val
        .reduce((partialSum, v) => partialSum + v, 0));
    let index = 0;
    key.forEach((v, i) => {
        let n = val[i];
        for (let i = 0; i < n; i++) {
            array[index] = v;
            index++;
        }
    });
    return array;
}
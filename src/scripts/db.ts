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
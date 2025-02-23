import { PostgrestClient } from "@supabase/postgrest-js";
export const postgrest = new PostgrestClient(import.meta.env.PUBLIC_POSTGREST_ENDPOINT, {
    headers: {"apikey": import.meta.env.PUBLIC_POSTGREST_KEY}
});

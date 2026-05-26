import { cacheOrFetch } from "./lib";

const USER_ID = "6086";
const BASE_URL = "https://kamai.tachi.ac/api/v1";

export const onRequest: PagesFunction<Env> = async (context) => {
  const maxAge = 120;
  const apikey = context.env.KAMAITACHI_KEY;
  const url = `${BASE_URL}/users/${USER_ID}/games/sdvx/scores/recent`;

  const response = await cacheOrFetch(
    url,
    {
      headers: {
        Authorization: `Bearer ${apikey}`,
      },
    },
    context.env.api_cache,
    maxAge,
  );

  return new Response(response.data, {
    headers: {
      Age: response.age.toString(),
      "Content-Type": "application/json",
    },
  });
};

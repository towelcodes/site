import { cacheOrFetch } from "../lib";

const USER_ID = "teatowel";
const BASE_URL = "https://api.listenbrainz.org";

export const onRequest: PagesFunction<Env> = async (context) => {
  const maxAge = 30;
  const apikey = context.env.LISTENBRAINZ_KEY;
  const url = `${BASE_URL}/1/user/${USER_ID}/playing-now`;

  const response = await cacheOrFetch(
    url,
    {
      headers: {
        Authorization: `Token ${apikey}`,
      },
    },
    context.env.api_cache,
    maxAge,
  );

  return new Response(response.data, {
    headers: {
      Age: response.age.toString(),
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

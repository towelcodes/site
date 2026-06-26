import { cacheOrFetch } from "../lib";

const USER_ID = "teatowel";
const BASE_URL = "https://api.listenbrainz.org";

export const onRequest: PagesFunction<Env> = async (context) => {
  const maxAge = 3600;
  const apikey = context.env.LISTENBRAINZ_KEY;
  const url = `${BASE_URL}/1/stats/user/${USER_ID}/recordings?range=week&count=5`;

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

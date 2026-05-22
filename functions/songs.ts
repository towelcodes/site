const USER_ID = "teatowel";
const BASE_URL = "https://api.listenbrainz.org";

export const onRequest: PagesFunction<Env> = async (context) => {
  const maxAge = 3600;
  const apikey = context.env.LISTENBRAINZ_KEY;
  const url = `${BASE_URL}/1/stats/user/${USER_ID}/recordings?range=week&count=5`;

  // check cache
  const cached_response = await context.env.api_cache.get(url);
  if (cached_response) {
    const expiry = await context.env.api_cache.get("expiry " + url);
    if (expiry) {
      if (parseInt(expiry) - Date.now() / 1000 > 0) {
        const created = parseInt(expiry) - maxAge;
        const age = Date.now() / 1000 - created;
        return new Response(cached_response, {
          headers: {
            Age: `${age}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    }
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Token ${apikey}`,
    },
  });
  if (res.status != 200) {
    console.error(res);
    return res;
  }

  // cache response
  const body = await res.json();
  await context.env.api_cache.put(url, JSON.stringify(body));
  await context.env.api_cache.put(
    "expiry " + url,
    `${Date.now() / 1000 + maxAge}`,
  );

  return new Response(JSON.stringify(body), {
    headers: {
      Age: "0",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

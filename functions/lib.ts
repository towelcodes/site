interface CacheResponse {
  age: number;
  data: string;
  success: boolean;
}

export async function cacheOrFetch(
  url: string,
  options: RequestInit<RequestInitCfProperties>,
  cache: KVNamespace<string>,
  maxAge: number,
): Promise<CacheResponse> {
  // check cache
  const cached_response = await cache.get(url);
  if (cached_response) {
    // check if response has expired
    const expiry = await cache.get("expiry " + url);
    if (expiry) {
      if (parseInt(expiry) - Date.now() / 1000 > 0) {
        const created = parseInt(expiry) - maxAge;
        const age = Date.now() / 1000 - created;

        return {
          age,
          data: cached_response,
          success: true,
        };
      }
    }
  }

  // cache miss
  const res = await fetch(url, options);
  if (!res.ok) {
    console.error(res);
    return {
      age: 0,
      success: false,
      data: await res.text(),
    };
  }

  // store response
  const body = await res.text();
  await cache.put(url, JSON.stringify(body));
  await cache.put("expiry " + url, `${Date.now() / 1000 + maxAge}`);

  return {
    success: true,
    age: 0,
    data: body,
  };
}

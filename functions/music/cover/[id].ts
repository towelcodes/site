export const onRequest: PagesFunction<Env> = async ({ env, params, request }) => {
  const key = `cover/${params.id}`;

  // cache hit?
  const cached = await env.site_cache.get(key);
  if (cached) {
    return new Response(cached.body, {
      headers: {
        "Content-Type": cached.httpMetadata?.contentType ?? "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // cache miss — fetch from coverartarchive, store in R2, serve
  const url = `https://coverartarchive.org/release/${params.id}/front-250`;
  const res = await fetch(url);
  if (!res.ok) return new Response("not found", { status: 404 });

  const body = await res.arrayBuffer();
  await env.site_cache.put(key, body, {
    httpMetadata: { contentType: res.headers.get("content-type") ?? "image/jpeg" },
  });

  return new Response(body, {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};

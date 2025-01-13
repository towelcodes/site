import mariadb, {type PoolConnection} from "mariadb";

const pool = mariadb.createPool({
    host: "192.168.0.57",
    user: "joel",
    password: "Thisisasecret!1",
    connectionLimit: 5,
    database: "site",
});

Bun.serve({
    port: 8081,
    async fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response("hi chat!!!!");
        if (url.pathname === "/guestbook") {
            if (req.method === "POST") {
                const form = await req.formData();
                const name = form.get("name");
                const message = form.get("message");
                const date = new Date();
                const entry = {name, message, date};
                let conn: PoolConnection | null = null;
                try {
                    conn = await pool.getConnection();
                    const res = await conn.query(
                        "INSERT INTO guestbook (name, message, submitted) values (?, ?, ?)",
                        [name, message, date]);
                } finally {
                    if (conn) conn.release();
                }
                return new Response(null, { status: 201 });
            } else {
                let conn: PoolConnection | null = null;
                try {
                    conn = await pool.getConnection();
                    const res = await conn.query("SELECT * FROM guestbook ORDER BY submitted DESC LIMIT 10");
                    return new Response(JSON.stringify(res), { status: 200 });
                } finally {
                    if (conn) conn.release();
                }
            }
        }
        return new Response("Not Found", { status: 404 });
    }
});
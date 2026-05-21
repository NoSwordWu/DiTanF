import { getStore } from "@netlify/blobs";

const DEFAULT_DATA = {
    cities: [],
    organizations: ["国家机关", "教育", "科技", "文化", "卫生", "体育", "住建", "其他"],
    visits: {}
};

export default async (req) => {
    const store = getStore("marketData");

    if (req.method === "GET") {
        let data = await store.get("marketData", { type: "json" });

        if (!data) {
            return new Response(JSON.stringify(DEFAULT_DATA), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }

    if (req.method === "POST") {
        const body = await req.json();
        await store.setJSON("marketData", body);
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }

    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
    });
};

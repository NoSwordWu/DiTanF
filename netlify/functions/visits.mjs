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
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(DEFAULT_DATA)
            };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
    }

    if (req.method === "POST") {
        const body = JSON.parse(req.body);
        await store.setJSON("marketData", body);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: true })
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" })
    };
};

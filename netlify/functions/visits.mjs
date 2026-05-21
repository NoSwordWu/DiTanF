import { getStore } from "@netlify/blobs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export default async (req) => {
    const store = getStore("marketData");

    if (req.method === "GET") {
        let data = await store.get("marketData", { type: "json" });

        if (!data) {
            const jsonPath = join(process.cwd(), "data", "marketData.json");
            const raw = await readFile(jsonPath, "utf-8");
            data = JSON.parse(raw);
            await store.setJSON("marketData", data);
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

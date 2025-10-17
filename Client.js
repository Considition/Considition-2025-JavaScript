export class ConsiditionClient {
    constructor(baseUri, apiKey) {
        this.apiKey = apiKey;
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        this.baseUrl = baseUri;
    }

    async postGame(inputDto, saveGame = false) {
        try {
            const url = new URL(`${this.baseUrl}/game`);
            url.searchParams.set("saveGame", String(saveGame));

            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apiKey,
                },
                body: JSON.stringify(inputDto),
            });

            if (!response.ok) return null;
            return await response.json();
        } catch (err) {
            console.error(err);
        }
    }

    async getMap(mapName) {
        try {
            const url = new URL(`${this.baseUrl}/map`);
            url.searchParams.set("mapName", String(mapName));

            const response = await fetch(url.toString(), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "x-api-key": this.apiKey,
                },
            });

            if (!response.ok) {
                console.error(response.status, response.statusText);
                return null;
            }

            return await response.json();
        } catch (err) {
            console.error(err);
        }
    }
}

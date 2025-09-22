export class ConsiditionClient {
  constructor(baseUri) {
    this.baseUrl = baseUri;
  }

  async postGame(inputDto) {
    const response = await fetch(`${this.baseUrl}/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputDto)
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  }

  async getMap(mapName) {
    const response = await fetch(
      `${this.baseUrl}/map?mapName=${encodeURIComponent(mapName)}`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  }
}

import { ConsiditionClient } from "./Client.js";

const apiKey = "INSERT API KEY HERE";
const client = new ConsiditionClient("http://localhost:9090", apiKey);

const mapName = "INSERT MAP NAME HERE";
const map = await client.getMap(mapName);

if (!map) {
    console.log("Failed to fetch map!");
    process.exit(1);
}

let finalScore = 0;
const goodTicks = [];

// Initial input for the first tick
let currentTick = generateTick(map, 0);

let input = {
    mapName,
    ticks: [currentTick],
};

for (let i = 0; i < map.ticks; i++) {
    while (true) {
        console.log(`Playing tick: ${i} with input:`, input);
        const start = performance.now();
        const gameResponse = await client.postGame(input);
        const elapsed = performance.now() - start;
        console.log(`Tick ${i} took: ${elapsed.toFixed(2)}ms`);

        if (!gameResponse) {
            console.log("Got no game response");
            process.exit(1);
        }

        finalScore = gameResponse.customerCompletionScore + gameResponse.kwhRevenue + gameResponse.score;

        if (shouldMoveOnToNextTick(gameResponse)) {
            goodTicks.push(currentTick);

            currentTick = generateTick(gameResponse.map, i + 1);

            input = {
                mapName,
                playToTick: i + 1,
                ticks: [...goodTicks, currentTick],
            };
            break;
        }

        // Not happy with the result, try again
        currentTick = generateTick(gameResponse.map, i);
        input = {
            mapName,
            playToTick: i,
            ticks: [...goodTicks, currentTick],
        };
    }
}

console.log(`Final score: ${finalScore}`);

function shouldMoveOnToNextTick(_response) {
    // Implement decision logic
    return true;
}

function generateTick(_map, _currentTick) {
    return {
        tick: _currentTick,
        customerRecommendations: generateCustomerRecommendations(_map, _currentTick),
    };
}

function generateCustomerRecommendations(_map, _currentTick) {
    // Implement recommendation generation
    return [];
}

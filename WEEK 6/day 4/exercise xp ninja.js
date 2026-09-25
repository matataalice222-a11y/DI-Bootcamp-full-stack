
const chalk = require("chalk");

function greet() {
  console.log(chalk.green.bold("👋 Hello Ninja! Welcome to your utility tool!"));
}

module.exports = greet;
```

const axios = require("axios");

async function fetchData() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
    console.log("Fetched Data:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

module.exports = fetchData;
```

const fs = require("fs");

function readFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err.message);
      return;
    }
    console.log("📄 File Content:\n", data);
  });
}

module.exports = readFile;
```

const { Command } = require("commander");
const greet = require("./commands/greet");
const fetchData = require("./commands/fetch");
const readFile = require("./commands/read");

const program = new Command();

program
  .command("greet")
  .description("Display a colorful greeting")
  .action(greet);

program
  .command("fetch")
  .description("Fetch data from a public API")
  .action(fetchData);

program
  .command("read <file>")
  .description("Read and display a file")
  .action(readFile);

program.parse(process.argv);
```


const axios = require("axios");
const chalk = require("chalk");

const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your key

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    const { temp } = response.data.main;
    const description = response.data.weather[0].description;

    console.log(chalk.blue.bold(`🌍 Weather in ${city}:`));
    console.log(chalk.yellow(`Temperature: ${temp}°C`));
    console.log(chalk.green(`Condition: ${description}`));
  } catch (error) {
    console.error(chalk.red("Error fetching weather data:", error.message));
  }
}

module.exports = getWeather;


const readline = require("readline");
const getWeather = require("./weather");

function startDashboard() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter a city name: ", (city) => {
    getWeather(city);
    rl.close();
  });
}

module.exports = startDashboard;
```

const startDashboard = require("./dashboard");

startDashboard();
```
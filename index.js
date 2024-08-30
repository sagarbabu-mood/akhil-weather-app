const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  const apiKey = "6ecf928ba2af0f1ed54fa06e5a574df2";
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    if (weather.error) {
      throw new Error(weather.error.info);
    }
    res.render("index", { weather, error: null });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.render("index", {
      weather: null,
      error: "Could not retrieve weather data. Please try again.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

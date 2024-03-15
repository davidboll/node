const { log } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// console log("server runing");

app.get("/", (req, res) => {
  const name = req.query.name;
  let response = `
        <h1>Welcome to Popcorn 4 all</h1>
        <p>Here you'll find Arnold:</p>
        <ul>
            <li><a href="/movies">Arnold Movies</a> - Show all of the best of Arnold.</li>
            <li><a href="/about">About Arnold</a> - Would you like to learn more about Arnie?</li>
            <li><a href="/contact">Contact Arnie</a> - Get in touch with us.</li>
        </ul>
        <p>Deare to say hello? Type "/?name=Rob" after the URL and see what happens ;)</p>
    `;

  if (name === "Rob") {
    response += "<p>Where's my assignments???</p>";
  } else if (name) {
    response += `<p>Hello, ${name}! Oh you so sweet :)</p>`;
  }

  res.send(response);
});

app.get("/movies", (req, res) => {
  fs.readFile(path.join(__dirname, "movies.txt"), "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading movie data");
      return;
    }
    res.send(`<h1>Arnold Movie List</h1><p>${data}</p>`);
  });
});

app.get("/about", (req, res) => {
  const aboutPath = path.join(__dirname, "about.html");
  res.sendFile(aboutPath);
});

app.get("/contact", (req, res) => {
  const contactPath = path.join(__dirname, "contact.txt");
  res.sendFile(contactPath);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

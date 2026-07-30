import express from "express";
import bodyParser from "body-parser";
import { featuredArticles } from "./data.js";

const app = express();
const PORT = 3000;

// Tell Express to use EJS for rendering
app.set("view engine", "ejs");

// Use static files
app.use(express.static("public"));

// Use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set the GET Route
app.get("/", (req, res) => {
  const features = featuredArticles.articles;
  res.render("layout.ejs", { features });
});

app.listen(PORT, () => console.log(`serving is running on port: ${PORT}.`));

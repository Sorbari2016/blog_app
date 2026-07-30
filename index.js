import express from "express";
import bodyParser from "body-parser";
import { allArticles } from "./data.js";

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
  const features = allArticles.articles.filter(
    (article) => article.id === 1 || article.id === 2,
  );

  const others = allArticles.articles.filter(
    (article) => !features.includes(article),
  );

  res.render("layout.ejs", { features, articles: others });
});

// Create method to get new article form
app.get("/articles", (req, res) => {
  res.render("pages/new-article", { message: "" });
});

// Create get method to get edit article form
app.get("/articles/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  try {
    const article = allArticles.articles.find(
      (piece) => piece.id === articleId,
    );

    res.render("pages/edit-article", { message: " ", article });
  } catch (err) {
    console.error("Error getting article", err);
  }
});

app.listen(PORT, () => console.log(`serving is running on port: ${PORT}.`));

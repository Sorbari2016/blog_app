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

  res.render("layout.ejs", {
    features: features,
    articles: others,
  });
});

// Create method to get new article form
app.get("/articles", (req, res) => {
  res.render("pages/new-article", { message: "" });
});

// Create get method to get edit article form
app.get("/articles/:id/edit", (req, res) => {
  const articleId = parseInt(req.params.id);
  try {
    const article = allArticles.getArticleById(articleId);

    res.render("pages/edit-article", { message: " ", article });
  } catch (err) {
    console.error("Error getting article", err);
  }
});

// Create post route to add a new article
app.post("/articles", (req, res) => {
  try {
    // get form data
    const title = req.body.title;
    const content = req.body.content;

    // ensure title and content meet the standard
    if (title.length > 60 && content.length < 20) {
      return res.render("pages/new-article", {
        message: "Article title too long, while content is too short",
      });
    } else if (title.length > 60) {
      return res.render("pages/new-article", {
        message: "Title shouldn't exceed 60 characters",
      });
    } else if (content.length < 20) {
      return res.render("pages/new-article", {
        message: "Content should be atleast 20 characters long",
      });
    }

    // create post
    allArticles.addArticle(title, content);

    // redirect
    res.redirect("/");
  } catch (error) {
    console.error("Failed trying to create new article", error);
  }
});

// Create post method to edit a post
app.post("/articles/:id/edit", (req, res) => {
  // get article id
  const articleId = parseInt(req.params.id);

  try {
    // get form data
    const newTitle = req.body.title;
    const newContent = req.body.content;

    //update article
    allArticles.updateArticle(articleId, newTitle, newContent);

    // redirect
    res.redirect("/");
  } catch (err) {
    console.error("Error updating article", err);
  }
});

app.listen(PORT, () => console.log(`serving is running on port: ${PORT}.`));

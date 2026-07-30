import { ArticleManager } from "./tests/class.js";

// Create feature articles
const allArticles = new ArticleManager();

allArticles.addArticle(
  "Spain has won the 2026 FIFA World cup",
  "After beating Argentina in the finals at this year's FIFA world cup tournament, Spain are crowned champions",
);

allArticles.addArticle(
  "Chelsea sign Danny Welbeck",
  "One of the smallest clubs in London joined signed the Brighton Forward Daniel Welbeck",
);

export { allArticles };

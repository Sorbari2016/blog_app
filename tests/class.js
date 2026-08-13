class Article {
  constructor(id, title, content) {
    ((this.id = id),
      (this.createdAt = new Date()),
      (this.title = title),
      (this.content = content),
      (this.updatedAt = new Date()));
  }
}

class ArticleManager {
  constructor() {
    this.articles = [];
  }

  // article methods

  // add a new article
  addArticle(title, content) {
    const articles = this.articles;

    let articleId;

    if (articles.length === 0) {
      articleId = 1;
    } else {
      const lastArticle = articles[articles.length - 1];
      articleId = lastArticle.id + 1;
    }

    const newArticle = new Article(articleId, title, content);
    articles.push(newArticle);

    return newArticle;
  }

  // get an article by its id
  getArticleById(id) {
    return this.articles.find((piece) => piece.id === id) || null;
  }

  // update an article
  updateArticle(id, newTitle, newContent) {
    // check if article exists
    const articleIndex = this.articles.findIndex((piece) => piece.id === id);

    if (articleIndex === -1) {
      throw new Error("Article not found!");
    }

    const update = {
      title: newTitle,
      content: newContent,
      updatedAt: new Date(),
    };

    const articles = this.articles;
    articles[articleIndex] = {
      ...articles[articleIndex],
      ...update,
    };

    return articles[articleIndex];
  }

  // delete an article
  deleteArticle(id) {
    const articleIndex = this.articles.findIndex((piece) => piece.id === id);

    if (articleIndex === -1) {
      throw new Error("Article not found!");
    }

    this.articles.splice(articleIndex, 1);
  }

  // get the total number of articles
  getTotalArticles() {
    return this.articles.length;
  }

  // get all articles
  getArticles() {
    return this.articles;
  }
}

export { Article, ArticleManager };

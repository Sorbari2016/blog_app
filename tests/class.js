class Article {
  constructor(id, title, content) {
    ((this.id = id),
      (this.createdAt = new Date()),
      (this.title = title),
      (this.content = content),
      (this.updatedAt = new Date()));
  }

  getDetails() {
    return {
      id: this.id,
      createdAt: this.createdAt.toDateString(),
      title: this.title,
      content: this.content,
      updatedAt: this.updatedAt.toDateString(),
    };
  }
}

class ArticleManager {
  constructor() {
    this.articles = [];
  }

  // article methods
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

  getArticleById(id) {
    return this.articles.find((piece) => piece.id === id) || null;
  }

  updateArticle(id, newTitle, newContent, updatedAt) {
    // check if article exists
    const article = this.getArticleById(id);

    if (!article) {
      throw new Error("Article not found!");
    }

    const updatedArticle = {
      id: article.id,
      createdAt: article.createdAt,
      title: newTitle || article.title,
      content: newContent || article.content,
      updatedAt: new Date(),
    };

    return updatedArticle;
  }

  deleteArticle(id) {
    const articleIndex = this.articles.findIndex((piece) => piece.id === id);

    if (!articleIndex === -1) {
      throw new Error("Article not found!");
    }

    // remove article
    this.articles.splice(articleIndex, 1);
  }

  getTotalArticles() {
    return this.articles.length;
  }
}

export { Article, ArticleManager };

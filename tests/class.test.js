import { Article, ArticleManager } from "./class";

// Unit test
describe("Article class tests", () => {
  let article;
  beforeEach(() => {
    article = new Article(1, "Wanna fuck", "I would like it to be Bright");
  });
  test("should correctly instantiate an article", () => {
    expect(article).toBeInstanceOf(Article);
  });

  test("should correctly read property values", () => {
    expect(article.title).toEqual("Wanna fuck");
  });

  test("should correctly set default property", () => {
    expect(article.createdAt).toBeInstanceOf(Date);
    expect(article.updatedAt.getHours()).toEqual(new Date().getHours());
  });
});

describe("Article Manager test", () => {
  let articleManager;
  beforeEach(() => {
    articleManager = new ArticleManager();
  });

  test("should be correctly instantiate an article manager object", () => {
    expect(articleManager).toBeInstanceOf(ArticleManager);
  });

  test("check the articles manager storage", () => {
    expect(articleManager.articles).toEqual([]);
    expect(articleManager.articles.length).toBeFalsy();
    expect(articleManager.articles).toBeInstanceOf(Array);
    expect(articleManager.articles.length).toBe(0);
  });

  test("addArticle method should return an object", () => {
    expect(articleManager.addArticle("Pray", "I want to pray")).toBeInstanceOf(
      Article,
    );
    expect(articleManager.articles.length).toBeGreaterThan(0);
    expect(articleManager.articles[0].id).toBe(1);
  });

  test("new article should have an id of 3", () => {
    articleManager.addArticle("Dance", "I want to dance");
    articleManager.addArticle("Pray", "I want to pray");
    articleManager.addArticle("Sing", "I want to sing");
    expect(articleManager.articles[2].id).toBe(3);
  });
});

//  Other ArticleManager methods
describe("ArticleManager methods", () => {
  let manager;
  beforeEach(() => {
    manager = new ArticleManager();
  });

  test("addArticle should create a new article", () => {
    manager.addArticle("Suanle", "Finally have my fill");
    expect(manager.articles.length).toBe(1);
  });

  test("getArticleById should retreive articel by id or null", () => {
    manager.addArticle("Suanle", "Finally have my fill");
    manager.addArticle("David", "I still owe him");
    const newArticle = manager.getArticleById(2);

    expect(newArticle).toBeInstanceOf(Article);
    expect(newArticle.title).toEqual("David");
    expect(manager.getArticleById(3)).toBeNull();
  });

  test("updateArticle should update the methods of an article", () => {
    manager.addArticle("Suanle", "Finally have my fill");
    const updatedArticle = manager.updateArticle(1, "Treasure");

    expect(updatedArticle.id).toBe(1);
    expect(updatedArticle.content).toEqual("Finally have my fill");
    expect(updatedArticle.title.length).toBe(8);
  });

  test("getTotalArticle should return the total number of articles", () => {
    manager.addArticle("Dance", "I want to dance");
    manager.addArticle("Pray", "I want to pray");
    manager.addArticle("Sing", "I want to sing");

    expect(manager.getTotalArticles()).toBe(3);
  });

  test("deleteArticle should remove an article from the storage", () => {
    manager.addArticle("Dance", "I want to dance");
    manager.deleteArticle(1);

    expect(manager.articles.length).toBeFalsy();
    expect(manager.getArticleById(1)).toBeNull();
  });
});

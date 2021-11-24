CREATE TABLE Author (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(100)
);

INSERT INTO Author (id, name)
    VALUES (1, "Kate Chopin"),
    VALUES (2, "Paul Aster");

CREATE TABLE Tag (
    id INT PRIMARY KEY NOT NULL,
    label VARCHAR(100)
);

INSERT INTO Tag (id, label)
    VALUES (1, "tech"),
    VALUES (2, "data"),
    VALUES (3, "beer"),
    VALUES (4, "entertainment");

CREATE TABLE Article (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(100),
    body TEXT,
    author_id INT,
    CONSTRAINT fk_author
        FOREIGN KEY(author_id) 
        REFERENCES Author(id)
);

INSERT INTO Article (id, label)
    VALUES (1, "tech"),
    VALUES (2, "data"),
    VALUES (3, "beer"),
    VALUES (4, "entertainment");

CREATE TABLE ArticleTag (
    tag_id INT NOT NULL,
    article_id INT NOT NULL,
    PRIMARY KEY(tag_id, article_id),
    CONSTRAINT fk_tag
        FOREIGN KEY(tag_id) 
        REFERENCES Tag(id),
    CONSTRAINT fk_article
        FOREIGN KEY(article_id) 
        REFERENCES Article(id)
);

INSERT INTO Tag (tag_id, article_id)
    VALUES (1, "tech"),
    VALUES (2, "data"),
    VALUES (3, "beer"),
    VALUES (4, "entertainment");
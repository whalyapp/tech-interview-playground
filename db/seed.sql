-- Authors --

CREATE TABLE Author (
    "id" INT PRIMARY KEY NOT NULL,
    "name" VARCHAR(100)
);

INSERT INTO
    Author ("id", "name")
VALUES
    (1, 'Kate Chopin'),
    (2, 'Paul Aster'),
    (3, 'Mystery man');

-- Tags --

CREATE TABLE Tag (
    "id" INT PRIMARY KEY NOT NULL,
    "label" VARCHAR(100)
);

INSERT INTO
    Tag ("id", "label")
VALUES
    (1, 'tech'),
    (2, 'data'),
    (3, 'beer'),
    (4, 'entertainment');

-- Articles --

CREATE TABLE Article (
    "id" INT PRIMARY KEY NOT NULL,
    "title" VARCHAR(100),
    "body" TEXT,
    "author_id" INT,
    CONSTRAINT fk_author FOREIGN KEY("author_id") REFERENCES Author("id")
);

INSERT INTO
    Article ("id", "title", "body", "author_id")
VALUES
    (1, 'The Awakening', 'Super body #1', 1),
    (2, 'City of Glass', 'Super body #2', 2),
    (3, 'Secret article from Database', 'Super body #3', 3);

CREATE TABLE ArticleTag (
    "article_id" INT NOT NULL,
    "tag_id" INT NOT NULL,
    PRIMARY KEY(article_id, "tag_id"),
    CONSTRAINT fk_tag FOREIGN KEY("tag_id") REFERENCES Tag("id"),
    CONSTRAINT fk_article FOREIGN KEY("article_id") REFERENCES Article("id")
);

INSERT INTO
    ArticleTag ("article_id", "tag_id")
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 1);
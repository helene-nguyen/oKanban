BEGIN;

INSERT INTO "tag"("name", "color")
VALUES
    ('note', '#BDE6F1'),
    ('todo', '#FFE59D'),
    ('info', '#7D1E6A'),
    ('important', '#6A67CE'),
    ('success', '#6D8B74'),
    ('help', '#EC994B'),
    ('question', '#97C4B8'),
    ('warning', '#FFCD38'),
    ('social', '#FFEF82'),
    ('bug', '#F2F2F2'),
    ('tips', '#187498'),
    ('search', '#36AE7C'),
    ('doc', '#EB5353');

INSERT INTO "user"("firstname", "lastname", "email", "password")
VALUES
    ('a','a','a@a.com','a'),
    ('b','b','b@b.com','b'),
    ('c','c','c@c.com','c');

INSERT INTO "list"("title", "order", "description", "user_id")
VALUES
    ('Todo','1','Les choses à faire','1'),
    ('Mon Combat','2','Toujours en cours','1'),
    ('Titre Utilisateur 2','1','Ptite description','2'),
    ('Le dev c''est vraiment cool !','1','Mais attention aux coups de soleil ;)','3');

INSERT INTO "card"("title", "order", "color", "description", "user_id", "list_id")
VALUES
    ('Title Card 1','1','#FFF','Les choses à faire','1', '1'),
    ('Title Card 1','1','#FFF','Les choses à faire','2', '1'),
    ('Title Card 1','1','#FFF','Les choses à faire','3', '1');

INSERT INTO "card_has_tag"("card_id", "tag_id") VALUES
(1,1),
(1,2),
(2,1),
(2,2),
(3,6),
(3,8);


COMMIT;
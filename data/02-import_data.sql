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

INSERT INTO "list"("title", "description", "user_id")
VALUES
    ('Todo','Les choses à faire',1),
    ('Mon Combat','Toujours en cours',1),
    ('Titre Utilisateur 2','Ptite description',2),
    ('Le dev c''est vraiment cool !','Mais attention aux coups de soleil ;)',3);

INSERT INTO "card"("title", "color", "description", "user_id", "list_id")
VALUES
    ('2 Title Card 1','#B22727','Les choses à faire',2, 1),
    ('3 Title Card 2','#B22727','Les choses à faire',3, 1),
    ('1 Title Card 3','#B22727','Les choses à faire',1, 1),
    ('1 Title Card 4','#7D1E6A','Les choses à faire',1, 2),
    ('2 Title Card 5','#7D1E6A','Les choses à faire',2, 2),
    ('3 Title Card 6','#7D1E6A','Les choses à faire',3, 3),
    ('1 Title Card 7','#FFEF82','Les choses à faire',1, 3),
    ('2 Title Card 8','#FFEF82','Les choses à faire',2, 3),
    ('3 Title Card 9','#0AA1DD','Les choses à faire',3, 4),
    ('1 Title Card 10','#0AA1DD','Les choses à faire',1, 4),
    ('2 Title Card 11','#205375','Les choses à faire',2, 4),
    ('3 Title Card 12','#205375','Les choses à faire',3, 4);

INSERT INTO "card_has_tag"("card_id", "tag_id") VALUES
(1,1),
(1,2),
(2,1),
(2,2),
(3,6),
(3,8);


COMMIT;
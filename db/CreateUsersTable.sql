DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
    userid SERIAL,
	username VARCHAR(32) UNIQUE NOT NULL,
	password TEXT NOT NULL,
	isActive BOOLEAN NOT NULL DEFAULT TRUE,
	PRIMARY KEY (userid)
);


INSERT INTO Users (USERNAME, PASSWORD) VALUES ('test', 'test');
INSERT INTO Users (USERNAME, PASSWORD) VALUES ('hey', 'yo');
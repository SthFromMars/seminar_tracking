INSERT INTO users VALUES
( UUID_TO_BIN('243dbe38-257d-11ea-978f-2e728ce88125'), 'Administratorius', 'adminadmin', 'adminadmin', 'ADMIN'),
( UUID_TO_BIN('31486f9c-257d-11ea-978f-2e728ce88125'), 'Jonas Jonaitis', 'jojo1234', '12345678', 'USER');

INSERT INTO seminars VALUES
(UUID_TO_BIN(UUID()), 'Seminaras 1', '123456789', 5, DATE("2018-05-03"), DATE("2018-05-05"), 'VU', UUID_TO_BIN('31486f9c-257d-11ea-978f-2e728ce88125')),
(UUID_TO_BIN(UUID()), 'Seminaras 2', 'abcdefgh', 40, DATE("2019-01-01"), DATE("2019-02-01"), 'KTU', UUID_TO_BIN('31486f9c-257d-11ea-978f-2e728ce88125')),
(UUID_TO_BIN(UUID()), 'Seminaras 3', 'qwerty', 3, DATE("2018-01-03"), DATE("2019-12-03"), 'TPKRC', UUID_TO_BIN('243dbe38-257d-11ea-978f-2e728ce88125'))

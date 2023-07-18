CREATE TABLE users (
  	id BINARY(16) PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    privilege char(5) NOT NULL,
    CONSTRAINT check_privilege CHECK (privilege='ADMIN' OR privilege='USER')
);

CREATE TABLE seminars (
    id BINARY(16) PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    cert_nr varchar(255),
    length integer,
    start_date date,
    end_date date,
    location varchar(255),
    user BINARY(16) NOT NULL,
    CONSTRAINT to_users FOREIGN KEY (user)
    	REFERENCES users(id)
    	ON UPDATE CASCADE
    	ON DELETE RESTRICT
);

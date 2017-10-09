-- USER TABLE --
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    firstName VARCHAR(40),
    lastName VARCHAR (40),
    email VARCHAR (80) NOT NULL,
    profilePic VARCHAR (200),
    auth_id VARCHAR(100) NOT NULL,
    safe_haven VARCHAR (200),
    socket_id VARCHAR (100),
    emergency_group_created BOOLEAN
);

INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id, emergency_group_created)
VALUES ('hermione1549', 'Lucy', 'Pevensie', 'hermione1549@gmail.com', null, '105562344058923082049', null, null, false);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id, emergency_group_created)
VALUES ('rocky.neck', 'Rocky', 'Neck', 'rocky.neck@mondayshift.com', null, '59d3f63ac04b650413249b88', null, null, false);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id, emergency_group_created)
VALUES ('maggieessence', 'Maggie', 'Essence', 'meatgap@meat.gap', null, '105562344058923082049', null, null, false);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id, emergency_group_created)
VALUES ('noBats', 'Abby', 'Thelin', 'abby@noBats.tuna', null, '1055623442sdf058923082049', null, null, false);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id, emergency_group_created)
VALUES ('alien', 'Alan', 'Miller', 'alan@theystillthinkimhuman.mothership', null, 'af105562344058923082049', null, null, false);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id, emergency_group_created)
VALUES ('princesshack', 'Princess', 'Hackamore', 'salsamaker@cook.food', null, 'vae104058923082049', null, null, false);
INSERT INTO users (username, firstName, lastName, email, profilePic, auth_id, safe_haven, socket_id, emergency_group_created)
VALUES ('buddyc', 'Buddy', 'Charlwood', 'bwood@thunderdownunder.net', null, 'zjsd958923082049', null, null, false);


-- EMERGENCY TABLE --
CREATE TABLE IF NOT EXISTS emergency (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    message VARCHAR(180)
);

INSERT INTO emergency (user_id, message)
VALUES (1, 'Eating rice, help');
INSERT INTO emergency (user_id, message)
VALUES (2, 'Bad area');
INSERT INTO emergency (user_id, message)
VALUES (3, 'Ran out of Parmesan cheese');
INSERT INTO emergency (user_id, message)
VALUES (4, 'Sample cups everywhere');


-- EMERGENCY CONTACTS TABLE --
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id SERIAL PRIMARY KEY,
    emergency_id INTEGER REFERENCES emergency,
    contact_id INTEGER REFERENCES users
);

INSERT INTO emergency_contacts (emergency_id, contact_id)
VALUES (1, 3);
INSERT INTO emergency_contacts (emergency_id, contact_id)
VALUES (2, 3);
INSERT INTO emergency_contacts (emergency_id, contact_id)
VALUES (3, 1);
INSERT INTO emergency_contacts (emergency_id, contact_id)
VALUES (4, 3);
INSERT INTO emergency_contacts (emergency_id, contact_id)
VALUES (4, 1);
INSERT INTO emergency_contacts (emergency_id, contact_id)
VALUES (2,1);


-- FRIENDS TABLE --
CREATE TABLE IF NOT EXISTS friends (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    friend_id INTEGER REFERENCES users,
    friend_status BOOLEAN --true is accepted, false is pending, app.delete remove pending friend request
);

insert into friends (user_id, friend_id, friend_status) values (1, 3, true);
insert into friends (user_id, friend_id, friend_status) values (3, 1, true);
insert into friends (user_id, friend_id, friend_status) values (1, 2, true);
insert into friends (user_id, friend_id, friend_status) values (2, 1, false);
insert into friends (user_id, friend_id, friend_status) values (2, 3, true);
insert into friends (user_id, friend_id, friend_status) values (3, 2, false);
insert into friends (user_id, friend_id, friend_status) values (4, 3, true);
insert into friends (user_id, friend_id, friend_status) values (4, 2, false);
insert into friends (user_id, friend_id, friend_status) values (8, 3, true);
insert into friends (user_id, friend_id, friend_status) values (6, 2, false);
insert into friends (user_id, friend_id, friend_status) values (7, 1, true);
insert into friends (user_id, friend_id, friend_status) values (7, 2, false);
INSERT INTO friends (user_id, friend_id, friend_status) VALUES (18, 1, true);
INSERT INTO friends (user_id, friend_id, friend_status) VALUES (18, 2, true);
INSERT INTO friends (user_id, friend_id, friend_status) VALUES (18, 3, true);


-- GROUPS TABLE --
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users NOT NULL,
    group_name VARCHAR(40) NOT NULL
);

insert into groups (user_id, group_name) values (1, 'the janises');
insert into groups (user_id, group_name) values (2, 'chronicles of hermionia');
insert into groups (user_id, group_name) values (3, 'rocky neck bunch');
insert into groups (user_id, group_name) values (4, 'meat gap group');
insert into groups (user_id, group_name) values (8, 'aliens are real');


-- GROUP MEMBERS TABLE --
CREATE TABLE IF NOT EXISTS group_members (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups NOT NULL,
    member_id INTEGER REFERENCES users NOT NULL
);

INSERT INTO group_members (group_id, member_id) VALUES (1, 3);
INSERT INTO group_members (group_id, member_id) VALUES (1, 7);
INSERT INTO group_members (group_id, member_id) VALUES (2, 4);
INSERT INTO group_members (group_id, member_id) VALUES (2, 5);
INSERT INTO group_members (group_id, member_id) VALUES (3, 3);
INSERT INTO group_members (group_id, member_id) VALUES (3, 2);
INSERT INTO group_members (group_id, member_id) VALUES (3, 2);
INSERT INTO group_members (group_id, member_id) VALUES (4, 8);
INSERT INTO group_members (group_id, member_id) VALUES (4, 6);
INSERT INTO group_members (group_id, member_id) VALUES (5, 1);


-- ACTIVE LOCATIONS TABLE --
CREATE TABLE IF NOT EXISTS active_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    coordinates VARCHAR(200), -- {latitude, longitude}
    situation VARCHAR(50),
    situation_level INTEGER,
    message VARCHAR(180)
);

INSERT INTO active_locations (user_id, coordinates, situation, situation_level, message)
VALUES (1, '32.90423*29.032', 'running', 1, 'help man following me');
INSERT INTO active_locations (user_id, coordinates, situation, situation_level, message)
VALUES (3, '2.34*-52.31', 'in a bad area', 2, 'scary place');
INSERT INTO active_locations (user_id, coordinates, situation, situation_level, message)
VALUES (4, '32.9233*22.32', 'on a date', 1, 'weirdo');
INSERT INTO active_locations (user_id, coordinates, situation, situation_level, message)
VALUES (10, '-22.34*23.1', 'emergency', 3, 'BATS');

CREATE TABLE IF NOT EXISTS active_location_recipients (
    id SERIAL PRIMARY KEY,
    active_location_id INTEGER REFERENCES active_locations NOT NULL,
    recipient_id INTEGER REFERENCES users NOT NULL
);

INSERT INTO active_location_recipients (active_location_id, recipient_id)
VALUES (1, 3);
INSERT INTO active_location_recipients (active_location_id, recipient_id)
VALUES (2, 1);
INSERT INTO active_location_recipients (active_location_id, recipient_id)
VALUES (3, 3);
INSERT INTO active_location_recipients (active_location_id, recipient_id)
VALUES (4, 1);
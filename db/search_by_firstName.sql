SELECT id, username, firstName, lastName, email, profilePic
FROM users
WHERE LOWER(firstName) = LOWER($1);
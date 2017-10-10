UPDATE emergency
SET message = $1
WHERE user_id = $2;
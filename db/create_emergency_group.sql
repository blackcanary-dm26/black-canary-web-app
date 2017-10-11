--UPDATE users 
--SET emergency_group_created = true
--WHERE id = $1;


INSERT INTO emergency (user_id, message)
VALUES ($1, $2)
RETURNING *;
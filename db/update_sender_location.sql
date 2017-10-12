UPDATE active_locations
SET coordinates = $1
WHERE user_id = $2;
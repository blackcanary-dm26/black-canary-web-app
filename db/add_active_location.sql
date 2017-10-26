INSERT INTO active_locations (user_id, coordinates, situation, situation_level, message)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

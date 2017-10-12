DELETE FROM active_location_recipients
WHERE active_location_id = $1;

DELETE FROM active_locations
WHERE id = $1;
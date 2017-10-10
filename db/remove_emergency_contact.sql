DELETE FROM emergency_contacts
WHERE emergency_id = $1
AND contact_id = $2;
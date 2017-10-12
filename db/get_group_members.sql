SELECT * FROM group_members
WHERE group_id = $1
AND member_id = $2;
select users.username as friend_username, users.firstName as friend_firstName, users.lastName as friend_lastName, users.email as friend_email, users.profilepic as friend_pic, friends.friend_id as friend_user_id, friends.friend_status as friend_status, friends.user_id as user_id, friends.id as friend_table_id
from friends
join users
on friends.user_id = users.id
where friends.friend_id = $1
AND friends.friend_status = false;
--get emergency messages sent to each user
-- select emergency.id as emergencySenderId, users.firstname as emergency_sender_firstname, emergency.message as emergency_message , emergency_contacts.contact_id as emergency_contact_id
-- from emergency
-- join emergency_contacts
-- on emergency.id = emergency_contacts.emergency_id
-- join users
-- on users.id = emergency.user_id
-- WHERE emergency_contacts.contact_id = $1;




--get each user's emergency group

select emergency.id as emergency_id, emergency.user_id as emergency_sender_id, emergency.message as emergency_message, users.firstname as emergency_contact_firstname, users.lastname as emergency_contact_lastname, emergency_contacts.contact_id as emergency_contact_id
from emergency
join emergency_contacts
on emergency.id = emergency_contacts.emergency_id
join users
on users.id = emergency_contacts.contact_id
WHERE emergency.user_id= $1;
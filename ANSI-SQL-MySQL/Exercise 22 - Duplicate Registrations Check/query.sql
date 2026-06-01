SELECT user_id, event_id, COUNT(registration_id) as reg_count
FROM Registrations
GROUP BY user_id, event_id
HAVING reg_count > 1;
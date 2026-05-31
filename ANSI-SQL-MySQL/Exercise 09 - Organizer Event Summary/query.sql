SELECT u.full_name as organizer_name, e.status, COUNT(e.event_id) as event_count
FROM Users u
JOIN Events e ON u.user_id = e.organizer_id
GROUP BY u.user_id, e.status;
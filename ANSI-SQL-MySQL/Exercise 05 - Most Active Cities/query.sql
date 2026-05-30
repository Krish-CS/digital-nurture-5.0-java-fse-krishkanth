SELECT e.city, COUNT(DISTINCT r.user_id) as distinct_registrations
FROM Events e
JOIN Registrations r ON e.event_id = r.event_id
GROUP BY e.city
ORDER BY distinct_registrations DESC
LIMIT 5;
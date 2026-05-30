SELECT e.title, COUNT(s.session_id) as session_count
FROM Events e
LEFT JOIN Sessions s ON e.event_id = s.event_id
    AND HOUR(s.start_time) >= 10
    AND HOUR(s.start_time) < 12
GROUP BY e.event_id;
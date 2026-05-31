SELECT e.title, COUNT(s.session_id) as session_count
FROM Events e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id
HAVING session_count = (
    SELECT COUNT(session_id) as cnt
    FROM Sessions
    GROUP BY event_id
    ORDER BY cnt DESC
    LIMIT 1
);
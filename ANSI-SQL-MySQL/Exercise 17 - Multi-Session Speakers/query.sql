SELECT speaker_name, COUNT(session_id) as session_count
FROM Sessions
GROUP BY speaker_name
HAVING session_count > 1;
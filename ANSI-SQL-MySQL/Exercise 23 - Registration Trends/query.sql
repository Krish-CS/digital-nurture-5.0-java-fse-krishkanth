SELECT DATE_FORMAT(registration_date, '%Y-%m') as month, COUNT(registration_id) as registration_count
FROM Registrations
WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY month
ORDER BY month;
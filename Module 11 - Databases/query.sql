/*
	Select color and count how many cars have each color
		find cars which have not been sold
		order by count in descending order
		only show results where the count is greater than 2
*/

SELECT color, COUNT(color)
FROM cars
WHERE sold = FALSE
GROUP BY (color)
HAVING count(color) > 2
ORDER BY count DESC;


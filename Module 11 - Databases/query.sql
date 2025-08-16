/*
	Select brand, model, and year from cars
		only show the oldest 5 cars in the database
		show cars which haven't been sold
*/

SELECT brand, model, year
FROM cars
WHERE sold != TRUE
ORDER BY year
LIMIT 5;
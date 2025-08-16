/*
	Use the AVG aggregate function to find the average price
		where the brand is Bentley
*/

SELECT AVG(price)
FROM cars
WHERE brand = 'Bentley';
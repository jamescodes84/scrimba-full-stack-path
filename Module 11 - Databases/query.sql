/*
	Select brand, model, condition, color and price from cars
		where the price is between $20,000 and $60,000
		and the condition is between 1 and 3
		and the color contains red
*/
SELECT brand, model, condition, color, price
FROM cars
WHERE price BETWEEN 20000 AND 60000
AND condition BETWEEN 1 AND 3
AND color LIKE '%red%';
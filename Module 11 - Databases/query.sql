/*
		Select the brand, model, condition and price from cars
		where the car is not sold
		and the condition is not 5
		order the table by condition in descending order
		and by price in ascending order
*/


SELECT brand, model, condition, price
FROM cars
WHERE sold = false AND condition != 5
ORDER BY condition DESC, price;

/*
	Filter out cars from 1965
		Select the brand, model, year and price
*/
SELECT brand, model, year, price
FROM cars
WHERE year != 1965;
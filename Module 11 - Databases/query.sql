/*
	Find cars which are not yellow
		Select the brand, model, price and color
*/

SELECT brand, model, price, color
FROM cars
WHERE color != 'yellow';
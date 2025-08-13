/*
	Select the brand, model, color and year for cars
		where the model is 'DB' followed by any other single character
*/

SELECT brand, model, color, year
FROM cars
WHERE model LIKE 'DB_'
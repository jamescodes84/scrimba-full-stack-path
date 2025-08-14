/*
	Select brand, model, and color from cars
		where the color is 'red'
		and the brand is not 'Ferrari'
		and the car has not been sold
*/

SELECT brand, model, color
FROM cars
WHERE color = 'red' AND brand != 'Ferrari'
AND sold is false;
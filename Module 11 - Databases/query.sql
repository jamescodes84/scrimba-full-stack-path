/*
	Search for columns: brand, model, color, year, price, sold
		from the table cars
		where the color is a shade of red
		or the year is between 1960 and 1969
		and sold is false
*/

SELECT brand, model, color, year, price, sold FROM cars
	WHERE (color LIKE '%red%'
	OR year BETWEEN 1960 AND 1969)
	AND sold = FALSE;
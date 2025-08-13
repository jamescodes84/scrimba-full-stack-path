/*
	Select the brand, model, condition and year from cars
		Where the year is 1961, 1963, 1965, 1967 or 1969
		and the condition is 3 or higher
		and sold is false
*/


SELECT brand, model, conditIon, year
FROM cars
WHERE year IN ('1961', '1963', '1965', '1967', '1969')
AND condition >= 3 AND sold IS FALSE;
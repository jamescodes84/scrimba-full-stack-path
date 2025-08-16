/*
	Select the average, minimum and maximum price from cars
	where sold is true
	Round the average up to the nearest whole number
	and use 'avg' as the alias for that result	
*/

SELECT CEIL(AVG(price)) as 'avg' , MIN(price) as minimum, MAX(price) as maximum
FROM cars
WHERE sold = TRUE;

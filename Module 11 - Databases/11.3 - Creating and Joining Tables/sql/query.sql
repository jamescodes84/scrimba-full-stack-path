/*
	Select the city and average car price
	Round that car price to a whole number
	
	Only show dealerships which have cars
	
	Group by dealership city and state
*/


select city , FLOOR(AVG(price) )
FROM CARS LEFT JOIN dealerships
ON dealership_id = dealerships.id
GROUP BY city, state;
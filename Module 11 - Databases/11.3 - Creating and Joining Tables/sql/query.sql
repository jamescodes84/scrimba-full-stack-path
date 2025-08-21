/*
	Select the city, state and
		count the total number of cars in each dealership
		alias the count as car_count
	
	Use cars as the left table, and dealerships as the right table
		choosing a join which will show every dealership
		
	Include a condition to count unsold cars
	
	Group by dealership city and state
	Order by the car_count
*/

SELECT city , state, COUNT(id) as car_count
FROM cars LEFT JOIN dealerships ON dealership_id = dealerships.id
WHERE sold = FALSE
GROUP BY city, state
ORDER BY car_count;


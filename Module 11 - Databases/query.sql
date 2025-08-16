/*
	Select the condition, and a count of the condition from cars
		group by the condition column
*/

SELECT condition, COUNT(condition)
FROM cars
GROUP BY (condition)
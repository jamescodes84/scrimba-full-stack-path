/*
	Select the name, role and city from sold_cars
	
	Join with the staff and dealerships tables
		use appropriate joins to show staff who have no dealership_id
		
	Include a where clause to find
		- null values in sold_cars
		- staff who have the role 'Salesperson'
*/

SELECT 
	S.name,
	S.role,
	D.city
FROM sold_cars SC
	FULL JOIN staff S ON SC.seller = S.id
	LEFT JOIN dealerships D ON S.dealership_id = D.id
WHERE SC.id IS NULL
	AND S.role = 'Salesperson';
/*
	Select name, role, sold_price from staff
	Inner join with sold_cars
		matching seller with staff.id	
*/

SELECT name, role, sold_price
FROM staff
INNER JOIN sold_cars ON seller = staff.id;
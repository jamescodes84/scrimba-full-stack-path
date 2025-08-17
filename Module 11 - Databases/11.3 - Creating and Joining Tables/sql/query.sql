/*
	Select name, role, city, state
		From the staff table
	Right join with the dealerships table where the dealership_id in staff
			matches with the id in dealerships
*/

SELECT name, role, city, state FROM staff
  RIGHT JOIN dealerships ON dealership_id = dealerships.id;
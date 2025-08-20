/*
	Select the name and role, alongside a total_sales:
		this is the sum of sales by a member of staff
	
	Use staff as your left table and sold_cars as your right table
	
	Include a where clause to select only staff with the role 'Salesperson'
	
	Group by staff name and role
	Order by the total_sales from high to low
*/

SELECT name, role, SUM (sold_price) AS sumPrice
FROM staff LEFT JOIN sold_cars on staff.id = seller
WHERE role = 'Salesperson'
GROUP BY staff.name , staff.role
ORDER BY sumPrice DESC;
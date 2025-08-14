/*
	Select brand, model, and color from cars
		where the color is not red, blue, or white
		and the brand is none of: Aston Martin, Bentley or Jaguar
		and sold is false
*/
SELECT brand, model, color
FROM cars
WHERE color NOT IN ('red', 'blue','white')
AND brand NOT IN ('Aston Martin', 'Bentley', 'Jaguar')
AND sold is FALSE; 
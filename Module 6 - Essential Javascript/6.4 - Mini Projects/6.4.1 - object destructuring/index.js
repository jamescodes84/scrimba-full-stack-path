const dreamHoliday = {
    destination: 'San Francisco, California ',
    activity: 'all day sushi by the sea',
    accommodation: 'tiny umbrellas in our drinks',
    companion: 'my partner in crime'
}
let {destination, activity, accommodation, companion} = dreamHoliday
/* 
Challenge
1. Complete the object dreamHoliday with whatever
   information is true for you. Feel free to add 
   extra properties or change the existing ones. 
2. Destructure the object and use the individual 
   variables to log out one or more sentences about 
   your dream holiday. 
   
E.g. "I would love to go to Austin, Texas to visit the Tesla HQ. 
     I'd sleep in a luxury ranch and hang out with Elon Musk all day."
*/
console.log(`I would love to go to ${destination} to visit the city by the bay with ${companion}. I'd have ${activity} and we would need ${accommodation}`)
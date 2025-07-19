/**
Challenge: 

- Start building out the BoredBot Skeleton however you'd like. 
    That will include:
    - A title for the app ("BoredBot" might be a good start 😉)
    - A placeholder element that will be populated with the random 
      idea we get from the API
    - A button to click for triggering the GET request to the Bored API. 
      (Don't worry about implementing the button quite yet)
*/



let activityButton = document.getElementById('activity-button')

activityButton.addEventListener("click", () => {
  fetch("https://apis.scrimba.com/bored/api/activity")
      .then(response => response.json())
      .then(data => {
        let activity = document.getElementById("activity")
          activity.textContent = data.activity
          activity.classList.add("jump")
          void activity.offsetWidth;
            setTimeout(()=>{activity.classList.remove("jump")}, 1000)

      })
})
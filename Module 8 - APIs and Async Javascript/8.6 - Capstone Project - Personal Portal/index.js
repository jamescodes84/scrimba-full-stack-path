/**
 * Challenge part 2: Display the image's author
 * 
 * With the data you've already fetched, display the name of the 
 * image author on the page. They show up as the "user" in the data
 * returned from the API.
 * 
 * Don't worry about positioning the author in the lower-left yet.
 */

async function getBackground() {
	let res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=colorado", {method:'GET'})
	let data = await res.json()
	console.log(data)
    document.getElementById('body').style.backgroundImage = `url("${data.urls.full}")`
    document.getElementById('image-author').textContent = data.user.name
}
getBackground()

// console.log(randomImage)
// document.getElementById("body").style.backgroundImage = randomImage;
		
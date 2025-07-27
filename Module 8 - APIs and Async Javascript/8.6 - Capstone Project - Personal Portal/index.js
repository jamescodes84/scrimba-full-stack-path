const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
const data = await res.json()
document.body.style.backgroundImage = `url(${data.urls.regular})`
document.getElementById("author").textContent = `By: ${data.user.name}`

//     .catch(err => {
//         // Use a default background image/author
//         document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
// )`
// 		document.getElementById("author").textContent = `By: Dodi Achmad`
//     })

/**
 * Challenge: Update the fetch below to use the top-level await
 */

const res2 = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
const data2 = await res2.json()


if (!res2.ok) {
    throw Error("Something went wrong")
}
       
   
document.getElementById("crypto-top").innerHTML = `
    <img src=${data2.image.small} />
    <span>${data2.name}</span>
`
document.getElementById("crypto").innerHTML += `
    <p>🎯: $${data2.market_data.current_price.usd}</p>
    <p>👆: $${data2.market_data.high_24h.usd}</p>
    <p>👇: $${data2.market_data.low_24h.usd}</p>
`
   
    

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

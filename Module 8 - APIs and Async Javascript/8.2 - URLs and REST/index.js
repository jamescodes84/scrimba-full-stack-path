/**
 Challenge:

 With the 5 blog post objects, display the `title` and `body`
properties of the first 5 posts on the browser page.
 
 Hints: 
 * Create a `div` in the HTML file to store these items
 * Loop over the items creating a string of HTML elements you 
   can then put into the div with `innerHTML`
 */
let blogpostsDiv = document.getElementById('blogposts-div')
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        
        console.log(postsArr)
        for (let post of data.slice(0,5)) {
            blogpostsDiv.innerHTML += 
            `
                ${post.title} , ${post.body}
            `
        }
        
    })
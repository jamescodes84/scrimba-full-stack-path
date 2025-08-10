
import path from 'node:path'

/*
Challenge 2:

1. Create and export a function called 'serveStatic'. 
   It should take in the base directory as a parameter.

2. Build a path to index.html in the 'public' folder and save it to a const 'filePath'. 
   (Which node module will you need to import to do this? Which method joins the path together?)

3. Log 'filePath' to the console.
*/

export default function serveStatic(dirName) {
   const filePath = path.join(dirName, "public" , "index.html")
   console.log(filePath)
   return
}
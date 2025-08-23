import express from 'express'


const celebrity = {
  type: "action hero",
  name: "JSON Statham"
}


const PORT = 8000
const app = express()

app.listen(PORT, () => console.log(`server running on port ${PORT}`))



app.get('/', (req,res)=> {

    res.json(celebrity)
    // res.status(200)
})
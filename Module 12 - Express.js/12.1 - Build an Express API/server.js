import express from 'express'
import { startups } from './data/data.js'

const PORT = 8000
const app = express()

app.listen(PORT, () => console.log(`server running on port ${PORT}`))



app.get('/api', (req,res)=> {
  /*
  Challenge:
  1. When a user hits the /api endpoint with query params, filter the data so 
  we only serve objects that meet their requirements. 
    
  The user can filter by the following properties:
  industry, country, continent, is_seeking_funding, has_mvp

  Test Cases

  /api?industry=renewable%20energy&country=germany&has_mvp=true
  Should get the "GreenGrid Energy" object.

  /api?industry=renewable%20energy&country=germany&has_mvp=false
  Should not get any object

  /api?continent=asia&is_seeking_funding=true&has_mvp=true
  should get for objects with IDs 3, 22, 26, 29
  */

  // console.log(req.query)
  let filteredData = startups

  const { industry , country, continent, is_seeking_funding, has_mvp } = req.query


  if (industry) {
    console.log(industry)
    filteredData = filteredData.filter((startup) => {
        return startup.industry.toLowerCase() === industry.toLowerCase()
      }
    )
  }

  if (country) {
    filteredData = filteredData.filter( startup => 
      startup.country.toLowerCase() === country.toLowerCase()
    )
  }
  
  if (continent) {
    filteredData = filteredData.filter( startup => 
      startup.continent.toLowerCase() === continent.toLowerCase()
    )
  }

  if (is_seeking_funding) {
    filteredData = filteredData.filter( startup => 
      startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase())
    )
  }
  
  if (has_mvp) {
    filteredData = filteredData.filter( startup => 
      startup.has_mvp === JSON.parse(has_mvp.toLowerCase())
    )
  }

  res.json(filteredData)
})


app.get('/api/:field/:term' , (req, res) => {
  // console.log('req.params: ',req.params)
   const allowedFields = ['country', 'continent', 'industry']


/*
Challenge:
1. If the client’s 'field' is not supported, serve this object:
  {message: "Search field not allowed. Please use only 'country', 'continent', 'industry'" }
2. Chain in the .status(<code>) method to set a status code.
	What status code should you set?
3. You might run into an error! Find a solution!

hint.md for help!
*/


  let filteredData = startups
  let reqField = req.params.field
  let reqTerm = req.params.term

  if (!allowedFields.includes(reqField)) {
    res.status(400).json({message: "Search field not allowed. Please use only 'country', 'continent', 'industry'" })
    return
  }

  if (reqField === 'country') {
    filteredData = filteredData.filter( startup => {
        return startup.country.toLowerCase() === reqTerm.toLowerCase()
      }
    )
  }

  if (reqField ==='continent'){
    filteredData = filteredData.filter( startup => {
        return startup.continent.toLowerCase() === reqTerm.toLowerCase()
      }
    )
  }

  if (reqField === 'industry') {
    filteredData = filteredData.filter( startup => {
        return startup.industry.toLowerCase() === reqTerm.toLowerCase()
      }
    )
  }
  // console.log(filteredData)

  res.json(filteredData)
}) 

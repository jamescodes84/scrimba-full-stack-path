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

/*
Challenge:
1. Add a new route which accepts GET requests to /api/<field>/<term>.
2. Filter the data based on the path params.
3. Serve the filtered data.

For now, don’t worry that using some fields will trigger an error.

** The functionality **
Get all startups in a given country via api/country/<country name>
Get all startups in a given continent via api/continent/<continent name>
Get all startups in a given industry via api/industry/<industry name>

**Test Cases** 

These should work:
  api/country/india
  api/continent/europe
  api/industry/ai

This will throw an error - but that's fine!
	api/has_mvp/true

*/

app.get('/api/:field/:term' , (req, res) => {
  // console.log('req.params: ',req.params)
  let filteredData = startups
  let reqField = req.params.field
  let reqTerm = req.params.term

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

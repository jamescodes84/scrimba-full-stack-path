
import { startups } from '../data/data.js'


export const getDataByPathParams = (req, res) => {
  // console.log('req.params: ',req.params)
   const allowedFields = ['country', 'continent', 'industry']

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
  res.json(filteredData)
}

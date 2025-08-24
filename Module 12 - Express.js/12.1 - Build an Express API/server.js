import express from 'express'
import { startups } from './data/data.js'
import { getAllData } from './controllers/getAllData.js'
import { getDataByPathParams } from './controllers/getDataByPathParams.js'

const PORT = 8000
const app = express()
const apiRouter = express.Router()


app.listen(PORT, () => console.log(`server running on port ${PORT}`))


app.use('/api', apiRouter)

apiRouter.get('/', getAllData)
apiRouter.get('/:field/:term' , getDataByPathParams) 

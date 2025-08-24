import express from 'express'

import {apiRouter} from './routes/apiRoutes.js'
import { catchError } from './controllers/catchErrors.js'

const PORT = 8000
const app = express()

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
app.use('/api', apiRouter)
app.use('', catchError)
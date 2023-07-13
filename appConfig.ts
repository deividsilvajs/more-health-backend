import { Express } from 'express'
import cors from 'cors'
import routes from './routes/routes'

const appConfig = (app: Express) => {
    app.use(cors({ origin: 'http://localhost:3000' }))
    app.use(routes)
}

export default appConfig
import { Express } from 'express'
import cors from 'cors'
import routes from './routes/routes'

export default function appConfig(app: Express) {
    app.use(cors({ origin: 'http://localhost:3000' }))
    app.use(routes)
}
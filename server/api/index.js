import { Router } from 'express'

import users from './users'
import animals from './animals'
import farmers from './farmers'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(animals)
router.use(farmers)

export default router

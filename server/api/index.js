import { Router } from 'express'

import users from './users'
import animals from './animals'
import pens from './pens'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(animals)
router.use(pens)

export default router

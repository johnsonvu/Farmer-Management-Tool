import { Router } from 'express'

import users from './users'
import animals from './animals'
import pens from './pens'
import farmers from './farmers'
import products from './products'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(animals)
router.use(pens)
router.use(farmers)
router.use(products)

export default router

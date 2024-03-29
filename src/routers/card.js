import { Router } from "express"
import { checkToken, checkAdminRole } from "../middleware/auth.js"
import { getCards, getCard, createCard, updateCard, updateCardStats, deleteCard } from "../controllers/card.js"

const router = Router()

router.get("/", checkToken, checkAdminRole, getCards)
router.get("/:id", checkToken, getCard)
router.post("/", checkToken, createCard)
router.put("/:id", checkToken, updateCard)
router.patch("/:id", checkToken, updateCardStats)
router.put("/:id", checkToken, updateCard)
router.delete("/:id", checkToken, deleteCard)

export default router

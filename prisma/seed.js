import { PrismaClient } from "@prisma/client"
import { Card, Category } from "../src/helper/constructors.js"
import  { createUserDb } from "../src/domain/user.js"
const prisma = new PrismaClient()

async function seed () {
	const user = await createUserDb("Test@Something.com", "password123")
	console.log(user)

	const newCategory = new Category("Test")
	newCategory.setOwner(user.id)
	const category = await prisma.category.create({
		data: newCategory
	})
	console.log(category)

	const newCard = new Card("Marco", "Polo", "no hint")
	newCard.setOwner(user.id)
	newCard.setCategory(category.id)
	const card = await prisma.card.create({
		data: newCard
	})
	console.log(card)

	process.exit(0)
}

seed().catch(async (e) => {
	console.error(e)
	await prisma.$disconnect()
	process.exit(1)
})

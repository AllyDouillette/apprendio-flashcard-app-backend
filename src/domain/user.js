import { PrismaClient } from "@prisma/client"
import { hashString } from "../helper/hashing.js"

const prisma = new PrismaClient()

export const createUserDb = async (email, password, Role = "USER") => {
	const user = await prisma.user.create({ data: {
		email,
		password: await hashString(password),
		Role
	}
	})
	return user
}

export const getUserByIdDb = async (id) => {
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	})
	delete user.password
	return user
}

export const getUserByEmail = async (email) => {
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})
	return user
}
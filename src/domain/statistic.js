import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getStatisticDb = async (id) => {
	return await prisma.statistic.findUnique({
		where: {
			id
		}
	})
}

export const updateStatisticDb = async (id, correct, incorrect) => {
	return await prisma.statistic.update({
		where: {
			id
		},
		data: {
			correct,
			incorrect
		}
	})
}

export const getStatisticsDb = async () => {
	return await prisma.statistic.findMany()
}

export const getStatisticsForUserDb = async (userId) => {
	return await prisma.statistic.findMany({
		where: {
			userId
		},
		select: {
			date: true,
			correct: true,
			incorrect: true
		},
		orderBy: {
			date: "desc"
		}
	})
}

export const getStatisticsForDateDb = async (date) => {
	return await prisma.statistic.findMany({
		where: {
			date
		}
	})
}

export const getStatisticForUserAndDateDb = async (userId, date) => {
	return await prisma.statistic.findFirst({
		where: {
			userId,
			date
		}
	})
}

export const getStatisticsForDateRangeDb = async (startDate, endDate) => {
	return await prisma.statistic.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate
			}
		},
		orderBy: {
			date: "asc"
		}
	})
}

export const getStatisticsForUserInDateRangeDb = async (userId, startDate, endDate) => {
	return await prisma.statistic.findMany({
		where: {
			userId,
			date: {
				gte: startDate,
				lte: endDate
			}
		},
		orderBy: {
			date: "asc"
		}
	})
}

export const createStatisticDb = async (userId, date) => {
	return await prisma.statistic.create({
		data: {
			userId,
			date,
			correct: 0,
			incorrect: 0
		}
	})
}

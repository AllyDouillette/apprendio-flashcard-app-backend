import {
	getStatisticDb,
	getStatisticsDb,
	getStatisticsForDateDb,
	getStatisticsForDateRangeDb,
	getStatisticsForUserDb,
	getStatisticsForUserAndDateDb,
	getStatisticsForUserInDateRangeDb,
	updateStatisticDb
} from "../domain/statistic.js"
import { constructDataResponse, constructMessageResponse } from "../helper/response.js"

export const getStatistic = async (req, res) => {
	const id = Number(req.params.id)
	const statistics = await getStatisticDb(id)
	return constructDataResponse(res, 200, { statistics })
}

export const getStatistics = async (_, res) => {
	const statistics = await getStatisticsDb()
	return constructDataResponse(res, 200, { statistics })
}

export const getStatisticsForDay = async (req, res) => {
	const { date } = req.params
	const ISOdate = new Date(`${date}T00:00:00.000Z`)
	const statistics = await getStatisticsForDateDb(ISOdate)
	return constructDataResponse(res, 200, { statistics })
}

export const updateOwnStatisticEntry = async (req, res) => {
	const id = Number(req.params.id)

	const existingStatistic = await getStatisticDb(id)
	const userId = req.params.user

	if (userId !== existingStatistic.userId) {
		return constructMessageResponse(res, 401)
	}

	const { correct, incorrect } = req.query
	const statistic = await updateStatisticDb(id, existingStatistic.correct + correct, existingStatistic.incorrect + incorrect)
	return constructDataResponse(res, 200, { statistic })
}

export const getStatisticsForDateRange = async (req, res) => {
	const { startDate, endDate } = req.params
	const ISOStartDate = new Date(`${startDate}T00:00:00.000Z`)
	const ISOEndDate = new Date(`${endDate}T00:00:00.000Z`)
	console.log(ISOStartDate, ISOEndDate)
	const statistics = await getStatisticsForDateRangeDb(ISOStartDate, ISOEndDate)
	return constructDataResponse(res, 200, { statistics })
}

export const getOwnStatistics = async (req, res) => {
	const userId = req.params.user
	const statistics = await getStatisticsForUserDb(userId)
	return constructDataResponse(res, 200, { statistics })
}

export const getOwnStatisticsForDate = async (req, res) => {
	const { date } = req.params
	const userId = req.params.user
	const ISOdate = new Date(`${date}T00:00:00.000Z`)
	const statistics = await getStatisticsForUserAndDateDb(userId, ISOdate)
	return constructDataResponse(res, 200, { statistics })
}

export const getOwnStatisticsForDateRange = async (req, res) => {
	const { startDate, endDate } = req.params
	const userId = req.params.user
	const ISOStartDate = new Date(`${startDate}T00:00:00.000Z`)
	const ISOEndDate = new Date(`${endDate}T00:00:00.000Z`)
	console.log(ISOStartDate, ISOEndDate)
	const statistics = await getStatisticsForUserInDateRangeDb(userId, ISOStartDate, ISOEndDate)
	return constructDataResponse(res, 200, { statistics })
}

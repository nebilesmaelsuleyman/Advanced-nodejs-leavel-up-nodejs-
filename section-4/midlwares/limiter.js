const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')

const maxAttemptsMyIpUsername = 10
const maxAttemptsPerDay = 100

const emailIpBruteLimiter = new RateLimiterMongo({
	storeClient: mongoose.connection,
	points: maxAttemptsMyIpUsername,
	duration: 60 * 10,
	blockDuration: 60 * 60 * 24,
	dbName: 'blog_app',
})

//for longer time limiting
const slowerBruteLimiter = new RateLimiterMongo({
	storeClient: mongoose.connection,
	points: maxAttemptsPerDay,
	duration: 60 * 60 * 24,
	blockDuration: 60 * 60 * 24,
	dbName: 'blog_app',
})

const authLimiter = async (req, res, next) => {
	const ipAddr = req.connection.remoteAddress
	const emailIPkey = `${req.body.email}_${ipAddr}`
	const [slowerBruteRes, emailIpRes] = await promise.all([
		slowerBruteLimiter.get(ipAddr),
		emailIpBruteLimiter.get(emailIPkey),
	])

	let retrySeconds = 0
	if (slowerBruteRes && slowerBruteRes.consumedPoints >= maxAttemptsPerDay) {
		retrySeconds = Math.floor(slowerBruteRes.msBeforeNext / 1000) || 1
	} else if (
		emailIpRes &&
		emailIpRes.consumedPoints >= maxAttemptsMyIpUsername
	) {
		retrySeconds = Math.floor(emailIpRes.msBeforeNext / 1000) || 1
	}

	if (retrySeconds > 0) {
		res.set('Retry-After', String(retrySeconds))
		return next(new ApiError(429, 'Too many requests'))
	}
	next()
}

module.exports = {
	emailIpBruteLimiter,

	slowerBruteLimiter,

	authLimiter,
}

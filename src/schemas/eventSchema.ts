import joi from 'joi'

export const eventSchema = joi.object({
	title: joi.string().required(),
	posterPath: joi.string()
})

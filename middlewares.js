

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } 
    if(error.name === 'ValidationError') {
        return res.status(400).send({ error })
    }
    next(error)
}

module.exports = {
    errorHandler
}
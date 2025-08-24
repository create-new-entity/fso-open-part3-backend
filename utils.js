
function getRequestBodyMorgan(req) {
    return JSON.stringify(req.body)
}

module.exports = {
    getRequestBodyMorgan
}
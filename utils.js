
function getRequestBodyMorgan(req, res) {
    return JSON.stringify(req.body)
}

module.exports = {
    getRequestBodyMorgan
}
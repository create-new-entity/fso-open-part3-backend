
const MIN_RANGE = 1
const MAX_RANGE = 10000000

function getRandomInteger() {
  min = Math.ceil(MIN_RANGE); 
  max = Math.floor(MAX_RANGE);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRequestBodyMorgan(req, res) {
    return JSON.stringify(req.body)
}

module.exports = {
    getRandomInteger,
    getRequestBodyMorgan
}
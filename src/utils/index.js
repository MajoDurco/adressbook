const errorMessages = require('../constants/errorMessages')

function sendErrorResponse(res, err, defaultError=errorMessages.SERVER_ERROR) {
  console.error(err)
  let error = err
  if(!error.type) error = defaultError
  res.status(error.statusCode)
  return res.send({
    message: error.message,
    status: error.statusCode
  })
}

module.exports = {
  sendErrorResponse,
}

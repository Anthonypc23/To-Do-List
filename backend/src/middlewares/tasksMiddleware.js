
const validateTITLE = (req, res, next) => {

  const { body } = req;

  if (body.title == undefined) {
    return res.status(400).json({ messege: 'That filed "title" is undefuned ' })
  }

  if (body.title == '') {
    return res.status(400).json({ messege: 'That filed "title" is empty ' })
  }

  next()

}

const validateSTATUS = (req, res, next) => {

  const { body } = req;

  if (body.status == undefined) {
    return res.status(400).json({ messege: 'That filed "title" is undefuned ' })
  }

  if (body.status == '') {
    return res.status(400).json({ messege: 'That filed "title" is empty ' })
  }

  next()

}



module.exports = {
  validateTITLE,
  validateSTATUS
}
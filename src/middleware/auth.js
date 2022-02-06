const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisismynewcourse')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // find user with id embedded in token and then check if token is part of tokens of user, still valid

    if (!user) {
      throw new Error() // trigger catch
    }

    req.user = user // allow to send user to handler / permit handler to access user, no need to search again in route handler
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' })
  }
}

module.exports = auth

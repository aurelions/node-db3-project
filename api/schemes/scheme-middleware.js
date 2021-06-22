const { findById } = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const scheme = await findById(req.params.scheme_id)

    if(!scheme) {
      return res.status(404).json({message: `Whoops! Scheme with scheme_id ${req.params.scheme_id}.`})
    }else {
      req.scheme = scheme
      next()
    }
  }catch(e) {
    next(e)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try{
    if(!res.body.scheme_name || req.body.scheme_name === '' || typeof req.body.scheme_name !== 'string') {
      res.status(400).json({message: 'scheme_name does not exist'})
    }else{
      next()
    }
  }catch(e) {
    next(e)
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  try{
    if(!req.body.instructions || req.body.instructions === '' || typeof req.body.instructions !== 'string' || typeof req.body.step_number !== 'number' || req.body.step_number < 1) {
      res.status(400).json({message: 'something went wrong with the step!'})
    }else{
      next()
    }
  }catch(e) {
    next(e)
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}

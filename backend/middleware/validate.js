import { validationResult } from "express-validator";

/**
 * Runs express-validator checks and returns 400 with errors if any fail.
 * Usage: add validate as the last middleware before the controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

export default validate;


const validateRegisterUserSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({
        error: error.errors.map((error) => error.message),
        user: null,
        message: "Request body errors!",
      });
  }
};

const validateUpdateUserSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors.map((error) => error.message),
      user: null,
      message: "Request body errors!",
    });
  }
};


const validateSignInSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.params);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors.map((error) => error.message),
      user: null,
      message: "Request params errors!",
    });
  }
};

const validateCreateProductSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors.map((error) => error.message),
      product: null,
      message: "Request body errors!",
    });
  }
};

const validateUpdateProductSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      error: error.errors.map((error) => error.message),
      product: null,
      message: "Request body errors!",
    });
  }
};

export {validateRegisterUserSchema, validateUpdateUserSchema, validateSignInSchema, validateCreateProductSchema, validateUpdateProductSchema}
import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new UnauthenticatedError('authentication invalid'));
  }

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    next(new UnauthenticatedError('authentication invalid'));
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new UnauthorizedError('unauthorized to access this route'));
    }
    next();
  };
};

import { ValidationError } from '../middlewares/errorHandler.js';

const uuidv7Regex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const validateUuidv7 = (next, uuid, fieldName) => {
  if (!uuidv7Regex.test(uuid)) {
    return next(
      new ValidationError(
        `The provided ${fieldName} does not match the UUIDv7 format`
      )
    );
  }
};

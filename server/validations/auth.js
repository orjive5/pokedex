import { body } from "express-validator";

export const registerValidation = [
  body("email", "Enter valid email").isEmail(),
  body("password", "Password should contain at least 5 characters").isLength({
    min: 5,
  }),
  body("username", "Username should contain at least 5 characters").isLength({
    min: 5,
  }),
];

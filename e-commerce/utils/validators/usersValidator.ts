import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import bcrypt from "bcryptjs";
import categoriesModel from "../../models/categoriesModel";
import usersModel from "../../models/usersModel";

export const createUserValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("user name required")
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (val: string) => {
      const user = await usersModel.findOne({ email: val });
      if (user) {
        throw new Error("Email is already exist");
      }
      return true;
    }),
  check("role")
    .optional()
    .custom((val: string, { req }) => {
      req.body.role = "admin";
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char")
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("password doesn't match");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char"),
  check("phone").optional().isMobilePhone("ar-EG"),
  validatorMiddleware,
];

export const getUserValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];

export const updateUserValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("invalid Egyptian number"),
  check("active")
    .optional()
    .isBoolean()
    .withMessage("active must be true or false"),
  validatorMiddleware,
];

export const changeUserPasswordValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char")
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("password doesn't match");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char"),
  validatorMiddleware,
];

export const updateLoggedUserValidator: RequestHandler[] = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("invalid Egyptian number"),
  validatorMiddleware,
];

export const changeLoggedUserPasswordValidator: RequestHandler[] = [
  check("currentPassword")
    .notEmpty()
    .withMessage("current password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("current password length from 6 to 20 char")
    .custom(async (val: string, { req }) => {
      const user = await usersModel.findById(req.user._id);
      const isValidPassword: boolean = await bcrypt.compare(
        val,
        user!.password
      );
      if (!isValidPassword) {
        throw new Error("current password is incorrect");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char")
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("password doesn't match");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char"),
  validatorMiddleware,
];

export const deleteUserValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];

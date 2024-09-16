import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../models/categoriesModel";
import subcategoriesModel from "../../models/subcategoriesModel";

export const createProductValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("product name required")
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("description")
    .notEmpty()
    .withMessage("product description required")
    .isLength({ min: 2, max: 500 })
    .withMessage("description length must be between 2 & 500"),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("quantity must be number")
    .toInt()
    .custom((val) => {
      if (val < 0) {
        throw new Error("invalid quantity");
      }
      return true;
    }),
  check("price")
    .notEmpty()
    .withMessage("product price required")
    .isNumeric()
    .withMessage("price must be number")
    .toFloat()
    .custom((val: number) => {
      if (val <= 0) {
        throw new Error("invalid price");
      }
      return true;
    }),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("price with discount must be number")
    .toFloat()
    .custom((val: number, { req }) => {
      if (val <= 0 || val > req.body.price) {
        throw new Error("invalid discount price");
      }
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("category required")
    .isMongoId()
    .withMessage("invalid category id")
    .custom(async (val: string) => {
      const category = await categoriesModel.findById(val);
      if (!category) {
        throw new Error("category not found");
      }
      return true;
    }),
  check("subcategory")
    .notEmpty()
    .withMessage("subcategory required")
    .isMongoId()
    .withMessage("invalid subcategory id")
    .custom(async (val: string, { req }) => {
      const subcategory = await subcategoriesModel.findById(val);
      if (!subcategory) {
        throw new Error("subcategory not found");
      }
      if (subcategory.category._id!.toString() !== req.body.category) {
        throw new Error("subcategory not exist in this category");
      }
      return true;
    }),
  validatorMiddleware,
];

export const getProductValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];

export const updateProductValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("description")
    .optional()
    .isLength({ min: 2, max: 500 })
    .withMessage("description length must be between 2 & 500"),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("quantity must be number")
    .toInt()
    .custom((val) => {
      if (val < 0) {
        throw new Error("invalid quantity");
      }
      return true;
    }),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("price must be number")
    .toFloat()
    .custom((val: number) => {
      if (val <= 0) {
        throw new Error("invalid price");
      }
      return true;
    }),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("price with discount must be number")
    .toFloat()
    .custom((val: number, { req }) => {
      if (val < 0) {
        throw new Error("invalid discount price");
      }
      return true;
    }),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("invalid category id")
    .custom(async (val: string) => {
      const category = await categoriesModel.findById(val);
      if (!category) {
        throw new Error("category not found");
      }
      return true;
    }),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("invalid subcategory id")
    .custom(async (val: string, { req }) => {
      const subcategory = await subcategoriesModel.findById(val);
      if (!subcategory) {
        throw new Error("subcategory not found");
      }
      if (subcategory.category._id!.toString() !== req.body.category) {
        throw new Error("subcategory not exist in this category");
      }
      return true;
    }),
  validatorMiddleware,
];

export const deleteProductValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];

import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../models/categoriesModel";
import productsModel from "../../models/productsModel";
import { Products } from "../../interfaces/products";

export const createSubcategoryValidator: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("category name required")
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50")
    .custom(async (val: string) => {
      const category = await categoriesModel.findOne({ name: val });
      if (category) {
        throw new Error("category is already exist");
      }
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("invalid category id")
    .isMongoId()
    .withMessage("invalid mongo id"),
  validatorMiddleware,
];

export const getSubcategoryValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  validatorMiddleware,
];

export const updateSubcategoryValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("invalid mongo id"),
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("category").optional().isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];

export const deleteSubcategoryValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("invalid mongo id")
    .custom(async (val: string) => {
      const products = await productsModel.find({ subcategory: val });
      if (products.length > 0) {
        const bulkOption = products.map((product: Products) => ({
          deleteOne: { filter: { _id: product._id } },
        }));
        await productsModel.bulkWrite(bulkOption);
      }
    }),
  validatorMiddleware,
];

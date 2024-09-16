import subcategoriesModel from "../models/subcategoriesModel";
import { Subcategories } from "../interfaces/subcategories";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./refactorHandling";
import { NextFunction, Request, Response } from "express";

export const filterSubcategories = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let filterData: { category?: any } = {};
  if (req.params.categoryId) {
    filterData.category = req.params.categoryId;
  }
  req.filterData = filterData;
  next();
};

export const getAllSubCategories = getAll<Subcategories>(
  subcategoriesModel,
  "subcategories"
);
export const createSubCategory = createOne<Subcategories>(subcategoriesModel);
export const getSubCategory = getOne<Subcategories>(subcategoriesModel);
export const updateSubCategory = updateOne<Subcategories>(subcategoriesModel);
export const deleteSubCategory = deleteOne<Subcategories>(subcategoriesModel);

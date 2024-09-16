import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  filterSubcategories,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from "../controllers/subcategories";
import {
  createSubcategoryValidator,
  deleteSubcategoryValidator,
  getSubcategoryValidator,
} from "../utils/validators/subcategoriesValidator";
import { updateCategoryValidator } from "../utils/validators/categoriesValidator";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const subcategoriesRoute: Router = Router({ mergeParams: true });

subcategoriesRoute
  .route("/")
  .get(filterSubcategories, getAllSubCategories)
  .post(
    protectRoutes,
    checkActive,
    allowedTo("manager", "admin"),
    createSubcategoryValidator,
    createSubCategory
  );

subcategoriesRoute
  .route("/:id")
  .get(getSubcategoryValidator, getSubCategory)
  .put(
    protectRoutes,
    checkActive,
    allowedTo("manager", "admin"),
    updateCategoryValidator,
    updateSubCategory
  )
  .delete(
    protectRoutes,
    checkActive,
    allowedTo("manager", "admin"),
    deleteSubcategoryValidator,
    deleteSubCategory
  );

export default subcategoriesRoute;

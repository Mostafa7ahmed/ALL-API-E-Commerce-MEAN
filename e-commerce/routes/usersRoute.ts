import { Router } from "express";
import {
  changeLoggedUserPassword,
  changeUserPassword,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  resizeUserImage,
  setUserId,
  updateLoggedUser,
  updateUser,
  uploadUserImage,
} from "../controllers/users";
import {
  changeLoggedUserPasswordValidator,
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateLoggedUserValidator,
  updateUserValidator,
} from "../utils/validators/usersValidator";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const usersRoute: Router = Router();
usersRoute.use(protectRoutes, checkActive);
usersRoute.get("/me", setUserId, getUser);
usersRoute.put("/updateMe", updateLoggedUserValidator, updateLoggedUser);
usersRoute.put(
  "/changeMyPassword",
  changeLoggedUserPasswordValidator,
  changeLoggedUserPassword
);
usersRoute.delete(
  "/deleteMe",
  allowedTo("user"),
  deleteUserValidator,
  setUserId,
  deleteUser
);

usersRoute.use(allowedTo("manager"));
usersRoute
  .route("/")
  .get(getAllUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

usersRoute
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

usersRoute.put(
  "/:id/changePassword",
  changeUserPasswordValidator,
  changeUserPassword
);

export default usersRoute;

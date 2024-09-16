import { FilterData } from "./filterData";
import { Users } from "./users";

declare module "express" {
  interface Request {
    filterData?: FilterData;
    user?: Users;
    files?: any;
  }
}

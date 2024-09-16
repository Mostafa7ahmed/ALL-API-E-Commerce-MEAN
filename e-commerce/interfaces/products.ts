import { Document } from "mongoose";
import { Categories } from "./categories";
import { Subcategories } from "./subcategories";

export interface Products extends Document {
  name: string;
  description: string;
  category: Categories;
  subcategory: Subcategories;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount: number;
  cover: string;
  images: string[];
  ratingAverage: number;
  ratingCount: number;
}

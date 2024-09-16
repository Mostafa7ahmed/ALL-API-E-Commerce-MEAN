import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import usersModel from '../models/usersModel';

export const getUserAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await usersModel.findById(req.user?._id);
    res.status(200).json({ length: user?.address.length, data: user?.address });
  }
);

export const addAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await usersModel.findByIdAndUpdate(
      req.user?._id,
      { $addToSet: { address: req.body.address } },
      { new: true }
    );
    res.status(200).json({ length: user?.address.length, data: user?.address });
  }
);

export const deleteAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await usersModel.findByIdAndUpdate(
      req.user?._id,
      { $pull: { address: { _id: req.params.addressId } } },
      { new: true }
    );
    res.status(204).json();
  }
);

import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Model } from 'mongoose';
import ApiErrors from '../utils/apiErrors';
import Features from '../utils/features';

export const getAll = <modelType>(model: Model<any>, modelName: string) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let filterData: any = {};
    let searchLength: number = 0;
    if (req.filterData) {
      filterData = req.filterData;
    }
    if (req.query) {
      const searchResult: Features = new Features(
        model.find(filterData),
        req.query
      )
        .filter()
        .search(modelName);
      const searchData: modelType[] = await searchResult.mongooseQuery;
      searchLength = searchData.length;
    }
    const documentsCount: number =
      searchLength || (await model.find(filterData).countDocuments());
    const features: Features = new Features(model.find(filterData), req.query)
      .filter()
      .sort()
      .limitFields()
      .search(modelName)
      .pagination(documentsCount);
    const { mongooseQuery, paginationResult } = features;
    const documents: modelType[] = await mongooseQuery;
    res.status(200).json({
      length: documents.length,
      pagination: paginationResult,
      data: documents,
    });
  });

export const getOne = <modelType>(
  model: Model<any>,
  populateOptions?: string
) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let query = model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const document: modelType | null = await query;
    if (!document) {
      return next(new ApiErrors(req.__('not_found'), 404));
    }
    res.status(200).json({ data: document });
  });

export const createOne = <modelType>(model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document: modelType = await model.create(req.body);
    res.status(201).json({ data: document });
  });

export const updateOne = <modelType>(model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiErrors('Document not found', 404));
    }
    document.save();
    res.status(200).json({ data: document });
  });

export const deleteOne = <modelType>(model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document: modelType | null = await model.findOneAndDelete({
      _id: req.params.id,
    });
    if (!document) {
      return next(new ApiErrors('Document not found', 404));
    }
    res.status(204).json();
  });

import { Request, Response } from "express";
import {
  createUniversity,
  getUniversities,
} from "./university.service";

import {
  createUniversitySchema,
} from "./university.validation";

export const createUniversityHandler =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const body =
        createUniversitySchema.parse(
          req.body
        );

      const university =
        await createUniversity(body);

      return res.status(201).json({
        success: true,
        data: university,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getUniversitiesHandler =
  async (
    req: Request,
    res: Response
  ) => {
    const universities =
      await getUniversities();

    return res.json({
      success: true,
      data: universities,
    });
  };
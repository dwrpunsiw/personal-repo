import express, { Request, Response } from "express";
import { green } from "colors";
import { NotFoundError } from "../models/exception/not-found-error";

const router = express.Router();

router.use("*", async (req: Request, res: Response) => {
  console.log(
    green(
      `[AUTH SERVICE][REQUEST RECEIVED][CORRESPONDING ROUTES ${req.baseUrl} IS NOT FOUND]`
    )
  );
  throw new NotFoundError(req.baseUrl);
});

export default router;

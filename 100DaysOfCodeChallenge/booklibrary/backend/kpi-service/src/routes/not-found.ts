import express, { Request, Response } from "express";
import { green } from "colors";
import {
  Completion,
  constructKpiPayload,
  NotFoundError,
} from "@wpw-library/common";

const router = express.Router();

router.use("*", async (req: Request, res: Response) => {
  let serviceName = process.env.SERVICE_NAME as string;

  const { requestId, touchPoint } = req.body;

  console.log(
    green(
      `[KPI SERVICE][REQUEST RECEIVED][CORRESPONDING ROUTES ${req.baseUrl} IS NOT FOUND]`
    )
  );

  let kpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    Completion.Failed,
    `Corresponding routes not found`,
    {
      exceptionName: NotFoundError.prototype.errorName,
      exceptionCode: "01",
      exceptionDescription: "CORRESPONDING ROUTES NOT FOUND",
      exceptionStatus: "Failed",
    }
  );

  throw new NotFoundError(req.baseUrl, serviceName, kpi);
});

export default router;

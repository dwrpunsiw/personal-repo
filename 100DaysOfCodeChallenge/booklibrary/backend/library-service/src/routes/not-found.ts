import express, { Request, Response } from "express";
import { green } from "colors";
import { NotFoundError } from "@wpw-library/common";
import { constructKpiPayload } from "@wpw-library/common";
import { Completion } from "@wpw-library/common";

const router = express.Router();

router.use("*", async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  let serviceName = process.env.SERVICE_NAME as string;

  console.log(
    green(
      `[AUTH SERVICE][REQUEST RECEIVED][CORRESPONDING ROUTES ${req.baseUrl} IS NOT FOUND]`
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

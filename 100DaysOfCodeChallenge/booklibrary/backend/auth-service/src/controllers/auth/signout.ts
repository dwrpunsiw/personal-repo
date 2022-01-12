import { ServiceCallError } from "./../../models/exception/service-call-error";
import { insertKpi } from "./../../service/kpi/kpi-service";
import { Request, Response } from "express";
import { red, green } from "colors";
import { Completion } from "../../models/enums/completion";
import { constructKpiPayload } from "../../helpers/construct-payload";

export const signout = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  console.log(
    green(`[AUTH SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  console.log(green(`[AUTH SERVICE][RESET SESSION][START]`));

  req.session = null;

  console.log(
    green(`[AUTH SERVICE][RESET SESSION][SUCCESSFULLY RESET SESSION]`)
  );

  const newKpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    Completion.Success,
    `Successfully sign out user`
  );

  try {
    console.log(green(`[AUTH SERVICE][INSERT KPI][START]`));
    insertKpi(newKpi);
    console.log(green(`[AUTH SERVICE][INSERT KPI][SUCCESSFULLY INSERT KPI]`));
  } catch (error) {
    if (error instanceof ServiceCallError) {
      console.log(red(`[AUTH SERVICE][INSERT KPI][UNSUCCESSFULLY INSERT KPI]`));
      throw error;
    }
  }

  res.status(205).send({});
};

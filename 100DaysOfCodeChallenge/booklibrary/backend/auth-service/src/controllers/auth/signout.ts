import { Request, Response } from "express";
import { green } from "colors";
import { Completion } from "@wpw-library/common";
import { constructKpiPayload } from "@wpw-library/common";
import { onCompletion } from "@wpw-library/common";

export const signout = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  let kpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    null,
    null,
    null
  );

  console.log(
    green(`[AUTH SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  console.log(green(`[AUTH SERVICE][RESET SESSION][START]`));

  req.session = null;

  console.log(
    green(`[AUTH SERVICE][RESET SESSION][SUCCESSFULLY RESET SESSION]`)
  );

  kpi = {
    ...kpi,
    completion: Completion.Success,
    description: `Successfully sign out user`,
  };

  await onCompletion("AUTH SERVICE", kpi);

  res.status(205).send({});
};

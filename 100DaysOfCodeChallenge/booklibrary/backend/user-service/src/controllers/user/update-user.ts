import { Request, Response } from "express";
import { green, red } from "colors";

export const updateUser = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  console.log(
    green(`[USER SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );
};

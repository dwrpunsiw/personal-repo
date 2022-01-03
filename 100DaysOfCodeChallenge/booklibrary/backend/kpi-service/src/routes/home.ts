import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    title: `${process.env.APP_NAME?.toUpperCase()} Service`,
    description: `This is ${process.env.APP_NAME?.toLowerCase()} service for booklibrary project, created using NodeJs and ExpressJs Framework`,
  });
});

export default router;

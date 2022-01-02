import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    title: "Auth Service",
    description:
      "This is auth service for booklibrary project, created using NodeJs and ExpressJs Framework",
  });
});

export default router;

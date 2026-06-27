import express from "express";
import { createNewsletter } from "../controller/newsletter.controller.js";

const newsletterRouter = express.Router();

newsletterRouter.post("/", createNewsletter);

export default newsletterRouter;
import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);

router.post("/", NotificationController.create);
router.get("/", NotificationController.getAllByUser);
router.put("/:id", NotificationController.update);
router.delete("/:id", NotificationController.delete);

export default router;

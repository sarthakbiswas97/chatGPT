import { Router } from "express";
import { generateChatCompletion, sendChatsToUser, deleteChats } from "../controllers/chat-controllers.js";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";

// Protected api
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get(
  "/all-chats",
  verifyToken,
  sendChatsToUser
);

chatRoutes.delete(
  "/delete",
  verifyToken,
  deleteChats
);

export default chatRoutes;

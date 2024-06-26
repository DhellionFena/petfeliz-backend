const { Router } = require("express");
const { userController } = require("../controller/user.controller");
const { authController } = require("../controller/auth.controller");

const userRouter = Router();

// GET https://api-petfeliz-backend-com.onrender.com/users  => todos users
// GET https://api-petfeliz-backend-com.onrender.com/users/:id  => 1 user
// POST https://api-petfeliz-backend-com.onrender.com/users/  => Cria um user
// PUT https://api-petfeliz-backend-com.onrender.com/users/:id  => atualiza 1 user
// DELETE https://api-petfeliz-backend-com.onrender.com/users/:id  => deleta 1 user

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id/pets", userController.getAllUserPets);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

userRouter.post("/login", authController.login);

module.exports = {
    userRouter
}
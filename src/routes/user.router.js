const { Router } = require("express");
const { userController } = require("../controller/user.controller");

const userRouter = Router();

// GET http://api.userfeliz-backend.com/user/  => todos usuarios
// GET http://api.userfeliz-backend.com/user/:id  => 1 usuario
// POST http://api.userfeliz-backend.com/user/  => Cria um usuario
// PUT http://api.userfeliz-backend.com/user/:id  => atualiza 1 usuario
// DELETE http://api.userfeliz-backend.com/user/:id  => deleta 1 usuario

userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

module.exports = {
    userRouter
}
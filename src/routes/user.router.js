const { Router } = require("express");
const { userCotroller } = require("../controller/user.controller");

const userRouter = Router();

userRouter.use(
    "/user",
    userRouter.get("/all", userCotroller.getUser),
    userRouter.post("/", userCotroller.createUser)
);

module.exports = {
    userRouter
}
const { Router } = require("express");
const { petController, petsController } = require("../controller/pet.controller");

const petRouter = Router();

// GET https://api-petfeliz-backend-com.onrender.com/pets  => todos pets
// GET https://api-petfeliz-backend-com.onrender.com/pets/:id  => 1 pet
// POST https://api-petfeliz-backend-com.onrender.com/pets/  => Cria um pet
// PUT https://api-petfeliz-backend-com.onrender.com/pets/:id  => atualiza 1 pet
// DELETE https://api-petfeliz-backend-com.onrender.com/pets/:id  => deleta 1 pet

petRouter.get("/", petsController.getAllPets);
petRouter.get("/all", petsController.getAllPetsWithUsers);
petRouter.post("/", petController.createPet);
petRouter.get("/:id", petController.getPet);
petRouter.put("/:id", petController.updatePet);
petRouter.delete("/:id", petController.deletePet);


module.exports = {
    petRouter
}
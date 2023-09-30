const { Router } = require("express");
const { petController, petsController } = require("../controller/pet.controller");

const petRouter = Router();

// GET http://api.petfeliz-backend.com/pets/  => todos pets
// GET http://api.petfeliz-backend.com/pets/:id  => 1 pet
// POST http://api.petfeliz-backend.com/pets/  => Cria um pet
// PUT http://api.petfeliz-backend.com/pets/:id  => atualiza 1 pet
// DELETE http://api.petfeliz-backend.com/pets/:id  => deleta 1 pet
petRouter.get("/", petsController.getAllPets);
petRouter.post("/", petController.createPet);
petRouter.get("/:id", petController.getPet);
petRouter.put("/:id", petController.updatePet);
petRouter.delete("/:id", petController.deletePet);


module.exports = {
    petRouter
}
const {db} = require("../firebase");

class PetsController {
    async getAllPets(req, res) {
        try {
            const pets = await db.collection('pets').get();
            const petsList = [];
            pets.forEach((doc) => {
                const petData = doc.data();
                const petItem = {
                    id: doc.id,
                    ...petData
                };
                petsList.push(petItem);
            });
            
            //console.log(petsList);
            return res.json(petsList);
        } catch (error) {
            console.error('Erro ao buscar os pets:', error);
            return res.status(500).json({ error: 'Erro ao buscar os pets' });
        }
    }
    async getAllPetsWithUsers(req, res) {
        try {
            const pets = await db.collection('pets').get();
            const users = await db.collection('usuarios').get();
            const usersList = [];
            users.forEach((doc) => {
                const userData = doc.data();
                usersList.push({id: doc.id, ...userData});
            });
            const petsList = [];
            pets.forEach((doc) => {
                const petData = doc.data();
                const dono = usersList.filter(user => user.id == petData.id_dono);
                const petItem = {
                    id: doc.id,
                    ...petData,
                    dados_dono: dono[0],
                };
                petsList.push(petItem);
            });
            
            //console.log(petsList);
            return res.json(petsList);
        } catch (error) {
            console.error('Erro ao buscar os pets:', error);
            return res.status(500).json({ error: 'Erro ao buscar os pets' });
        }
    }
}

class PetCotroller {

    async getPet(req, res) {
        try {
            const petId = req.params.id; // Captura o ID do pet da requisição
            const petDoc = await db.collection('pets').doc(petId).get();

            if (!petDoc.exists) {
                return res.status(404).json({ error: 'Pet não encontrado' });
            }

            const petData = petDoc.data();
            return res.json({ id: petId, ...petData });
        } catch (error) {
            console.error('Erro ao buscar o pet:', error);
            return res.status(500).json({ error: 'Erro ao buscar o pet' });
        }
    }

    async createPet(req, res) {
        const { 
            descricao,
            id_dono,    
            idade,
            link_imagem,
            nome,
            raca,
            status_adocao
        } = req.body;
        
        try {
             const novoPetRef = await db.collection('pets').add({
                 descricao,
                id_dono,    
                idade,
                link_imagem,
                nome,
                raca,
                status_adocao
            });
            
            // pegando o ID do novo pet
            const novoPetId = novoPetRef.id;
            
            return res.status(201).json({ id: novoPetId, ...req.body });
        } catch (error) {
            
            console.error('Erro ao criar o pet:', error);
            return res.status(500).json({ error: 'Erro ao criar o pet' });
        }
        
    }

    async updatePet(req, res) {
        try {
            const petId = req.params.id;
            const petData = req.body;

            await db.collection('pets').doc(petId).update(petData);

            return res.json({ id: petId, ...petData });
        } catch (error) {
            console.error('Erro ao atualizar o pet:', error);
            return res.status(500).json({ error: 'Erro ao atualizar o pet' });
        }
    }

    async deletePet(req, res) {
        try {
            const petId = req.params.id;
            
            await db.collection('pets').doc(petId).delete();
            
            return res.json({ message: 'Pet excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir o pet:', error);
            return res.status(500).json({ error: 'Erro ao excluir o pet' });
        }
    }
}

const petController = new PetCotroller();
const petsController = new PetsController();

module.exports = {
    petController,
    petsController,
};
const db = require("../firebase");

class UserCotroller {

    async getUser(req, res) {
        try {
            const userId = req.params.id; // Captura o ID do user da requisição
            const userDoc = await db.collection('usuarios').doc(userId).get();

            if (!userDoc.exists) {
                return res.status(404).json({ error: 'User não encontrado' });
            }

            const userData = userDoc.data();
            return res.json({
                id: userId, 
                cpf: userData.cpf,
                data_nasc: userData.data_nasc,    
                email: userData.email,
                nome: userData.nome,
                telefone: userData.telefone,
                id_endereco: userData.id_endereco
            });
        } catch (error) {
            console.error('Erro ao buscar o user:', error);
            return res.status(500).json({ error: 'Erro ao buscar o user' });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await db.collection('usuarios').get();
            const usersList = [];
            users.forEach((doc) => {
                const userData = doc.data();
                const userItem = {
                    id: doc.id,
                    cpf: userData.cpf,
                    data_nasc: userData.data_nasc,    
                    email: userData.email,
                    nome: userData.nome,
                    telefone: userData.telefone,
                    id_endereco: userData.id_endereco
                };
                usersList.push(userItem);
            });
            
            //console.log(usersList);
            return res.json(usersList);
        } catch (error) {
            console.error('Erro ao buscar os users:', error);
            return res.status(500).json({ error: 'Erro ao buscar os users' });
        }
    }

    async createUser(req, res) {
        const { 
            cpf,
            data_nasc,    
            email,
            nome,
            senha,
            telefone,
            //endereco
        } = req.body;

        //id_endereco

        try {
             const novouserRef = await db.collection('usuarios').add({
                cpf,
                data_nasc,    
                email,
                nome,
                senha,
                telefone,
                //id_endereco
            });
            
            // pegando o ID do novo user
            const novouserId = novouserRef.id;
            
            return res.json({ id: novouserId, ...req.body });
        } catch (error) {
            
            console.error('Erro ao criar o user:', error);
            return res.status(500).json({ error: 'Erro ao criar o user' });
        }
        
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;

            await db.collection('usuarios').doc(userId).update(userData);

            return res.json({ id: userId, ...userData });
        } catch (error) {
            console.error('Erro ao atualizar o user:', error);
            return res.status(500).json({ error: 'Erro ao atualizar o user' });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            
            await db.collection('usuarios').doc(userId).delete();
            
            return res.json({ message: 'user excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir o user:', error);
            return res.status(500).json({ error: 'Erro ao excluir o user' });
        }
    }
}

const userController = new UserCotroller();

module.exports = {
    userController
};
let users = []

class UserCotroller {

    getUser(req, res) {
        return res.json(users);
    }

    createUser(req, res) {
        const { name } = req.body;

        const novoUser = {
            id: `${users.length + 1}`,
            name,
        };

        users.push(novoUser);
        return res.json(novoUser);
    }

    deleteUser(req, res) {
        const { id } = res.body;

        //TODO: esperar usar o banco
    }
}

const userCotroller = new UserCotroller();

module.exports = {
    userCotroller
};
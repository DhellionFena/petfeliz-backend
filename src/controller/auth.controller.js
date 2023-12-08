const {db} = require("../firebase");
const {authService} = require("../auth/AuthService");
class AuthCotroller {

    async login(req, res) {
        try {
            const resp = await authService.auth(req.body);
            return res.json(resp)
        } catch (error) {
            console.error('Erro ao buscar o user:', error);
            return res.status(500).json({ error: 'Erro ao buscar o user' });
        }
    }
}

const authController = new AuthCotroller();

module.exports = {
    authController
};
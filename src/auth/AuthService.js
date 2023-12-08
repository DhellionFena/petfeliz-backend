const {db} = require("../firebase");
const jwt = require("jsonwebtoken");
const auth = require("../config");
const bcrypt = require("bcrypt");

class AuthService {

  async auth(data) {
    const { email, senha } = data;

    try {
      // Buscando usuário
      const users = await db.collection('usuarios').get();
      var user = null;
      users.forEach((doc) => {
        const userData = doc.data();
        console.log(userData.email, email);
        if(userData.email == email) {
            if(bcrypt.compareSync(senha, userData.senha)){
                user = {
                    id: doc.id,
                    ...userData
                }
            }
            else {
                return { error: 'Email ou Senha Incorretos', status: 404 };
            }
        }
      });

      // Validando existência
      if (!user) {
        return { error: 'Usuário não encontrado', status: 404 };
      }

      // Gerando token
      const token = await jwt.sign(
        {
          id: user.id,
          email: user.email,
          nome: user.nome,
        },
        auth.secret,
        {
          expiresIn: auth.expires,
        }
      );

      return {
        token,
      };

    } catch (e) {
        console.log(e);
      return { error: 'Erro ao validar Login', status: 404 };
    }
  }
}

const authService = new AuthService();

module.exports = {
    authService
};

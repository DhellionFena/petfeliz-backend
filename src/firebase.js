const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccountKey.json"); // Caminho para o arquivo de chave privada do Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //databaseURL: 'https://seu-app.firebaseio.com' // URL do seu projeto Firebase
});

const db = admin.firestore();

module.exports = {db, admin};

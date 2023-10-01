const express = require('express');
const { userRouter } = require('./routes/user.router');
const { petRouter } = require('./routes/pet.router');
const cors = require('cors');

const main = () => {
    const app = express();
    const PORT = 8080;

    app.use(express.json());

    const corsOptions = {
        origin: '*',
      };

    app.use(cors(corsOptions));

    app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
    });

    app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
    });

    app.use('/pets', petRouter);
    app.use('/users', userRouter);
    
    app.listen(PORT, () => {
        //console.log("Servidor rodando em http://localhost:8080");
        console.log("Servidor rodando!");
    })
}

main();

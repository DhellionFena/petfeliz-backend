const express = require('express');
const { userRouter } = require('./routes/user.router');
const { petRouter } = require('./routes/pet.router');
const cors = require('cors');

const main = () => {
    const app = express();
    const PORT = 8080;

    app.use(express.json());
    app.use(cors());

    app.use('/pets', petRouter);
    app.use('/users', userRouter);
    
    app.listen(PORT, () => {
        //console.log("Servidor rodando em http://localhost:8080");
        console.log("Servidor rodando!");
    })
}

main();
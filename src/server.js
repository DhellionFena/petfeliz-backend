const express = require('express');
const { userRouter } = require('./routes/user.router');
const { petRouter } = require('./routes/pet.router');
const cors = require('cors');
require('dotenv').config();

const main = () => {
    const app = express();
    const PORT = process.env.PORT;
    console.log(PORT);

    app.use(express.json());

    const corsOptions = {
        origin: '*',
        credentials: true,
      };

    app.use(cors(corsOptions));

    app.use('/pets', petRouter);
    app.use('/users', userRouter);
    
    app.listen(PORT, () => {
        //console.log("Servidor rodando em http://localhost:8080");
        console.log("Servidor rodando!");
    })
}

main();
import express  from 'express';
import { fork } from "child_process";

const router = express.Router();
let computo = fork(`./src/utils/calculo.util.js`);

router.get("/", (req, res) => {
    const {cant=100000000} = req.query;
    computo.on("message", (rsdo) => {
        console.log(rsdo)
        res.status(200).send({ rsdo });
        computo.kill();
        computo = fork(`./src/utils/calculo.util.js`);
    });
    computo.send(cant);
});

export default router
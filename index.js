const express = require('express'); //Import express
const conectarDB = require('./config/db');//Require db connection
const cors = require('cors');

//Creo el server
const app = express();

conectarDB();

//Habilitar express.json
app.use(express.json({extended: true}));

app.use(cors());

const port = process.env.PORT || 4000;


app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/tipos',require('./routes/tipos'));
app.use('/api/movimientos',require('./routes/movimientos'));
app.use('/api/creditos',require('./routes/creditos'));

//start server
app.listen(port,'0.0.0.0', () => {
    console.log(`SV Running on ${port}`)
})
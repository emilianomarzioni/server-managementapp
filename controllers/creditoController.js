
const Credito = require('../models/Credito');

/* exports.crearTipo = async ( req,res) => {
    
    const { } = req.body;

    try{
        let tipo = await Tipo.findOne({titulo,usuario:req.usuario.id});
    if(tipo){
        return res.status(400).json({msg: ' el tipo ya existe'});
    }
        tipo = new Tipo(req.body);
        tipo.usuario = req.usuario.id;
        
        tipo.save();
        res.json(tipo);
    }catch (error){
        console.log(error);
        res.status(500).send("Hubo un error en la creación del Tipo");
    }
} */

exports.obtenerCreditos = async (req,res) =>{
    try{
        const creditos = await Credito.find();
        res.json({creditos});
    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");
    }

}
exports.actualizarCredito = async ( req,res) => {
    
    
    //Extract info from mov
    const { TNA,CFTEA,TEM,CFTNA,mutualID} = req.body
    const newCredit = {};

    if(TNA && CFTEA && TEM && CFTNA ){
        newCredit.TNA = TNA;
        newCredit.TEM = TEM;
        newCredit.CFTEA = CFTEA;
        newCredit.CFTNA = CFTNA;
        
    }
    console.log(newCredit)
    try{
            //check the ID
            let credito = await Credito.findOne({mutualID});

            if(!credito){
                return res.status(404).send("Credito no encontrado")
            }
            //If mov exist
           
            //If is creator true
            credito = await Credito.findOneAndUpdate({mutualID},{$set:newCredit},{new:true});

            res.json({credito});
    }catch(error){
        console.log(error);
        res.status(500).send("Hubo un error");
    }
}


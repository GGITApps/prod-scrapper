const express = require('express');
const fs = require('fs');
var scrapper = require('./scrapper.js')

const app = express();
const port = process.env.PORT || 8080;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  const dateStart=new Date();
//-----------------------
const timer = {};

var timerNames = JSON.parse(fs.readFileSync('json/cursos.json', 'utf8'));
timerNames.forEach(element=>{
    timer[Object.values(element)[0]]= dateStart;
})
console.log(timer);
//-----------------------




app.get('/', function(req, res) {
    var prefix =req.query.prefix;
    var nrc =req.query.nrc;
    var dateNow= new Date();

    if((dateNow.getMinutes() - timer[prefix].getMinutes())>=5){
        timer[prefix]= dateNow;
        scrapper.scrappearValores(prefix);
        console.log("scrapeando");
        setTimeout(function(){
            respuesta = asignarAJson(prefix,nrc);
            console.log(respuesta);
        if(respuesta==""){
            console.log("entro al -----")
            res.send("prefijo incorrecto");
        }else{
            console.log("entro al +++++")
            res.json(respuesta);
            console.log(JSON.stringify(respuesta))
        }
        },10*1000)
    }else{
        respuesta = asignarAJson(prefix,nrc);
        console.log(respuesta);
        if(respuesta==""){
            console.log("entro al ******")
            let error= "prefijo incorrecto";
            res.json(error);
        }else{
            console.log("entro al //////")
            res.json(respuesta);
            console.log(JSON.stringify(respuesta))
        }   
    
    
    
    }

    
    
});
function asignarAJson(prefix,nrc){
    try{
        
        var obj = JSON.parse(fs.readFileSync('json/'+prefix+'.json', 'utf8'));
        
        var nome=[];
        obj.forEach(element => {
            nome.push(Object.values(element));
            
        });
        console.log(nome)
        var retorno= [];
        nome.forEach(element=>{
            console.log("entró")
            if(nrc == element[0]){
                retorno.push(element[0])
                retorno.push(element[1].capacidad)
                retorno.push(element[2].disponible)
            }
        });
        console.log(retorno.length);
        return retorno;

    }catch(e){
        return "";
    }
}













app.listen(port, function() {
    console.log('App listening on port ' + port)
})

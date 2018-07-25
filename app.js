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


//-----------------------
const timer = {};
var timerNames = JSON.parse(fs.readFileSync('json/cursos.json', 'utf8'));
timerNames.forEach(element=>{
    timer[Object.values(element)[0]]= new Date();
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
            res.send("Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente");
        }else{
            console.log("entro al +++++")
            res.json(["Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente","Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente","Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente"]);
            console.log(JSON.stringify(respuesta))
        }
        },10*1000)
    }else{
        respuesta = asignarAJson(prefix,nrc);
        console.log(respuesta);
        if(respuesta==""){
            console.log("entro al ******")
            let error= "Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente";
            res.send(error);
        }else{
            console.log("entro al //////")
            res.json(["Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente","Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente","Lo sentimos debido a un cambio en la plataforma de registro los cupos ya no se despliegan correctamente"]);
            console.log(JSON.stringify(respuesta))
        }   
    
    
    
    }

    
    
});
function asignarAJson(prefix,nrc){
    try{
        console.log(nrc)
        var obj = JSON.parse(fs.readFileSync('json/'+prefix+'.json', 'utf8'));
        console.log(obj)
        var nome=[];
        obj.forEach(element => {
            console.log
            nome.push(Object.values(element));
            
        });
        console.log(nome)
        var retorno= [];
        nome.forEach(element=>{
            console.log(element[0]+"---"+nrc)
            console.log(element[0]==nrc)
            if(nrc == element[0]){
                console.log("entró")
                retorno.push(element[0])
                retorno.push(element[1].capacidad)
                retorno.push(element[1].disponible)
                console.log(retorno.length);
            }
        });
        console.log(retorno.length);
        return retorno;

    }catch(e){
        console.log("me totee"+e)
        return "";
    }
}













app.listen(port, function() {
    console.log('App listening on port ' + port)
})

const express = require('express');
const fs = require('fs');
var scrapper = require('./scrapper.js')

const app = express();
const port = process.env.PORT || 8080;



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
            res.send("prefijo incorrecto");
        }else{
            
            res.json(JSON.stringify(respuesta));
            console.log(JSON.stringify(respuesta))
        }
        },10*1000)
    }else{
        respuesta = asignarAJson(prefix,nrc);
        console.log(respuesta);
        if(respuesta==""){
            let error= "prefijo incorrecto";
            res.json(JSON.stringify(error));
        }else{
        
            res.json(JSON.stringify(respuesta));
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
        
        var retorno= [];
        nome.forEach(element=>{
            

            if(nrc== element[0]){
                
                retorno= [{nrc:element[0]},{capacidad:element[1].capacidad},{disponible:element[1].disponible}];
            }
        });
        
        return retorno;

    }catch(e){
        return "";
    }
}













app.listen(port, function() {
    console.log('App listening on port ' + port)
})

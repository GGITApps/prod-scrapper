const express = require('express');
const fs = require('fs');
var scrapper = require('./scrapper.js')

const app = express();
const port = process.env.PORT || 8080;




app.get('/', function(req, res) {
    var prefix =req.query.prefix;
    var nrc =req.query.nrc;
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

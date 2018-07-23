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
        res.send("nrc:"+respuesta[0]+"Total:"+respuesta[1]+"Libres:"[2])
    }
    },20*1000)
    
    
});
function asignarAJson(prefix,nrc){
    try{
        var obj = JSON.parse(fs.readFileSync('json/'+prefix+'.json', 'utf8'));
        console.log("encontro el archivo");
        var nome=[];
        obj.forEach(element => {
            nome=Object.values(element);
        });
        console.log("todo salio bien");
        var retorno= [];
        nome.forEach(element=>{
            if(nrc== element[0]){
                retorno= [element[0],element[1],element[2]];
            }
        });
        console.log("Retorno :3");
        return retorno;

    }catch(e){
        return "";
    }
}













app.listen(port, function() {
    console.log('App listening on port ' + port)
})

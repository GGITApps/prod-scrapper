const express = require('express');
const fs = require('fs');
var scrapper = require('./scrapper.js')
var fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;




app.get('/', function(req, res) {
    var prefix =req.query.prefix;
    var nrc =req.query.nrc;
    respuesta = asignarAJson(prefix,nrc);
    if(respuesta==""){
        res.send("prefijo incorrecto");
    }else{
        res.send("nrc:"+respuesta[0]+"Total:"+respuesta[1]+"Libres:"[2])
    }
    
});
function asignarAJson(prefix,nrc){
    try{
        var obj = JSON.parse(fs.readFileSync('json/'+prefix+'.json', 'utf8'));
        var nome=[];
        obj.forEach(element => {
            nome=Object.values(element);
        });
        var retorno= [];
        nome.forEach(element=>{
            if(nrc== element[0]){
                retorno= [element[0],element[1],element[2]];
            }
        });
        return retorno;

    }catch(e){
        return "";
    }
}






// var objeto = JSON.parse(fs.readdirSync())
var obj = JSON.parse(fs.readFileSync('json/cursos.json', 'utf8'));
var names = [];
obj.forEach(element => {
    names.push(Object.values(element)[0])

});




setInterval(function(){scrapGeneral()}, 5*60*1000)

const timeout = milliseconds =>
    new Promise((resolve, _) => setTimeout(resolve, milliseconds));


async function scrapGeneral () {
    for(var i = 0; i<names.length; i+=4){
    scrapper.scrappearValores(names[i]);
    scrapper.scrappearValores(names[i+1]);
    scrapper.scrappearValores(names[i+2]);
    scrapper.scrappearValores(names[i+3]);
    if(i== 40){
        await timeout(3000);
        scrapper.scrappearValores(names[i+4]);
    }    
    await timeout(10000);
    }

}





app.listen(port, function() {
    console.log('App listening on port ' + port)
})

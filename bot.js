var scrapper = require('./scrapper.js')
var fs = require('fs');


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









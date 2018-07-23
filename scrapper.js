const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async (suburl) => {
         const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
         // const browser = await puppeteer.launch();
         const page = await browser.newPage();

         await page.goto('https://registroapps.uniandes.edu.co/oferta_cursos/index.php/courses?prefix='+suburl+"&term=201820&ptrm=1", {waitUntil: 'networkidle0'});
         const result = await page.evaluate(() => {

             
             const valoresCupos = document.querySelectorAll('.collapsible-body.grey.lighten-3 div.row div.col.s4.m4');
             const spanList = document.querySelectorAll('div.col.s12.m12.l12 > .row > div > span:nth-child(6)');
             const spanS =[];
             
             for (let span of spanList){
               let spancito = span.innerHTML.trim();
               spanS.push(spancito);
               
             }              
             let something = [];
             for (let element of valoresCupos){
             let elemento= element.innerHTML.trim();
             something.push(elemento);
               
             }
             return [something,spanS];  
         });
         browser.close();
         return result;
};


module.exports = {
 scrappearValores:function(carrera){
   scrape(carrera).then((value) => {
                         
     let nrcs= value[1];
     
     const data = [];
     for(i =0; i<value[0].length; i+=3){
       let temparray = value[0].slice(i,i+3);
       let capacidad = temparray[0].split(" ")[1];
       let disponible = temparray[2].split(" ")[1];
   
       data.push({capacidad, disponible});
     }

     var resultado=[];
     for(i=0; i<data.length; i++){
       let nrc = nrcs[i].split(" ")[1];
       let dataS = data[i]
       resultado.push({CRN:nrc,datos:dataS});
     }
     
     const content = JSON.stringify(resultado);
   
     fs.writeFile("./json/"+carrera+".json", content, 'utf8', function (err) {
         if (err) {
           return console.log(err);
       }
   
     
     }); 
   });
   
 }
 
}

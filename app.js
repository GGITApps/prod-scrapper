const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;




app.get('/', function(req, res) {
    var prefix =req.query.prefix;
    var nrc =req.query.nrc;
    res.send("Hola prefix:"+prefix+"nrc:"+nrc);
});
function asignarAJson(prefix,nrc){
    
}




app.listen(port, function() {
    console.log('App listening on port ' + port)
})

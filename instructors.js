const fs = require('fs')
const data = require('./data.json')

exports.post = (req, res) =>{
    //req.body
    //cria um array com as chaves no objeto
    const keys = Object.keys(req.body)

    for(let key of keys){
        //req.body.key == ""
       if(req.body[key] == "" )
           return res.send('Please, fill all filds')
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()

    data.instructors.push(req.body) 

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
       if(err)
       return res.redirect("/instructors")
    })
}
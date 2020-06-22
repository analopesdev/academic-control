//create
exports.post = (req, res) =>{
    //req.body
    //cria um array com as chaves no objeto
    const keys = Object.keys(req.body)

    for(let key of keys){
        //req.body.key == ""
       if(req.body[key] == "" )
           return res.send('Please, fill all filds')
    }
    return res.send(req.body)
}
//update
//delete
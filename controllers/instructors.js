const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../utils')

exports.index = (req, res) => {
    return res.render('instructors/index', {instructors: data.instructors})
}

exports.create =(req, res) =>{
    return res.render('instructors/create')
}

exports.post = (req, res) =>{

    //cria um array com os campos "chaves"  o req.body formulario
    // keys = ["avatar_url", "name", "gender"...]
    //req.body = {"avatar_url": "http...", "name": "ana" ...}
    const keys = Object.keys(req.body)
    for(let key of keys){

        //verificando para cada uma das chaves do req.body, se alguma está vazia
        if(req.body[key] == ""){
            return res.send("Please, fill all felds")
        }
    }
    
    //desistruturar req.body
    let {avatar_url, birth, name, services, gender} = req.body
    
    const id = Number(data.instructors.length + 1)

    //transforma dia
    const created_at = Date.now()

    //transformar aniversario
    birth = Date.parse(birth)
    
    //colocando req.body no array de data.instructors cada vez que eu adicionar novos valores de formulário
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth, 
        created_at,
        gender,
        services,
    })

    //trasformando os dados do req.body em JSON e colocando em data.json
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")
        return res.redirect("/instructors")
    })

    //return res.send(req.body)
}

exports.show = (req, res) =>{
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id
    })

    if(!foundInstructor){
        return res.send('Instructor not found')
    }

    const instructor ={
        ...foundInstructor,
        age: age(foundInstructor.birth),

        // transformar objeto em array
        services: foundInstructor.services.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }
    return res.render("instructors/show", {instructor})
}

exports.edit = (req, res) =>{
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if(!foundInstructor){
        return res.send('Instructor not found')
    }
    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', {instructor})
}

exports.put = (req, res) =>{
    const { id } = req.body
    let index = 0
    //procurando se instructor está cadastrado
    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if(id == instructor.id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor){
        return res.send('Instructor not found')
    }
    const instructor ={
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.instructors[index] = instructor
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err)return res.send("write error")
        return res.redirect(`/instructors/${id}`)
    })
}

exports.delete = (req, res) =>{
    const {id} = req.body
    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })
    data.instructors = filteredInstructors
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("write file error")
        return res.redirect("/instructors")
    })
}
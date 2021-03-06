const Member = require('../models/Member')
const { age, date } = require ('../../lib/utils')

module.exports = {

    index(req,res){

       Member.all(function(members){
         return res.render("members/index", { members})
       }) 
    },
    create(req,res){
        Member.instructorsSelectOptions(function(options){
            return res.render('members/create', {instructorOptions: options})
        })

    },

    post(req,res){
    
        const keys = Object.keys(req.body)
    
        for(key of keys) {
    
            if(req.body[key] == ""){
                return res.send('Please,fill all fildes')
            }
        }
       Member.create(req.body,function(member){
            return res.redirect(`/members/${member.id}`)
       })
    },
    show(req,res){
        Member.find(req.params.id, function(member){
            if(!member) return res.send("Member not found")

            member.birth = date(member.birth).birthDay
            
            return res.render('members/show', {member})
        })

    },   
    edit(req,res){
        Member.find(req.params.id, function(member){
            if(!member) return res.send("Member not found")

            member.birth = date(member.created_at).iso

            Member.instructorsSelectOptions(function(options){
                return res.render('members/edit', {member, instructorOptions})

            })
        })
    },
    put(req,res){
        
    const keys = Object.keys(req.body)

    for(key of keys) {

        //req.body.key == "" isso faz q se verifique se em algum dos campos estiver vazio ele envie a msgs
        if(req.body[key] == ""){
            return res.send('Please,fill all fildes')
        }
    }
        Member.update(req.body,function(){
            return res.redirect(`/members/${req.body.id}`)
        })
    },
    delete(req, res){
        Member.delete(req.body.id,function(){
            return res.redirect(`/members`)
        })
    },
}
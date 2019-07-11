const Profile = require('../model/model');

//Create new profil
exports.create = (req, res) => {
    Profile.find()
    .then(user => {
        //autoincrement
        let idautom;
        if(user.length == 0){
            idautom = 0
        }else {
            idautom = parseInt(user[user.length - 1]._id) + 1
        }

        //console.log('image file '+req.body.filename)
    const profil = new Profile({   
             
        _id: idautom,
        nom: req.body.nom , 
        prenom: req.body.prenom
    });

    // Save p in the database
    profil.save()
    .then(() => {
        Profile.find()
        .then(data=>{
            res.send(data);
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the profil."
            
        });
    });
})
};

exports.findAll = (req, res) => {   
    Profile.find()
    .then(users => {    
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving profils."
        });
    });
};


// Update a Person identified by the PersonId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.prenom) {
        return res.status(400).send({
            message: "Person content can not be empty"
        });
    }

    // Find Person and update it with the request body
    Profile.findByIdAndUpdate(req.params._Id, {
        nom: req.body.nom || "Unamed Personne",
        prenom: req.body.prenom
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Person not found with id " + req.params._Id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Person not found with id " + req.params._Id
            });                
        }
        return res.status(500).send({
            message: "Error updating person with id " + req.params._Id
        });
    });
};

// Delete a Person with the specified PersonId in the request
exports.delete = (req, res) => {
    Profile.findByIdAndRemove(req.params._Id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Person not found with id " + req.params._Id
            });
        }
        res.send({message: "Person deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Person not found with id " + req.params._Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Person with id " + req.params._Id
        });
    });
};
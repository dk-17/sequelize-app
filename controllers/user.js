const User = require('../models').User

module.exports = {

      //crate account
      signUp: (req, res) => {
        let { firstName, lastName, email } = req.body
        User.create({
          firstName,
          lastName,
          email
        }).then((user) => {
          return res.status(201).json({
            "message": "User created successfully",
            user
          })}).catch(err => {
            return res.status(400).json({err});
          })

      },
      // haven't understood the purpose of this udpatesignUp ther for if user found then why to update data of user?
      updateSignUp: ( req, res ) => {
        let { firstName, lastName, email } = req.body;
        let id = req.params.id;

        User.findOne({
          where: {id: id}
        }).then( user => {
              if( user ){
                user.update( { firstName, lastName, email })
                .then( ( updateUser ) => {
                  return res.status(202).json({
                    "message": "User updated successfully",
                    updateUser
                  })
                }).catch( err => {
                  return res.status(400).json({ err });
                })
              }
              else {
                return res.status(206).json( {
                  "message": "User not found"
                })
              }
        }).catch( err => {
          return res.status(400).json({ err });
        } )
      },

      // get all users

      getAllUsers: ( req, res ) => {

        User.findAll( {
          attributes: ['id', 'firstName','lastName', 'email'],
          limits: 5,
          order: [['id','DESC']]
        }).then( users => {
          return res.status( 200 ).json ({
            users
          })
        }).catch( err => {
          return res.status( 400 ).json( { err })
        })
      },

      // get single user by id

      getSingleUser: ( req, res ) => {
        let id = req.params.id

        User.findByPk(id)
        .then((user) => {
          return res.status( 200 ).json ( { user })
        }).catch( err => {
          return res.status( 400 ).json({ err });
        })
      },


      // deletel user by id

      deleteSingleUser: ( req, res ) => {
        let id = req.params.id

        User.destroy({
          where: { id: id}
        }).then( () => {
          return res.status( 200 ).json({
            "message": "User deleted successfully"
          })
        }).catch( err => {
          return res.status( 400 ).json( { err });
        })
      },

      // delete all users
      deleteAllUsers: ( req, res ) => {
         User.destroy({
           truncate: true
          }).then( () => {
            return res.status( 200 ).json( {
              success: true,
              "message": "All Uers deleted"
            })
          }).catch( err => {
            return res.status( 400 ).json( {
              err
            })
          })
      }
}

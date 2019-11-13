const express = require('express')
const router  = express.Router()


const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/User.model')


/*--------------------------- SIGN UP----------------------------- */

router.post('/signup', (req, res, next) => {
  const {username, password} = req.body

  if (!username || !password) {
    res.status(400).json({ message: 'Por favor, introduce un nombre de usuario y una contraseña.' })
    return
  }

  if (password.length < 8) {
      res.status(400).json({ message: 'Debes introducir una contraseña de al menos 8 caracteres.' });
      return
  }

  User.findOne({ username }, (err, foundUser) => {

    if (err) {
        res.status(500).json({ message: "Algo salió mal en la comprobación del usuario, inténtalo de nuevo." })
        return
    }

    if (foundUser) {
        res.status(400).json({ message: 'Ya existe un usuario registrado con este nombre.' })
        return
    }

    const salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(password, salt)

    const aNewUser = new User({
        username: username,
        password: hashPass
    })

    aNewUser.save(err => {
        if (err) {
            res.status(400).json({ message: 'Algo no ha ido bien al guardar tus datos, por favor inténtalo de nuevo.' })
            return
        }

        req.login(aNewUser, (err) => {

            if (err) {
                res.status(500).json({ message: 'Algo no ha ido bien en el proceso de acceso tras el registro.' })
                return
            }

            res.status(200).json(aNewUser)
        })
    })
  })
})


/*--------------------------- LOG IN----------------------------- */

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo en la autenticación del usuario.' })
          return
      }

      if (!theUser) {
          res.status(401).json(failureDetails)
          return
      }

      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Lo sentimos pero ha ocurrido un fallo al guardar la sesión.' })
              return
          }

          res.status(200).json(theUser)
      })
  })(req, res, next)
})





/*--------------------------- LOG OUT----------------------------- */

router.post('/logout', (req, res, next) => {
  req.logout()
  res.status(200).json({ message: 'Sesión cerrada con éxito' })
})



/*--------------------------- LOGGED IN----------------------------- */

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user)
      return
  }
  res.status(403).json({ message: 'No tienes acceso. Entra con tu cuenta o regístrate como nuevo usuario' })
})




module.exports = router
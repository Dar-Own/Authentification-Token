let express   = require('express')
let passeport = require('passport')
let router    = express.Router()

router.get('/', (req, res, next) => {
    res.redirect('/')
})

router.get('facebook',
    passeport.authenticate('facebook', {scope: 'email'}
))

router.get('facebook/callback', 
    passeport.authenticate('facebook',  {
        successRedirect: '/',
        failureRedirect: '/login'
    })
)

module.exports = router
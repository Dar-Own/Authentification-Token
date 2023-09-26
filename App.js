let app              = require('express')()
let FacebookStrategy = require('passport-facebook')
let config           =  require('./oAuth')

var routes = require('./routes/index');
				app.use('/', routes);

				app.use(session({
				  cookieName: 'session',
				  secret: 'keyboard cat',
				  resave: false,
				  saveUninitialized: false
				}));

				app.use(passport.initialize());
                app.use(passport.session());
                
                var Account = require('./models/account');
				passport.use(new LocalStrategy(Account.authenticate()));

				passport.serializeUser(Account.serializeUser());
				passport.deserializeUser(Account.deserializeUser());
			
			

passport.use('facebook', new FacebookStrategy({
    clientID    : config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL : config.facebook.callbackURL,
    profileFields: ['id', 'emails', 'name']
},
    function(access_token, refresh_token, profile, done){
        process.nextTick(function () {
            Account.findOne({ 'username': profile.emails[0].value }, (err, user) => {
                if (err) 
                    return done(err)
                if (user) {
                    if (err) 
                        return done(err)
                    else return done(null, user)
                } else {
                    if (err)
                        return done(err)
                    
                    Account.register(new Account ({username : profile.emails[0].value }), profile.id, function (err, account) {
                        if (err) 
                            return done(err)
                        else
                            return done(null, account)
                    })
                }
            })
        })
    }



))







app.listen(3000)
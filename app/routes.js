var Item = require('../app/models/item');
var User = require('../app/models/user');
var unirest = require('unirest');
const api = '7fd92da6adb745fb979a1b6f13d0d094';

module.exports = function(app, passport) {
    // HOME PAGE (with login links) ========
    app.get('/', function(req, res) {
        res.render('index.mustache');  // load the index.ejs file
    });

    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.mustache', {message: req.flash('loginMessage')});
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // SIGNUP ==============================
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.mustache', {message: req.flash('signupMessage')});
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // PROFILE SECTION =====================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log('PROFILE');
        res.render('profile.mustache', {
            user: req.user  // get the user out of session and pass to template
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',  // redirect to the secure profile section
        failureRedirect:
            '/signup',  // redirect back to the signup page if there is an error
        failureFlash: true  // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',  // redirect to the secure profile section
        failureRedirect:
            '/login',  // redirect back to the signup page if there is an error
        failureFlash: true  // allow flash messages
    }));

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/account', function(req, res) {
        res.render('account.mustache', {user: req.user});
    });

    app.post('/additem', isLoggedIn, function(req, res) {
        let item = new Item();
        item.origname = req.body.searchname;
        // console.log(req.body);
        //console.log(req.user.mystore);


        var sendreq = unirest('GET', 'https://api.wegmans.io/products/search');
        sendreq.query({
            '1': ['', ''],
            'query': req.body.searchname,
            'api-version': '2018-10-18'
        });
        sendreq.headers({
            'postman-token': 'cc759c68-3c6c-8184-0592-fc4517be960f',
            'cache-control': 'no-cache',
            'subscription-key': '7fd92da6adb745fb979a1b6f13d0d094'
        });
        sendreq.end(function(resp) {
            if (resp.error) throw new Error(resp.error);
            console.log(resp.body.results[0]);
            item.link = resp.body.results[0].sku;
            item.name = resp.body.results[0].name;
            //
            sendreq = unirest(
                'GET',
                'https://api.wegmans.io/products/' + item.link + '/locations/' +
                    req.user.mystore);

            sendreq.query({'api-version': '2018-10-18'});

            sendreq.headers({
                'postman-token': 'b9d8f9f6-b7b2-5d26-343d-2e0fc5bc0274',
                'cache-control': 'no-cache',
                'subscription-key': '7fd92da6adb745fb979a1b6f13d0d094'
            });


            sendreq.end(function(resloc) {
                if (resloc.error) throw new Error(res.error);
                // console.log(resloc.body);
                item.aisle = resloc.body.locations[0].name;
                item.side = resloc.body.locations[0].aisleSide;
                if (!item.aisle || item.aisle.length > 3) {
                    item.aisle = '0A';
                }
                if (!item.side) {
                    item.side = 'Right';
                }
                // console.log(item.aisle);
                // console.log(item.side);
                req.user.items.push(item);
                req.user.save(function(err) {
                    if (err)
                        throw err;
                    else
                        console.log('saving item');
                    // return done(null, newUser);
                    return res.redirect('/profile');
                });
            });
        });
    });
    app.delete('/deleteitem/:id', function(req, res) {
        for (var i = 0; i < req.user.items.length; i++) {
            // check if the current class is the one to delete
            if (req.user.items[i]._id == req.params.id) {
                // splice it out of the array and save to db
                req.user.items.splice(i, 1);
                req.user.save(function(err) {
                    if (err) return res.send(err);
                    return res.send(null);
                });
            }
        }
    });

    app.post('/updateinfo', isLoggedIn, function(req, res) {
        req.user.name = req.body.name;
        req.user.email = req.body.email;
        req.user.mystore = req.body.mystore;
        req.user.save(function(err) {
            if (err) return res.send(err);
            res.redirect('/account');
        });
    });

    app.get('/recipes', isLoggedIn, function(req, res) {
        res.render('recipes.mustache', {user: req.user});
    });

    app.post('/getrecipe', isLoggedIn, function(req, res) {
        unirest
            .get(
                'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?minCarbs=' +
                req.body.cmin + '&maxCarbs=' + req.body.cmax + '&minProtein=' +
                req.body.pmin + '&maxProtein=' + req.body.pmax +
                '&maxFat=' + req.body.fmax + '&maxCalorie=' + req.body.cmax)
            .header(
                'X-RapidAPI-Key',
                'bf73d4754emshad590756758c84dp18c203jsn792e41b8e7b3')
            .end(function(result) {
                //console.log(result.body[0]);
                res.render('reciperesults.mustache', {recipe: result.body});
            });

    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

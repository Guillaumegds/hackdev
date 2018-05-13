"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var CatController_1 = require("./controllers/CatController");
var UserController_1 = require("./controllers/UserController");
// import cat from './models/cat';
// import user from './models/user';
function routes(app) {
    var router = express.Router();
    var cat = new CatController_1.default();
    var user = new UserController_1.default();
    // cats
    router.route('/cats').get(cat.getAll);
    router.route('/cats/count').get(cat.count);
    router.route('/cat').post(cat.insert);
    router.route('/cat/:id').get(cat.get);
    router.route('/cat/:id').put(cat.update);
    router.route('/cat/:id').delete(cat.delete);
    // users
    router.route('/login').post(user.login);
    router.route('/users').get(user.getAll);
    router.route('/users/count').get(user.count);
    router.route('/user').post(user.insert);
    router.route('/user/:id').get(user.get);
    router.route('/user/:id').put(user.update);
    router.route('/user/:id').delete(user.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map
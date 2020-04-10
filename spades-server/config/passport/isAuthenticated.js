const isAuthenticated = (request, response, next) => {
    if(request.isAuthenticated()) {
        next();        
    }else {
        response.redirect('/');
    }
};

module.exports = isAuthenticated;

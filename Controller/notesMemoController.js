module.exports = function( application ){

application.get("/notesMemoView", function( request, response ){
    response.render('VisibleMemos');
});

application.post("/notesMemo", function( request, response ){

});

application.delete("/notesMemo", function( request, response ){

});

};

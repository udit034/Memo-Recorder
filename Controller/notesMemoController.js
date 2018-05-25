var bodyParser = require('body-parser');

var currentNotes = [ { noteText : " Learn NodeJS" }, { noteText : " Learn ExpressJS" },
             { noteText : " Learn MongoDB " } ]

var urlEncodedParser = bodyParser.urlencoded( {extended:false} );

module.exports = function( application ){

application.get("/notesMemoView", function( request, response ){
    response.render('VisibleMemos', {currentNotes:currentNotes} );
});

application.post("/notesMemoView", urlEncodedParser, function( request, response ){
      currentNotes.push( { noteText :request.body.item } );
      response.json( currentNotes );
});

application.delete("/notesMemoView/:item", function( request, response ){
    currentNotes = currentNotes.filter( function( currentNote ){
          return currentNote.noteText.replace(/ /g, "-") != request.params.item;
    });
    response.json( currentNotes );
});

};

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds135750.mlab.com:35750/notesmemo')
var notesMemoSchema = new mongoose.Schema({
    noteText: String
});
var notesMemoDB = mongoose.model('notesMemoDB', notesMemoSchema );
var noteOne = notesMemoDB({ noteText : 'Hello World' } ).save( function(err){
      if( err ) throw err;
      console.log( "saved item" );
} );

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

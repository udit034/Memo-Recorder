var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds135750.mlab.com:35750/notesmemo')
var notesMemoSchema = new mongoose.Schema({
    noteText: String
});
var notesMemoDB = mongoose.model('notesMemoDB', notesMemoSchema );

var currentNotes = [ { noteText : " Learn NodeJS" }, { noteText : " Learn ExpressJS" },
             { noteText : " Learn MongoDB " } ]
var urlEncodedParser = bodyParser.urlencoded( {extended:false} );

module.exports = function( application ){

application.get("/notesMemoView", function( request, response ){
    notesMemoDB.find({}, function( err, data )
    {
       response.render('VisibleMemos', { currentNotes: data } );
    });
});

application.post("/notesMemoView", urlEncodedParser, function( request, response ){
      var newNote = notesMemoDB({noteText : request.body.item } ).save( function(err){
            if( err ) throw err;
            response.json( currentNotes );
      } );
});

application.delete("/notesMemoView/:item", function( request, response ){
    notesMemoDB.find({noteText : request.params.item.replace(/\-/g, " ") } ).remove( function( err, data )
    {
        if( err ) throw err;
        response.json( data );
    });

});

};

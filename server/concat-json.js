var jsonConcat = require( 'json-concat' );

jsonConcat( {

    src: "server/data",

    dest: "server/data.json",

}, function ( json ) {

    console.log( json );

} );
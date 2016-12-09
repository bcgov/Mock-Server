'use strict';
var fs = require('fs');
var path = require('path');
var process = require('process');
var mockApi = require('swagger-mock-api');

// get the source for the swagger file from the environment.
var swaggerURL   = process.env.SWAGGER_URL;
var swaggerFilename = path.join(__dirname,'swagger.yaml');
var request = require('request');	

module.exports = function(grunt) {
	// start the web service
	grunt.initConfig({
		connect: {
		  server: {
			options: {
			  port: 8080,
			  keepalive: true,
			  middleware: [
				mockApi({
					  swaggerFile: swaggerFilename,
					  watch: true 
				  })
			  ],
			},
		  },
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask('default', ['connect']);	
			
}


// download the contents of the Swagger URL	
request(swaggerURL, function (error, response, body) {
console.log("got data");
if (!error && response.statusCode == 200) {
	// save the body to a file.
	fs.writeFile(swaggerFilename, body, function(err) {
		if(err) {
			return console.log("Error writing to file " + swaggerFilename + "\n" + err);
		}
	});	
}
else {
	console.log("Error retrieving data from URL: " + swaggerURL + "\n"+response.statusCode);
}
});	


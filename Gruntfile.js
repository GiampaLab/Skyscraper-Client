module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
	  
	  clean: ["dist", '.tmp'],
	  
	  copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: ['**', '!**/*.css'],
                dest: 'dist/'
            }
        },
	  
	  rev: {
            files: {
                src: ['dist/**/*.{js,css}']
            }
        },
 
		useminPrepare: {
			html: 'app/index.html'
		},

		usemin: {
			html: ['dist/index.html']
		},

		uglify: {
			options: {
				report: 'min',
				mangle: false
			}
		},
	  
	  ngconstant: {
		options: {
		  name: 'config',
		  dest: './app/config.js'
		},
		local:{
		  constants: {
			constants: grunt.file.readJSON('./configuration.local.json')
		  }
		},
		dev: {
		  constants: {
			constants: grunt.file.readJSON('./configuration.dev.json')
		  }
		},
		prod: {
		  constants: {
			constants: grunt.file.readJSON('./configuration.production.json')
		  }
		},	
		build: {
		}
	  }
  });
 
	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');	
	
	// Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('deployDev', ['clean', 'ngconstant:dev', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);
	grunt.registerTask('deployProd', ['clean', 'ngconstant:prod', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);
};

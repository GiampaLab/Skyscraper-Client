module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/**/*.js',
	  'unit-tests/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    preprocessors: {
      'app/scripts/**/*.js': 'coverage'
    },

    coverageReporter: {
      type: 'html',
      dir: 'karma/coverage'
    },

    junitReporter : {
      outputFile: 'karma/xml/unit.xml',
      suite: 'unit'
    },

    htmlReporter: {
      outputDir: 'karma/html',
      templatePath: 'jasmine_template.html'
    },

    colors: true,

    reporters: ['story', 'junit', 'coverage', 'html']
  });
};

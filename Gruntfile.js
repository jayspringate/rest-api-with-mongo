'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    simplemocha: {
      options: {
      globals: ['should', 'window'],
      timeout: 3000,
      ignoreLeaks: false,
      ui: 'bdd',
      reporter: 'tap'
    },
    all: { 
      src: ['test/players-api-test.js'] 
    }
  },

    jshint: {
      dev: {
        src: ['*.js', 'test/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'lib/**/*.js']
      },
      options: {
        node: true,
        ignores: ['build/', 'test/client/bundle.js', 'test/karma-test/bundle.js'],
        globals: {
          describe: true,
          it: true,
          before: true,
          after: true,
          beforeEach: true,
          afterEach: true,
          expect: true,
          angular: true
        }
      }
    },

    watch: {
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true,
          event: ['changed']
        }
      },
      scripts: {
        files: ['*.js', 'models/**/*.js', 'test/**/*.js', 'routes/**/*.js', 'lib/**/*.js', 
          'app/**/*.js', 'app/**/*.html', 'test/client/test.html'],
        tasks: ['build'],
        options: {
          event: ['added', 'deleted', 'changed']
        }
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
    
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'bundle.js'
        }
      },

      karmaTest: {
        entry: __dirname + '/test/karma-test/test-entry.js',
        output: {
          path: 'test/karma-test/',
          file: 'bundle.js'
        }
      }
    },

    karma: {
      test: {
        configFile: 'karma.conf.js'
      }
    },

     

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    }
  });

  grunt.registerTask('build', ['jshint', 'webpack:client', 'webpack:test', 'webpack:karmaTest', 'karma:test', 'copy:html']);
  grunt.registerTask('test', ['jshint', 'build:dev', 'simplemocha']);
  grunt.registerTask('karmatest', ['webpack:karmaTest', 'karma:test']);
  grunt.registerTask('default', ['build']);
};
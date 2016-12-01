module.exports = function(grunt) {

  grunt.initConfig({
    // removes files from the dist (built files) folder
    clean: ['dist'],

    // compiles ts code into js
    ts: {
      base: {
        src: ['app/**/*.ts', 'spec/*.ts'],
        dest: 'dist',
        options: {
          "target": "es5",
          "module": "commonjs",
          "moduleResolution": "node",
          "sourceMap": true,
          "emitDecoratorMetadata": true,
          "experimentalDecorators": true,
          "removeComments": false,
          "noImplicitAny": false
        }
      }
    },

    // lints ts code for errors
    tslint: {
      options: {
          // can be a configuration object or a filepath to tslint.json
        configuration: "tslint.json",
        // If set to true, tslint errors will be reported, but not fail the task
        // If set to false, tslint errors will be reported, and the task will fail
        force: false
      },
      files: {
        src: ['app/**/*.ts']
      }
    },

    // copies static asset files to the dist (built files) folder
    copy: {
      css: {
        expand: true,
        cwd:'app',
        src: ['**/*.css'],
        dest: 'dist/',
      },
      html: {
        expand: true,
        cwd:'app',
        src: ['**/*.html'],
        dest: 'dist/',
      }
    },
    // concurrently runs grunt tasks more info at https://github.com/sindresorhus/grunt-concurrent
    concurrent: {
      dev: {
        tasks: ['nodemon', 'mochaTest', 'karma', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server/app.js'
      }
    },
    // watch ts files and static asset files for changes and re-builds
    watch: {
      ts: {
        files: ['app/**/*.ts', 'spec/*.ts'],
        tasks: ['ts']
      },
      copy: {
        files: ['app/**/*.css', 'app/**/*.html'],
        tasks: ['copy:css', 'copy:html']
      }
    },
    // run front end unit tests with karma
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true
      }
    },
    // run back end unit tests with mocha
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['server/test/*.js']
      }
    },
  });

  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('build', ['clean', 'tslint', 'ts','copy:css', 'copy:html']);
  grunt.registerTask('default', ['build', 'concurrent']);
  grunt.registerTask('deploy', ['clean', 'ts', 'copy:css', 'copy:html']);
};
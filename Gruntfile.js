module.exports = function(grunt) {

  grunt.initConfig({
    clean: ['dist'],

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
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true
      }
    },
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
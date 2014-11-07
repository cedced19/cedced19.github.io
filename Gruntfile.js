module.exports = function(grunt) {
  require('time-grunt')(grunt);
  var config = {
    usemin: {
        html: ['license/index.html', 'index.html', '404.html', 'soft/calculs/index.html', 'soft/home/index.html']
    },
    htmlmin: {
            dist: {
              options: {
                removeComments: true,
                collapseWhitespace: true
              },
              files: {
                'index.html': 'index.html',
                '404.html': '404.html',
                'license/index.html': 'license/index.html',
                'soft/calculs/index.html' : 'soft/calculs/index.html',
                'soft/home/index.html' : 'soft/home/index.html'
              }
          }
    },
    copy: {
      main: {
          expand: true,
          cwd: 'dev/',
          src: ['**/*.html'],
          dest: ''
      }
    },
    concat: {
        main:{
          files:[
            // Header
            { dest: 'scripts/scripts.js',
                src: [ 'dev/scripts/jquery.min.js', 'dev/scripts/header.js' ] },
            // GitHub API
            { dest: 'scripts/github.min.js',
                src: [ 'dev/scripts/github.js' ] },
            // Calculs
            { dest: 'scripts/calculs.min.js',
                src: [ 'dev/scripts/angular.min.js', 'dev/scripts/calculs.js' ]}
             ]
        }
    },
    uglify:{
      main: {
        files: [
              // Calculs
              { dest: 'scripts/calculs.min.js',
              src: [ 'scripts/calculs.min.js' ] },
              // Header
              { dest: 'scripts/scripts.js',
                  src: [ 'scripts/scripts.js' ] },
              // Github API
              { dest: 'scripts/github.min.js',
                 src: [ 'scripts/github.min.js' ] }
               ]
             }
       },
      uncss: {
        main: {
          files: {
            'styles/styles.css': ['dev/index.html', 'dev/license/index.html', 'dev/404.html', 'dev/soft/calculs/index.html']
          }
        }
      },
      cssmin: {
        main: {
          files: {
            'styles/styles.css': ['styles/styles.css']
          },
         home: {
          files: {
            'styles/home.min.css': ['dev/styles/home.css']
          }
         }
        }
      },
      autoprefixer: {
          main: {
            expand: true,
            flatten: true,
            src: 'styles/*.css',
            dest: 'styles/'
          }
      }
};

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['copy', 'usemin', 'htmlmin', 'concat', 'uglify', 'uncss', 'cssmin', 'autoprefixer']);
};
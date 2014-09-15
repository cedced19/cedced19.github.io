module.exports = function(grunt) {

  var config = {
    shell: {
        ungit: {
            command: 'ungit'
        },
        server: {
            command: 'fast-http 80'
        }
    },
    useminPrepare: {
      html: ['dev/index.html', 'dev/soft/home/index.html'],
      options: {
        dest: './'
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
        calculs: { // Because this use Angular.
          src: ['dev/scripts/angular.min.js', 'dev/scripts/calculs.js'],
          dest: 'scripts/calculs.min.js'
        }
      },
    cssmin: {
      main: {
        files: {
          'styles/styles.css': ['styles/styles.css']
        }
      },
      calculs: {
          files: {
          'styles/calculs.min.css': ['dev/styles/calculs.css']
        }
      }
    },
  usemin: {
    html: ['license/index.html', 'index.html', '404.html', 'soft/calculs/index.html', 'soft/home/index.html']
  },
  uncss: {
    main: {
      files: {
        'styles/styles.css': ['dev/index.html', 'dev/license/index.html', 'dev/404.html']
      }
    }
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
  }
};

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['useminPrepare', 'concat', 'uglify', 'copy', 'usemin', 'htmlmin','cssmin:generated',  'uncss', 'cssmin:main', 'cssmin:calculs']);
  grunt.registerTask('test', ['default', 'shell:server']);
  grunt.registerTask('commit', ['default', 'shell:ungit']);
};
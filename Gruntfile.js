module.exports = function(grunt) {

  var config = {
    shell: {
        ungit: {
            command: 'ungit'
        }
    },
    useminPrepare: {
      html: ['dev/index.html', 'dev/soft/calculs/index.html', 'dev/soft/home/index.html'],
      options: {
        dest: './'
      }
    },
    copy: {
      main: {
          expand: true,
          cwd: 'dev/',
          src: '**/*.html',
          dest: ''
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
          'styles/calculs.min.css': ['styles/calculs.min.css']
        }
      },
      home: {
        files: {
          'styles/home.min.css': ['styles/home.min.css']
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
    },
    calculs: {
      files: {
        'styles/calculs.min.css': ['dev/soft/calculs/index.html']
      }
    },
    home: {
      files: {
        'styles/home.min.css': ['dev/soft/home/index.html']
      }
    }
  },
  uglify: {
    options: {
          mangle: false
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
  grunt.registerTask('default', ['useminPrepare', 'concat', 'uglify', 'copy', 'usemin', 'htmlmin',  'uncss', 'cssmin:main', 'cssmin:calculs', 'cssmin:home', 'shell:ungit']);
};
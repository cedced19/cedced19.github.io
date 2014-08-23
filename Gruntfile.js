module.exports = function(grunt) {

  var config = {
    shell: {
        ungit: {
            command: 'ungit'
        }
    },
    useminPrepare: {
      html: 'dev/index.html',
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
  usemin: {
    html: ['license/index.html', 'index.html', '404.html']
  },
  uncss: {
    dist: {
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
            'license/index.html': 'license/index.html'
          }
      }
  }
};

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['useminPrepare', 'concat', 'cssmin', 'uglify', 'copy', 'usemin', 'htmlmin',  'uncss', 'shell:ungit']);
};
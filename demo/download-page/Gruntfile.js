module.exports = function(grunt){

    require('load-grunt-tasks')(grunt);

         grunt.initConfig({

                jshint: {
                all: ['js/*.js']
              },

              concat: {
                options: {
                  separator: ';',
                },
                dist: {
                  src: ['js/jquery-1.9.1.min.js', 'js/bootstrap.min.js'],
                  dest: 'min/concat.js'
                },
              },

              uglify: {
                dist: {
                  files: {
                    'min/app.js': ['min/concat.js']
                  }
                }
              },

            cssmin: {
              combine: {
                files: {
                  'min/app.css': ['css/bootstrap.css', 'css/style.css', 'css/font.css' ]
                }
              }
            },

            watch: {
                    js: {
                    files: ['js/*.js'],
                    tasks: ['concat', 'uglify'],
                    options: {
                      spawn: false,
                    },
                  },
                  css: {
                    files: ['css/*.css'],
                    tasks: ['cssmin'],
                    options: {
                      spawn: false,
                    },
                  },
                }
            });

        grunt.registerTask('default', ['concat', 'uglify', 'cssmin'])
        grunt.registerTask('true', ['jshint', 'concat', 'uglify'])
}
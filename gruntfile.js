module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ' '
            },
            dist1: {
                src: ['assets/js/customizado/*.js'],
                dest: 'assets/scripts/<%= pkg.name %>.cust.js'
            },
            dist2: {
                src: ['assets/css/customizado/*.css'],
                dest: 'assets/scripts/<%= pkg.name %>.cust.css'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> Trabalho em Grupo PUC */\n'
            },
            dist1: {
                files: {
                    'js/scriptAPI.min.js': ['assets/js/customizado/scriptAPI.js']
                }
            },
            dist2: {
                files: {
                    'js/scriptDB.min.js': ['assets/js/customizado/scriptDB.js']
                }
            },
            dist3: {
                files: {
                    'js/scriptPagina.min.js': ['assets/js/customizado/scriptPagina.js']
                }
            },
            dist4: {
                files: {
                    'js/scriptIMG.min.js': ['assets/js/customizado/scriptIMG.js']
                }
            },
            dist5: {
                files: {
                    'js/scriptSlide.min.js': ['assets/js/customizado/scriptSlide.js']
                }
            }
        },
        
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> Trabalho em Grupo PUC */\n'
            },
            dist1: {
                files: {
                    'css/customPagina.min.css': ['assets/css/customizado/customPagina.css']
                }
            },
            dist2: {
                files: {
                    'css/customAPI.min.css': ['assets/css/customizado/customAPI.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};
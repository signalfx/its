// JS Hint options
var JSHINT_BROWSER = {
  browser: true,
  es5: true
};

var JSHINT_NODE = {
  node: true,
  es5: true
};

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    hug: {
      build:{
        src: './lib/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.js',
        exports: './lib/<%= pkg.name %>.js',
        exportedVariable: '<%= pkg.name %>'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:hug.build.dest>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    clean: {
      build: {
        src: [ 'build', 'dist' ]
      }
    },
    lint: {
      all: ['lib/**/*.js']
    },
    qunit: {
      all: ['test/**/*.html']
    },
    jshint: {
      server: {
        options: JSHINT_NODE
      },
      grunt: {
        options: JSHINT_NODE
      },
      client: {
        options: JSHINT_BROWSER
      },

      options: {
        node:true,
        strict: false,
        camelcase: true,
        curly: true,
        es5:true,
        eqeqeq: true,
        loopfunc:true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true
      },
      globals: {}
    }
  });

  grunt.loadNpmTasks('grunt-hug');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('test', 'default qunit');
  grunt.registerTask('default', 'clean lint hug min');
};
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      t1: {
        src: 'dir1/**',
        dest: 'dir2/'
      }
    },
    uglify: {
      t1: {
        options: {
          sourceMap: true
        },
        files: {
          'dest/all.min.js': ['src/**/*.js']
        }
      },
      t2: {
        options: {
          sourceMap: true
        },
        files: [{
          cwd: 'src/',
          src: '**/*.js',
          dest: 'target/',
          expand: true,
          flatten: false,
          ext: '.min.js'
        }]
      }
    },
    watch:{
    	w1:{
    		files:['src/**/*js'],
    		tasks:['uglify:t1']
    	},
    	w2:{
    		files:['src/**/*js'],
    		tasks:['uglify:t2']
    	}
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', 'watch:w1');
  //grunt.registerTask('default', 'watch:w2');
  //grunt.registerTask('t1', 'copy:t1');
}
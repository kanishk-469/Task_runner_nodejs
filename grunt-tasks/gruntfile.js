/// first configure the wrapper function , please refer grunt docs.
module.exports = function (grunt) {
  grunt.initConfig({
    //configure the task 1, minify JS
    uglify: {
      target: {
        files: {
          //   "destn/js/main.min.js": ["src/js/input1.js"],
          ///  key(we put destination path) : value(we put source path)
          "destn/js/main.min.js": ["src/js/*.js"],
        },
      },
    },

    //configure the task 2, minify CSS
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "src/css",
            src: ["*.css", "!*.min.css"],
            dest: "destn/css",
            ext: ".min.css",
          },
        ],
      },
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: "src/images",
            src: ["*.jpeg"],
            dest: "dist/",
          },
        ],
      },
    },
  });

  ////Load Libraries,Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-imagemin");

  // Default task(s) or register the tasks or setting up tasks
  grunt.registerTask("default", ["uglify", "cssmin", "imagemin"]);
};

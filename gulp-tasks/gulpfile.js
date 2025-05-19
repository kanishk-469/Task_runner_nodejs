//refer:- https://www.npmjs.com/package/gulp-imagemin

import gulp from "gulp";
import imagemin from "gulp-imagemin";

gulp.task("default", () => {
  //define task..
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dest/images"));
});

var gulp = require("gulp");
var style = require("./");

gulp.task("default", function() {
    return gulp.src(["tests/**/*.js"])
    .pipe(style())
    .pipe(gulp.dest("tests/"));
});

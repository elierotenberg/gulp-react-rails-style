var gulp = require("gulp");
var R = require("react-rails");
var style = require("./")(R, [R.Style.Processors.autoprefixer, R.Style.Processors.min]);

gulp.task("default", function() {
    return gulp.src(["tests/**/*.js"])
    .pipe(style())
    .pipe(gulp.dest("tests/"));
});

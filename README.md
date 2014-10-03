gulp-react-rails-style
======================

`gulp` plugin to statically process React on Rails components into CSS files.

Usage
=====

```js
var gulp = require("gulp");
var style = require("gulp-react-rails-style")([R.Style.Processors.autoprefixer, R.Style.Processors.min]);

gulp.task("style", function() {
    return gulp.src(["tests/**/*.js"])
    .pipe(style())
    .pipe(gulp.dest("tests/"));
});
```

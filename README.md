gulp-react-rails-style
======================

`gulp` plugin to statically process React on Rails components into CSS files.

Usage
=====

```js
var gulp = require("gulp");
var R = require("react-rails");
var style = require("gulp-react-rails-style")(R, [R.Style.Processors.autoprefixer, R.Style.Processors.min]);

gulp.task("style", function() {
    return gulp.src(["tests/**/*.js"])
    .pipe(style())
    .pipe(gulp.dest("tests/"));
});
```


There is an optional argument, `cachebust`, which allows to clear the `require` cache for a specific module path.
It is useful when used in conjunction with `gulp.watch`.
Assume all your components depend on a `dist/styles` module which contains your color swatches, etc.
Then use:
```js
gulp.task("style", function() {
    return gulp.src(["test/**/*.js"])
    .pipe(style("dist/styles"))
    .pipe(gulp.dest("tests/"));
});
...
gulp.watch("tests/**/*.js", ["style"]);
```

`cachebust` can be `null` (default), a string, or on array of strings.

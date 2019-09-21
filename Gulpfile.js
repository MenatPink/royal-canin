var gulp = require("gulp"),
    minifyHTML = require("gulp-minify-html"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass"),
    config = {
        paths: {
            html: {
                src: "src/*.html",
                dest: "build"
            },
            javascript: {
                src: ["src/app/*.js"],
                dest: "build/js"
            },
            css: {
                src: ["src/styles/*.css"],
                dest: "build/css"
            },
            images: {
                src: ["assets/*.jpg", "assets/*.png"],
                dest: "build/images"
            },
            sass: {
                src: ["src/styles/*.scss"],
                dest: "build/css"
            }
        }
    };

gulp.task("html", function () {
    return gulp.src(config.paths.html.src)
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task("scripts", function () {
    return gulp.src(config.paths.javascript.src)
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.javascript.dest));
});

gulp.task("images", function () {
    return gulp.src(config.paths.images.src)
        .pipe(imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.paths.images.dest));
});

gulp.task("sass", function () {
    return gulp.src(config.paths.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat("main.min.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.paths.css.dest))
});

gulp.task("build", ["html", "scripts", "sass"]);

gulp.task("default", ["build"], function () {
    gulp.watch(config.paths.html.src, ["html"]);
    gulp.watch(config.paths.javascript.src, ["scripts"]);
    gulp.watch(config.paths.images.src, ["images"]);
    gulp.watch(config.paths.sass.src, ["sass"]);
});

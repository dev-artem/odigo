const gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

gulp.task('sass', function () {
    return gulp
        .src('app/scss/style.scss')
        .pipe(
            sass({
                outputStyle: 'compressed',
            })
        )
        .pipe(
            rename({
                suffix: '.min',
            })
        )
        .pipe(autoprefixer())
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({ stream: true }));
});

/* js libs concat+minify */

// gulp.task('scripts', function () {
//     return gulp
//         .src(['node_modules/'])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js'));
// });

gulp.task('styles', function () {
    return gulp
        .src(['node_modules/normalize.css/normalize.css'])
        .pipe(concat('libs.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/css'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: 'app/',
    });

    gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('sass', 'styles', 'serve'));

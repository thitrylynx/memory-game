'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var posthtml = require('gulp-posthtml');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var server = require('browser-sync').create();
var run = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');

gulp.task('style', function() {
  gulp
    .src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('minify', function() {
  gulp
    .src('js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
  return gulp
    .src('img/**/*.{png,jpg,svg}')
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest('img'));
});

gulp.task('html', function() {
  return gulp
    .src('*.html')
    .pipe(posthtml())
    .pipe(gulp.dest('build'));
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', server.reload);
  gulp.watch('js/*.js', ['minify']);
});

gulp.task('copy', function() {
  return gulp
    .src(['fonts/**/*.{woff,woff2}', 'img/**', 'js/**', 'sounds/**'], {
      base: '.'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('build', function(done) {
  run('clean', 'copy', 'images', 'style', 'minify', 'html', done);
});

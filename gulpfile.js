// npm install gulp-less gulp-browserify gulp-rename gulp-autoprefixer --save-dev 

var publicPath = './public/';
var staticPath = './static/';


// Include gulp
var gulp = require('gulp'); 

process.env.production = false;

// Include Our Plugins
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var browserify = require('gulp-browserify');
var autoprefixer = require('gulp-autoprefixer');


// Compile Our less
gulp.task('styleProcessing', function() {
    return gulp.src(staticPath + 'less/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(staticPath + 'css'));
});

// Browserify task
gulp.task('browserify', function() {
    return gulp.src(staticPath + 'js/app.js')
    .pipe(browserify({insertGlobals : true, debug : !process.env.production}))
    .pipe(uglify())
    .pipe(gulp.dest(staticPath + 'buildjs'))
});

// Move
gulp.task('move',['styleProcessing', 'browserify'], function(){
  gulp.src(staticPath + 'buildjs/*.js')
  .pipe(gulp.dest(publicPath + 'js'));

  gulp.src(staticPath + 'css/*.css')
  .pipe(gulp.dest(publicPath + 'css'));

  gulp.src(staticPath + 'img/*')
  .pipe(gulp.dest(publicPath + 'img'));
});

// Default Task
gulp.task('default', ['styleProcessing', 'browserify', 'move']);

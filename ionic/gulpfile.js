var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var plumber = require('gulp-plumber');

var paths = {
  ionicSassSource: ['./www/styles/ionic-sass/ionic.app.scss'],
  sassSource: ['./www/styles/internal-sass/**/*.scss'],
  jsSource: ['./www/js/**/*.js']
};

// compile ionic sass, without custom sassOptions settings above
gulp.task('ionic-sass', function(done) {
  gulp.src(paths.ionicSassSource)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/styles'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

// compile internal sass, with custom sassOptions
gulp.task('sass', function() {
  return gulp.src(paths.sassSource)
  .pipe(sass(sassOptions)
  .on('error', sass.logError))
  .pipe(concat('master.css'))
  .pipe(gulp.dest('./www/styles/'))
});

// compile all angular files into one master js file called bundle.js
gulp.task('js', function() {
  return gulp.src(paths.jsSource)
  .pipe(plumber())
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('./www/')); // located in www folder.
});

// watch changes to all files and update accordingly
gulp.task('watch', function() {
  gulp.watch(paths.ionicSassSource, ['ionic-sass']);
  gulp.watch(paths.sassSource, ['sass']);
  gulp.watch(paths.jsSource, ['js']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

// set default tasks to run just by running 'gulp'
gulp.task('default', ['watch', 'ionic-sass', 'sass', 'js']);

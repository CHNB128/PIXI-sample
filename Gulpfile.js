//Include required modules
const gulp = require('gulp'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  connect = require('gulp-connect'),
  source = require('vinyl-source-stream'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps')

//Copy static files from html folder to build folder
gulp.task('copy/static', function() {
  return gulp
    .src('./src/static/*.*')
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
})

gulp.task('build/html', function() {
  return gulp
    .src('./src/html/*.*')
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
})

//Convert ES6 ode in all js files in src/js folder and copy to
//build folder as bundle.js
gulp.task('build/js', function() {
  return browserify({
    entries: ['./src/js/main.js'],
    debug: true
  })
    .transform(babelify)
    .transform(
      babelify.configure({
        presets: ['@babel/env']
      })
    )
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'))
    .pipe(livereload())
})

//Start a test server with doc root at build folder and
//listening to 9001 port. Home page = http://localhost:9001
gulp.task('startServer', function() {
  connect.server({
    root: './build',
    livereload: true,
    port: 9001
  })
})

//Default task. This will be run when no task is passed in arguments to gulp
gulp.task(
  'default',
  gulp.series('copy/static', 'build/js', 'build/html', 'startServer')
)

gulp.task('dev', () => {
  livereload.listen()
  gulp.watch('./src/js/*.js', gulp.series('build/js'))
  gulp.watch('./src/static/*.*', gulp.series('copy/static'))
  gulp.watch('./src/html/*.*', gulp.series('build/html'))
  connect.server({
    root: './build',
    livereload: true,
    port: 9001
  })
})

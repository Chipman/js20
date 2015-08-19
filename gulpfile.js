'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concatenate = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var runSequence = require('run-sequence');
var del = require('del');
var jsxcs = require('gulp-jsxcs');
var shell = require('gulp-shell');
var watchify = require('watchify');
var copy = new (require('task-copy'));
var compiledElements = JSON.stringify(require('./app/scripts/jsonbundler.js'));
var fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var paths = {};
paths.srcRoot = './app';
paths.build = './dist';
paths.jsFiles = paths.srcRoot + '/scripts/**/*.js';
paths.jsEntry = paths.srcRoot + '/scripts/main.js';
paths.jsBuildFileName = 'bundle.js';
paths.script = '/scripts';
paths.sassFiles = paths.srcRoot + '/styles/**/*.scss';
paths.styles = '/styles';
paths.cssBuildFileName = '/allstyles.css';
paths.jsonFiles = paths.srcRoot + '/locales/*';
paths.json = '/locales/';
paths.initJson = '/initialdata.json';

//BUILD AND WATCH SCRIPTS
var browserifyOptions = {
  entries: [paths.jsEntry],
  debug: !isProd,
  fullPaths: true,
  cache: {},
  packageCache: {}
};

var bundler = browserify(browserifyOptions).transform(reactify);
var watchBundler = watchify(browserify(browserifyOptions).transform(reactify));

gulp.task('browserify_bundle', function() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(paths.jsBuildFileName))
    .pipe(gulpif(isProd, streamify(uglify())))
    .pipe(gulp.dest(paths.build + paths.script));
});

gulp.task('browserify_watch', function() {
  watchBundler.on('update', watchifyBundle);
  return watchBundler.bundle();
});

watchBundler.on('time', function(time) {
  gutil.log('Browserify rebunle finished after ' + gutil.colors.magenta(time + 'ms'));
});

function watchifyBundle() {
  return watchBundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(paths.jsBuildFileName))
    .pipe(gulpif(isProd, streamify(uglify())))
    .pipe(gulp.dest(paths.build + paths.script));
}

//BUILD STYLES
gulp.task('build_styles', function() {
  gulp.src(paths.sassFiles)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    .pipe(concatenate(paths.cssBuildFileName))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(isProd, minifycss()))
    .pipe(gulp.dest(paths.build + paths.styles));
});

//REMOVE DISTRIBUTION FOLDER
gulp.task('deleteDist', function(){
  return del(paths.build);
});

//copy json files
gulp.task('json_move', function() {
  //callback should exist to prevent default console.log
  gulp.src(paths.jsonFiles)
    .pipe(gulp.dest(paths.build + paths.json))
});

//COMPILE ELEMENTS DATA
gulp.task('compile_elemets', function() {
  return fs.writeFile(paths.srcRoot + paths.json + paths.initJson, compiledElements,  function (err) {
    if (err) {
      throw err;
    } else {
      console.log('Success: Initial data compiled!');
    }
  });
});

//LIVERELOAD
gulp.task('livereload', shell.task(['live-reload --port 9091 dist/']));

//BUILD
gulp.task('build', function() {
  runSequence(
    'compile_elemets',
    'deleteDist',
    ['json_move', 'browserify_bundle', 'build_styles']
  );
});

//won't work TODO: make it work
// gulp.task('scripts_styleguide', function() {
//   return gulp.src(paths.jsFiles).pipe(jsxcs());
// });

gulp.task('start_server', shell.task('node server.js'));

gulp.task('app_watch', function() {
  // gulp.watch(paths.jsFiles, ['scripts_styleguide']);
  gulp.watch(paths.sassFiles, ['build_styles']);
});

var serveTasks = {
  development: ['browserify_watch', 'app_watch', 'start_server', 'livereload'],
  production: ['start_server']
};

gulp.task('serve', serveTasks[env]);
gulp.task('default', ['serve']);

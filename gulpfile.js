'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';


var paths = {};
paths.srcRoot = './app';
paths.build = './dist';
paths.jsFiles = paths.srcRoot + '/scripts/**/*.js';
paths.jsEntry = paths.srcRoot + '/scripts/main.js';
paths.jsBuildFileName = 'bundle.js';
paths.script = '/scripts';

//SCRIPTS
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

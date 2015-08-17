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
var runsequence = require('run-sequence');
var del = require('del');
var jsxcs = require('gulp-jsxcs');
var shell = require('gulp-shell');

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var paths = {};
paths.srcRoot = './app';
paths.build = './dist';
paths.jsFiles = paths.srcRoot + '/scripts/**/*.js';
paths.jsEntry = paths.srcRoot + '/scripts/main.js';
paths.jsBuildFileName = 'bundle.js';
paths.script = '/scripts';
paths.sassFiles = '/styles/**/*.scss';
paths.styles = '/styles';

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

//BUILD AND WATCH STYLES
gulp.task('build_styles', function() {
  return gulp.src(paths.sassFiles)
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass())
    .pipe(concatenate('styles.css'))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(gulpif(isProd, minifycss()))
    .pipe(gulp.dest(paths.build + paths.styles));
});

//REMOVE DISTRIBUTION FOLDER
gulp.task('deleteDist', function(){
  return del(paths.build);
});

//LIVERELOAD
gulp.task('livereload', shell.task(['live-reload --port 9091 dist/']));

//BUILD
gulp.task('build', function() {
  runsequence(
    'deleteDist',
    ['browserify_bundle', 'build_styles']
  );
});

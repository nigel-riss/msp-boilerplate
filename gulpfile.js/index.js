'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const embedSVG = require('gulp-embed-svg');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const server = require('browser-sync').create();
const plumber = require('gulp-plumber');


// Paths
const dirs = {
  pugMain: './src/pug/*.pug',
  pugAll: './src/pug/**/*.pug',
  svg: './src/img/**/*.svg',
  scssMain: './src/scss/styles.scss',
  scssAll: './src/scss/**/*.scss',
  js: './src/js/**/*.js',
  docs: './docs',
};


// Webpack config
const webpackConfig = {
  entry: {
    scripts: './src/js/scripts.js',
  },
  output: {
    filename: '[name].js',
  },
  // mode: 'production',
  mode: 'development',
};


/**
 * Starts Browsersync server
 */
const startServer = () => {
  server.init({
    server: {
      baseDir: dirs.docs,
    },
    port: 1337,
  });
};


/**
 * Reloads Browsersync server
 * @param {function} cb callback
 */
const reloadServer = (cb) => {
  server.reload();

  cb();
};


/**
 * Render html from pug
 * @param {function} cb callback
 */
const renderPug = (cb) => {
  gulp.src(dirs.pugMain)
    .pipe(plumber())
    .pipe(pug())
    .pipe(embedSVG({
      root: './src/',
    }))
    .pipe(gulp.dest(dirs.docs));

    cb();
};


/**
 * Compile scss files to styles.css
 * And move to ./docs
 * @param {function} cb callback
 */
const compileStyles = (cb) => {
  gulp.src(dirs.scssMain)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dirs.docs))
    .pipe(server.reload({stream: true}));

  cb();
};


/**
 * Compiles js code
 * @param {function} cb callback
 */
const compileScripts = (cb) => {
  gulp.src(dirs.js)
    .pipe(plumber)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(dirs.docs));

  cb();
};


/**
 * Watches files for changes
 */
const watch = () => {
  startServer();
  gulp.watch(dirs.pugAll, gulp.series(renderPug, reloadServer));
  gulp.watch(dirs.svg, gulp.series(renderPug, reloadServer));
  gulp.watch(dirs.scssAll, gulp.series(compileStyles));
  gulp.watch(dirs.js, gulp.series(compileScripts, reloadServer));
};


// Single tasks
exports.renderPug = renderPug;
exports.compileStyles = compileStyles;
exports.compileScripts = compileScripts;
exports.startServer = startServer;

// Watch task
exports.watch = watch;

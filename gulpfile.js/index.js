'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const embedSVG = require('gulp-embed-svg');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const server = require('browser-sync').create();


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


/**
 * Render html from pug
 * @param {function} cb callback
 */
const renderPug = (cb) => {
  gulp.src(dirs.pugMain)
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
    .pipe(sass())
    .pipe(gulp.dest(dirs.docs))
    // .pipe(server.reload({stream: true}));

  cb();
}


// Single tasks
exports.renderPug = renderPug;
exports.compileStyles = compileStyles;

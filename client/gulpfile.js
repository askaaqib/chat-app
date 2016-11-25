"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const awspublish = require('gulp-awspublish');

/* == SASS == */
gulp.task('style', ()=> {
	return gulp.src('./sass/main.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(cleanCSS({debug: true},(details) => {
			console.log(`Original Size: ${details.stats.originalSize / 1000} KB ---> Minified Size: ${details.stats.minifiedSize / 1000} KB`);
    }))
		.pipe(gulp.dest('./public/styles'));
});

/* == SASS:WATCH == */
gulp.task('style:watch', ()=> {
  gulp.watch('./sass/*.scss', ['style']);
});

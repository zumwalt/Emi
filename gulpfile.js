var gulp          = require('gulp'),
    browserSync   = require('browser-snyc'),
    reload        = browserSync.reload,
    plumber       = require('gulp-plumber'),
    sass          = require('gulp-ruby-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    newer         = require('gulp-newer'),
    imagemin      = require('gulp-imagemin'),
    git           = require('gulp-git');

var host = "yourlocal.dev";
var imgSrc = 'assets/images/originals/*';
var imgDest = 'assets/images';

gulp.task('styles', function(){
  return gulp.src(['scss/*.scss',
                   'scss/**/*.scss'],
            {base: 'scss/'} )
      .pipe(plumber())
	    .pipe(sass({ style: 'expanded' }))
	    .pipe(gulp.dest(''))
	    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	    .pipe(minifycss())
	    .pipe(gulp.dest(''));
      .pipe(reload({stream:true}));
});

gulp.task('images', function() {
  return gulp.src(imgSrc, {base: 'assets/images/originals'})
        .pipe(newer(imgDest))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imgDest));
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: host
    });
});

gulp.task('default', ['styles', 'images', 'browser-sync'], function () {
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('scss/**/*.scss', ['styles']);
  gulp.watch('assets/images/originals/**', ['images']);
});

gulp.task('init', function(){
	git.init();
});

gulp.task('commit', function(){
  return gulp.src('./*')
  .pipe(git.add())
  .pipe(git.commit('initial commit'));
});

gulp.task('setup',['styles','init','commit']);
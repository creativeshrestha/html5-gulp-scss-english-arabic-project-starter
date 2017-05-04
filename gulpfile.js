var gulp          = require('gulp');
var sass          = require('gulp-sass');
var filter        = require('gulp-filter');
var postcss       = require('gulp-postcss');
var sourcemaps 	  = require('gulp-sourcemaps');
var autoprefixer  = require('autoprefixer');
var lost          = require('lost');
var plumber 	  = require('gulp-plumber');
var browserSync   = require('browser-sync');
var notify		  = require('gulp-notify');
var rtlcss        = require('gulp-rtlcss');
var rename        = require('gulp-rename');

 var onError =function(err) {
  console.log(err.toString());
  this.emit('end');
};

// sass
gulp.task('sass', function () {
    // return gulp.src('sass/**/*.scss')
    return gulp.src('sass/style.scss')
	    .pipe(plumber({
		   errorHandler: onError
		}))

        .pipe(sourcemaps.init())
            .pipe(sass({
                //outputStyle: 'compressed',
                outputStyle: 'nested',
                precision: 10,
                onError: function (err) {
                    notify().write(err);
                }
            }))
        .pipe( postcss([lost(), autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'))
        .pipe(rtlcss())
        .pipe(rename({ suffix: '-ar' }))
        .pipe(gulp.dest('./'))
        .pipe(filter('sass**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

// browserSync
gulp.task('browser-sync', function() {
    //watch files
    var files = [
    './style.css',
    './img/**/*',
    './*.html',
    './*.php'
    ];

    //initialize browserSync
    browserSync.init(files, {
        //browsersync with a php server
        proxy: "localhost:8888",
        // ws: true,
        notify: true
    });
});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("sass/**/*.scss", ['sass']);
});
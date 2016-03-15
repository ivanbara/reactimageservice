var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


var webpack = require('webpack');
var webpackConfig = require('./webpack.config');


// transpile from ES6 to ES5 for Server
gulp.task('babel-server', function() {
  return gulp.src('./components/*.jsx')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('./es5-lib'));
});

/*
gulp.task('bundle', function() {
    return browserify({
        extensions: ['.js', '.jsx'],
        entries: './components/ReactApp.jsx',
    })
    .transform(babelify.configure({
        ignore: /(bower_components)|(node_modules)/
    }))
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./es5-lib'));
});
*/

// transpile from ES6 to ES5 for client
gulp.task('babel-client', function () {
  var myConfig = Object.create(webpackConfig);

  // run webpack
  webpack(myConfig, function(err, stats) {
   if (err) throw new gutil.PluginError('webpack', err);
   gutil.log('[webpack]', stats.toString({
     colors: true,
     progress: true
   }));
  });
});

gulp.task('watch', function() {
  gulp.watch('./components/*.jsx', ['babel-server', 'babel-client']);
});

gulp.task('default', ['babel-client', 'babel-server', 'watch']);


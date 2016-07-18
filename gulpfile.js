const gulp = require('gulp'); //skeleton, responsible for build process
const gutil = require('gulp-util'); //responsible for logging build process
const source= require('vinyl-source-stream'); //"throwing" text files from one step to another
const browserify = require('browserify'); //figures out dependencies for load order
const watchify = require('watchify'); //automatically re-runs gulp file whenever code changes
const reactify = require('reactify'); //works with browserify to convert jsx to js
const server = require('gulp-server-livereload');
const concat = require('gulp-concat');

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
}));

function bundle() {
    return bundler
            .bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error')) //event handler
            .pipe(source('main.js')) //after bundle is done, put it into main.js
            .pipe(gulp.dest('./')); //put main.js into the cwd
};
bundler.on('update', bundle) //when we make a change, rebuild!

gulp.task('build', bundle);

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    }));
});   

gulp.task('default', ['build', 'serve']);

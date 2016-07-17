const webserver = require('gulp-webserver')
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('build',['babel','auto-prefixer','copy-html','copy-images'], ()=> {
  console.log('============== done building ==============')
})

gulp.task('dev',()=>{
  return gulp.src('./')
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }))
})

gulp.task('babel', () => {
  console.log('babel start running...')
  return gulp.src('./public/js/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/js/'))
})

gulp.task('copy-html',() => {
  return gulp.src('./public/*.html')
  .pipe(gulp.dest('./build/'))
})

gulp.task('copy-images',()=>{
  return gulp.src('./public/images/**')
  .pipe(gulp.dest('./build/images/'))
})

gulp.task('auto-prefixer', ()=>{
  return gulp.src('./public/css/*.css')
  .pipe(autoprefixer({
    browsers: ['> 1%', 'IE 10', 'last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./build/css/'));
})

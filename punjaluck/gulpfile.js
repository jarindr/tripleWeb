const webserver = require('gulp-webserver')
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const critical = require('critical')

gulp.task('build',['babel','auto-prefixer','copy-html','copy-main','minify-images'], ()=> {
})

gulp.task('dev', ()=>{
  return gulp.src('./')
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }))
})

gulp.task('babel', () => {
  return gulp.src('./public/js/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/js/'))
})

gulp.task('build:critical',['build'], () => {
  critical.generate({
    inline: true,
    base: 'build',
    src: 'index.html',
    dest: 'build/index.html',
    minify: true
  })
})

gulp.task('copy-html',() => {
  return gulp.src('./public/*.html')
  .pipe(gulp.dest('./build/'))
})

gulp.task('copy-main',() => {
  return gulp.src('./public/index/*.html')
  .pipe(gulp.dest('./build/index/'))
})

gulp.task('minify-images',()=>{
  return gulp.src('./public/images/**')
  .pipe(imagemin())
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

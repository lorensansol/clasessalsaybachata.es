// Development Mode
const devMode = false

// Common
import gulp from 'gulp'
import concat from 'gulp-concat'

// HTML
import pug from 'gulp-pug'

// CSS
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import comments from 'postcss-discard-comments'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import purgecss from 'gulp-purgecss'

// JavaScript
import babel from 'gulp-babel'
import terser from 'gulp-terser'

// IMG
import imagemin from 'gulp-imagemin'

// Browser Sync
import { init as server, stream, reload } from 'browser-sync'

gulp.task('html', () => {
  return gulp
    .src('src/views/pages/**/*.pug')
    .pipe(pug({ pretty: devMode }))
    .pipe(gulp.dest('docs'))
})

gulp.task('css', () => {
  if (devMode) {
    return gulp
      .src('src/scss/styles.scss')
      .pipe(sass())
      .pipe(gulp.dest('docs/css'))
      .pipe(stream())
  } else {
    return gulp
      .src('src/scss/styles.scss')
      .pipe(sass())
      .pipe(
        purgecss({
          content: ['docs/**/*.html', 'docs/js/*.js'],
          variables: true,
        })
      )
      .pipe(postcss([comments({ removeAll: true }), cssnano(), autoprefixer()]))
      .pipe(gulp.dest('docs/css'))
      .pipe(stream())
  }
})

const filesJs = [
  'src/js/scroll-behavior-smooth.js',
  'src/js/scroll-shot.js',
  'src/js/scroll-show.js',
  'src/js/lazy-load.js',
  'src/js/custom.js',
]

gulp.task('js', () => {
  if (devMode) {
    return gulp
      .src(filesJs)
      .pipe(concat('scripts.js'))
      .pipe(gulp.src('src/js/smooth-scroll.min.js'))
      .pipe(gulp.dest('docs/js'))
  } else {
    return gulp
      .src(filesJs)
      .pipe(babel())
      .pipe(concat('scripts.js'))
      .pipe(gulp.src('src/js/smooth-scroll.min.js'))
      .pipe(terser())
      .pipe(gulp.dest('docs/js'))
  }
})

gulp.task('img', () => {
  return gulp
    .src('src/img/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 50, progressive: true }),
        imagemin.optipng({ optimizationLevel: 1 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest('docs/img'))
})

gulp.task('rest', () => {
  return (
    gulp.src(['src/*.*', 'src/.*', 'src/*']).pipe(gulp.dest('docs')),
    gulp.src('src/fuentes/*.*').pipe(gulp.dest('docs/fuentes'))
  )
})

gulp.task('all', gulp.series('html', 'css', 'js', 'img', 'rest'))

gulp.task('default', () => {
  server({
    server: 'docs',
  })
  gulp.watch('src/views/**/*.pug', gulp.series('html', reload))
  gulp.watch('src/js/**/*.js', gulp.series('js', reload))
  gulp.watch('src/scss/**/*.scss', gulp.series('css'))
})

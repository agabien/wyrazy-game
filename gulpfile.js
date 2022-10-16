const {
    src,
    dest,
    series,
    watch
} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');

function styles() {
    return src('./sass/main.scss')
        .pipe(scss())
        .pipe(autoPrefixer('last 2 versions'))
        .pipe(cssMinify())
        .pipe(dest('./css/'))
}

function watchTask() {
    watch(
        [
            './sass/**/*.scss'
        ],
        series(styles)
    )
}

exports.default = series(styles, watchTask);
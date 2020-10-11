const gulp = require('gulp');

gulp.task('css', () => {
    const postcss = require('gulp-postcss');
    return gulp
        .src('src/index.css')
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-easy-import'),
            require('postcss-selector-matches'),
            require('postcss-focus-visible')({preserve: false}),
            require('postcss-nested'),
            require('autoprefixer'),
            require('postcss-csso')
        ]))
        .pipe(gulp.dest('docs'));
});

gulp.task('watch', () => {
    gulp.watch(
        [
            './src/styles/**/*.css',
        ],
        gulp.series('css'),
    );
});

gulp.task('default', (done) => {
    gulp.parallel('css')(done);
});
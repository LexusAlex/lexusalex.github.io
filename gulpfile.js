const babel = require('gulp-babel');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const through = require('through2')
let elev = require('./eleventy-cmd.js');

// Склеиваем и сжимаем стили. Результирующий файл загружаем в корень
gulp.task('styles:compress', () => {
    return gulp.src('src/styles/styles.css')
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-csso')
        ]))
        .pipe(gulp.dest('docs'));
});

// Инлайним стили в строку в html
gulp.task('styles:inline', () => {
    return gulp.src('docs/**/*.html')
        .pipe(replace(
            /<link rel="stylesheet" href="\/styles.css">/, () => {
                const style = fs.readFileSync('docs/styles.css', 'utf8');
                return '<style>' + style + '</style>';
            }
        ))
        .pipe(gulp.dest('docs'));
});

// Сжимаем скрипты
gulp.task('scripts:compress', () => {
    return gulp.src('src/scripts/scripts.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('docs'));
});
// Инлайним скрипты в строку html
gulp.task('scripts:inline', () => {
    return gulp.src('docs/**/*.html')
        .pipe(replace(
            /<script src="\/scripts.js"><\/script>/, () => {
                const script = fs.readFileSync('docs/scripts.js', 'utf8');
                return '<script>' + script + '</script>';
            }
        ))
        .pipe(gulp.dest('docs'));
});

// Запуск сервера для разработки
gulp.task('eleventy:develop', function(done) {
    process.argv.push('--serve');
    process.env.ELEVENTY_ENV = 'development';

    // You could instead use elev.write() here, but then you should add your own browsersync task
    elev.watch().then(function() {
        console.log('Eleventy loaded, serving to browser');
        elev.serve('3000');
        done();
    });
});

// Следим за изменениями файлов
gulp.task('watch', function() {
    gulp.watch(['./src/**/*.{njk,html,js,md,css}'], gulp.series('build:dev'));
});

// Запускаем девелопментскую разработку
gulp.task('dev', gulp.series(
    'eleventy:develop',
    'watch'
));

// Очистка лишнего
gulp.task('clean', () => {
    return del([
        'docs/styles',
        'docs/styles.css',
        'docs/scripts',
        'docs/scripts.js'
    ]);
});

// Сборка всего перед коммитом
gulp.task('build', gulp.series(
    'styles:compress',
    'styles:inline',
    'scripts:compress',
    'scripts:inline',
    'clean'
));
// Сборка для разработки
gulp.task('build:dev', gulp.series(
    'styles:compress',
    'scripts:compress',
));
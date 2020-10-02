var gulp         = require('gulp'),              // gulp
    sass         = require('gulp-sass'),         // компиляция css
    browserSync  = require('browser-sync'),      // автообновление
    cssnano      = require('gulp-cssnano'),      // минификация css
    del          = require('del'),               // удаление
    imagemin     = require('gulp-imagemin'),     // сжатие img
    cache        = require('gulp-cache'),        // кеширование
    autoprefixer = require('gulp-autoprefixer'), // автопрефиксер
    uglifyjs = require('gulp-uglifyjs'),         // минификатор для js
    concat = require('gulp-concat'),             // конкатенация
    rename = require('gulp-rename'),             // переименование
    htmlmin = require('gulp-htmlmin'),           // минификатор html
    htmlreplace = require('gulp-html-replace'); // удаление строк кода






gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});// КОМПИЛЯЦИЯ CSS И ПЕРЕЗАГРУЗКА СТРАНИЦЫ



gulp.task('scripts', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});// ПЕРЕЗАГРУЗКА СТРАНИЦЫ ПРИ ИЗМЕНЕНИЯХ В JS

gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});// ПЕРЕЗАГРУЗКА СТРАНИЦЫ ПРИ ИЗМЕНЕНИИ HTML


gulp.task('browser-sync', function() { 
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});// ВКЛАДКА ДЛЯ АВТООБНОВЛЕНИЯ

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});// СЖАТИЕ ИЗОБРАЖЕНИЙ

gulp.task('clear', function () {
    return cache.clearAll();
})// ОЧИСТКА КЭША


gulp.task('clean', function() {
    return del.sync('dist');
});// УДАЛЕНИЕ ПАПКИ ПЕРЕД СБОРКОЙ


gulp.task('buildHtml', function() {
	return gulp.src('app/*.html')
	//.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(htmlreplace({
        'css': 'css/style.min.css',
        'js': 'js/main.min.js'
    }))
	.pipe(gulp.dest('dist'))
});// ПЕРЕНОС HTML В ПРОДАКШН

gulp.task('buildFonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});// ПЕРЕНОС HTML В ПРОДАКШН

gulp.task('buildCss', function() {
	return gulp.src('app/css/*.css')
	.pipe(concat('style.css'))
	.pipe(gulp.dest('dist/css/'))
	.pipe(cssnano())	
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'))
});// ПЕРЕНОС С МИНИФИКАЦИЕЙ CSS В ПРОДАКШН

gulp.task('buildJs', function() {
	return gulp.src('app/js/**/*.js', '!app/js/**/*.min.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(uglifyjs())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/js'))
});// ПЕРЕНОС JS В ПРОДАКШН

gulp.task('buildLibs', function() {
	return gulp.src('app/libs/**/*')
	.pipe(gulp.dest('dist/libs'))
});// ПЕРЕНОС БИБЛИОТЕК И ПЛАГИНОВ В ПРОДАКШН

gulp.task('b', gulp.parallel('clean', 'img', 'buildHtml', 'buildCss', 'buildJs', 'buildFonts', 'buildLibs'));
// ВСЕ ПЕРЕНОСЫ ВМЕСТЕ


gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});// ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЙ В ФАЙЛАХ


gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
// КОМПИЛЯЦИЯ CSS => ЗАПУСК ВКЛАДКИ => ОТСЛЕЖИВАНИЕ
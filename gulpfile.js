// 1. less => css
// 2. create bundle.css
// 3. autoprefixer
// 4. sourcemaps
// 5. clean css (uglify)
// 6. live reloading

// описываем переменные и подключаем нужные модули
const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

// описываем конфигурацию
const config = {
	paths: {
		less: './src/less/**/*.less',
		html: './public/index.html'
	},
	output: {
		cssName: 'bundle.min.css',
		path: './public'
	}
};

// прописываем задачи для gulp
gulp.task('less', function () {
	return gulp.src(config.paths.less)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(concat(config.output.cssName))
		.pipe(cleanCss())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.output.path))
		.pipe(browserSync.stream());
});

// прослушка изменений в файлах
gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: config.output.path
		}
	});

	gulp.watch(config.paths.less, gulp.series('less'));
	gulp.watch(config.paths.html).on('change', browserSync.reload);
});

// дефолтные задачи
gulp.task('default', gulp.series('less', 'serve'));

var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');


//cssファイルの圧縮
gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css/'))
})
//sassのコンパイル
gulp.task('sass', function() {
	gulp.src('src/scss/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('src/css/'));
});
//ファイルの監視
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            index  : "index.html"      //インデックスファイル
        }
    });
});
//ブラウザリロード
gulp.task('bs-reload', function () {
    browserSync.reload();
});
//画像圧縮
var paths = {
	srcDir : 'src',
	dstDir : 'dist'
};
gulp.task('imagemin', function() {
	var srcGlob = paths.srcDir + '/**/*.+(jpg|jpeg|png|gif)';
	var dstGlob = paths.dstDir;
	gulp.src( srcGlob )
	.pipe( changed( dstGlob ))//srcGlobとdstGlobと見比べてdstGlobにまだ吐き出されてないもののみを圧縮
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),//オプション
	  imagemin.jpegtran({progressive: true}),//ファイルの読み込み時に低解像度→高解像度へ読み込むタイプ
	  imagemin.optipng({optimizationLevel: 5}),//最適化レベル
	]
  ))
	.pipe(gulp.dest( dstGlob ));//圧縮元のファイルがimg/の中の画像なのでdist/の中にimg/~と、imgディレクトリも自動で作られる
});
//
//監視するファイル
gulp.task('default', ['browser-sync', 'sass'], function () {
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch("src/**/*", ['sass', 'minify-css', 'imagemin', 'bs-reload']);
});
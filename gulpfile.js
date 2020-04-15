const { src, dest, series, parallel } = require("gulp"),
	clean = require("gulp-clean"),
	htmlmin = require("gulp-htmlmin"),
	minify = require("gulp-minify");

function cleanDist() {
	return src("dist/", { read: false, allowEmpty: true }).pipe(clean());
}

function copyDist() {
	return src(["src/**/*", "!src/assets/sass/**"]).pipe(dest("dist/"));
}

function minifyHtml() {
	return src("dist/**/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest("dist/"));
}

function minifyJs() {
	return src("src/**/*.js")
		.pipe(
			minify({
				ext: {
					min: ".js",
				},
				noSource: true,
			})
		)
		.pipe(dest("dist/"));
}

exports.default = series(cleanDist, copyDist, parallel(minifyJs, minifyHtml));

var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');

var del = require('del');

var paths = {
    scripts: ["src/js/lib/jquery-3.1.1.min.js",
        "src/js/lib/jquery-ui.min.js",
        "src/js/lib/tether.min.js",
        "src/js/lib/bootstrap.min.js",
        "src/js/lib/mdb.min.js",
        "src/js/lib/underscore-min.js",
        "src/js/lib/backbone-min.js",
        "src/js/lib/backbone-localstorage.min.js",
        "src/js/models/trans-model.js",
        "src/js/models/app-model.js",
        "src/js/collections/collection.js",
        "src/js/views/app-view.js",
        "src/js/views/last-trans-view.js",
        "src/js/views/earnings-view.js",
        "src/js/views/with-holdings-view.js",
        "src/js/views/net-pay-view.js",
        "src/js/views/trans-template-view.js",
        "src/js/views/print-view.js",
        "src/js/views/pay-period-view.js",
        "src/js/app.js"
    ],

    images: "src/assets/images/**/*",
    fonts: "src/font/roboto/*.*",
    css: "src/assets/*.css"

};

gulp.task('clean', function () {
    'use strict';
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['src/build']);
});

gulp.task('scripts', ['clean'], function () {

    'use strict';
    // Minify and copy all JavaScript
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('all.min.js'))

    .pipe(gulp.dest('src/build/js'));
});

// Copy all static images
gulp.task('images', ['clean'], function () {
    'use strict';
    return gulp.src(paths.images)

    // Pass in options to the task
    .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest('src/build/assets/images'));
});

gulp.task('fonts', ['clean'], function () {
    'use strict';
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('src/build/font/roboto'));
});

// Minify css and concatenate.
gulp.task('min-css', ['clean'], function () {
    'use strict';
    return gulp.src(paths.css)
        .pipe(cssmin())
        .pipe(concat('allcss.min.css'))
        .pipe(gulp.dest('src/build/assets'));
});

// Minify index html.
gulp.task('min-html', ['clean'], function () {
    'use strict';
    return gulp.src('src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('src/'));
});


// Rerun the task when a file changes
gulp.task('watch', function () {
    'use strict';
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.css, ['min-css']);
    gulp.watch(paths.indexHtml, ['min-html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images', 'fonts', 'min-css', 'min-html']);

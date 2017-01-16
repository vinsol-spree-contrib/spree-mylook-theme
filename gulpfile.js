const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const merge = require('merge-stream');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const gutil = require('gulp-util')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const babelify = require('babelify')
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const path = require('path');
const modRewrite  = require('connect-modrewrite');
const fs = require("fs");
const url = require("url");
const glob = require('glob');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var dev = true;
// var handlebars_helpers = require('./app/scripts/helpers.js');

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    // .pipe($.plumber())
    // .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    // .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    // .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    // .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    var testFiles = glob.sync('./app/scripts/*.js');
    testFiles.push('./bower_components/spree-frontend-integration/lib/index.js')

    gulp.src('app/helpers/*.js')
    .pipe(gulp.dest('.tmp/helpers'))

    return browserify({
      entries: testFiles,
      transform: [babelify]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/scripts'))
});


function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('template', ()=>{
  gulp.src('./node_modules/handlebars/dist/handlebars.runtime.js')
    .pipe(gulp.dest('.tmp/scripts/'));

  var partials = gulp.src(['app/**/_*.hbs'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
      imports: {
        processPartialName: function(fileName) {
          return JSON.stringify(path.basename(fileName, '.js').substr(1));
        }
      }
    }
  ));

  var templates = gulp.src('app/**/[^_]*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MyApp.html',
      noRedeclare: true // Avoid duplicate declarations
    }
  ));

  return merge(partials, templates)
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('.tmp/scripts'));

})

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
  runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'template', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        },
        middleware: [
          modRewrite([
           '!\\.\\w+$ /index.html [L]'
          ])
        ]
      }
    });

    gulp.watch([
      'app/*.html',
      'app/images/**/*',
      '.tmp/fonts/**/*'
    ]);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/helpers/*.js', ['scripts']);
    gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
    gulp.watch('app/**/*.hbs', ['template'])
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep'], 'build', resolve);
  });
});

/**
 * Gulp to run automated tasks and bundling the files for dev/prod to use.
 *
 * @see http://codyburleson.com/2015/09/11/better-error-messages-from-gulp-using-gulp-util/
 * @see http://andrewhathaway.net/environment-based-configuration-for-javascript-applications/
 * @see https://knpuniversity.com/screencast/gulp/minify-only-production
 * @see https://css-tricks.com/gulp-for-beginners/
 */

const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const cssnano = require("gulp-cssnano");
const mainBowerFiles = require("main-bower-files");
const util = require("gulp-util");
const flatten = require("gulp-flatten");
const del = require("del");
const RunSequence = require("run-sequence");
const exec = require("child_process").exec;
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devPort = 8080;
const config = require("./webpack.config.dev");
const isProduction = !!util.env.production;

/**
 * Cleans the build directory
 */
gulp.task("clean", function(cb) {
  del.sync("./public/assets", cb);
});

/**
 * Bundle the js files of bower components
 */
gulp.task("bower:js", function() {
  return gulp.src(mainBowerFiles("**/*.js"))
    .pipe(concat("bower.js").on("error", util.log))
    .pipe(uglify().on("error", util.log))
    .pipe(gulp.dest("./public/assets"));
});

/**
 * Bundle the css files of bower components
 */
gulp.task("bower:css", function() {
  return gulp.src(mainBowerFiles("**/*.scss"))
    .pipe(sass().on("error", util.log))
    .pipe(concat("bower.css").on("error", util.log))
    .pipe(cssnano().on("error", util.log))
    .pipe(gulp.dest("./public/assets"));
});

/**
 * Convert scss to css
 * Minfiy if it is production
 */
gulp.task("sass", function() {
  return gulp.src([
      "./app/assets/scss/importer.scss"
    ])
    .pipe(sass().on("error", util.log))
    .pipe(concat("style.css").on("error", util.log))
    .pipe(isProduction ? cssnano().on("error", util.log) : util.noop())
    .pipe(gulp.dest("./public/assets"));
});

/**
 * Watch for scss file changes and run sass task
 */
gulp.task("sass:watch", function() {
  return gulp.watch("./app/assets/scss/**/*.scss", ["sass"]);
});

/**
 * Bundle the common js files
 */

gulp.task("js", function() {
  return gulp.src(["./app/assets/js/**/*"])
    .pipe(babel().on("error", util.log))
    .pipe(concat("main.js").on("error", util.log))
    .pipe(isProduction ?
      uglify().on("error", util.log) : util.noop())
    .pipe(gulp.dest("./public/assets"));
});

/**
 * Copy fonts to build folder
 */
gulp.task("copy:fonts", function() {
  return gulp.src([
      "./app/assets/fonts/**/*",
      "./font-awesome/fonts/**/*"
    ])
    .pipe(gulp.dest("./public/assets/fonts"));
});

/**
 * Copy images to build folder
 */
gulp.task("copy:images", function() {
  return gulp.src(["./app/assets/images/**/*"], {
      base: "app/assets"
    })
    .pipe(gulp.dest("./public/assets"));
});

/**
 * Copy index.html to public
 */
gulp.task("copy:html", function() {
  return gulp.src(["./app/index.html"], {
    base: "app"
   })
   .pipe(gulp.dest("./public/assets"));
});

/**
 * Copy all jsons to public
 */
gulp.task("copy:json", function() {
  return gulp.src(["./widgets/**/src/jsons/*.json"])
   .pipe(flatten())
   .pipe(gulp.dest("./public/assets/jsons"));
});

/**
 * Start the server if it is in development mode
 */
gulp.task("webpack-dev-server", function() {
  var server = new WebpackDevServer(webpack(config), {
    // webpack-dev-server options
    publicPath: config.output.publicPath,
    cache: true,
    colors: true,
    hot: true,
    historyApiFallback: true,
    contentBase: __dirname + "/public/assets"
  });
  server.listen(devPort, "localhost", function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Listening at localhost:8080");
  });
});

/**
 * Build the react components if it is not in development environment
 */
gulp.task("buildJsxInProd", function (cb) {
  exec("webpack --config webpack.config.prod.js", function(er, stdout, stderr) {
    console.log("\n Build chunks details... \n", stdout);
    if(stderr) util.log("Error in building JSX components...", stderr);
    cb(er);
  });
});

/**
 * Tasks to run in development environment
 */
gulp.task("default", function(cb) {
  RunSequence([
    "clean",
    "bower:js",
    "bower:css",
    "sass",
    "js",
    "copy:fonts",
    "copy:images",
    "copy:json",
    "copy:html",
    "sass:watch",
    "webpack-dev-server"
  ], cb);
});

/**
 * Tasks to run in production environment
 */
gulp.task("build", function(cb) {
  RunSequence([
    "clean",
    "bower:js",
    "bower:css",
    "sass",
    "js",
    "copy:fonts",
    "copy:images",
    "copy:json",
    "copy:html",
    "buildJsxInProd"
  ], cb);
});

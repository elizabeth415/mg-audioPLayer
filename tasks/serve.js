/**
 * mg-audioPlayer
 * (c) elizabethnorthrup415@gmail.com <elizabethnorthrup415@gmail.com>
 */

var browserSync = require('browser-sync');
var config = require('./.taskconfig');
var gulp = require('gulp');
var sequence = require('run-sequence');
var $util = require('gulp-util');

/**
 * Serves the app locally. In production, watch option is not supported. This is meant for
 * development only.
 *
 * @param {Boolean} debug
 * @param {Number}  port
 * @param {Boolean} watch
 */
gulp.task('serve', function() {
  if (config.env.watch && !config.debug) {
    $util.log($util.colors.yellow('Watch is not supported in production. Please specify ') + '--debug' + $util.colors.yellow(' instead.'));
    return;
  }

  browserSync(config.serve.browserSync);

  // Watch for changes.
  if (config.env.watch) {
    var entries = config.watch.entries;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      gulp.watch(entry.files, entry.tasks);
    }
  }
});

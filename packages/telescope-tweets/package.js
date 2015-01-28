Package.describe({
  summary: 'Rank posts by tweet count',
  version: '0.1.0',
  name: 'telescope-tweets'
});

Package.onUse(function (api) {

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  api.use([
    'jquery',
    'underscore',
    'templating',
    'telescope-base',
    'telescope-lib',
    'telescope-singleday',
    'fourseven:scss',
    'percolatestudio:synced-cron',
    'dandv:rate-limit'
    ]);

    // ---------------------------------- 2. Files to include ----------------------------------

    // both

    api.add_files([
      'lib/main.js',
      ], ['client', 'server']);

      // client

      api.add_files([
        'lib/client/templates/custom_post_info.html',
        'lib/client/templates/custom_post_actions.html',
        'lib/client/templates/custom_hotness_post.html',
        'lib/client/templates/custom_hotness_post.js',
        'lib/client/templates/custom_blank.html',
        'lib/client/templates/custom_post_content.html',
        'lib/client/templates/custom_post_content.js',
        'lib/client/bxslider/jquery.bxslider.min.js',
        'lib/client/bxslider/jquery.bxslider.css',
        'lib/client/share-button/share.min.js'
        ], ['client']);

        // server

        api.add_files([
          'lib/server/cron.js',
          'lib/server/tweets.js'
          ], ['server']);

          // -------------------------------- 3. Variables to export --------------------------------

          api.export([
            'postModules'
            ]);

});

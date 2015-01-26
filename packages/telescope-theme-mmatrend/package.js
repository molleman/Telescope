Package.describe({
  summary: "Telescope MMA Trend theme",
  version: '0.1.0',
  name: "telescope-theme-mmatrend"
});

Package.onUse(function (api) {

  api.use(['fourseven:scss', 'telescope-theme-hubble'], ['client']);

  api.addFiles([
    'lib/client/stylesheets/screen.css',
    ], ['client']);

  });

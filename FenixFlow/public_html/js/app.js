var App =
        angular.module('FenixFlow', ['ui.router', 'pascalprecht.translate', 'youtube-embed'])

        .config(['$translateProvider', function ($translateProvider) {
                $translateProvider.preferredLanguage('pl');
                $translateProvider.useStaticFilesLoader({
                    prefix: 'assets/i18n/',
                    suffix: '.json'
                });

                // Enable escaping of HTML
                $translateProvider.useSanitizeValueStrategy('escape');
            }]);

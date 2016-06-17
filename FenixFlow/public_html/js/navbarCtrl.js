(function () {
    'use strict';
    App.controller('NavbarController', NavbarController);
    NavbarController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$translate', '$timeout', 'langService', 'resourceService', 'APP_CONFIG'];
    function NavbarController($scope, $rootScope, $state, $stateParams, $translate, $timeout, langService, resourceService, APP_CONFIG) {
        $scope.activeItem = {};
        $rootScope.sLang = {};

        $scope.languagesAvailable = [];
        $scope.changeLanguage = function (key) {
            selectLanguage(key);

            $state.go($state.current.name, $stateParams, {reload: true});
        };

        function selectLanguage(key) {
            $rootScope.sLang = key;
            $translate.use(key.code);
            localStorage.selectedLang = key.code;
        }

        (function () {
            var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/menu";
            resourceService.getFileDate(dataSource, 'json').then(function (result) {
                $scope.menuItems = result;
            });
            langService.getAvailableLanguages().then(function (result) {
                $scope.languagesAvailable = result;
                langService.getSelectedLanguage()
                        .then(function (lang) {
                            selectLanguage(lang);
                        });
            });


        })();
    }
})();
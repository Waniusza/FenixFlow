(function () {
    'use strict';
    App.controller('NavbarController', NavbarController);
    NavbarController.$inject = ['$scope', '$state', '$stateParams', '$translate', '$timeout', 'langService', 'resourceService', 'APP_CONFIG'];
    function NavbarController($scope, $state, $stateParams, $translate, $timeout, langService, resourceService, APP_CONFIG) {
        $scope.changeState = _changeState;
        $scope.activeItem = {};
        $scope.sLang;
        function _changeState() {
            $timeout(function () {
                $scope.activeItem = $state.$current;
            }, 100);
        }
        _changeState();
        $scope.languagesAvailable = {};
        $scope.changeLanguage = function (key) {
            $scope.sLang = key;
            $translate.use(key.code);
            localStorage.selectedLang = key.code;
            $state.transitionTo($state.$current, $stateParams, {reload: true});
        };
        (function () {
            var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/menu";
            resourceService.getFileDate(dataSource, 'json').then(function (result) {
                $scope.menuItems = result;
            });
            langService.getAvailableLanguages().then(function (result) {

                $scope.languagesAvailable = result;
                $scope.sLang = langService.getSelectedLanguage();
                $translate.use($scope.sLang.code);
            });
        })();
    }
})();
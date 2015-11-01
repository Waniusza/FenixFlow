App
        .controller('AppController', ['$scope', 'APP_CONFIG', function ($scope, APP_CONFIG) {
                $scope.prefix = APP_CONFIG.FILE_PREFIX;

                $('body').on('mouseover', 'div', function (event) {
                    angular.forEach(document.getElementsByClassName("cbalink"), function (element) {
                        element.hidden = true;
                    });

                    return false;
                });
            }]);
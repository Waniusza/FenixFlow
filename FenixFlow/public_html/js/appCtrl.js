App
        .controller('AppController', ['$scope', '$translate', 'resourceService', 'APP_CONFIG', function ($scope, $translate, resourceService, APP_CONFIG) {
                $scope.prefix = APP_CONFIG.FILE_PREFIX;
                $('body').on('mouseover', 'div', function (event) {
                    angular.forEach(document.getElementsByClassName("cbalink"), function (element) {
                        element.hidden = true;
                    });
                    document.getElementById("bmone2n-1276.1.1.1").hidden = true;
                    return false;
                });


            }]);
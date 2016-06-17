App.
        directive('nav', function () {
            return {
                templateUrl: 'schema/navbar.html',
                controller: 'NavbarController'
            };
        })
        .directive('header', function () {
            return {
                templateUrl: 'schema/header.html',
                controller: 'HeaderController'
            };
        })
        .directive('viewTitle', ['$translate', '$rootScope', 'APP_CONFIG', function ($translate, $rootScope, APP_CONFIG) {
                function load(scope, text) {

                    langService.getSelectedLanguage()
                            .then(function (lang) {
                                $translate.use(lang.code);
                                $translate(text)
                                        .then(function (ok) {

                                            var text = ok.split('');
                                            var firstLetter = text.shift().toUpperCase();

                                            text = text.join("");
                                            scope.letters = [];

                                            angular.forEach(text, function (letter) {
                                                scope.letters.push({src: APP_CONFIG.FILE_PREFIX + "/assets/image/firstLetters/" + letter.toUpperCase() + ".jpg"});
                                            });

                                            if ($rootScope.sLang.code && $rootScope.sLang.code.startsWith('ru')) {
                                                scope.shiftedText = ok
                                            } else {
                                                scope.shiftedText = text;
                                            }
                                            scope.logoDest = APP_CONFIG.FILE_PREFIX + "/assets/data/foto/logobcz.png";
                                            scope.firstImageSrc = {src: APP_CONFIG.FILE_PREFIX + "/assets/image/firstLetters/" + firstLetter + ".jpg", alt: firstLetter};
                                        });

                            });

                }

                return {
                    restrict: 'E',
                    templateUrl: 'schema/title.html',
                    scope: {
                        text: "@",
                        prefix: "=",
                        logoDest: "@"
                    },
                    controller: ['$scope', '$filter', 'langService', function ($scope, $filter, langService) {
                            $scope.logoDest = APP_CONFIG.FILE_PREFIX + "/assets/data/foto/logobcz.png";


                            $scope.$watch(
                                    function () {
                                        return $filter('translate')($scope.text);
                                    },
                                    function (newval) {

                                        var text = newval.split('');
                                        var firstLetter = text.shift().toUpperCase();

                                        text = text.join("");
                                        if ($rootScope.sLang.code !== undefined && $rootScope.sLang.code.startsWith('ru')) {
                                            $scope.shiftedText = newval
                                            $scope.firstImageSrc = {style: {visibility: "hidden"}};
                                        } else {
                                            $scope.shiftedText = text;
                                            $scope.firstImageSrc = {src: APP_CONFIG.FILE_PREFIX + "/assets/image/firstLetters/" + firstLetter + ".jpg", alt: firstLetter, style: {visibility: "visible"}}
                                        }
                                        ;
                                    }
                            );
                        }]
                }
            }])
        .directive('footer', function () {
            return {
                templateUrl: 'schema/footer.html'
            };
        })
        .directive('imgLoad', function () {
            return {
                link: function (scope, element, attrs) {
                    element.bind("load", function (e) {
                        this.className = this.className + " loaded";
                    });
                }
            }
        });
;
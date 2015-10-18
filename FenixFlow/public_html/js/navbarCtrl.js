App
        .controller('NavbarController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {
                $scope.changeState = _changeState;
                $scope.activeItem = {};
                $scope.menuItems = [{
                        name: 'Home',
                        sref: 'app.description',
                        title: 'Description.'
                    }, {
                        name: 'Foto',
                        sref: 'app.foto',
                        title: 'Show our fotos..'
                    }, {
                        name: 'Contact',
                        sref: 'app.contact',
                        title: 'Contact us.'
                    }, {
                        name: 'Ofert',
                        sref: 'app.ofert',
                        title: 'See our ofert.'
                    }, {
                        name: 'Team',
                        sref: 'app.team',
                        title: 'See our team.'
                    }
                ];

                function _changeState() {
                    $timeout(function () {
                        $scope.activeItem = $state.$current;
                    }, 100);
                }
                _changeState();

            }]);
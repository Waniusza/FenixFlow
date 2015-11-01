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
        .directive('viewTitle', function () {
            return {
                restrict: 'E',
                templateUrl: 'schema/title.html',
                scope: {
                    text: "@",
                    prefix: "="
                }
            };
        })
        .directive('footer', function () {
            return {
                templateUrl: 'schema/footer.html'
            };
        });
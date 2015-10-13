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
        .directive('footer', function () {
            return {
                templateUrl: 'schema/footer.html'
            };
        });
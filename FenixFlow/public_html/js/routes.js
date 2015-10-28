App.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/app/desc");
    //
    // Now set up the states
    $stateProvider
            .state('app', {
                url: "/app",
                controller: 'AppController',
                templateUrl: "components/app.html"
            })
            .state('app.description', {
                url: "/desc",
                templateUrl: "components/description/description-view.html",
                controller: "DescriptionController"
            })

            .state('app.foto', {
                url: "/foto",
                templateUrl: "components/foto/foto-view.html",
                controller: "FotoController"
            })
            .state('app.ofert', {
                url: "/ofert",
                templateUrl: "components/ofert/ofert-view.html",
                controller: "OfertController"
            })

            .state('app.team', {
                url: "/team",
                templateUrl: "components/team/team-view.html",
                controller: "TeamController"
            })
            .state('app.contact', {
                url: "/contact",
                templateUrl: "components/contact/contact-view.html",
                controller: "ContactController"
            });


});
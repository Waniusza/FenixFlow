App.config(function($stateProvider, $urlRouterProvider) {
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
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    
    .state('app.foto', {
      url: "/desc",
      templateUrl: "components/foto/foto-view.html"
    })
    
    .state('app.contact', {
      url: "/desc",
      templateUrl: "components/contact/contact-view.html"
    })
    
    .state('app.ofert', {
      url: "/desc",
      templateUrl: "components/ofert/ofert-view.html"
    })
    
    .state('app.team', {
      url: "/team",
      templateUrl: "components/team/team-view.html"
    });
});
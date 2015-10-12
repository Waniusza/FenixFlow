App.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('app', {
      url: "/state1",
      controller: 'AppController',
      templateUrl: "components/state1.html"
    })
    .state('app.list', {
      url: "/list",
      templateUrl: "components/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "components/state2.html"
    });
});
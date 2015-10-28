(function () {
    'use strict';
    App.controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', 'resourceService'];

    function ContactController($scope, resourceService) {

        $scope.title = "Contact";
        $scope.contactData = {};
        var dataSource = "/FenixFlow/assets/data/jsons/contact.json";
        (function init() {
            console.log("ContactController init");
            resourceService.getFileDate(dataSource).then(function (result) {
                $scope.contactData = result;
                console.log("ContactController contData", $scope.contactData);
            });
        })();
    }
    ;
})();
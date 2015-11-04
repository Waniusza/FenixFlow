(function () {
    'use strict';
    App.controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', 'resourceService', 'APP_CONFIG'];

    function ContactController($scope, resourceService, APP_CONFIG) {

        $scope.title = "Contact";
        $scope.contactData = {};
        var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/contact";
        (function init() {
            console.log("ContactController init");
            resourceService.getFileDate(dataSource, "json", true).then(function (result) {
                $scope.contactData = result;
                console.log("ContactController contData", $scope.contactData);
            });
        })();
    }
    ;
})();
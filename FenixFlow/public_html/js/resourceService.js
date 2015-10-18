(function () {


    App.service("resourceService", ResourceService);

    ResourceService.$inject = ['$q'];

    function ResourceService($q) {
        return {
            getFileDate: _getFileDate
        };

        function _getFileDate(source) {
            return  $q(function (resolve, reject) {
                $.get(source, function (data) {
                    resolve(data);
                });
            });
        }

    }

})();
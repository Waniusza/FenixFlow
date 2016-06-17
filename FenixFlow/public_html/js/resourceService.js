
App.service("resourceService", ResourceService);

ResourceService.$inject = ['$q', 'langService'];

function ResourceService($q, langService) {
    return {
        getFileDate: _getFileDate
    };

    function _getFileDate(source, format, isInternationalized) {
        return  $q(function (resolve, reject) {
            if (isInternationalized === true) {
                langService.getSelectedLanguage()
                        .then(function (res) {
                            console.log("Got selected language: ", res);
                            source = source + "-" + res.code;
                            source = source + "." + format;
                            console.log("Get data from: ", source);
                            $.get(source, function (data) {
                                console.log("Got data from: ", source, "data -> ", data);
                                resolve(data);
                            });
                        });
            } else {
                source = source + "." + format;
                console.log("Get data from: ", source);
                $.get(source, function (data) {
                    console.log("Got data from: ", source, "data -> ", data);
                    resolve(data);
                }, "json");
            }
        });
    }
}

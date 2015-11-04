
    App.service("resourceService", ResourceService);

    ResourceService.$inject = ['$q', '$translate'];

    function ResourceService($q, $translate) {
        return {
            getFileDate: _getFileDate
        };

        function _getFileDate(source, format, isInternationalized) {
            return  $q(function (resolve, reject) {
                if (isInternationalized === true && localStorage.selectedLang !==undefined) {
                    source = source + "-" + localStorage.selectedLang;
                } else if (isInternationalized === true) {
                    localStorage.selectedLang = $translate.preferredLanguage();
                    source = source + "-" + localStorage.selectedLang;
                }
                
                source = source + "." + format;
                $.get(source, function (data) {
                    console.log("Got data from: ", source, "data -> ", data);
                    resolve(data);
                });
            });
        }

    }

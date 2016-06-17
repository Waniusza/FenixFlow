(function () {


    App.factory("langService", LangService);
    LangService.$inject = ['$q', '$translate', 'APP_CONFIG'];
    function LangService($q, $translate, APP_CONFIG) {
        return {
            getAvailableLanguages: _getAvailableLanguages,
            getSelectedLanguage: _getSelectedLanguage
        };
        var langs = null;

        function _loadLangs() {
            return  $q(function (resolve, reject) {
                var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/langs.json";
                $.get(dataSource, function (data) {
                    console.log("Załadowałem języki", typeof data, data);
                    resolve(data);
                });
            });
        }

        function _getAvailableLanguages() {
            return  $q(function (resolve, reject) {
                if (langs === null || langs === undefined) {
                    _loadLangs()
                            .then(function (data) {
                                langs = data;
                                resolve(langs)
                            });
                } else {
                    resolve(langs);
                }
            });
        }


        function _getSelectedLanguage() {
            console.log("[_getSelectedLanguage] langs ", langs);
            var langCode;
            if (localStorage.selectedLang === undefined || localStorage.selectedLang == '') {
                langCode = $translate.preferredLanguage();
            } else {
                langCode = localStorage.selectedLang;
            }

            return  $q(function (resolve, reject) {
                _getAvailableLanguages().
                        then(function (langs) {
                            angular.forEach(langs, function (lang) {
                                if (lang.code === langCode) {
                                    console.log("Got selected language ", lang);
                                    resolve(lang);
                                }
                            });
                        });
            });
        }
    }
})();
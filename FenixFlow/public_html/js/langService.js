(function () {


    App.factory("langService", LangService);
    LangService.$inject = ['$q', '$translate', 'resourceService', 'APP_CONFIG'];
    function LangService($q, $translate, resourceService, APP_CONFIG) {
        return {
            getAvailableLanguages: _getAvailableLanguages,
            getSelectedLanguage: _getSelectedLanguage
        };
        var langs = null;

        function _loadLangs() {
            var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/langs";
            return  $q(function (resolve, reject) {
                resourceService.getFileDate(dataSource, 'json').then(function (result) {
                    langs = result;
                    resolve(result);
                });
            });
        }

        function _getAvailableLanguages(source) {
            return  $q(function (resolve, reject) {
                if (langs === null || langs === undefined) {
                    _loadLangs().then(function (data) {
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
            var result;
            var langCode;
            if (localStorage.selectedLang === undefined || localStorage.selectedLang == '') {
                langCode = $translate.preferredLanguage();
            } else {
                langCode = localStorage.selectedLang;
            }
            angular.forEach(langs, function (lang) {
                
                if (lang.code === langCode) {
                    result = lang;
                }
            });
            return result;
        }
    }
})();
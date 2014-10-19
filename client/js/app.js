angular.module('app', ['nvd3'])
    .constant('partialUrl', './partials')
    .run(function ($rootScope, partialUrl) {
        $rootScope.partialUrl = partialUrl;
    });

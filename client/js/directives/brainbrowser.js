"use strict";
/* globals FieldDB */


/**
 * @ngdoc directive
 * @name fielddbAngularApp.directive:brainbrowser
 * @description
 * # brainbrowser
 */
angular.module("app").directive("brainbrowser", function() {

  var controller = function($scope, $location, $timeout) {
    console.log("Loading brain browser");

  };
  controller.$inject = ["$scope", "$location", "$timeout"];

  /* Directive declaration */
  var directiveDefinitionObject = {
    templateUrl: "partials/brainbrowser.html", // or // function(tElement, tAttrs) { ... },
    restrict: "A",
    transclude: false,
    // scope: {
    //   authentication: "=json"
    // },
    controller: controller,
    link: function postLink() {},
    priority: 0,
    replace: true,
    controllerAs: "stringAlias"
  };
  return directiveDefinitionObject;
});

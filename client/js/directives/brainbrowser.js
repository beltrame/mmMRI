"use strict";
/* globals FieldDB */


/**
 * @ngdoc directive
 * @name fielddbAngularApp.directive:brainbrowser
 * @description
 * # brainbrowser
 */
angular.module("app").directive("brainbrowser", function() {

  var controller = function($scope, $timeout) {
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
    link: function postLink(scope, element) {
      console.log("putting element in scope so it can be used by brain browser");
      scope.element = element[0];

      BrainBrowser.config.set("worker_dir", "js/brainbrowser/workers/");

      // Custom configuration for the Surface Viewer demo app.
      BrainBrowser.config.set("model_types.freesurferasc.format_hint", 'You can use <a href="http://surfer.nmr.mgh.harvard.edu/fswiki/mris_convert" target="_blank">mris_convert</a> to convert your binary surface files into .asc format.');
      BrainBrowser.config.set("intensity_data_types.freesurferasc.format_hint", 'You can use <a href="http://surfer.nmr.mgh.harvard.edu/fswiki/mris_convert" target="_blank">mris_convert</a> to convert your binary surface files into .asc format.');

      BrainBrowser.config.set("color_maps", [{
        name: "Spectral",
        url: "color-maps/spectral.txt",
      }, {
        name: "Thermal",
        url: "color-maps/thermal.txt",
      }, {
        name: "Gray",
        url: "color-maps/gray-scale.txt",
      }, {
        name: "Blue",
        url: "color-maps/blue.txt",
      }, {
        name: "Green",
        url: "color-maps/green.txt",
      }]);

      if (!scope.element) {
        console.warn("the element is missing, not starting the brain browser");
        return;
      }

      /////////////////////////////////////
      // Start running the Surface Viewer
      /////////////////////////////////////
      window.viewer = BrainBrowser.SurfaceViewer.start(scope.element, function(viewer) {

      });
    }
  };
  return directiveDefinitionObject;
});

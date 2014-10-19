angular.module('app')
    .controller('MainCtrl', function($scope, $location, dataTransformOrPipelineData) {
        $scope.dataTransformOrPipelines = dataTransformOrPipelineData.getAll();
        $scope.dataTransformOrPipeline = null;

        $scope.useLogScaleForBubbleSize = false;
        $scope.toogleButtonScale = function() {
            $scope.useLogScaleForBubbleSize = !$scope.useLogScaleForBubbleSize;
        };

        $scope.selectBenchmark = function(dataTransformOrPipeline) {
            $scope.dataTransformOrPipeline = dataTransformOrPipeline;
            if (dataTransformOrPipeline) {
                $location.url('/dataTransformOrPipeline/' + dataTransformOrPipelineUrl(dataTransformOrPipeline));
            }
        };

        var stopBenchmarksWatch = $scope.$watch('dataTransformOrPipelines.length', function(length) {
            if (length) {
                if ($location.url().indexOf("/dataTransformOrPipeline/") == 0) {
                    var dataTransformOrPipelineName = $location.url().match(/^\/dataTransformOrPipeline\/(.+)/);
                    if (dataTransformOrPipelineName) {
                        dataTransformOrPipelineName = dataTransformOrPipelineName[1];
                        angular.forEach($scope.dataTransformOrPipelines, function(dataTransformOrPipeline) {
                            if (dataTransformOrPipelineName === dataTransformOrPipelineUrl(dataTransformOrPipeline)) {
                                $scope.selectBenchmark(dataTransformOrPipeline);
                            }
                        });
                    } else {
                        $scope.selectBenchmark($scope.dataTransformOrPipelines[0]);
                    }
                } else {
                    $scope.selectBenchmark($scope.dataTransformOrPipelines[0]);
                }
                stopBenchmarksWatch();
            }
        });


        function dataTransformOrPipelineUrl(dataTransformOrPipeline) {
            return encodeURIComponent(dataTransformOrPipeline.name.replace(/ /, '-'));
        }
    });

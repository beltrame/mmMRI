angular.module('app')
    .controller('MainCtrl', function($scope, $location, dataTransformOrPipelineData) {
        $scope.dataTransformOrPipelines = dataTransformOrPipelineData.getAll();
        $scope.dataTransformOrPipeline = null;

        $scope.matrix = [
            [, "subject1", "subject2", "subject3", "subject4", "subject5", "subject6", "subject7", "subject8", "subject9", "subject10", "subject11", "subject12"],
            ["subject1", 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["subject2", 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["subject3", 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ["subject4", 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            ["subject5", 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            ["subject6", 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            ["subject7", 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            ["subject8", 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            ["subject9", 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            ["subject10", 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            ["subject11", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            ["subject12", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        ];
        
        $scope.layers = [{
            label: "layer1",
            visibility: 50
        }, {
            label: "layer2",
            visibility: 20
        }, {
            label: "layer3",
            visibility: 0
        }];

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

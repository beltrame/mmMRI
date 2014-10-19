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
            color: "#00ff00",
            visibility: 50
        }, {
            label: "layer2",
            color: "#0000ff",
            visibility: 20
        }, {
            label: "layer3",
            color: "#ff0000",
            visibility: 0
        }];

        $scope.barchart1 = {
            options: {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x: function(d) {
                        return d.label;
                    },
                    y: function(d) {
                        return d.value;
                    },
                    showValues: true,
                    valueFormat: function(d) {
                        return d3.format(',.4f')(d);
                    },
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'X Axis'
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        axisLabelDistance: 30
                    }
                },
            },
            data: [{
                key: "Cumulative Return",
                values: [{
                    "label": "A",
                    "value": -29.765957771107
                }, {
                    "label": "B",
                    "value": 0
                }, {
                    "label": "C",
                    "value": 32.807804682612
                }, {
                    "label": "D",
                    "value": 196.45946739256
                }, {
                    "label": "E",
                    "value": 0.19434030906893
                }, {
                    "label": "F",
                    "value": -98.079782601442
                }, {
                    "label": "G",
                    "value": -13.925743130903
                }, {
                    "label": "H",
                    "value": -5.1387322875705
                }]
            }]
        };


        /* Random Data Generator (took from nvd3.org) */
        function generateData(groups, points) { //# groups,# points per group
            var data = [],
                shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
                random = d3.random.normal();

            for (var i = 0; i < groups; i++) {
                data.push({
                    key: 'Group ' + i,
                    values: [],
                    slope: Math.random() - .01,
                    intercept: Math.random() - .5
                });

                for (var j = 0; j < points; j++) {
                    data[i].values.push({
                        x: random(),
                        y: random(),
                        size: Math.random(),
                        shape: shapes[j % 6]
                    });
                }
            }
            return data;
        }
        $scope.scatterplot1 = {
            options: {
                chart: {
                    type: 'scatterPlusLineChart',
                    height: 450,
                    color: d3.scale.category10().range(),
                    scatter: {
                        onlyCircles: false
                    },
                    showDistX: true,
                    showDistY: true,
                    tooltipContent: function(key) {
                        return '<h3>' + key + '</h3>';
                    },
                    transitionDuration: 350,
                    xAxis: {
                        axisLabel: 'X Axis',
                        tickFormat: function(d) {
                            return d3.format('.02f')(d);
                        }
                    },
                    yAxis: {
                        axisLabel: 'Y Axis',
                        tickFormat: function(d) {
                            return d3.format('.02f')(d);
                        },
                        axisLabelDistance: 30
                    }
                }
            },
            data: generateData(4, 40)
        };


        $scope.runScript = function(scriptname) {
            console.warn("security hole, this should not permit execution of unknown scripts.");
            scriptname = scriptname.trim().replace(/[\/\\]+/g, "");
            console.log("TODO call api to run this " + scriptname + "script on the data.");
        };

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
                if ($location.url().indexOf("/dataTransformOrPipeline/") === 0) {
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

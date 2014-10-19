angular.module('app')
    .service('dataTransformOrPipelineData', function ($http, $q, Benchmark) {
        var dataTransformOrPipelines = [];
        // 184.107.193.50:8080/performance
        return {
            getAll: function () {
                $http.get("http://184.107.193.50:8080/performance").success(function (data) {
                    var dataTransformOrPipelineByName = {};

                    angular.forEach(data.result, function (dataTransformOrPipeline) {
                        var name = dataTransformOrPipeline.dataTransformOrPipelineName + " " + dataTransformOrPipeline.dataTransformOrPipelineVersion;
                        if (!dataTransformOrPipelineByName[name]) {
                            dataTransformOrPipelineByName[name] = [];
                        }

                        dataTransformOrPipelineByName[name].push(dataTransformOrPipeline);
                    });

                    var existingBenchmarks = {};
                    angular.forEach(dataTransformOrPipelines, function (dataTransformOrPipeline) {
                        existingBenchmarks[dataTransformOrPipeline.name] = dataTransformOrPipeline;
                    });

                    angular.forEach(dataTransformOrPipelineByName, function (allData, name) {
                        if (!existingBenchmarks.hasOwnProperty(name)) {
                            dataTransformOrPipelines.push(new Benchmark(name, allData));
                        } else {
                            var dataTransformOrPipeline = existingBenchmarks[name];
                            angular.forEach(allData, function (data) {
                                if (!dataTransformOrPipeline.hasEntry(data)) {
                                    dataTransformOrPipeline.addEntry(data);
                                }
                            });
                        }
                    });
                });
                return dataTransformOrPipelines;
            }
        }
    });

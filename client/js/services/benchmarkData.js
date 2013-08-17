angular.module('app')
    .service('benchmarkData', function ($http, $q) {
        var benchmarks = {};
        // 184.107.193.50:8080/performance
        return {
            getAll: function () {
                var request = $q.defer();
                request.resolve(allBenchmarkData);
                request.promise.then(function (data) {
                    var newBenchmarks = {};
                    angular.forEach(data.result, function (benchmark) {
                        var name = benchmark.benchmarkName + " " + benchmark.benchmarkVersion;
                        if (!newBenchmarks[name]) {
                            newBenchmarks[name] = [];
                        }

                        newBenchmarks[name].push(benchmark);
                    });
                    angular.extend(benchmarks, newBenchmarks)
                });

                return benchmarks;
            }
        }
    });


var allBenchmarkData = {
    "statusCode": 200,
    "result": [
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 1,
            "iteration": 1,
            "runtime": 1.1,
            "startDate": "2013-08-12T02:02:17.000Z",
            "endDate": "2013-08-12T02:02:19.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 1,
            "iteration": 1,
            "runtime": 2.68,
            "startDate": "2013-08-12T02:04:31.000Z",
            "endDate": "2013-08-12T02:04:34.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 1,
            "iteration": 1,
            "runtime": 2.61,
            "startDate": "2013-08-12T02:06:36.000Z",
            "endDate": "2013-08-12T02:06:39.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 1,
            "iteration": 1,
            "runtime": 0.14,
            "startDate": "2013-08-12T02:09:57.000Z",
            "endDate": "2013-08-12T02:09:58.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 1,
            "iteration": 1,
            "runtime": 0.14,
            "startDate": "2013-08-12T02:18:15.000Z",
            "endDate": "2013-08-12T02:18:15.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 12,
            "iteration": 1,
            "runtime": 0.17,
            "startDate": "2013-08-12T02:19:50.000Z",
            "endDate": "2013-08-12T02:19:50.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 30,
            "iteration": 1,
            "runtime": 117.67,
            "startDate": "2013-08-12T02:18:21.000Z",
            "endDate": "2013-08-12T02:20:18.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": null,
            "iteration": null,
            "runtime": 0.19,
            "startDate": "2013-08-12T12:48:27.000Z",
            "endDate": "2013-08-12T12:48:29.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 1,
            "iteration": null,
            "runtime": 0.14,
            "startDate": "2013-08-12T12:48:38.000Z",
            "endDate": "2013-08-12T12:48:38.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": null,
            "iteration": null,
            "runtime": 0.16,
            "startDate": "2013-08-12T13:19:03.000Z",
            "endDate": "2013-08-12T13:19:03.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": null,
            "iteration": null,
            "runtime": 0.14,
            "startDate": "2013-08-12T13:19:39.000Z",
            "endDate": "2013-08-12T13:19:39.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": null,
            "iteration": null,
            "runtime": 0.14,
            "startDate": "2013-08-12T13:20:10.000Z",
            "endDate": "2013-08-12T13:20:10.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": null,
            "iteration": null,
            "runtime": 0.14,
            "startDate": "2013-08-12T13:21:25.000Z",
            "endDate": "2013-08-12T13:21:25.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": null,
            "iteration": null,
            "runtime": 0.14,
            "startDate": "2013-08-12T13:21:43.000Z",
            "endDate": "2013-08-12T13:21:43.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": null,
            "iteration": null,
            "runtime": 0.14,
            "startDate": "2013-08-12T13:22:10.000Z",
            "endDate": "2013-08-12T13:22:10.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 22,
            "iteration": 1,
            "runtime": 2.64,
            "startDate": "2013-08-12T13:23:11.000Z",
            "endDate": "2013-08-12T13:23:14.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 22,
            "iteration": 1,
            "runtime": 2.62,
            "startDate": "2013-08-12T18:32:36.000Z",
            "endDate": "2013-08-12T18:32:39.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.14,
            "startDate": "2013-08-12T18:32:54.000Z",
            "endDate": "2013-08-12T18:32:54.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 24,
            "iteration": 1,
            "runtime": 6.48,
            "startDate": "2013-08-12T18:33:05.000Z",
            "endDate": "2013-08-12T18:33:12.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 24,
            "iteration": 1,
            "runtime": 6.59,
            "startDate": "2013-08-12T18:59:02.000Z",
            "endDate": "2013-08-12T18:59:09.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 26,
            "iteration": 1,
            "runtime": 17.17,
            "startDate": "2013-08-12T19:00:17.000Z",
            "endDate": "2013-08-12T19:00:34.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 26,
            "iteration": 1,
            "runtime": 16.7,
            "startDate": "2013-08-12T20:41:24.000Z",
            "endDate": "2013-08-12T20:41:41.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.16,
            "startDate": "2013-08-12T20:43:37.000Z",
            "endDate": "2013-08-12T20:43:38.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 26,
            "iteration": 1,
            "runtime": 17.01,
            "startDate": "2013-08-12T20:43:28.000Z",
            "endDate": "2013-08-12T20:43:45.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.15,
            "startDate": "2013-08-12T21:07:53.000Z",
            "endDate": "2013-08-12T21:07:54.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.15,
            "startDate": "2013-08-12T21:07:55.000Z",
            "endDate": "2013-08-12T21:07:55.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.14,
            "startDate": "2013-08-12T21:07:56.000Z",
            "endDate": "2013-08-12T21:07:56.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.14,
            "startDate": "2013-08-12T21:07:57.000Z",
            "endDate": "2013-08-12T21:07:57.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.15,
            "startDate": "2013-08-12T21:08:45.000Z",
            "endDate": "2013-08-12T21:08:46.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.15,
            "startDate": "2013-08-12T21:08:47.000Z",
            "endDate": "2013-08-12T21:08:47.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.14,
            "startDate": "2013-08-12T21:08:48.000Z",
            "endDate": "2013-08-12T21:08:48.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.15,
            "startDate": "2013-08-12T21:08:48.000Z",
            "endDate": "2013-08-12T21:08:48.000Z"
        },
        {
            "benchmarkName": "fibonacci",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 10,
            "iteration": 1,
            "runtime": 0.15,
            "startDate": "2013-08-12T21:08:49.000Z",
            "endDate": "2013-08-12T21:08:49.000Z"
        },
        {
            "benchmarkName": "escoufier",
            "benchmarkVersion": "1.0",
            "backendName": "Octave",
            "backendVersion": "3.4.0",
            "compile": true,
            "run": true,
            "scale": 22,
            "iteration": 1,
            "runtime": 0.34,
            "startDate": "2013-08-17T03:19:32.000Z",
            "endDate": "2013-08-17T03:19:34.000Z"
        }
    ]
};
angular.module('app')
    .controller('MainCtrl', function($scope, $location, dataTransformOrPipelineData) {
        $scope.dataTransformOrPipelines = dataTransformOrPipelineData.getAll();
        $scope.dataTransformOrPipeline = null;

        $scope.matrix = [
            [, "PC1", "PC2", "PC3", "PC4", "PC5", "PC6", "PC7", "PC8", "PC9", "PC10", "PC11", "..."],
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
            label: "PC1",
            color: "#00ff00",
            visibility: 50
        }, {
            label: "PC2",
            color: "#0000ff",
            visibility: 20
        }, {
            label: "PC3",
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
                        axisLabel: ' ABS/AVE Modalities (GM, MTR, MD, FA) %'
                    },
                    yAxis: {
                        axisLabel: 'Contribution (explanitory power)',
                        axisLabelDistance: 30
                    }
                },
            },
            data: [{
                key: "Modality",
                values: [{
                    "label": "GM",
                    "value": 29.765957771107
                }, {
                    "label": "MTR",
                    "value": 0
                }, {
                    "label": "MD",
                    "value": 32.807804682612
                }, {
                    "label": "FA",
                    "value": 196.45946739256
                }, {
                    "label": "T2",
                    "value": 0.19434030906893
                }, {
                    "label": "...",
                    "value": 98.079782601442
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
        };
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
            data: [{
                "key": "Musicians",
                "values": [{
                    "x": 0.21039958489955593,
                    "y": -0.16055493355304795,
                    "size": 0.6814703175332397,
                    "shape": "circle"
                }, {
                    "x": -0.05632598360756645,
                    "y": -0.40494444062592533,
                    "size": 0.41410169238224626,
                    "shape": "cross"
                }, {
                    "x": 0.7068664715742266,
                    "y": 1.7350818668039538,
                    "size": 0.5333584449253976,
                    "shape": "triangle-up"
                }, {
                    "x": -1.202304599607537,
                    "y": 1.0249145031065137,
                    "size": 0.43913428764790297,
                    "shape": "triangle-down"
                }, {
                    "x": -0.14817312625457393,
                    "y": 0.25649121208038095,
                    "size": 0.8069976416882128,
                    "shape": "diamond"
                }, {
                    "x": -1.6818567613719242,
                    "y": -1.4208500498211594,
                    "size": 0.24939634441398084,
                    "shape": "square"
                }, {
                    "x": -1.3386874647966276,
                    "y": 0.17169503549688392,
                    "size": 0.4541872418485582,
                    "shape": "circle"
                }, {
                    "x": -1.4707449943234425,
                    "y": 1.2126494328618607,
                    "size": 0.03644426167011261,
                    "shape": "cross"
                }, {
                    "x": -0.1449394653756647,
                    "y": -0.8211003971332346,
                    "size": 0.04182721977122128,
                    "shape": "triangle-up"
                }, {
                    "x": -0.13909559144955214,
                    "y": 0.47732240131466447,
                    "size": 0.21435670973733068,
                    "shape": "triangle-down"
                }, {
                    "x": -0.6198385601010771,
                    "y": -0.8714439216436204,
                    "size": 0.128585395636037,
                    "shape": "diamond"
                }, {
                    "x": 0.004207751130795327,
                    "y": -0.33420371098233514,
                    "size": 0.49173854454420507,
                    "shape": "square"
                }, {
                    "x": 0.4983916591953546,
                    "y": 0.3047666284489365,
                    "size": 0.2619856847450137,
                    "shape": "circle"
                }, {
                    "x": -0.32117900955635387,
                    "y": 1.7486837440219511,
                    "size": 0.26196636678650975,
                    "shape": "cross"
                }, {
                    "x": -1.6800957553678064,
                    "y": -1.1011270484239184,
                    "size": 0.04174386337399483,
                    "shape": "triangle-up"
                }, {
                    "x": 1.5956292705784438,
                    "y": -0.8330170238016023,
                    "size": 0.67110131890513,
                    "shape": "triangle-down"
                }, {
                    "x": -0.6800820888938203,
                    "y": 0.3102701682291009,
                    "size": 0.22483744798228145,
                    "shape": "diamond"
                }, {
                    "x": -0.5351074565074074,
                    "y": -1.8129322540412103,
                    "size": 0.11014887411147356,
                    "shape": "square"
                }, {
                    "x": 1.7985413362825184,
                    "y": -1.2152153045083463,
                    "size": 0.5100560730788857,
                    "shape": "circle"
                }, {
                    "x": -0.2584084845692947,
                    "y": 1.3115493081379124,
                    "size": 0.6682182569056749,
                    "shape": "cross"
                }, {
                    "x": -2.162824299530833,
                    "y": 0.16958532311519028,
                    "size": 0.2824682602658868,
                    "shape": "triangle-up"
                }, {
                    "x": -1.0772290478978754,
                    "y": 0.6406840061418024,
                    "size": 0.4836178575642407,
                    "shape": "triangle-down"
                }, {
                    "x": -0.8777850068320965,
                    "y": 0.14241265372210482,
                    "size": 0.5938622856047004,
                    "shape": "diamond"
                }, {
                    "x": 0.5985658389319325,
                    "y": -0.275006722737278,
                    "size": 0.8801243545021862,
                    "shape": "square"
                }, {
                    "x": 0.3892695055091394,
                    "y": 1.249629164038511,
                    "size": 0.4713820752222091,
                    "shape": "circle"
                }, {
                    "x": 0.2307337029185037,
                    "y": -1.345625677357916,
                    "size": 0.4282083644066006,
                    "shape": "cross"
                }, {
                    "x": 0.6260736178612631,
                    "y": -0.6318683758735628,
                    "size": 0.8500594149809331,
                    "shape": "triangle-up"
                }, {
                    "x": -0.11231676575418685,
                    "y": -0.2814514039610182,
                    "size": 0.26528304698877037,
                    "shape": "triangle-down"
                }, {
                    "x": 2.721963391164484,
                    "y": 0.2460771819262336,
                    "size": 0.3096987409517169,
                    "shape": "diamond"
                }, {
                    "x": -0.4913047894955537,
                    "y": 0.4370640054878649,
                    "size": 0.25496143009513617,
                    "shape": "square"
                }, {
                    "x": 0.3650799687684195,
                    "y": -0.7264956041922884,
                    "size": 0.3672671241220087,
                    "shape": "circle"
                }, {
                    "x": -1.2898470697613977,
                    "y": -0.47133385713223186,
                    "size": 0.9574091879185289,
                    "shape": "cross"
                }, {
                    "x": 1.4498625968117642,
                    "y": 0.048703356320548896,
                    "size": 0.002332399133592844,
                    "shape": "triangle-up"
                }, {
                    "x": 0.6848017538149221,
                    "y": -0.8911419959656957,
                    "size": 0.6294237736146897,
                    "shape": "triangle-down"
                }, {
                    "x": -0.9086964751260905,
                    "y": 1.7725970616562126,
                    "size": 0.47646663524210453,
                    "shape": "diamond"
                }, {
                    "x": -0.07191295784001855,
                    "y": -0.76181576319899,
                    "size": 0.03280705236829817,
                    "shape": "square"
                }, {
                    "x": 2.1307037668684448,
                    "y": 1.2441602070129683,
                    "size": 0.0431804396212101,
                    "shape": "circle"
                }, {
                    "x": 0.0325499743258453,
                    "y": 0.5847730974012452,
                    "size": 0.549543897388503,
                    "shape": "cross"
                }, {
                    "x": 0.6719089982926537,
                    "y": 0.4649152178728342,
                    "size": 0.7610758466180414,
                    "shape": "triangle-up"
                }, {
                    "x": 1.2936929257207623,
                    "y": -1.6684645235456657,
                    "size": 0.6491904358845204,
                    "shape": "triangle-down"
                }],
                "slope": 0.47323352891020476,
                "intercept": -0.4197901636362076
            }, {
                "key": "Non-musicians",
                "values": [{
                    "x": -0.4527711721270487,
                    "y": -0.2364476508675647,
                    "size": 0.5873776085209101,
                    "shape": "circle"
                }, {
                    "x": -0.4058879516229063,
                    "y": 1.271483106404405,
                    "size": 0.7561232843436301,
                    "shape": "cross"
                }, {
                    "x": 0.18157045281664416,
                    "y": 0.34891667305836355,
                    "size": 0.9990096162073314,
                    "shape": "triangle-up"
                }, {
                    "x": -1.961171220840877,
                    "y": 0.05902286632988355,
                    "size": 0.4658459408674389,
                    "shape": "triangle-down"
                }, {
                    "x": -0.16267415464816568,
                    "y": -0.6662874733490627,
                    "size": 0.19184712786227465,
                    "shape": "diamond"
                }, {
                    "x": 0.44512602821313585,
                    "y": 0.992912137499154,
                    "size": 0.8289502693805844,
                    "shape": "square"
                }, {
                    "x": -1.0432174510090886,
                    "y": -0.10410024713828676,
                    "size": 0.232908692676574,
                    "shape": "circle"
                }, {
                    "x": 0.2561872831825889,
                    "y": -0.45413393098864546,
                    "size": 0.7288127297069877,
                    "shape": "cross"
                }, {
                    "x": 0.5495265800936161,
                    "y": 1.0649675648121018,
                    "size": 0.35243743122555315,
                    "shape": "triangle-up"
                }, {
                    "x": -1.03713673218836,
                    "y": -2.3810085428510592,
                    "size": 0.11871536006219685,
                    "shape": "triangle-down"
                }, {
                    "x": -2.3750762830049816,
                    "y": -0.7714376578972699,
                    "size": 0.07281635981053114,
                    "shape": "diamond"
                }, {
                    "x": 1.1593086407981732,
                    "y": -0.5353349840711368,
                    "size": 0.9110128351021558,
                    "shape": "square"
                }, {
                    "x": 0.5592643616602267,
                    "y": -0.1303325126567031,
                    "size": 0.3113836422562599,
                    "shape": "circle"
                }, {
                    "x": 0.1327924949212324,
                    "y": 0.6227750358250341,
                    "size": 0.4236041682306677,
                    "shape": "cross"
                }, {
                    "x": 1.7865029914806616,
                    "y": -0.9551720553197093,
                    "size": 0.5166827596258372,
                    "shape": "triangle-up"
                }, {
                    "x": -1.6624326730130419,
                    "y": -1.3446008363555022,
                    "size": 0.0848920438438654,
                    "shape": "triangle-down"
                }, {
                    "x": -0.49596063072228924,
                    "y": 2.139218200079657,
                    "size": 0.9105353325139731,
                    "shape": "diamond"
                }, {
                    "x": 0.4500162602413482,
                    "y": 2.0915162543860637,
                    "size": 0.3450815794058144,
                    "shape": "square"
                }, {
                    "x": 0.4731416138626486,
                    "y": 0.12613464137786626,
                    "size": 0.9002202907577157,
                    "shape": "circle"
                }, {
                    "x": 0.0896638920389446,
                    "y": 0.6335713307224978,
                    "size": 0.7880141511559486,
                    "shape": "cross"
                }, {
                    "x": 0.03590226943064934,
                    "y": 0.6765588294981941,
                    "size": 0.347498761722818,
                    "shape": "triangle-up"
                }, {
                    "x": 0.4939856919037451,
                    "y": 1.4218729121277076,
                    "size": 0.9427519282326102,
                    "shape": "triangle-down"
                }, {
                    "x": -1.1994839800246047,
                    "y": 0.7037714937923453,
                    "size": 0.7634597441647202,
                    "shape": "diamond"
                }, {
                    "x": 0.8007226017285053,
                    "y": -0.5938084909421921,
                    "size": 0.583100754301995,
                    "shape": "square"
                }, {
                    "x": -0.43216561199999076,
                    "y": -0.1864341304522134,
                    "size": 0.5987118084449321,
                    "shape": "circle"
                }, {
                    "x": -1.1535476557582323,
                    "y": 0.5934575945950581,
                    "size": 0.14791614306159317,
                    "shape": "cross"
                }, {
                    "x": 0.7104358359185396,
                    "y": 0.3158113129359275,
                    "size": 0.010929703013971448,
                    "shape": "triangle-up"
                }, {
                    "x": 0.3531632554814513,
                    "y": 2.2943525365688657,
                    "size": 0.01364283449947834,
                    "shape": "triangle-down"
                }, {
                    "x": -0.9889806175568989,
                    "y": -0.48730734831926076,
                    "size": 0.996428610291332,
                    "shape": "diamond"
                }, {
                    "x": 0.9025441585783803,
                    "y": 0.4497536554837519,
                    "size": 0.7585117658600211,
                    "shape": "square"
                }, {
                    "x": -0.5538847877812774,
                    "y": 0.2981280712676263,
                    "size": 0.9770983601920307,
                    "shape": "circle"
                }, {
                    "x": 0.5694078209534269,
                    "y": -0.5477673764968213,
                    "size": 0.9825272571761161,
                    "shape": "cross"
                }, {
                    "x": 0.3047110134383242,
                    "y": 0.5464070734243919,
                    "size": 0.6291922663804144,
                    "shape": "triangle-up"
                }, {
                    "x": -0.8185665664902193,
                    "y": -0.8693423840336576,
                    "size": 0.3041376359760761,
                    "shape": "triangle-down"
                }, {
                    "x": -0.6753750101630303,
                    "y": -0.383153663550585,
                    "size": 0.6813686585519463,
                    "shape": "diamond"
                }, {
                    "x": 1.3897870625690478,
                    "y": 1.4486175853979795,
                    "size": 0.16685599205084145,
                    "shape": "square"
                }, {
                    "x": -1.4814963357502675,
                    "y": -0.505753572839046,
                    "size": 0.48457195376977324,
                    "shape": "circle"
                }, {
                    "x": -0.31685873365260697,
                    "y": -0.854096119271997,
                    "size": 0.23600932210683823,
                    "shape": "cross"
                }, {
                    "x": 1.3736336078561413,
                    "y": -1.4073730894807461,
                    "size": 0.4300089329481125,
                    "shape": "triangle-up"
                }, {
                    "x": -1.5338526000298853,
                    "y": 0.32392742698748456,
                    "size": 0.8628192653413862,
                    "shape": "triangle-down"
                }],
                "slope": 0.7182390494365245,
                "intercept": -0.4506254137959331
            }]
        };

        $scope.mouseMasks = [{
            label: "one",
            vector: []
        }, {
            label: "two",
            vector: []
        }];

        $scope.addPointToCurrentMouseMask = function(pick_info) {
            $scope.mouseMasks[$scope.mouseMasks.length - 1].vector.push({
                modelID: pick_info.object.model_name,
                shapeID: pick_info.object.name,
                nearestVertex: pick_info.index,
                point: pick_info.point
            });
            console.log("last mask is ", $scope.mouseMasks[$scope.mouseMasks.length - 1]);
            if (!$scope.$$phase) {
                $scope.$digest(); //$digest or $apply
            }
        };

        $scope.scriptName = "pipeline.py";
        $scope.apiURL = "http://localhost:8011";
        // $scope.apiURL = "http://130.15.58.38:8011";
        $scope.scriptResultsRaw = "No script has run";
        $scope.runScript = function(scriptname) {
            console.warn("security hole, this should not permit execution of unknown scripts.");
            scriptname = scriptname.trim().replace(/[\/\\]+/g, "");
            console.log("TODO call api to run this " + scriptname + "script on the data.");
            $scope.scriptResultsRaw = "Running " + scriptname + "...";

            CORS.makeCORSRequest({
                url: $scope.apiURL + "/pipeline",
                withCredentials: false,
                data: {
                    scriptToRun: scriptname,
                    rawTextPreviousOutputPotentiallyModifiedOutputByUser: $scope.scriptResultsRaw,
                    mouseMaskJson: $scope.mouseMasks[$scope.mouseMasks.length - 1]
                },
                method: "POST"
            }).then(function(result) {
                console.log("got a result", result);
                $scope.scriptResultsRaw = result;
                if (!$scope.$$phase) {
                    $scope.$digest(); //$digest or $apply
                }
            }, function(error) {

                console.log("got an error", error);
                $scope.scriptResultsRaw = error;
                if (!$scope.$$phase) {
                    $scope.$digest(); //$digest or $apply
                }
            });
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

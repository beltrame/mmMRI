var Q = require("q");
var errors = require("../lib/errors");
var type = require("grest").type;
var sequelize = require("../lib/sequelize");
var task = require("../lib/task");

var performanceSchema = {
    id: type.opt(type.integer),
    backend: {
        name: type.string,
        version: type.string,
    },
    dataTransformOrPipeline: {
        name: type.string,
        version: type.string,
        iteration: type.integer,
        scale: type.integer,
    }
};

var PerformanceResults = {
    name: "PerformanceResults",
    connection: null
};

function createDBSchema(connection, Sequelize) {
    PerformanceResults.connection = connection.define('PerformanceResult', {
        dataTransformOrPipelineName: Sequelize.STRING,
        dataTransformOrPipelineVersion: Sequelize.STRING,
        backendName: Sequelize.STRING,
        backendVersion: Sequelize.STRING,
        compile: Sequelize.BOOLEAN,
        run: Sequelize.BOOLEAN,
        scale: Sequelize.INTEGER,
        iteration: Sequelize.INTEGER,
        runtime: Sequelize.FLOAT,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE
    });
}

sequelize.CRUD(exports, PerformanceResults, {
    dataTransformOrPipelineName: type.string,
    dataTransformOrPipelineVersion: type.string,
    backendName: type.string,
    backendVersion: type.string,
    compile: type.boolean,
    run: type.boolean,
    scale: type.integer,
    iteration: type.integer,
    runtime: type.number,
    startDate: type.date,
    endDate: type.date
});
exports.schema = performanceSchema;
exports.createDBSchema = createDBSchema;

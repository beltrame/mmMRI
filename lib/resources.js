var sw = require("swagger-node-express");
var param = require("swagger-node-express/lib/paramTypes.js");
var url = require("url");
var swe = sw.errors;

var pipelineData = require("./service.js");


// the description will be picked up in the resource listing
exports.findById = {
  'spec': {
    description : "Operations about pipelines",  
    path : "/pipeline/{pipelineId}",
    method: "GET",
    summary : "Find pipeline by ID",
    notes : "Returns a pipeline based on ID",
    type : "Pipeline",
    nickname : "getPipelineById",
    produces : ["application/json"],
    parameters : [param.path("pipelineId", "ID of pipeline that needs to be fetched", "string")],
    responseMessages : [swe.invalid('id'), swe.notFound('pipeline')]
  },
  'action': function (req,res) {
    if (!req.params.pipelineId) {
      throw swe.invalid('id'); }
    var id = parseInt(req.params.pipelineId);
    var pipeline = pipelineData.getPipelineById(id);

    if(pipeline) res.send(JSON.stringify(pipeline));
    else throw swe.notFound('pipeline',res);
  }
};

exports.findByStatus = {
  'spec': {
    path : "/pipeline/findByStatus",
    notes : "Multiple status values can be provided with comma-separated strings",
    summary : "Find pipelines by status",
    method: "GET",    
    parameters : [
      param.query("status", "Status in the store", "string", true, ["available","pending","sold"], "available")
    ],
    type : "array",
    items: {
      $ref: "Pipeline"
    },
    responseMessages : [swe.invalid('status')],
    nickname : "findPipelinesByStatus"
  },  
  'action': function (req,res) {
    var statusString = url.parse(req.url,true).query["status"];
    if (!statusString) {
      throw swe.invalid('status'); }

    var output = pipelineData.findPipelineByStatus(statusString);
    res.send(JSON.stringify(output));
  }
};

exports.findByTags = {
  'spec': {
    path : "/pipeline/findByTags",
    notes : "Multiple tags can be provided with comma-separated strings. Use tag1, tag2, tag3 for testing.",
    summary : "Find pipelines by tags",
    method: "GET",    
    parameters : [param.query("tags", "Tags to filter by", "string", true)],
    type : "array",
    items: {
      $ref: "Pipeline"
    },
    responseMessages : [swe.invalid('tag')],
    nickname : "findPipelinesByTags"
  },
  'action': function (req,res) {
    var tagsString = url.parse(req.url,true).query["tags"];
    if (!tagsString) {
      throw swe.invalid('tag'); }
    var output = pipelineData.findPipelineByTags(tagsString);
    sw.setHeaders(res);
    res.send(JSON.stringify(output));
  }
};

exports.runPipeline = {
  'spec': {
    path : "/pipeline",
    notes : "runs a pipeline to the store",
    summary : "Run an existing pipeline on the store",
    method: "POST",
    parameters : [param.body("Pipeline", "Pipeline run details", "Pipeline")],
    responseMessages : [swe.invalid('input')],
    nickname : "runPipeline"
  },  
  'action': function(req, res) {
    var body = req.body;
    if(!body || !body.id){
      throw swe.invalid('pipeline');
    }
    else{
	    pipelineData.runPipeline(body);
	    res.send(200);
	  }  
  }
};

// exports.updatePipeline = {
//   'spec': {
//     path : "/pipeline",
//     notes : "updates a pipeline in the store",
//     method: "PUT",    
//     summary : "Update an existing pipeline",
//     parameters : [param.body("Pipeline", "Pipeline object that needs to be updated in the store", "Pipeline")],
//     responseMessages : [swe.invalid('id'), swe.notFound('pipeline'), swe.invalid('input')],
//     nickname : "updatePipeline"
//   },  
//   'action': function(req, res) {
//     var body = req.body;
//     if(!body || !body.id){
//       throw swe.invalid('pipeline');
//     }
//     else {
// 	    pipelineData.runPipeline(body);
// 	    res.send(200);
// 	  }
//   }
// };

exports.deletePipeline = {
  'spec': {
    path : "/pipeline/{id}",
    notes : "removes a pipeline from the store",
    method: "DELETE",
    summary : "Remove an existing pipeline",
    parameters : [param.path("id", "ID of pipeline that needs to be removed", "string")],
    responseMessages : [swe.invalid('id'), swe.notFound('pipeline')],
    nickname : "deletePipeline" 
  },  
  'action': function(req, res) {
    var id = parseInt(req.params.id);
    pipelineData.deletePipeline(id)
    res.send(204);
  }
};

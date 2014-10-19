exports.models = {
    "Category":{
      "id":"Category",
      "required": ["id", "name"],
      "properties":{
        "id":{
          "type":"integer",
          "format": "int64",
          "description": "Category unique identifier",
          "minimum": "0.0",
          "maximum": "100.0"
        },
        "name":{
          "type":"string",
          "description": "Name of the category"
        }
      }
    },
    "Pipeline":{
      "id":"Pipeline",
      "required": ["id", "name"],
      "properties":{
        "id":{
          "type":"integer",
          "format":"int64",
          "description": "Unique identifier for the Pipeline",
          "minimum": "0.0",
          "maximum": "100.0"
        },
        "category":{
          "$ref":"Category",
          "description": "Category the pipeline is in"
        },
        "name":{
          "type":"string",
          "description": "Friendly name of the pipeline"
        },
        "photoUrls":{
          "type":"array",
          "description": "Image URLs",
          "items":{
            "type":"string"
          }
        },
        "tags":{
          "type":"array",
          "description": "Tags assigned to this pipeline",
          "items":{
            "$ref":"Tag"
          }
        },
        "status":{
          "type":"string",
          "description":"pipeline status in the store",
          "enum":[
            "available",
            "pending",
            "sold"
          ]
        }
      }
    },
    "Tag":{
      "id":"Tag",
      "required": ["id"],
      "properties":{
        "id":{
          "type":"integer",
          "format":"int64",
          "description": "Unique identifier for the tag"
        },
        "name":{
          "type":"string",
          "description":"Friendly name for the tag"
        }
      }
    }
  }

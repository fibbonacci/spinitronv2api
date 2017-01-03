specs = {
    "swagger": "2.0",
    "info": {
        "title": "Spinitron v2",
        "version": "1.0.0",
        "description": "Maximum limit is 200. Default limit is 20."
    },
    "host": "spinitron.com",
    "schemes": [
        "https",
        "http"
    ],
    "securityDefinitions": {
        "Bearer": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },
    "basePath": "/api",
    "produces": [
        "application/json",
        "application/xml"
    ],
    "tags": [
        {
            "name": "Persona"
        },
        {
            "name": "Show"
        },
        {
            "name": "Playlist"
        },
        {
            "name": "Spin"
        }
    ],
    "paths": {
        "/personas": {
            "get": {
                "summary": "Get Personas",
                "tags": [
                    "Persona"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "name",
                        "in": "query",
                        "type": "string",
                        "description": "Filter by Persona name"
                    },
                    {
                        "$ref": "#/parameters/limit"
                    },
                    {
                        "$ref": "#/parameters/page"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The personas",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/BaseIndexResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/Persona"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/personas/{id}": {
            "get": {
                "summary": "Get Persona by id",
                "tags": [
                    "Persona"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The Persona",
                        "schema": {
                            "$ref": "#/definitions/Persona"
                        }
                    },
                    "404": {
                        "description": "Persona not found",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/shows": {
            "get": {
                "summary": "Get Shows optionally filtered by a datetime range ({start} - {end} where both must be maximum 1 hour in past), shows ending during the provided range will be returned too.\nTo get a show currently being live both {start} and {end} can be set to now datetime.\nIf date range filter is used (both {start} and {end}), response is denormalised, means there may be more than one same show item with only one difference: show start datetime.\nIf only {start} is provided, next instance of every show ending after the provided {start} will be returned.\nWithout specified {end} filter only one instance of each show will be in the response, and 'start' value will be the next relative to now or provided {start} datetime, when show will be live.\nShows in the response are in chonological order.\n",
                "tags": [
                    "Show"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "start",
                        "description": "The datetime starting from items must be returned. Maximum 1 hour in past.\n",
                        "in": "query",
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "name": "end",
                        "description": "The ending datetime. Maximum 1 hour in past.\n",
                        "in": "query",
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "$ref": "#/parameters/limit"
                    },
                    {
                        "$ref": "#/parameters/page"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The shows",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/BaseIndexResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/Show"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    "422": {
                        "description": "Invalid datetimes in filter: either too old or {end} is less than {start}.\n",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/shows/{id}": {
            "get": {
                "summary": "Get a Show by id. Next future begin datetime will be included in the response. \nIf show doesn't have any future dates (i.e. all schedules are ended), 404 will be returned.\n",
                "tags": [
                    "Show"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The Show",
                        "schema": {
                            "$ref": "#/definitions/Show"
                        }
                    },
                    "404": {
                        "description": "Show not found",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/playlists": {
            "get": {
                "summary": "Get Playlists  optionally filtered by a datetime range ({start} - {end} where both are required). Only past Playlists will be returned.\n",
                "tags": [
                    "Playlist"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "start",
                        "description": "The datetime starting from items must be returned.\n",
                        "in": "query",
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "name": "end",
                        "description": "The ending datetime.\n",
                        "in": "query",
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "name": "show_id",
                        "description": "Filter by show",
                        "in": "query",
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/limit"
                    },
                    {
                        "$ref": "#/parameters/page"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The playlists",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/BaseIndexResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/Playlist"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/playlists/{id}": {
            "get": {
                "summary": "Get a Playlist by id",
                "tags": [
                    "Playlist"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The playlist",
                        "schema": {
                            "$ref": "#/definitions/Playlist"
                        }
                    },
                    "404": {
                        "description": "Playlist not found",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/playlists/datetime/{datetime}": {
            "get": {
                "summary": "Get a Playlist by date/time",
                "tags": [
                    "Playlist"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "datetime",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "name": "show_id",
                        "description": "Filter by show",
                        "in": "query",
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The playlist",
                        "schema": {
                            "$ref": "#/definitions/Playlist"
                        }
                    },
                    "400": {
                        "description": "Provided datetime is invalid",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    },
                    "404": {
                        "description": "Playlist not found",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/playlists/current": {
            "get": {
                "summary": "Get a current (or most recent past) Playlist",
                "tags": [
                    "Playlist"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "show_id",
                        "description": "Filter by show",
                        "in": "query",
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The playlist",
                        "schema": {
                            "$ref": "#/definitions/Playlist"
                        }
                    },
                    "404": {
                        "description": "Playlist not found, if there are no past playlists at all",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/spins": {
            "get": {
                "summary": "Get Spins optionally filtered by a datetime range ({start} - {end} where both are required). Only past Spins will be returned.\n",
                "tags": [
                    "Spin"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "start",
                        "description": "The datetime starting from items must be returned.\n",
                        "in": "query",
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "name": "end",
                        "description": "The ending datetime.\n",
                        "in": "query",
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "name": "playlist_id",
                        "description": "Filter by playlist",
                        "in": "query",
                        "type": "integer"
                    },
                    {
                        "name": "show_id",
                        "description": "Filter by show",
                        "in": "query",
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/limit"
                    },
                    {
                        "$ref": "#/parameters/page"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The spins",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/BaseIndexResponse"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/Spin"
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            "post": {
                "summary": "Log a Spin",
                "tags": [
                    "Spin"
                ],
                "description": "An endpoint for automation systems to log spins into the spin table.",
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "spin_timestamp",
                        "in": "formData",
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "name": "spin_duration",
                        "in": "formData",
                        "type": "integer"
                    },
                    {
                        "name": "artist_name",
                        "in": "formData",
                        "type": "string",
                        "required": true
                    },
                    {
                        "name": "release_title",
                        "in": "formData",
                        "type": "string"
                    },
                    {
                        "name": "label_name",
                        "in": "formData",
                        "type": "string"
                    },
                    {
                        "name": "song_name",
                        "in": "formData",
                        "type": "string",
                        "required": true
                    },
                    {
                        "name": "song_composer",
                        "in": "formData",
                        "type": "string"
                    },
                    {
                        "name": "song_isrc",
                        "in": "formData",
                        "type": "string"
                    }
                ],
                "responses": {
                    "201": {
                        "description": "The new created Spin.",
                        "schema": {
                            "$ref": "#/definitions/Spin"
                        }
                    },
                    "422": {
                        "description": "Validation failed.",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/ValidationError"
                            }
                        }
                    },
                    "default": {
                        "description": "Failed to create the object for unknown reason.",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/spins/{id}": {
            "get": {
                "summary": "Get a Spin by id",
                "tags": [
                    "Spin"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "integer"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The spin",
                        "schema": {
                            "$ref": "#/definitions/Spin"
                        }
                    },
                    "404": {
                        "description": "Spin not found",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/spins/datetime/{datetime}": {
            "get": {
                "summary": "Get a Spin by date/time",
                "tags": [
                    "Spin"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "name": "datetime",
                        "in": "path",
                        "required": true,
                        "type": "string",
                        "format": "date-time"
                    },
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The spin",
                        "schema": {
                            "$ref": "#/definitions/Spin"
                        }
                    },
                    "400": {
                        "description": "Provided datetime is invalid",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    },
                    "404": {
                        "description": "Spin not found",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        },
        "/spins/current": {
            "get": {
                "summary": "Get a current (or most recent past) Spin",
                "tags": [
                    "Spin"
                ],
                "security": [
                    {
                        "Bearer": []
                    }
                ],
                "parameters": [
                    {
                        "$ref": "#/parameters/fields"
                    },
                    {
                        "$ref": "#/parameters/expand"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The spin",
                        "schema": {
                            "$ref": "#/definitions/Spin"
                        }
                    },
                    "404": {
                        "description": "Spin not found, if there are no past spins at all",
                        "schema": {
                            "$ref": "#/definitions/Error"
                        }
                    }
                }
            }
        }
    },
    "parameters": {
        "limit": {
            "name": "count",
            "description": "Amount of items to return",
            "in": "query",
            "type": "integer",
            "default": 20,
            "minimum": 1
        },
        "page": {
            "name": "page",
            "description": "Offset, used together with count",
            "in": "query",
            "type": "integer",
            "minimum": 1
        },
        "fields": {
            "name": "fields",
            "description": "Allows to select only needed fields",
            "in": "query",
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "expand": {
            "name": "expand",
            "description": "Allows to select extra fields",
            "in": "query",
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "definitions": {
        "Persona": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "bio": {
                    "type": "string"
                },
                "since": {
                    "type": "string",
                    "format": "integer",
                    "description": "Year"
                },
                "email": {
                    "type": "string"
                },
                "website": {
                    "type": "string"
                },
                "img_profile": {
                    "type": "string"
                },
                "_links": {
                    "type": "object",
                    "properties": {
                        "self": {
                            "$ref": "#/definitions/Link"
                        },
                        "shows": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Link"
                            }
                        }
                    }
                }
            }
        },
        "Show": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "start": {
                    "type": "string",
                    "format": "date-time",
                    "description": "UTC datetime, ISO-8601."
                },
                "duration": {
                    "type": "integer",
                    "description": "Duration in seconds"
                },
                "timezone": {
                    "type": "string",
                    "example": "America/Chicago"
                },
                "category": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "since": {
                    "type": "string",
                    "format": "integer",
                    "description": "Year"
                },
                "url": {
                    "type": "string"
                },
                "hide_dj": {
                    "type": "boolean"
                },
                "img_show": {
                    "type": "string"
                },
                "_links": {
                    "type": "object",
                    "properties": {
                        "self": {
                            "$ref": "#/definitions/Link"
                        },
                        "personas": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Link"
                            }
                        },
                        "playlists": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Link"
                            }
                        }
                    }
                }
            }
        },
        "Playlist": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "persona_id": {
                    "type": "integer"
                },
                "show_id": {
                    "type": "integer"
                },
                "start": {
                    "type": "string",
                    "format": "date-time",
                    "description": "UTC datetime, ISO-8601."
                },
                "duration": {
                    "type": "integer",
                    "description": "Duration in seconds"
                },
                "timezone": {
                    "type": "string",
                    "example": "America/Chicago"
                },
                "category": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "since": {
                    "type": "string",
                    "format": "date"
                },
                "url": {
                    "type": "string"
                },
                "hide_dj": {
                    "type": "boolean"
                },
                "automation": {
                    "type": "boolean"
                },
                "episode_name": {
                    "type": "string"
                },
                "episode_description": {
                    "type": "string"
                },
                "_links": {
                    "type": "object",
                    "properties": {
                        "self": {
                            "$ref": "#/definitions/Link"
                        },
                        "persona": {
                            "$ref": "#/definitions/Link"
                        },
                        "show": {
                            "$ref": "#/definitions/Link"
                        }
                    }
                }
            }
        },
        "Spin": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "playlist_id": {
                    "type": "integer"
                },
                "start": {
                    "type": "string",
                    "format": "date-time",
                    "description": "UTC datetime, ISO-8601."
                },
                "duration": {
                    "type": "integer",
                    "description": "Duration in seconds"
                },
                "timezone": {
                    "type": "string",
                    "example": "America/Chicago"
                },
                "artist_name": {
                    "type": "string"
                },
                "release_title": {
                    "type": "string"
                },
                "label_name": {
                    "type": "string"
                },
                "song_name": {
                    "type": "string"
                },
                "song_composer": {
                    "type": "string"
                },
                "song_isrc": {
                    "type": "string"
                },
                "note": {
                    "type": "string"
                },
                "genre": {
                    "type": "string"
                },
                "_links": {
                    "type": "object",
                    "properties": {
                        "self": {
                            "$ref": "#/definitions/Link"
                        },
                        "playlist": {
                            "$ref": "#/definitions/Link"
                        }
                    }
                }
            }
        },
        "ValidationError": {
            "type": "object",
            "properties": {
                "field": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }
        },
        "Error": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                },
                "code": {
                    "type": "integer"
                },
                "status": {
                    "type": "integer"
                },
                "type": {
                    "type": "string"
                }
            }
        },
        "Pagination": {
            "type": "object",
            "properties": {
                "totalCount": {
                    "type": "integer"
                },
                "pageCount": {
                    "type": "integer"
                },
                "currentPage": {
                    "type": "integer"
                },
                "perPage": {
                    "type": "integer"
                }
            }
        },
        "Link": {
            "type": "object",
            "properties": {
                "href": {
                    "type": "string"
                }
            }
        },
        "BaseIndexResponse": {
            "type": "object",
            "properties": {
                "_links": {
                    "type": "object",
                    "properties": {
                        "self": {
                            "$ref": "#/definitions/Link"
                        }
                    }
                },
                "_meta": {
                    "$ref": "#/definitions/Pagination"
                }
            }
        }
    }
};

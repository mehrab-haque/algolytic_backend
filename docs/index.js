const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');


/*

{
    openapi:'3.0.0',
    info:{
        title:'SAINT Backend API',
        version:'1.0.0'
    }
}

[1,2,3]

*/

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    paths: {
        '/auth/continue': {
            post: {
                tags: ["Authentication"], // operation's tag
                description: "Continue (Reg/Login)", // short desc
                operationId: "auth", // unique operation id
                parameters: [], // expected params
                requestBody: {
                    // expected request body
                    content: {
                        // content-type
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/auth", // todo input data model
                            },
                        },
                    },
                },
                "responses": {
                    "200": {
                        "description": "Login Successful",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                },
                                "token": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Registration Failed",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            },
        },
        '/auth/anonymousContinue': {
            post: {
                tags: ["Authentication"], // operation's tag
                description: "Anonymous Login", // short desc
                operationId: "authAnonymous", // unique operation id
                parameters: [], // expected params
                requestBody: {
                    
                },
                "responses": {
                    "200": {
                        "description": "Login Successful",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                },
                                "token": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Registration Failed",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            },
        },
        '/profile/get': {
            get: {
                security: [
                    {
                      bearerAuth: [],
                    },
                  ],
                tags: ["Profile"], // operation's tag
                description: "Get Profile Information", // short desc
                operationId: "profileGet", // unique operation id
                parameters: [], // expected params
                requestBody: {
                    
                },
                "responses": {
                    "200": {
                        "description": "Login Successful"
                    },
                    "400": {
                        "description": "Profile Fetch Failed"
                    }
                }
            },
        },
        '/profile/update': {
            put: {
                security: [
                    {
                      bearerAuth: [],
                    },
                  ],
                tags: ["Profile"], // operation's tag
                description: "Update Profile", // short desc
                operationId: "profileUpdate", // unique operation id
                parameters: [], // expected params
                requestBody: {
                    // expected request body
                    content: {
                        // content-type
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/profile", // todo input data model
                            },
                        },
                    },
                },
                "responses": {
                    "200": {
                        "description": "Profile Update Successful",
                        "schema": {
                            "type": "object"
                            
                        }
                    },
                    "400": {
                        "description": "Profile Update Failed",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            },
        },
        '/saint/list': {
            get: {
                security: [
                    {
                      bearerAuth: [],
                    },
                  ],
                tags: ["SAINT"], // operation's tag
                description: "Get list of SAINT of current users", // short desc
                operationId: "saintList", // unique operation id
                parameters: [{
                    in:'query',
                    name:'count',
                    description:'count of results (if count param is present, then pageNo and countPerPage params will be ignored)'
                  },
                  {
                    in:'query',
                    name:'pageNo',
                    description:'page number of pagination'
                  },
                  {
                    in:'query',
                    name:'countPerPage',
                    description:'count of entries per page'
                  }],
                requestBody: {
                    
                },
                "responses": {
                    "200": {
                        "description": "SAINT List"
                    },
                    "400": {
                        "description": "SAINT list Fetch Failed"
                    }
                }
            },
        },
        '/saint/listAll': {
            get: {
                tags: ["SAINT"], // operation's tag
                description: "Get list of all public SAINTs", // short desc
                operationId: "saintListAll", // unique operation id
                parameters: [{
                    in:'query',
                    name:'pageNo',
                    description:'page number of pagination',
                    required:true
                  },
                  {
                    in:'query',
                    name:'countPerPage',
                    description:'count of entries per page',
                    required:true
                  }
                ],
                requestBody: {
                    
                },
                "responses": {
                    "200": {
                        "description": "SAINT List"
                    },
                    "400": {
                        "description": "SAINT list Fetch Failed"
                    }
                }
            },
        },
        '/saint/create': {
            post: {
                security: [
                    {
                      bearerAuth: [],
                    },
                  ],
                tags: ["SAINT"], // operation's tag
                description: "Create SAINT", // short desc
                operationId: "saintCreate", // unique operation id
                parameters: [], // expected params
                requestBody: {
                    // expected request body
                    content: {
                        // content-type
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/saint", // todo input data model
                            },
                        },
                    },
                },
                "responses": {
                    "200": {
                        "description": "SAINT creation Successful",
                        "schema": {
                            "type": "object"
                            
                        }
                    },
                    "400": {
                        "description": "SAINT creation Failed",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            },
        },
        '/saint/getCaptcha': {
            get: {
                tags: ["CAPTCHA"], // operation's tag
                description: "Get a captcha", // short desc
                operationId: "getCaptcha", // unique operation id
                parameters: [{
                    in:'query',
                    name:'captchaId',
                    description:'reloadCaptchaId'
                  }],
                requestBody: {
                    
                },
                "responses": {
                    "200": {
                        "description": "CAPTCHA SVG"
                    },
                    "400": {
                        "description": "CAPTCHA Failed"
                    }
                }
            },
        }
    }
};
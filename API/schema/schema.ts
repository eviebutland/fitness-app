import { OpenAPIV3 } from 'openapi-types'

export const document: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Fitness app',
    contact: {
      email: 'evie@butland.com',
      url: 'http://example.com/contact'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    },
    description:
      'This is a free web accessible API that will send out daily workouts to your email. These will be auto generated exercises covering key areas: upper body, lower body, glutes, full body and cardio.\n'
  },
  externalDocs: {
    description: 'Find out how to create a GitHub repo for your OpenAPI definition.',
    url: 'https://github.com/eviebutland/fitness-app'
  },
  tags: [
    {
      name: 'exercises',
      description: 'Operations related to exercises.'
    },
    {
      name: 'planned workouts',
      description: 'Operations relates to planned workouts.'
    },
    {
      name: 'user',
      description: 'Operations relates to users within the platform'
    }
  ],
  servers: [
    {
      url: 'http://fitness-app.eba-5rqxchqt.us-east-1.elasticbeanstalk.com'
    }
  ],
  paths: {
    '/login': {
      post: {
        tags: ['authentication'],
        summary: 'Login as user',
        description: 'Login as user',
        operationId: 'login',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/logout/{id}': {
      get: {
        tags: ['authentication'],
        summary: 'Logout as user',
        description: 'Logout as user',
        operationId: 'logout',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Get a single user',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/reset-password': {
      post: {
        tags: ['user'],
        summary: 'Reset a user password',
        description: 'Reset password',
        operationId: 'resetPassword',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ResetPassword'
              }
            }
          },
          description: 'requestBody description',
          required: true
        }
      }
    },
    '/users': {
      get: {
        tags: ['user'],
        summary: 'Get all user',
        description: 'Get all users \n',
        operationId: 'getUsers',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['user'],
        summary: 'Create a new user',
        description: 'Create a new user',
        operationId: 'createUser',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          },
          description: 'requestBody description',
          required: true
        }
      }
    },
    '/users/activation': {
      patch: {
        tags: ['user'],
        summary: 'Create and send activation code',
        description: 'Create and send activation code',
        operationId: 'createActivationCode',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Activation'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        }
      }
    },
    '/users/{id}': {
      get: {
        tags: ['user'],
        summary: 'Get a user',
        description: 'Get a user \n',
        operationId: 'getAUser',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Get a single user',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ['user'],
        summary: 'Deletes a user',
        description: 'User can delete own account or be removed by admin',
        operationId: 'deleteUser',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The user that needs to be deleted',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK'
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ['user'],
        summary: 'Updates the user',
        description: "User's can update their own profile, as well as adding to completed exercises",
        operationId: 'updateUser',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The name that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPatch'
              }
            }
          },
          description: 'Updated user object',
          required: true
        }
      }
    },
    '/users/{id}/completed-workout': {
      patch: {
        tags: ['user'],
        summary: 'Updates the user',
        description: "User's updating with completed workouts",
        operationId: 'markWorkoutAsComplete',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The id of the user that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPatch'
              }
            }
          },
          description: 'Updated user object',
          required: true
        }
      }
    },
    '/exercises': {
      get: {
        tags: ['exercises'],
        summary: 'Get all exercises',
        description: 'Get all exercises in the database returned',
        operationId: 'getAllExercises',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Exercise'
                }
              }
            }
          },
          '403': {
            description: 'Forbidden'
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['exercises'],
        summary: 'Create a new exercise',
        description: 'Create a new exercise',
        operationId: 'createExcerise',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'Calls per hour allowed by the user.',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Exercise'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Exercise'
              }
            }
          },
          description: 'requestBody description'
        }
      }
    },
    '/exercises/{id}': {
      patch: {
        tags: ['exercises'],
        summary: 'Updates the exercise',
        description: 'This can only be done by the admin user.',
        operationId: 'updateExercise',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The id that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Exercise'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Exercise'
              }
            }
          },
          description: 'Updated user object',
          required: true
        }
      },
      delete: {
        tags: ['exercises'],
        summary: 'Deletes an exercise',
        description: 'This can only be done by the admin user.',
        operationId: 'deleteExercise',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The exercise that needs to be deleted',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK'
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/workouts/catergory/{catergory}': {
      get: {
        tags: ['exercises'],
        summary: 'Get all exercises in a catergory',
        description: 'Get all exercises in the database returned with the same catergory',
        operationId: 'getAllExercisesInCatergory',
        parameters: [
          {
            name: 'catergory',
            in: 'path',
            description: 'Getting hold of all exercises with this category/type',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Exercise'
                }
              }
            }
          },
          '401': {
            description: 'Unauthorised'
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/workouts': {
      get: {
        tags: ['workouts'],
        summary: 'Get all workouts',
        description: 'Get all workouts created',
        operationId: 'getAllWorkoutPlans',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PlannedWorkout'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['workouts'],
        summary: 'Create a workout',
        description: "Create a workout based off user's preferences and table of exercises in database",
        operationId: 'createWorkoutPlan',
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PlannedWorkout'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PlannedWorkout'
              }
            }
          },
          description: 'Echo payload',
          required: true
        }
      }
    },
    '/workouts/day': {
      get: {
        tags: ['workouts'],
        summary: 'Get todays workout',
        description: 'Get today workouts',
        operationId: 'getTodaysWorkout',
        parameters: [
          {
            name: 'day',
            in: 'query',
            description: 'The day of the workout to get',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PlannedWorkout'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    },
    '/workouts/{id}': {
      get: {
        tags: ['workouts'],
        summary: 'Get a workouts',
        description: 'Get a workouts',
        operationId: 'getWorkoutPlanById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The id of the workout to get',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PlannedWorkout'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      },
      patch: {
        tags: ['workouts'],
        summary: 'Update a workout',
        description: 'Update a workout',
        operationId: 'updateWorkout',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The id of the workout that needs to be updated',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PlannedWorkout'
                }
              }
            }
          },
          '400': {
            description: 'BAD_REQUEST',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequest'
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PlannedWorkout'
              }
            }
          },
          description: 'Echo payload',
          required: true
        }
      },
      delete: {
        tags: ['workouts'],
        summary: 'Delete a workout by ID',
        description: 'Delete a workout by ID',
        operationId: 'deleteWorkoutPlan',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The name that needs to be deleted',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ],
        security: [
          {
            bearer: []
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            headers: {
              'X-Rate-Limit': {
                description: 'calls per hour allowed by the user',
                schema: {
                  type: 'integer',
                  format: 'int32'
                }
              },
              'X-Expires-After': {
                $ref: '#/components/headers/ExpiresAfter'
              }
            },
            content: {
              'application/json': {
                schema: {
                  type: 'string'
                },
                examples: {
                  response: {
                    value: 'Successfully deleted'
                  }
                }
              }
            }
          },
          '404': {
            description: 'NOT_FOUND',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFound'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      PlannedWorkout: {
        type: 'object',
        required: ['title'],
        properties: {
          title: {
            type: 'string',
            description: 'Name of planned workout',
            example: 'Upper 1'
          },
          workout: {
            type: 'object',
            description: 'Workout',
            example: '{}'
          }
        }
      },
      Exercise: {
        type: 'object',
        required: [
          'name',
          'description',
          'restTime',
          'recommendedRepRange',
          'category',
          'intensity',
          'isCompound',
          'exerciseTime',
          'video',
          'variations'
        ],
        properties: {
          name: {
            description: 'Name of the exercise',
            type: 'string',
            example: 'Glute bridge'
          },
          description: {
            description: 'The detail of how to perform the exercise in text format',
            type: 'string',
            example: 'This exercise required you to squeeze at the top'
          },
          restTime: {
            description: 'Recommended rest time for excerise',
            type: 'string',
            example: '10 seconds'
          },
          recommendedRepRange: {
            description: 'The recommended rep range for an exercise',
            type: 'number',
            example: 10
          },
          catergory: {
            description: 'The catergory the excerise belongs in',
            type: 'string',
            example: 'upper',
            enum: ['upper', 'lower', 'glutes', 'cardio', 'full-body']
          },
          intensity: {
            description: 'The intensity rating of the exercise',
            type: 'number',
            example: 1,
            maximum: 10
          },
          isCompound: {
            description: 'If the exercise is a compound exercise',
            type: 'boolean',
            example: false
          },
          exerciseTime: {
            description: 'Circuit workouts will use this time to build the daily workout (in seconds)',
            type: 'number',
            example: 40
          },
          video: {
            description: 'Included video of how to perform exercise',
            type: 'string'
          },
          variations: {
            description: 'List of different types of variation for the exercise',
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['Bent over row', 'Lat fly'],
            uniqueItems: true
          }
        }
      },
      ResetPassword: {
        type: 'object',
        title: 'user',
        required: [],
        properties: {
          email: {
            description: 'The email of the user',
            type: 'string'
          },
          newPassword: {
            description: "User's encrypted password",
            type: 'string'
          }
        }
      },
      UserPatch: {
        type: 'object',
        title: 'user',
        required: [],
        properties: {
          name: {
            description: 'The name of the user',
            type: 'string',
            example: 'Evie'
          },
          age: {
            description: "User's age",
            type: 'number',
            example: 23
          },
          email: {
            description: "User's email",
            type: 'string'
          },
          password: {
            description: "User's encrypted password",
            type: 'string'
          },
          levelOfAccess: {
            description: "User's access type",
            type: 'string',
            example: 'subscriber'
          },
          premium: {
            description: 'Premium band user is on',
            type: 'string',
            example: 'Free, Gold'
          },
          completedWorkouts: {
            description: 'The exercises completed by the user',
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['Upper 1 02/11/2022', 'Lower 1 03/11/2022']
          },
          permissions: {
            description: "User's permissions",
            type: 'string',
            example: 'rw:USERS'
          },
          workoutPreference: {
            description: 'The exercises completed by the user',
            type: 'object',
            example: {
              monday: 'LOWER',
              tuesday: 'CARDIO',
              wednesday: 'UPPER',
              thursday: 'GLUTES',
              friday: 'REST',
              saturday: 'CARDIO',
              sunday: 'REST'
            }
          }
        }
      },
      User: {
        type: 'object',
        title: 'user',
        required: [
          'name',
          'age',
          'email',
          'password',
          'levelOfAccess',
          'premium',
          'completedWorkouts',
          'permissions',
          'workoutPreference'
        ],
        properties: {
          name: {
            description: 'The name of the user',
            type: 'string',
            example: 'Evie'
          },
          age: {
            description: "User's age",
            type: 'number',
            example: 23
          },
          email: {
            description: "User's email",
            type: 'string'
          },
          password: {
            description: "User's encrypted password",
            type: 'string'
          },
          levelOfAccess: {
            description: "User's access type",
            type: 'string',
            example: 'subscriber'
          },
          premium: {
            description: 'Premium band user is on',
            type: 'string',
            example: 'Free, Gold'
          },
          completedWorkouts: {
            description: 'The exercises completed by the user',
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['Upper 1 02/11/2022', 'Lower 1 03/11/2022']
          },
          permissions: {
            description: "User's permissions",
            type: 'string',
            example: 'rw:USERS'
          },
          workoutPreference: {
            description: 'The exercises completed by the user',
            type: 'object',
            example: {
              monday: 'LOWER',
              tuesday: 'CARDIO',
              wednesday: 'UPPER',
              thursday: 'GLUTES',
              friday: 'REST',
              saturday: 'CARDIO',
              sunday: 'REST'
            }
          }
        }
      },
      Activation: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Successfully sent activation code to email'
          }
        }
      },
      BadRequest: {
        properties: {
          code: {
            type: 'integer',
            description: 'The error code',
            example: 400
          },
          error: {
            type: 'string',
            description: 'The error.'
          }
        }
      },
      NotFound: {
        properties: {
          code: {
            type: 'integer',
            description: 'The error code',
            example: 404
          },
          error: {
            type: 'string',
            description: 'The error.',
            example: 'Could not be found'
          }
        }
      }
    },
    securitySchemes: {
      main_auth: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'http://example.com/api/oauth/dialog',
            scopes: {
              'read:users': 'read users info',
              'write:users': 'modify or remove users'
            }
          }
        }
      },
      bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    headers: {
      ExpiresAfter: {
        description: 'date in UTC when token expires',
        schema: {
          type: 'string'
        }
      }
    }
  }
}

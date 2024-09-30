import { format } from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Especificación OpenAPI
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "Test - Treda Solutions  ",
      description:
        "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [https://swagger.io](https://swagger.io).",

      contact: {
        email: "mariosalazar.ms.10@gmail.com",
      },
      version: "1.0.11",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    tags: [
      {
        name: "user",
        description: "Operations about user",
      },
      {
        name: "auth",
        description: "Operations about authentification",
      },
      {
        name: "orders",
        description: "Operations about orders",
      },
      {
        name: "returns",
        description: "Operations about returns",
      },
      {
        name: "refunds",
        description: "Operations about refunds",
      },
      {
        name: "product",
        description: "Operations about products",
      },
    ],
    paths: {
      "/api/auth/logout": {
        get: {
          tags: ["auth"],
          summary: "Logout",
          description:
            "Logs out the current user by invalidating their session or token.",
          operationId: "LogoutUser",
          responses: {
            204: {
              description: "Successfully logged out",
            },
            401: {
              description: "Unauthorized, token missing or invalid",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
      "/api/orders/{customer}": {
        post: {
          description: "Create an order with customer and items",
          summary: "Create order",
          tags: ["orders"],
          parameters: [
            {
              name: "customer",
              in: "path",
              description: "Customer ID",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                example: 1,
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                        description: "Product code",
                        example: "TECH001",
                      },
                      quantity: {
                        type: "integer",
                        description: "Quantity of the product",
                        example: 2,
                      },
                    },
                  },
                  example: [
                    {
                      code: "TECH001",
                      quantity: 5,
                    },
                    {
                      code: "TECH002",
                      quantity: 3,
                    },
                    {
                      code: "TECH003",
                      quantity: 4,
                    },
                  ],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful response with order details",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "null",
                      },
                      response: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                              example: "TECH001",
                            },
                            quantity: {
                              type: "integer",
                              example: 2,
                            },
                            name: {
                              type: "string",
                              example: "Laptop",
                            },
                            price: {
                              type: "number",
                              example: 1200.0,
                            },
                            total: {
                              type: "number",
                              example: 2400.0,
                              description:
                                "Total price for the item (price * quantity)",
                            },
                          },
                        },
                      },
                      message: {
                        type: "string",
                        example: "Order created successfully",
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
            },
            403: {
              description: "Forbidden",
            },
            404: {
              description: "Not Found",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/orders": {
        get: {
          tags: ["orders"],
          summary: "Get all orders",
          description: "Retrieve a list of all orders in the system.",
          operationId: "findAllOrders",
          responses: {
            200: {
              description: "A list of orders",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Order",
                    },
                  },
                },
                "application/xml": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Order",
                    },
                  },
                },
              },
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
      "/api/orders/{order_id}": {
        get: {
          tags: ["orders"],
          summary: "Get order by ID",
          description: "",
          operationId: "getOrderById",
          parameters: [
            {
              name: "order_id",
              in: "path",
              description:
                "The name that needs to be fetched. Use TECH001 for testing. ",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                example: 1,
              },
            },
          ],
          responses: {
            200: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Order",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/Order",
                  },
                },
              },
            },
            400: {
              description: "Invalid order_id supplied",
            },
            404: {
              description: "Order not found",
            },
          },
        },
      },
      "/api/users": {
        post: {
          tags: ["user"],
          summary: "Create user",
          description: "Create user",
          operationId: "createUser",
          requestBody: {
            description: "Created user object",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
              "application/x-www-form-urlencoded": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          responses: {
            default: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ["user"],
          summary: "Get all users",
          description: "Retrieve a list of all users in the system.",
          operationId: "findAllUsers",
          responses: {
            200: {
              description: "A list of users",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
                "application/xml": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
      "/api/auth/login/{email}/{password}": {
        get: {
          tags: ["auth"],
          summary: "Sign In",
          description: "",
          operationId: "getUserByEmail",
          parameters: [
            {
              name: "email",
              in: "path",
              description:
                "The email that needs to be fetched. Use mariosalazar@gmail.com for testing. ",

              schema: {
                type: "string",
                format: "email",
                example: "mariosalazar@gmail.com",
              },
            },
            {
              name: "password",
              in: "path",
              description:
                "The password that needs to be fetched. Use password-Mario10/*- for testing. ",

              schema: {
                type: "string",
                format: "password",
                example: "password-Mario10/*-",
              },
            },
          ],
          responses: {
            200: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              description: "Invalid username supplied",
            },
            404: {
              description: "User not found",
            },
          },
        },
      },

      "/api/users/{email}": {
        get: {
          tags: ["user"],
          summary: "Get user by email",
          description: "",
          operationId: "getUserByEmail",
          parameters: [
            {
              name: "email",
              in: "path",
              description:
                "The name that needs to be fetched. Use mario@gmail.com for testing. ",
              required: true,
              schema: {
                type: "string",
                format: "email",
                example: "mariosalazar@gmail.com",
              },
            },
          ],
          responses: {
            200: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            400: {
              description: "Invalid username supplied",
            },
            404: {
              description: "User not found",
            },
          },
        },
        put: {
          tags: ["user"],
          summary: "Update user",
          description: "Update user by email",
          operationId: "updateUser",
          parameters: [
            {
              name: "email",
              in: "path",
              description:
                "The email that need to be updated, use mariosalazar@gmail.com for testing",
              required: true,
              schema: {
                type: "string",
                format: "email",
                example: "mariosalazar@gmail.com",
              },
            },
          ],
          requestBody: {
            description: "Update an existent user in the DB",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserUpdate",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/UserUpdate",
                },
              },
              "application/x-www-form-urlencoded": {
                schema: {
                  $ref: "#/components/schemas/UserUpdate",
                },
              },
            },
          },
          responses: {
            default: {
              description: "successful operation",
            },
          },
        },
        delete: {
          tags: ["user"],
          summary: "Delete user",
          description: "Delete user",
          operationId: "deleteUser",
          parameters: [
            {
              name: "email",
              in: "path",
              description:
                "The email that needs to be deleted, use mariosalazar@gmail.com for testing",
              required: true,
              schema: {
                type: "string",
                format: "email",
                example: "mariosalazar@gmail.com",
              },
            },
          ],
          responses: {
            400: {
              description: "Invalid email supplied",
            },
            404: {
              description: "User not found",
            },
          },
        },
      },

      "/api/products": {
        post: {
          tags: ["product"],
          summary: "Create Product",
          description: "Create a new product.",
          operationId: "createProduct",
          requestBody: {
            description: "Created product object",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
              "application/x-www-form-urlencoded": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          responses: {
            default: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ["product"],
          summary: "Get all Products",
          description: "Retrieve a list of all Products in the system.",
          operationId: "findAllProducts",
          responses: {
            200: {
              description: "A list of Products",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
                "application/xml": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
      "/api/products/{code}": {
        get: {
          tags: ["product"],
          summary: "Get product by code",
          description: "",
          operationId: "getProductByCode",
          parameters: [
            {
              name: "code",
              in: "path",
              description:
                "The code that needs to be fetched. Use TECH001 for testing. ",
              required: true,
              schema: {
                type: "string",
                example: "TECH001",
              },
            },
          ],
          responses: {
            200: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            400: {
              description: "Invalid code supplied",
            },
            404: {
              description: "Product not found",
            },
          },
        },
        put: {
          tags: ["product"],
          summary: "Update Product",
          description: "Update a product",
          operationId: "updateProduct",
          parameters: [
            {
              name: "code",
              in: "path",
              description: "Code that need to be deleted",
              required: true,
              schema: {
                type: "string",
                example: "TECH001",
              },
            },
          ],
          requestBody: {
            description: "Update an existent Product in the DB",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductUpdate",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/ProductUpdate",
                },
              },
              "application/x-www-form-urlencoded": {
                schema: {
                  $ref: "#/components/schemas/ProductUpdate",
                },
              },
            },
          },
          responses: {
            default: {
              description: "successful operation",
            },
          },
        },
        delete: {
          tags: ["product"],
          summary: "Delete Product",
          description: "Delete product by code",
          operationId: "deleteProduct",
          parameters: [
            {
              name: "code",
              in: "path",
              description: "The code that needs to be deleted",
              required: true,
              schema: {
                type: "string",
                example: "TECH001",
              },
            },
          ],
          responses: {
            400: {
              description: "Invalid code supplied",
            },
            404: {
              description: "Product not found",
            },
          },
        },
      },
      "/api/returns/{return_id}": {
        get: {
          tags: ["returns"],
          summary: "Get return by code",
          description: "",
          operationId: "getReturnById",
          parameters: [
            {
              name: "return_id",
              in: "path",
              description:
                "The return_id that needs to be fetched. Use 1 for testing. ",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                example: 1,
              },
            },
          ],
          responses: {
            200: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Return",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/Return",
                  },
                },
              },
            },
            400: {
              description: "Invalid code supplied",
            },
            404: {
              description: "Return Item not found",
            },
          },
        },
      },
      "/api/returns/{order_item}": {
        post: {
          tags: ["returns"],
          summary: "Generate Return",
          description: "Create a new return.",
          operationId: "CreateReturn",
          parameters: [
            {
              name: "order_item",
              in: "path",
              description: "Order item ID that need to be created Return",
              required: true,
              schema: {
                type: "string",
                example: 1,
              },
            },
          ],
          requestBody: {
            description: "Create return of an existent order item in the DB",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Return",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Return",
                },
              },
              "application/x-www-form-urlencoded": {
                schema: {
                  $ref: "#/components/schemas/Return",
                },
              },
            },
          },
          responses: {
            default: {
              description: "successful operation",
            },
          },
        },
      },
      "/api/returns/{return_id}/{status}": {
        put: {
          tags: ["returns"],
          summary: "Change status Return",
          description: "Update the return status",
          operationId: "UpdateReturn",
          parameters: [
            {
              name: "return_id",
              in: "path",
              description: "Return ID that need to be updated Return",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                example: 1,
              },
            },

            {
              name: "status",
              in: "path",
              description: "Status that needs to be changed Return",
              required: true,
              schema: {
                type: "string",
                enum: [
                  "requested",
                  "pending",
                  "approved",
                  "rejected",
                  "canceled",
                ],
                example: "requested",
              },
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Return updated successfully",
                      },
                      return_id: {
                        type: "integer",
                        format: "int32",
                        example: "1",
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Bad Request - Invalid input",
            },
            404: {
              description: "Order item not found",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/api/refunds/{refund_id}": {
        get: {
          tags: ["refunds"],
          summary: "Get refund by code",
          description: "",
          operationId: "getProductByCode",
          parameters: [
            {
              name: "refund_id",
              in: "path",
              description:
                "The refund_id that needs to be fetched. Use 1 for testing. ",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                example: 1,
              },
            },
          ],
          responses: {
            200: {
              description: "successful operation",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Refund",
                  },
                },
                "application/xml": {
                  schema: {
                    $ref: "#/components/schemas/Refund",
                  },
                },
              },
            },
            400: {
              description: "Invalid code supplied",
            },
            404: {
              description: "Product not found",
            },
          },
        },
      },
      "/api/refunds/{return_id}": {
        post: {
          tags: ["refunds"],
          summary: "Generate Refund",
          description: "Create a refund.",
          operationId: "CreateRefund",
          parameters: [
            {
              name: "return_id",
              in: "path",
              description: "Return ID that need to be created Refund",
              required: true,
              schema: {
                type: "integer",
                example: 1,
              },
            },
          ],
          requestBody: {
            description: "Create Refund of an existent order item in the DB",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Refund",
                },
              },
              "application/xml": {
                schema: {
                  $ref: "#/components/schemas/Refund",
                },
              },
              "application/x-www-form-urlencoded": {
                schema: {
                  $ref: "#/components/schemas/Refund",
                },
              },
            },
          },
          responses: {
            default: {
              description: "successful operation",
            },
          },
        },
      },
      "/api/refunds/{return_id}/{status}": {
        put: {
          tags: ["refunds"],
          summary: "Change status of a Refund",
          description: "Change status of a Refund",
          operationId: "UpdateRefund",
          parameters: [
            {
              name: "return_id",
              in: "path",
              description: "Return ID that need to be updated refund",
              required: true,
              schema: {
                type: "integer",
                format: "int32",
                example: 1,
              },
            },

            {
              name: "status",
              in: "path",
              description: "Status that needs to be changed Refund",
              required: true,
              schema: {
                type: "string",
                enum: [
                  "requested",
                  "pending",
                  "approved",
                  "rejected",
                  "returned",
                  "canceled",
                ],
                example: "requested",
              },
            },
          ],
          responses: {
            200: {
              description: "Successful operation",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Refund change status successfully",
                      },
                      return_id: {
                        type: "integer",
                        format: "int32",
                        example: 1,
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: "Bad Request - Invalid input",
            },
            404: {
              description: "Order item not found",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Order: {
          type: "object",
          properties: {
            order_id: {
              type: "integer",
              format: "int64",
              example: 10,
            },
            customer: {
              type: "integer",
              format: "int64",
              example: 2,
            },
            total_amount: {
              type: "number",
              format: "double",
              example: 1653.51,
            },
            iva: {
              type: "number",
              format: "double",
              example: 177.16,
            },
            sub_total: {
              type: "number",
              format: "double",
              example: 1476.35,
            },
            status: {
              type: "string",
              description: "Order Status",
              example: "approved",
              enum: ["placed", "approved", "delivered"],
            },
            complete: {
              type: "boolean",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
          xml: {
            name: "order",
          },
        },
        User: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "mariosalazar@gmail.com",
            },
            firstname: {
              type: "string",
              example: "Mario",
            },
            lastname: {
              type: "string",
              example: "Salazar",
            },
            password: {
              type: "string",
              example: "password-Mario10/*-",
            },
            user_type: {
              type: "int32",
              description: "User Type",
              format: "int32",
              example: 1,
            },
          },
          xml: {
            name: "user",
          },
        },
        Product: {
          type: "object",
          properties: {
            code: {
              type: "string",
              example: "TECH001",
            },
            name: {
              type: "string",
              example: "Laptop Gamer ASUS",
            },
            description: {
              type: "string",
              example: "Description about this product!",
            },
            price: {
              type: "number",
              format: "double",
              example: 1258.36,
            },
            stock: {
              type: "int32",
              format: "int32",
              example: 5,
            },
          },
        },
        Return: {
          type: "object",
          properties: {
            reason: {
              type: "string",
              example: "I made a mistake in my purchase",
            },
            status: {
              type: "string",
              example: "requested",
            },
          },
        },
        Refund: {
          type: "object",
          properties: {
            payment_method: {
              type: "string",
              example: "I made a mistake in my purchase",
            },
            status: {
              type: "string",
              example: "requested",
            },
          },
        },
        ProductUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Laptop Gamer ASUS",
            },
            description: {
              type: "string",
              example: "Description about this product!",
            },
            price: {
              type: "number",
              format: "double",
              example: 1258.36,
            },
            stock: {
              type: "int32",
              format: "int32",
              example: 5,
            },
          },
        },
        UserUpdate: {
          type: "object",
          properties: {
            firstname: {
              type: "string",
              example: "Mario Andres",
            },
            lastname: {
              type: "string",
              example: "Salazar Anrango",
            },
            password: {
              type: "string",
              example: "password-update",
            },
            user_type: {
              type: "int32",
              description: "User Type",
              format: "int32",
              example: 1,
            },
          },
          xml: {
            name: "user",
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            code: {
              type: "integer",
              format: "int32",
            },
            type: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
          xml: {
            name: "##default",
          },
        },
      },
      requestBodies: {
        Pet: {
          description: "Pet object that needs to be added to the store",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Pet",
              },
            },
            "application/xml": {
              schema: {
                $ref: "#/components/schemas/Pet",
              },
            },
          },
        },
        UserArray: {
          description: "List of user object",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerSpec, swaggerUi };

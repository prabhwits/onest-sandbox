import { DOMAIN, VERSION } from "./constants";

export const onSelectSchema = {
  $id: "onSelectSchema",
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          enum: DOMAIN,
        },
        action: {
          type: "string",
          const: "on_select",
        },
        version: {
          type: "string",
          const: VERSION,
        },
        bap_id: {
          type: "string",
        },
        bap_uri: {
          type: "string",
        },
        bpp_id: {
          type: "string",
        },
        bpp_uri: {
          type: "string",
        },
        transaction_id: {
          type: "string",
        },
        message_id: {
          type: "string",
        },
        location: {
          type: "object",
          properties: {
            city: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                },
              },
              required: ["code"],
            },
            country: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                },
              },
              required: ["code"],
            },
          },
          required: ["city", "country"],
        },
        timestamp: {
          type: "string",
          format: "date-time",
        },
        ttl: {
          type: "string",
        },
      },
      required: [
        "domain",
        "action",
        "version",
        "bap_id",
        "bap_uri",
        "bpp_id",
        "bpp_uri",
        "transaction_id",
        "message_id",
        "location",
        "timestamp",
        "ttl",
      ],
    },
    message: {
      type: "object",
      properties: {
        order: {
          type: "object",
          properties: {
            provider: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
              },
              required: ["id"],
            },
            fulfillments: {
              type: "array",
              properties: {
                id: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
              },
              required: ["id", "type"],
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  fulfillment_ids: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        descriptor: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                          },
                          required: ["code"],
                        },
                        list: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                              },
                              value: {
                                type: "string",
                              },
                            },
                            required: ["code", "value"],
                          },
                        },
                      },
                      required: ["descriptor", "list"],
                    },
                  },
                },
                required: ["id", "fulfillment_ids", "tags"],
              },
            },
            quote: {
              type: "object",
              properties: {
                price: {
                  type: "object",
                  properties: {
                    currency: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                  },
                  required: ["currency", "value"],
                },
                breakup: {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "item": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          },
                          "price": {
                            "type": "object",
                            "properties": {
                              "currency": {
                                "type": "string"
                              },
                              "value": {
                                "type": "string"
                              }
                            },
                            "required": ["currency", "value"]
                          },
                          "title": {
                            "type": "string"
                          }
                        },
                        "required": ["id", "price", "title"]
                      }
                    },
                    "required": ["item"]
                  }
                }
                ,
                ttl: {
                  type: "string",
                },
              },
              required: ["price", "breakup", "ttl"],
            },
          },
          required: ["provider", "items", "fulfillments", "quote"],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

import { DOMAIN, JOBS_TYPE, VERSION } from "./constants";

export const onInitSchema = {
  $id: "onInitSchema",
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
          const: "on_init",
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
        bpp_id: {
          type: "string",
        },
        bpp_uri: {
          type: "string",
        },
      },
      required: [
        "domain",
        "action",
        "version",
        "bap_id",
        "bap_uri",
        "transaction_id",
        "message_id",
        "location",
        "timestamp",
        "ttl",
        "bpp_id",
        "bpp_uri",
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
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
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
                            oneOf: [
                              {
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
                                  value: { type: "string" },
                                },
                                required: ["descriptor", "value"],
                              },
                              {
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
                            ],
                          },
                        },
                      },
                      required: ["descriptor", "list"],
                    },
                  },
                  fulfillment_ids: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  xinput: {
                    type: "object",
                    properties: {
                      form: {
                        type: "object",
                        properties: {
                          mime_type: {
                            type: "string",
                          },
                          resubmit: {
                            type: "boolean",
                          },
                          url: {
                            type: "string",
                          },
                        },
                        required: ["mime_type", "resubmit", "url"],
                      },
                      head: {
                        type: "object",
                        properties: {
                          descriptor: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                            },
                            required: ["name"],
                          },
                          headings: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          index: {
                            type: "object",
                            properties: {
                              cur: {
                                type: "integer",
                              },
                              max: {
                                type: "integer",
                              },
                              min: {
                                type: "integer",
                              },
                            },
                            required: ["cur", "max", "min"],
                          },
                        },
                        required: ["descriptor", "headings", "index"],
                      },
                      required: {
                        type: "boolean",
                      },
                    },
                    required: ["form", "head", "required"],
                  },
                },
                required: ["id", "fulfillment_ids", "tags"],
              },
            },
            fulfillments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                    enum: JOBS_TYPE,
                  },
                  customer: {
                    type: "object",
                    properties: {
                      contact: {
                        type: "object",
                        properties: {
                          phone: {
                            type: "string",
                          },
                          email: {
                            type: "string",
                          },
                        },
                        required: ["phone", "email"],
                      },
                      person: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          gender: {
                            type: "string",
                          },
                          age: {
                            type: "string",
                          },
                          skills: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                name: {
                                  type: "string",
                                },
                              },
                              required: ["code", "name"],
                            },
                          },
                          languages: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                name: {
                                  type: "string",
                                },
                              },
                              required: ["code", "name"],
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
                                    oneOf: [
                                      {
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
                                          value: {
                                            type: "string",
                                          },
                                        },
                                        required: ["descriptor", "value"],
                                      },
                                      {
                                        properties: {
                                          code: { type: "string" },
                                          value: { type: "string" },
                                        },
                                        required: ["code", "value"],
                                      },
                                    ],
                                  },
                                },
                              },
                              required: ["descriptor", "list"],
                            },
                          },
                        },
                        required: [
                          "name",
                          "gender",
                          "age",
                          "skills",
                          "languages",
                          "tags",
                        ],
                      },
                    },
                    required: ["contact", "person"],
                  },
                  state: {
                    type: "object",
                    properties: {
                      descriptor: {
                        type: "object",
                        properties: {
                          code: {
                            type: "string",
                            enum: ["APPLICATION_IN_PROGRESS", "APPLICATION_FILLED"], // Replace with valid codes
                          },
                        },
                        required: ["code"],
                      },
                    },
                    required: ["descriptor"],
                  },
                },
                required: ["id", "type", "customer","state"],
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
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
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
                      title: {
                        type: "string",
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
                                oneOf: [
                                  {
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
                                      value: {
                                        type: "string",
                                      },
                                    },
                                    required: ["descriptor", "value"],
                                  },
                                  {
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
                                ],
                              },
                            },
                          },
                          required: ["descriptor", "list"],
                        },
                      },
                    },
                    required: ["id", "price", "title", "tags"],
                  },
                },
                ttl: {
                  type: "string",
                },
              },
              required: ["price", "breakup", "ttl"],
            },
            payments: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                },
                status: {
                  type: "string",
                  const: "NOT-PAID",
                },
                type: {
                  type: "string",
                  enum: ["ON-ORDER", "ON-FULFILLMENT"],
                },
                collected_by: {
                  type: "string",
                  enum: ["BAP", "BPP"],
                },
                tags: {
                  type: "object",
                  properties: {
                    descriptor: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                          const: "SETTLEMENT_DETAILS",
                        },
                      },
                      required: ["code"],
                    },
                    list: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          descriptor: {
                            type: "object",
                            properties: {
                              code: {
                                type: "string",
                                enum: [
                                  "SETTLEMENT_COUNTERPARTY",
                                  "SETTLEMENT_PHASE",
                                  "SETTLEMENT_TYPE",
                                  "UPI_ADDRESS",
                                  "SETTLEMENT_BANK_ACCOUNT_NO",
                                  "SETTLEMENT_IFSC_CODE",
                                  "BENEFICIARY_NAME",
                                  "BANK_NAME",
                                  "BRANCH_NAME",
                                ],
                              },
                            },
                            required: ["code"],
                          },
                          value: {
                            type: "string",
                          },
                        },
                        required: ["descriptor", "value"],
                      },
                    },
                  },
                  required: ["descriptor", "list"],
                },
              },
              required: ["url", "status", "type", "collected_by", "tags"],
            },
          },
          required: [
            "provider",
            "items",
            "fulfillments",
            "quote",
            "payments",
          ],
        },
      },
      required: ["order"],
    },
  },
  required: ["context", "message"],
};

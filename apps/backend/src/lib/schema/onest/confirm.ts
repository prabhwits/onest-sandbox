import { DOMAIN, JOBS_TYPE, PAYMENTS, VERSION } from "./constants";

export const confirmSchema = {
	$id: "confirmSchema",
	type: "object",
	properties: {
		context: {
			type: "object",
			properties: {
				domain: {
					type: "string",
					enum: DOMAIN,
				},
				version: {
					type: "string",
					const: VERSION,
				},
				action: {
					type: "string",
					const: "confirm",
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
						},
						country: {
							type: "object",
							properties: {
								code: {
									type: "string",
								},
							},
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
				"version",
				"action",
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
						id: {
							type: "string",
						},
						status: {
							type: "string",
							const: "Created",
						},
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
								required: ["id", "fulfillment_ids"],
							},
						},
						fulfillments: {
							type: "array",
							items: {
								type: "object",
								properties: {
									state: {
										type: "object",
										properties: {
											descriptor: {
												type: "object",
												properties: {
													code: {
														type: "string",
														const: "APPLICATION_SUBMITTED",
													},
												},
												required: ["code"],
											},
											updated_at: {
												type: "string",
												format: "date-time",
											},
										},
										required: ["descriptor", "updated_at"],
									},
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
																name: {
																	type: "string",
																},
															},
															required: ["name"],
														},
													},
													languages: {
														type: "array",
														items: {
															type: "object",
															properties: {
																name: {
																	type: "string",
																},
															},
															required: ["name"],
														},
													},
													creds: {
														type: "array",
														items: {
															type: "object",
															properties: {
																id: {
																	type: "string",
																},
																descriptor: {
																	type: "object",
																	properties: {
																		name: {
																			type: "string",
																		},
																		short_desc: {
																			type: "string",
																		},
																		long_desc: {
																			type: "string",
																		},
																	},
																	required: ["name", "short_desc", "long_desc"],
																},
																url: {
																	type: "string",
																},
																type: {
																	type: "string",
																	enum: ["jpeg", "pdf"],
																},
															},
															required: ["id", "descriptor", "url", "type"],
														},
													},
												},
												required: [
													"name",
													"gender",
													"age",
													"skills",
													"languages",
													"creds",
												],
											},
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
										},
										required: ["person", "contact"],
									},
								},
								required: ["id", "type", "customer", "state"],
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
											item: {
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
												},
												required: ["id", "price", "title"],
											},
										},
										required: ["item"],
									},
								},
								ttl: {
									type: "string",
								},
							},
							required: ["price", "breakup", "ttl"],
						},
						payments: {
							type: "array",
							properties: {
								params: {
									type: "object",
									properties: {
										currency: {
											type: "string",
										},
										transaction_id: {
											type: "string",
										},
										amount: {
											type: "string",
										},
									},
									required: ["currency", "transaction_id", "amount"],
								},
								url: {
									type: "string",
								},
								status: {
									type: "string",
									enum: PAYMENTS["status"]
								},
								type: {
									type: "string",
									enum: PAYMENTS["order_status"],
								},
								collected_by: {
									type: "string",
									enum: PAYMENTS["collected_by"],
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
							required: ["params", "status", "type", "collected_by", "tags"],
						},
					},
					required: [
						"id",
						"status",
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

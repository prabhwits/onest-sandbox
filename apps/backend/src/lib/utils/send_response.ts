//new code (changes in redis with id)

import { NextFunction, Response } from "express";
import axios from "axios";
import { createAuthHeader, logger, redis } from "./index";
import { AxiosError } from "axios";

interface headers {
	authorization: string;
	"X-Gateway-Authorization"?: string;
}

async function send_response(
	res: Response,
	next: NextFunction,
	res_obj: any,
	transaction_id: string,
	action: string,
	search_type: string = "search_by_job_location",
	scenario: any = "",
	version: any = "",
	bpp_uri: string = "", // for search
	id: number = 0
) {
	let time_now = new Date().toISOString();
	try {
		await redis.set(`${transaction_id}-search_type`, search_type);
		const { context } = res_obj;
		if (bpp_uri === "") bpp_uri = context.bpp_uri || res_obj.bpp_uri;

		if (res_obj.bpp_uri) delete res_obj.bpp_uri;

		const header = await createAuthHeader(res_obj);

		await redis.set(
			`${transaction_id}-${action}-from-server-${id}-${time_now}`,
			JSON.stringify({ request: { ...res_obj } })
		);

		const headers: headers = {
			authorization: header,
		};

		if (action === "search") {
			headers["X-Gateway-Authorization"] = header;
		}

		let uri: any;

		if (scenario && version) {
			uri = `${bpp_uri}/${action}${scenario ? `?scenario=${scenario}` : ""}${
				version ? `&version=${version}` : ""
			}`;
		} else if (version) {
			uri = `${bpp_uri}/${action}${version ? `?version=${version}` : ""}`;
		} else {
			uri = `${bpp_uri}/${action}${scenario ? `?scenario=${scenario}` : ""}`;
		}
		let response: any;
		try {
			try {
				logger.info("bap request from the server", res_obj);
				response = await axios.post(uri, res_obj, {
					headers: { ...headers },
				});
				logger.info("bpp response", JSON.stringify(response?.data));
			} catch (error: any) {
				logger.error("Error details:", error.toJSON ? error.toJSON() : error);
				throw error;
			}

			await redis.set(
				`${transaction_id}-${action}-from-server-${id}-${time_now}`,
				JSON.stringify({
					request: { ...res_obj },
					response: {
						response: response.data,
						timestamp: new Date().toISOString(),
					},
				})
			);
		} catch (err: any) {
			logger.error("err:", err);
			if (err instanceof AxiosError) {
				res.status(err.response?.status || 500).json(err.response?.data || "");
				return;
			}
			throw err;
		}
		return res.status(200).json({
			message: {
				ack: {
					status: "ACK",
				},
			},
			transaction_id,
		});
	} catch (error) {
		next(error);
	}
}

function send_nack(res: Response, message: string) {
	return res.status(400).json({
		message: {
			ack: {
				status: "NACK",
			},
		},
		error: {
			message: message,
		},
	});
}

function send_ack(res: Response) {
	return res.json({
		message: {
			ack: {
				status: "ACK",
			},
		},
	});
}
export { send_response, send_nack, send_ack };

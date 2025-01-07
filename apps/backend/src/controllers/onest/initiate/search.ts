import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import { v4 as uuidv4 } from "uuid";
import {
	MOCKSERVER_ID,
	send_response,
	ONEST_EXAMPLES_PATH,
	ONEST_BAP_MOCKSERVER_URL,
} from "../../../lib/utils";
import { ACTION_KEY } from "../../../lib/utils/actionOnActionKeys";
import { ONEST_DOMAINS } from "../../../lib/utils/apiConstants";

export const initiateSearchController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { bpp_uri, city, domain, search_type } = req.body;
		console.log("search_type",search_type);
		let file;

		switch (domain) {
			case ONEST_DOMAINS.ONEST10:
				if (search_type) {
					file = fs.readFileSync(
						path.join(ONEST_EXAMPLES_PATH, `search/${search_type}.yaml`)
					);
				}
				else {
					file = fs.readFileSync(
						path.join(ONEST_EXAMPLES_PATH, "search/search_by_job_type.yaml")
					);
				}
				break;

			default:
				file = fs.readFileSync(
					path.join(ONEST_EXAMPLES_PATH, "search/search_by_job_type.yaml")
				);
		}
		let search = YAML.parse(file.toString());
		search = search.value;
		const transaction_id = uuidv4();
		const timestamp = new Date().toISOString();

		search = {
			...search,
			context: {
				...search.context,
				timestamp,
				location: {
					...search.context.location,
					city: {
						code: city,
					},
				},
				transaction_id,
				domain,
				bap_id: MOCKSERVER_ID,
				bap_uri: ONEST_BAP_MOCKSERVER_URL,
				message_id: uuidv4(),
			},
		};
		search.bpp_uri = bpp_uri;
		await send_response(res, next, search, transaction_id, ACTION_KEY.SEARCH, search_type);
	} catch (error) {
		return next(error);
	}
};

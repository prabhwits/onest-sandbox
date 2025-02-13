import { NextFunction, Request, Response } from "express";
import { logger, redis, TransactionType, onActionRedisSaver } from "../../../lib/utils";

export const onSearchController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await onActionRedisSaver(req, res, next);
		return res.json({
			sync: {
				message: {
					ack: {
						status: "ACK",
					},
				},
			},
		});
	} catch (error) {
		logger.error(
			"onSearchController: Error occurred for transaction id",
			req.body.transaction_id,
			error
		);
		return next(error);
	}
};

const onSearchSelectionController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		var id: number = 0;
		const { context, message } = req.body;
		const action = context?.action;
		const ts = new Date();

		// Saving In Redis
		var log: TransactionType = {
			request: req.body,
		};
		log.response = {
			timestamp: new Date().toISOString(),
			response: {
				response: { message: { ack: { status: "ACK" } } },
				timestamp: `${ts.toISOString()}`,
			},
		};
		if (
			action === "on_status" ||
			action === "on_init" ||
			action === "on_update"
		) {
			const transactionKeys = await redis.keys(
				`*-${(req.body.context! as any).transaction_id}-*`
			);
			const logIndex = transactionKeys.filter((e) =>
				e.includes(`${action}-to-server`)
			).length;
			await redis.set(
				`${
					(req.body.context! as any).transaction_id
				}-${logIndex}-${action}-from-server-${id}-${ts.toISOString()}`,
				JSON.stringify(log)
			);
		} else {
			await redis.set(
				`${
					(req.body.context! as any).transaction_id
				}-${action}-from-server-${id}-${ts.toISOString()}`,
				JSON.stringify(log)
			);
		}
	} catch (error) {
		logger.error(
			"onSearchSelectionController: Error occurred for transaction id",
			req.body.transaction_id,
			error
		);
		next(error);
	}
};

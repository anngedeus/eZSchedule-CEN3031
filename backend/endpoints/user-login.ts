import User, { generateTokenForID } from '../models/user.js';
import express from 'express';
import APIError from '../lib/api-errors.js';
import APIResponse from '../lib/api-response.js';

interface UserLoginResponse extends APIResponse {
	userID?: string,
	token?: string,
};

export default async (req: express.Request, res: express.Response) => {
	let resbody: UserLoginResponse = {
		error: APIError.BadRequest,
	};

	try {
		resbody.userID = req.user.id;
		resbody.token = await generateTokenForID(req.user.id);
	} catch (e) {
		res.status(400).json(resbody);
		return;
	}

	resbody.error = APIError.None;
	res.status(200).json(resbody);
};

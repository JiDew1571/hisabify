import Hisab from '../models/Hisab.js';
import { StatusCodes } from 'http-status-codes';
import {
	BadRequestError,
	NotFoundError,
	UnAuthenticatedError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';
const createHisab = async (req, res) => {
	const { task, person } = req.body;

	if (!task || !person) {
		throw new BadRequestError('Please provide all values');
	}
	req.body.createdBy = req.user.userId;
	const hisab = await Hisab.create(req.body);
	res.status(StatusCodes.CREATED).json({ hisab });
};
const getAllHisabs = async (req, res) => {
	const { status, taskType, sort, search } = req.query;

	const queryObject = {
		createdBy: req.user.userId,
	};
	// add stuff based on condition

	if (status && status !== 'all') {
		queryObject.status = status;
	}
	if (taskType && taskType !== 'all') {
		queryObject.taskType = taskType;
	}
	if (search) {
		queryObject.task = { $regex: search, $options: 'i' };
	}
	// NO AWAIT

	let result = Hisab.find(queryObject);

	// chain sort conditions

	if (sort === 'latest') {
		result = result.sort('-createdAt');
	}
	if (sort === 'oldest') {
		result = result.sort('createdAt');
	}
	if (sort === 'a-z') {
		result = result.sort('task');
	}
	if (sort === 'z-a') {
		result = result.sort('-task');
	}

	//

	// setup pagination
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const hisabs = await result;

	const totalHisabs = await Hisab.countDocuments(queryObject);
	const numOfPages = Math.ceil(totalHisabs / limit);

	res.status(StatusCodes.OK).json({ hisabs, totalHisabs, numOfPages });
};
const updateHisab = async (req, res) => {
	const { id: hisabId } = req.params;
	const { person, task } = req.body;

	if (!task || !person) {
		throw new BadRequestError('Please provide all values');
	}
	const hisab = await Hisab.findOne({ _id: hisabId });

	if (!hisab) {
		throw new NotFoundError(`No hisab with id :${hisabId}`);
	}
	// check permissions

	checkPermissions(req.user, hisab.createdBy);

	const updatedHisab = await Hisab.findOneAndUpdate({ _id: hisabId }, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(StatusCodes.OK).json({ updatedHisab });
};
const deleteHisab = async (req, res) => {
	const { id: hisabId } = req.params;

	const hisab = await Hisab.findOne({ _id: hisabId });

	if (!hisab) {
		throw new NotFoundError(`No hisab with id :${hisabId}`);
	}

	checkPermissions(req.user, hisab.createdBy);

	await hisab.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Hisab removed' });
};
const showStats = async (req, res) => {
	let stats = await Hisab.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: '$status', count: { $sum: 1 } } },
	]);
	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});

	const defaultStats = {
		halfWay: stats.halfWay || 0,
		done: stats.done || 0,
		pending: stats.pending || 0,
	};

	let monthlyApplications = await Hisab.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 },
	]);
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format('MMM Y');
			return { date, count };
		})
		.reverse();

	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createHisab, deleteHisab, getAllHisabs, updateHisab, showStats };

import mongoose from 'mongoose';

const HisabSchema = new mongoose.Schema(
	{
		person: {
			type: String,
			required: [true, 'Please provide person'],
			maxlength: 50,
		},
		task: {
			type: String,
			required: [true, 'Please provide task'],
			maxlength: 100,
		},
		sent: {
			type: String,
			required: [true, 'Please provide sent'],
			maxlength: 10,
		},
		got: {
			type: String,
			maxlength: 10,
		},
		status: {
			type: String,
			enum: ['halfWay', 'done', 'pending'],
			default: 'pending',
		},
		taskType: {
			type: String,
			enum: ['bandhiya', 'casting', 'povai'],
			default: 'povai',
		},

		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Hisab', HisabSchema);

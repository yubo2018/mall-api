'use strict';

import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	memberId: Number,
	configId: Number,
	goodsId: Number,
	catId: Number
});

const Ids = mongoose.model('ff__ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			userId: 0,
			configId: 0,
			goodsId: 0,
			catId: 0
		});
		newIds.save();
	}
})
export default Ids
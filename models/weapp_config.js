'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const weappConfigSchema = new Schema({
    appConfigId: Number,
    theme:[],
    tabBar: {},
})

weappConfigSchema.index({ id: 1 });

const weappConfig = mongoose.model('ff__weapp_config', weappConfigSchema);


export default weappConfig



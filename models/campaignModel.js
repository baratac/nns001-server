'use strict';
const mongoose = require('mongoose');

const platformSchema = new mongoose.Schema({
        status: String,
        total_budget: Number,
        remaining_budget: Number,
        start_date: Date,
        end_date: Date,
        target_audiance: {
            languages:[ String ],
            genders: [ String ],
            age_range: [ Number ],
            locations: [ String ],
            interests: [ String ],
            KeyWords: [ String ]
        },
        creatives: {
            header: String,
            header_1: String,
            header_2: String,
            description: String,
            url: String,
            image: String
        },
        insights: {
            impressions: Number,
            clicks: Number,
            nanos_score:  Number,
            website_visits: Number,
            cost_per_click: Number,
            click_through_rate: Number,
            advanced_kpi_1: Number,
            advanced_kpi_2: Number
        }
    }
);

const  campaignSchema = new mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true            
        },
        goal: String,
        total_budget: Number,
        status: String,
        platforms: {
            type: Map,
            of: platformSchema
        }
    }
);

module.exports = mongoose.model('campaign', campaignSchema);
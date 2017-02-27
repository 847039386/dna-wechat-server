var mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
    name: { type: String },
    other_name: { type: String },
    other_names: [String],
    writers: [String],
    directors: [String],
    stars: [String],
    types: [String],
    regions: [String],
    languages: [String],
    time_length: { type: String },
    imdb_link: { type: String },
    score: { type: Number },//豆瓣评分
    rate_count: { type: Number },//评分人数
    year: { type: Number },
    url: { type: String },
    poster_url: { type: String },
    summary: { type: String },
    douban_id: { type: Number },
    episode_count: { type: Number }, //电视剧的集数
    season_count: { type: Number },
    duration_per: { type: String },
    create_at: { type: Date, default: Date.now },
    increase_rate_count: { type: Number },
    increase_rate_discover_at: { type: Date },
    increase_score: { type: Number },
    increase_score_discover_at: { type: Date },
    last_crawl_at: { type: Date },
})

exports.movie =  mongoose.model("Movie", MovieSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate")

const biennaleSchema = new Schema({


    name:{type:String, required:true},
    address1:{type:String, required:true},
    address2:{type:String, required:true},
    latitude:{type:String, required:true},
    longitude:{type:String, required:true},
    openingday:{type:Date, required:true},
    closingday:{type:Date, required:true},
    rescheduledOpnday:Date,
    rescheduledClsday:Date,
    modified_openingday:String,
    modified_closingday:String,
    modified_rescheduled_openingday:String,
    modified_rescheduled_closingday:String,
    website:String,
    country:String,
    ticket:String,
    image:String,
    image_copyright:String,
    type_of_event:String,
    is_rescheduled:String,
    seo_text:String,
})

biennaleSchema.plugin(mongoosePaginate)

const Biennale = mongoose.model("Biennale", biennaleSchema)

module.exports = Biennale;

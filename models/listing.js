const { ref, string } = require("joi");
const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const Review  = require("./review.js");
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    // image: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1725623831887-5f76cb0f9d09?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D", // default if you want one
    // },
    image:{
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews :[
        {
            type :Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews}});
    }
});
const Listing =mongoose.model("Listing",listingSchema);
module.exports=Listing;

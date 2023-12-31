const { getUserIdFromToken } = require("../middleware/jwtProvider");
const Rating = require("../models/rating.model");

const AddRating = async(req,res) => {
    const { product_id } = req.params;
    const { rating } = req.body;
    const jwt_token = req.headers.authorization?.split(" ")[1];
    const userID = getUserIdFromToken(jwt_token);
    try {
        const existingRating  = await Rating.findOne({user:userID,product:product_id});
        // console.log(product_rating);
        if(!existingRating){
            const addRating = new Rating({
                user:userID,
                product:product_id,
                rating:rating
            });
            addRating.save();
            return res.status(200).send({status:200,message:"Rating added successfully"});
        }
        return res.status(401).send({status:401,message:"You already rate this product"});
    } catch (error) {
        return res.status(400).send({status:400,message:error.message});
    }
}

const TotalRating = async(req,res) => {
    const {product_id} = req.params;
    try {
       const ratings = await Rating.find({product:product_id});
       const totalRatings = ratings.length;
       const sumRatings = ratings.reduce((sum,rating)=>{
        sum + rating.rating
       },0);
       const overallRating = totalRatings > 0 ? sumRatings/totalRatings : 0;
       return res.status(200).send({status:200,overallRating:overallRating,message:"success"})
    } catch (error) {
        return res.status(400).send({status:400,message:error.message});
    }
}

module.exports = {AddRating, TotalRating}
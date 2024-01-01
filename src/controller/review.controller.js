const { getUserIdFromToken } = require("../middleware/jwtProvider");
const Rating = require("../models/rating.model");
const Review = require("../models/review.model");

// add new rating logic
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

// get total one product rating logic
const TotalRating = async(req,res) => {
    const {product_id} = req.params;
    try {
        const OneStar = [];
        const TwoStar = [];
        const ThreeStar = [];
        const FourStar = [];
        const FiveStar = [];
       const ratings = await Rating.find({product:product_id});
       if(ratings.length > 0){
        const onestar = ratings.filter((data)=>{
            if(data.rating === 1){
                OneStar.push(data);
            }
        });
        const twostar = ratings.filter((data)=>{
            if(data.rating === 2){
                TwoStar.push(data);
            }
        });
        const threestar = ratings.filter((data)=>{
            if(data.rating === 3){
                ThreeStar.push(data);
            }
        });
        const fourstar = ratings.filter((data)=>{
            if(data.rating === 4){
                FourStar.push(data);
            }
        });
        const fivestar = ratings.filter((data)=>{
            if(data.rating === 5){
                FiveStar.push(data);
            }
        });
       }
       const totalRatings = ratings.length;
       const sumRatings = ratings.reduce((sum,rating)=>{
        return sum + Number(rating.rating)
       },0);
       const overallRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
       return res.status(200).send({status:200,overallRating:overallRating,totalRatings:totalRatings,OneStar:(OneStar.length*100)/totalRatings,TwoStar:(TwoStar.length*100)/totalRatings,ThreeStar:(ThreeStar.length*100)/totalRatings,FourStar:(FourStar.length*100)/totalRatings,FiveStar:(FiveStar.length*100)/totalRatings,message:"success"})
    } catch (error) {
        return res.status(400).send({status:400,message:error.message});
    }
}


// add new review logic
const AddReview = async(req,res) => {
    const { product_id } = req.params;
    const { review } = req.body;
    const jwt_token = req.headers.authorization?.split(" ")[1];
    const userID = getUserIdFromToken(jwt_token);
    try {
        const existingReview  = await Review.findOne({user:userID,product:product_id});
        if(!existingReview){
            const addReview = new Review({
                user:userID,
                product:product_id,
                review:review
            });
            addReview.save();
            return res.status(200).send({status:200,message:"Review added successfully"});
        }
        return res.status(401).send({status:401,message:"You already write review for this product"});
    } catch (error) {
        return res.status(400).send({status:400,message:error.message});
    }
}

// get total one product review logic

module.exports = {AddRating, TotalRating, AddReview}
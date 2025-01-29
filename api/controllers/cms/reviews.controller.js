const {Review} = require("@/models");
const {errorMsg, notFoundError} = require("@/lib/functions");

class ReviewsController {
    index = async (req, res, next) => {
        try {
            let reviews = await Review.aggregate()
                .lookup({from: 'products', localField: 'productId', foreignField: '_id', as: 'product'})
                .lookup({from: 'users', localField: 'userId', foreignField: '_id', as: 'user'})

            for (let i in reviews) {
                reviews[i].product = reviews[i].product[0]
                reviews[i].user = reviews[i].user[0]
            }
            res.send(reviews)
        } catch (error) {
            errorMsg(next, error)
        }
    }
    destroy = async (req,res,next) =>{
        try{
            const{id}= req.params

            const reviews = await Review.findById(id)

            if(reviews) {
                await Review.findByIdAndDelete(id)

                res.send({
                    message: 'Review deleted.',
                })
            }else{
                notFoundError(next, 'Review')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
}
module.exports=new ReviewsController

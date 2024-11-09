const Coupon = require("../../models/coupon");
const Cart = require("../../models/cart");

const applyCoupounOffer = async(req,res)=>{
    const {selectedCoupun,user} = req.body
    const couponData = await Coupon.find({code:selectedCoupun})
    const cartData = await Cart.find({userId:user})
    const caritems = cartData.find((x)=>x.items)
    let totalPrice = 0
    for(x of caritems.items){
        totalPrice += x.totalItemPrice
    }
    
}

module.exports = {
    applyCoupounOffer
}
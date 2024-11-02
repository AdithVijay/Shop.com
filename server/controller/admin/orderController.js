const Order = require("../../models/order");

//==================TO CHANGE THE ORDER STATUS ================

const updateOrderStatus = async (req,res)=>{
    const { orderId, productId, status } = req.body;

    // Find the order by its ID and check if it has the specified product ID
    const order = await Order.findOne({ _id: orderId});
    console.log(order);
    order.order_status = status
    await order.save()
    console.log(order);
    res.status(200).json({ message: 'Order status updated successfully', order });
}

module.exports={
    updateOrderStatus
}
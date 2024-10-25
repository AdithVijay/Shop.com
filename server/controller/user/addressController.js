const Address = require( "../../models/useraddress")

// =====================CREATING THE NEW ADDRESSS=====================
const createUserAddress = async(req,res)=>{
    try {
        const { id: userId, newAddress } = req.body;
    if (!userId || !newAddress) {
        return res.status(400).json({ message: 'User ID and address data are required' });
      }
      const address = new Address({
        user: userId, // Associate the address with the user ID
        name: newAddress.name,
        email: newAddress.email,
        address: newAddress.address,
        district: newAddress.district,
        state: newAddress.state,
        landmark: newAddress.landmark,
        pincode: newAddress.pincode,
      });
  
      // Save the new address to the database
      await address.save();
      res.status(201).json({ message: 'Address added successfully', address });
    } catch (error) {
        console.log(error);
    }
}
// =====================FETCHING THE  ADDRESSS TO DISPLAY IN FRONT PAGE=====================
const fetchUserAddresses = async(req,res)=>{
    const userId = req.params.id
    console.log(userId);
    const address = await Address.find({ user: userId });
    console.log(address);
    if(!address){
        return res.status(404).json("jkbk found")
    }
    return res.status(200).json(address)
}

module.exports={
    fetchUserAddresses,
    createUserAddress
}
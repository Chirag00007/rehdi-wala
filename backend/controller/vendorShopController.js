

exports.createShop = async (req, res, next) => {
 try {
  const { shopName, shopAddress, shopPhone, shopCategory } = req.body;

  const vendor = req.user._id;

  const shop = await Shop.create({
   shopName,
   shopAddress,
   shopPhone,
   shopCategory,
   vendor
  });

  res.status(201).json({
   success: true,
   shop
  });

 } catch (error) {
   res.status(500).json({ message: error.message });
 }
 }
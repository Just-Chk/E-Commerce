const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.createOrder = async (req, res) => 
{
  try 
  {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) 
    {
      const product = item.productId;
      
      if (product.stock < item.quantity) 
      {
        return res.status(400).json
        ({ 
          message: `Insufficient stock for ${product.name}` 
        });
      }

      product.stock -= item.quantity;
      await product.save();

      orderItems.push
      ({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;
    }

    const order = new Order
    ({
      userId: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: 'pending'
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getOrders = async (req, res) => 
{
  try 
  {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.productId', 'name price imageUrl')
      .sort('-createdAt');
    
    res.json(orders);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
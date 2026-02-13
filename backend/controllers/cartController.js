const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.getCart = async (req, res) => 
{
  try 
  {
    let cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.productId', 'name price imageUrl');
    
    if (!cart) 
    {
      cart = new Cart({ userId: req.user.id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.addToCart = async (req, res) => 
{
  try 
  {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) 
    {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    
    if (!cart) 
    {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find( item => item.productId.toString() === productId );

    if (existingItem) 
    {
      existingItem.quantity += quantity;
    } 
    
    else 
    {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    
    await cart.populate('items.productId', 'name price imageUrl');
    
    res.json(cart);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateCartItem = async (req, res) => 
{
  try 
  {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) 
    {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.items.id(req.params.itemId);
    if (!cartItem) 
    {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    await cart.save();
    
    await cart.populate('items.productId', 'name price imageUrl');
    res.json(cart);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.removeFromCart = async (req, res) => 
{
  try 
  {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) 
    {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter( item => item._id.toString() !== req.params.itemId );

    await cart.save();
    
    await cart.populate('items.productId', 'name price imageUrl');
    res.json(cart);
  } 
  
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
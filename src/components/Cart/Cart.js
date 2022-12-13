import { useContext,useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
  const[isOrder,setIsOrder] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () =>{
    setIsOrder(true);
  }

  const submitOrder =async  (userData) =>{
    try{
    const response = await fetch("https://react-app-aa08b-default-rtdb.firebaseio.com/orders.json",{
      method:'POST',
      headers : {'Content-Type' :'application/json' },
      body : JSON.stringify({
        userData: userData,
      ordererdItems : cartCtx})
    });
    if(!response.ok){
      throw new Error('something went wrong');
    }
    const data = await response.json();
    console.log(data);

  }catch(err){
console.log(err.message)
  }

  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );


  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
      {isOrder && <CheckoutForm onCancel={props.onClose} onClick={submitOrder} />}
    </Modal>
  );
};

export default Cart;

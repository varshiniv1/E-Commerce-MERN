import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../hoc/dashboardLayout';
import Loader from '../../../utils/loader';
import CartDetail from './cartDetail';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../store/actions/user.actions';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const UserCart = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const removeItem = (position) => {
    dispatch(removeFromCart(position));
  };

  const calculateTotal = () => {
    let total = 0;
    props.users.cart.forEach((item) => {
      total += parseInt(item.price, 10);
    });
    return total;
  };

  const generateUnits = () => [
    {
      description: "Guitars and accessories",
      amount: {
        currency_code: "USD",
        value: calculateTotal(),
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: calculateTotal(),
          },
        },
      },
      items: generateItems(),
    },
  ];

  const generateItems = () => {
    return props.users.cart.map((item) => ({
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: 1,
      name: item.model,
    }));
  };

  useEffect(()=>{
    if(notifications && notifications.success){
        props.history.push('/dashboard')
    }
    if(notifications && notifications.error){
        setLoading(false)
    }
},[notifications, props.history])

  return (
    <DashboardLayout title="Your Cart">
      {props.users.cart && props.users.cart.length > 0 ? (
        <>
          <CartDetail
            products={props.users.cart}
            removeItem={(position) => removeItem(position)}
          />
          <div className="user_cart_sum">
            <div>Total amount: ${calculateTotal()}</div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="pp_button">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ASFyYxNBdbrhaaRQSFHyjSmymRrkF36OiyDLPjVV6I_8KuswKtpKaq6Dn8oTMxUm8bBHvWaq6CF74kN4",
                  currency: "USD",
                  intent: "capture",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: generateUnits(),
                    });
                  }}
                  onApprove={(data, actions) => {
                    setLoading(true);
                    return actions.order.capture().then((details) => {
                      console.log("Payment Successful:", details);
                      setLoading(false);
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Checkout Error:", err);
                    setLoading(false);
                  }}
                  onCancel={(data)=>{
                    setLoading(false);
                }}
                />
              </PayPalScriptProvider>
            </div>
          )}
        </>
      ) : (
        <div>There is nothing in your cart</div>
      )}
    </DashboardLayout>
  );
};

export default UserCart;

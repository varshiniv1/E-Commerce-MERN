import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { showToast } from '../utils/tools.js';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../store/actions/index.js';

const MainLayout = ({ children }) => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for errors and show toast
    if (notifications.error) {
      const msg = notifications.msg || 'Error';
      showToast('ERROR', msg);
      dispatch(clearNotification());
    }

    // Check for success messages and show toast
    if (notifications.success) {
      const msg = notifications.msg || 'Good job !!';
      showToast('SUCCESS', msg);
      dispatch(clearNotification());
    }
  }, [notifications, dispatch]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default MainLayout;

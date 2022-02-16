import React from 'react';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contextClass: any = {
  success: 'bg-primary-500',
  error: 'bg-red-600',
  info: 'bg-blue-600',
  warning: 'bg-orange-400',
  default: 'bg-black-600 text-white',
  dark: 'bg-white-600 text-black'
};

const ToastAppContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={ 5000 }
      hideProgressBar
      newestOnTop={ false }
      closeOnClick
      rtl={ false }
      pauseOnFocusLoss
      pauseOnHover
      transition={ Slide }
      closeButton={ false }
      limit={ 5 }
      toastClassName={ ({ type } : any) => contextClass[type || 'default'] +
                ' w-auto mb-2 rounded-md overflow-hidden cursor-pointer shadow-2xl custom-toast' }
      bodyClassName={ () => 'flex text-sm font-white font-medium block p-3' }
    />
  );
};

export default ToastAppContainer;

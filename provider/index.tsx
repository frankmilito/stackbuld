"use client";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "../globalStore/store";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toast";

const GlobalProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer delay={5000} position="top-center" />
          <Navbar />
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default GlobalProviders;

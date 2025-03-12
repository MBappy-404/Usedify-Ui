"use client"
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const MainProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
          <Toaster richColors  position="top-center"  style={{textTransform: 'uppercase'}}  />
        </PersistGate>
      </Provider>
    </div>
  );
};

export default MainProvider;

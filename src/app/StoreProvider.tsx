"use client";
import { Provider } from "react-redux";
import { makeStore, persister } from "../lib/store";
import { PersistGate } from "redux-persist/es/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <Provider store={makeStore}>
      <PersistGate loading={null} persistor={persister}>{children}</PersistGate>
    </Provider>
  );
}

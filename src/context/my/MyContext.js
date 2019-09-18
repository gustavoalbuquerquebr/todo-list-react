import React from "react";

export const MyContext = React.createContext({});

export const MyProvider = MyContext.Provider;
export const MyConsumer = MyContext.Consumer;

export default MyContext;
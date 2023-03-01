import React, { createContext, useContext, useReducer } from "react";


// prepare for creating data Layer          
export const DataLayerContext = createContext();

// actual data layer that wraps

export const DataLayer = ({ initialState, reducer, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
)

// gettting access to usecontext

export const useDataLayerValue = () => useContext(DataLayerContext);
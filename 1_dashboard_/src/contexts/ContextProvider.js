import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [themeSettings, setThemeSettings] = useState(false);
    const [currentMode, setCurrentMode] = useState('Light');

    const setMode = (e) => {
        console.log(e.target);
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        // console.log(e.target);
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false);
    }

    const handleClick = (clicked) => {
        // important concept use of spread operator to change content dynamically
        setIsClicked({ ...initialState, [clicked]: true });
    }
    return (
        <StateContext.Provider value={{
            currentColor, currentMode, activeMenu,
            screenSize, setScreenSize, handleClick, isClicked, initialState,
            setIsClicked, setActiveMenu, setMode,
            setColor, themeSettings, setThemeSettings
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
import React from "react";

let InputContext = React.createContext(null);

function useInput() {
  const context = React.useContext(InputContext);

  if (!context) {
    throw new Error("useInput hook must be used within a InputProvider");
  }

  return context;
}

function InputProvider({ children, defaultValue }) {
  const [isEditable, setIsEditable] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(() => {
    if (
      defaultValue.group_name === null ||
      defaultValue.group_name === undefined
    ) {
      return defaultValue.title;
    }
    return defaultValue.group_name;
  });
  const toggle = () => setIsEditable(!isEditable);
  const value = { isEditable, toggle, inputValue, setInputValue };

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
}

export { InputProvider, useInput };

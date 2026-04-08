import { createContext, useContext, useState, ReactNode } from "react";

interface DeepWorkContextType {
  isDeepWork: boolean;
  toggleDeepWork: () => void;
}

const DeepWorkContext = createContext<DeepWorkContextType>({
  isDeepWork: false,
  toggleDeepWork: () => {},
});

export const useDeepWork = () => useContext(DeepWorkContext);

export const DeepWorkProvider = ({ children }: { children: ReactNode }) => {
  const [isDeepWork, setIsDeepWork] = useState(false);
  const toggleDeepWork = () => setIsDeepWork((prev) => !prev);

  return (
    <DeepWorkContext.Provider value={{ isDeepWork, toggleDeepWork }}>
      {children}
    </DeepWorkContext.Provider>
  );
};

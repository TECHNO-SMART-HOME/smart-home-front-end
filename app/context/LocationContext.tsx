import React, { createContext, useContext, useMemo, useState } from "react";

export type LocationState = {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
};

type LocationContextValue = {
  location: LocationState;
  setLocation: (value: LocationState) => void;
};

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined,
);

const defaultLocation: LocationState = {
  country: "Philippines",
  city: "Cagayan de Oro",
  latitude: 8.4542,
  longitude: 124.6319,
};

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<LocationState>({
    ...defaultLocation,
  });

  const value = useMemo(
    () => ({
      location,
      setLocation,
    }),
    [location],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used within LocationProvider");
  }

  return context;
};

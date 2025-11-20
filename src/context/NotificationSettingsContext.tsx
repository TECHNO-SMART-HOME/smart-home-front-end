import React, { createContext, useContext, useMemo, useState } from "react";

type NotificationSettingsContextValue = {
  fireAlertEnabled: boolean;
  floodAlertEnabled: boolean;
  reminderEnabled: boolean;
  setFireAlertEnabled: (value: boolean) => void;
  setFloodAlertEnabled: (value: boolean) => void;
  setReminderEnabled: (value: boolean) => void;
};

const NotificationSettingsContext = createContext<
  NotificationSettingsContextValue | undefined
>(undefined);

export function NotificationSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fireAlertEnabled, setFireAlertEnabled] = useState(false);
  const [floodAlertEnabled, setFloodAlertEnabled] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const value = useMemo(
    () => ({
      fireAlertEnabled,
      floodAlertEnabled,
      reminderEnabled,
      setFireAlertEnabled,
      setFloodAlertEnabled,
      setReminderEnabled,
    }),
    [fireAlertEnabled, floodAlertEnabled, reminderEnabled],
  );

  return (
    <NotificationSettingsContext.Provider value={value}>
      {children}
    </NotificationSettingsContext.Provider>
  );
}

export const useNotificationSettings = () => {
  const context = useContext(NotificationSettingsContext);

  if (!context) {
    throw new Error(
      "useNotificationSettings must be used within NotificationSettingsProvider",
    );
  }

  return context;
};

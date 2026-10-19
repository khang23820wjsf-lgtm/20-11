import React, { createContext, useContext, useState, useEffect } from "react";

interface PersonalizationContextType {
  recipientTo: string;
  senderFrom: string;
  setPersonalization: (to: string, from?: string) => void;
  clearPersonalization: () => void;
  buildPersonalizedUrl: (to: string, from?: string) => string;
}

const PersonalizationContext = createContext<PersonalizationContextType>({
  recipientTo: "",
  senderFrom: "",
  setPersonalization: () => {},
  clearPersonalization: () => {},
  buildPersonalizedUrl: () => "",
});

export const PersonalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipientTo, setRecipientTo] = useState<string>("");
  const [senderFrom, setSenderFrom] = useState<string>("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get("to") || params.get("name") || "";
      const fromParam = params.get("from") || params.get("sender") || "";
      if (toParam.trim()) {
        setRecipientTo(toParam.trim());
      }
      if (fromParam.trim()) {
        setSenderFrom(fromParam.trim());
      }
    } catch {
      // ignore URL parsing errors
    }
  }, []);

  useEffect(() => {
    if (recipientTo) {
      document.title = `Dành tặng ${recipientTo} — SHE IS | 20.10`;
    } else {
      document.title = "SHE IS — A Cinematic Tribute to Women | 20.10";
    }
  }, [recipientTo]);

  const setPersonalization = (to: string, from: string = "") => {
    const cleanTo = to.trim();
    const cleanFrom = from.trim();
    setRecipientTo(cleanTo);
    setSenderFrom(cleanFrom);

    try {
      const url = new URL(window.location.href);
      if (cleanTo) {
        url.searchParams.set("to", cleanTo);
      } else {
        url.searchParams.delete("to");
      }
      if (cleanFrom) {
        url.searchParams.set("from", cleanFrom);
      } else {
        url.searchParams.delete("from");
      }
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore history errors in sandboxed iframes
    }
  };

  const clearPersonalization = () => {
    setPersonalization("", "");
  };

  const buildPersonalizedUrl = (to: string, from: string = ""): string => {
    try {
      const url = new URL(window.location.origin + window.location.pathname);
      if (to.trim()) {
        url.searchParams.set("to", to.trim());
      }
      if (from.trim()) {
        url.searchParams.set("from", from.trim());
      }
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  return (
    <PersonalizationContext.Provider
      value={{
        recipientTo,
        senderFrom,
        setPersonalization,
        clearPersonalization,
        buildPersonalizedUrl,
      }}
    >
      {children}
    </PersonalizationContext.Provider>
  );
};

export const usePersonalization = () => useContext(PersonalizationContext);

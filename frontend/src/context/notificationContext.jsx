import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { EventSourcePolyfill } from "event-source-polyfill"; 

const NotificationsContext = createContext({});

export function useNotifications() {
  return useContext(NotificationsContext);
}

export default function NotificationsProvider({ children }) {
  const [eventSource, setEventSource] = useState(null); 

  useEffect(() => {
    const es = new EventSourcePolyfill(`http://localhost:5000/main/event`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-token')}`,
      },
      heartbeatTimeout: 300000,
      withCredentials: true,
    });

    setEventSource(es);

    return () => {
      es.close();
    };
  }, []);

  useEffect(() => {
    if (!eventSource) return;

    const eventHandler = (event) => {
      toast("New Notification", {
        description: event,
      });
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      eventHandler(data.message);
    };

    return () => {};
  }, [eventSource]);

  return (
    <NotificationsContext.Provider value={{ eventSource }}>
      {children}
    </NotificationsContext.Provider>
  );
}

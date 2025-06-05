import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const NotificationsContext = createContext({});

export function useNotifications() {
  return useContext(NotificationsContext);
}

export default function NotificationsProvider(children) {
  const [eventSource, setEventSource] =
    (useState < EventSource) | (null > null);

  useEffect(() => {
    const es = new EventSourcePolyfill(`http://localhost:5000/sse`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      heartbeatTimeout: 300000,
    });

    setEventSource(es);

    return () => {
      es.close();
    };
  }, []);

  useEffect(() => {
    if (!eventSource) return;

    const eventHandler = (event) => {
      toast("New Event", {
        description: `description`,
      });
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.event) {
        case "event-type":
          eventHandler(data.message.data);
          break;
        default:
          return;
      }
    };

    return () => {};
  }, [eventSource]);

  return (
    <NotificationsContext.Provider value={{ eventSource }}>
      {children}
    </NotificationsContext.Provider>
  );
}

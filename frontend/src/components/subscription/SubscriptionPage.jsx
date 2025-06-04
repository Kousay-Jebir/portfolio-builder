import { useState } from "react";
import { subscribe } from "@/api/main/subscription";
const SubscriptionPage = () => {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);


  const subscriptions = [
    { type: "SILVER", duration: "1months", description: "Basic access for 1 month." },
    { type: "GOLD", duration: "3months", description: "Extended access for 3 months." },
    { type: "DIAMOND", duration: "6months", description: "Full access for 6 months." },
  ];

   const handleSubscribe = async (title,type) => {
    setLoading(true);
    try {
      const paymentUrl = await subscribe({ title, type });
      window.location.href = paymentUrl; // 🔁 Redirect to external payment URL
    } catch (err) {
      console.error("Subscription failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {subscriptions.map((sub) => (
        <div
          key={sub.type}
          onClick={() => handleSubscribe(sub.description, sub.duration)}
          className={`cursor-pointer border p-6 rounded-xl shadow-md hover:shadow-lg transition ${
            selected === sub.type ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold mb-2">{sub.type}</h2>
          <p className="text-gray-600">{sub.duration}</p>
          <p className="mt-2">{sub.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPage;

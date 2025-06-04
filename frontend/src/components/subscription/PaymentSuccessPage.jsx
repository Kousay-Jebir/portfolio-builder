import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmSub } from "@/api/main/subscription";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  // Ref to prevent confirmSub from running more than once
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!paymentId || hasVerifiedRef.current) return;

      hasVerifiedRef.current = true;

      try {
        const data = await confirmSub(paymentId);
        console.log(data);
        // Optional: redirect or show a message
      } catch (error) {
        console.error("Failed to confirm subscription:", error);
        // Optional: show error to user
      }
    };

    verifyPayment();
  }, [paymentId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded shadow text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
        <p className="mt-4 text-gray-700">
          Thank you for your purchase. Your subscription has been activated.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

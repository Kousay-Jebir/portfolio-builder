import { useState } from "react";
import { subscribe } from "@/api/main/subscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap } from "lucide-react";
import BackToMainArrow from "@/components/BackToMainArrow";

const SubscriptionPage = () => {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const subscriptions = [
    {
      type: "SILVER",
      duration: "1months",
      description: "Perfect for trying out our platform",
      price: "10 TND",
      features: [
        "Basic portfolio features",
        "Up to 3 portfolios",
        "Standard templates",
        "Email support",
      ],
    },
    {
      type: "GOLD",
      duration: "3months",
      description: "Best value for regular users",
      price: "25 TND",
      features: [
        "All Silver features",
        "Up to 10 portfolios",
        "Premium templates",
        "Priority support",
        "Customizable components",
      ],
      popular: true,
    },
    {
      type: "DIAMOND",
      duration: "6months",
      description: "For power users and professionals",
      price: "40 TND",
      features: [
        "All Gold features",
        "Unlimited portfolios",
        "All templates",
        "Custom domain",
        "Customizable components",
      ],
    },
  ];

  const handleSubscribe = async (title, type) => {
    setLoading(true);
    try {
      const paymentUrl = await subscribe({ title, type });
      window.location.href = paymentUrl;
    } catch (err) {
      console.error("Subscription failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackToMainArrow />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 bg-orange-100 text-orange-600 border-orange-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              Premium Plans
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upgrade Your <span className="text-orange-600">ProFolio</span>{" "}
              Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock powerful features to showcase your work and grow your
              professional presence.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptions.map((sub) => (
              <div
                key={sub.type}
                className={`relative rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                  sub.popular
                    ? "border-2 border-orange-400 transform md:-translate-y-2"
                    : "border border-orange-200"
                } bg-white`}
              >
                {sub.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {sub.type}
                      </h2>
                      <p className="text-orange-600">{sub.description}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-orange-50 text-orange-600 border-orange-300"
                    >
                      {sub.duration}
                    </Badge>
                  </div>

                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">
                      {sub.price}
                    </span>
                    <span className="text-gray-500"> / {sub.duration}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {sub.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-orange-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() =>
                      handleSubscribe(sub.description, sub.duration)
                    }
                    className={`w-full ${
                      sub.popular
                        ? "bg-orange-600 hover:bg-orange-700"
                        : "bg-white text-orange-600 border border-orange-300 hover:bg-orange-50"
                    }`}
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Get Started"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;

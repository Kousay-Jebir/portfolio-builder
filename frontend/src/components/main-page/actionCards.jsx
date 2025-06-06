import { Rocket, FileText, Sparkles, Wand2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ActionCards = () => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:scale-[1.015] transition-transform border-none">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-white/20 text-white">
              <Wand2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-white">AI Resume Builder</CardTitle>
              <CardDescription className="text-white/80">
                Generate a professional resume in minutes
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full gap-2 bg-white text-orange-600 font-semibold hover:bg-white/90"
            size="lg"
            onClick={() => navigate("/cv-generation")}
          >
            <Sparkles className="h-4 w-4" />
            Generate Resume
          </Button>
        </CardContent>
      </Card>

      {/* Portfolio Card */}
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:scale-[1.015] transition-transform border-none">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-white/20 text-white">
              <Rocket className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-white">Portfolio Builder</CardTitle>
              <CardDescription className="text-white/80">
                Create your stunning portfolio website
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full gap-2 bg-white text-orange-600 font-semibold hover:bg-white/90"
            size="lg"
            onClick={() => navigate("/builder")}
          >
            <FileText className="h-4 w-4" />
            Build Portfolio
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

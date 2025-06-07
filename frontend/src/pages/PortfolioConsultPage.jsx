import { likePortfolio, seePortfolio } from "@/api/consulting/consult";
import { Editor, Frame, Element } from "@craftjs/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DroppableGridEngine from "@/builder/layout-engine/grid/GridEngine";
import {
  BUILDER_MODE,
  BuilderProvider,
} from "@/builder/global-state/state-store";
import resolver from "@/builder/resolver";
import { Heart } from "lucide-react";

export default function PortfolioConsultPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleLike = async()=>{
    console.log(id)
    await likePortfolio(id)
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const result = await seePortfolio(id);
        setData(result);
      } catch (e) {
        console.error("Error loading portfolio:", e);
        setError("Failed to load portfolio. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div className="text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <p>No portfolio data found.</p>;
  }

  return (
    <>
      <Editor resolver={resolver} enabled={false}>
        <BuilderProvider>
          <Frame data={data.content}>
            <Element is={DroppableGridEngine} canvas className="h-full p-4" />
          </Frame>
        </BuilderProvider>
      </Editor>
      <div className="flex justify-center mt-6">
        <Heart
          className="w-10 h-10 text-gray-400 hover:text-red-500 transition-colors duration-300 cursor-pointer"
          onClick={handleLike}
        />
      </div>
    </>
  );
}

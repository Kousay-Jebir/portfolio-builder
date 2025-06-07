import { Outlet } from "react-router-dom";
import BackToMainArrow from "@/components/BackToMainArrow";

const CvGenerationLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default CvGenerationLayout;

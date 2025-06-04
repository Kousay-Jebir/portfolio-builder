import { Outlet } from 'react-router-dom';

const CvGenerationLayout = () => {
  return (
    <div>
      <h2>CV Generation</h2>
      <Outlet /> {/* This is where nested routes will be rendered */}
    </div>
  );
};

export default CvGenerationLayout;
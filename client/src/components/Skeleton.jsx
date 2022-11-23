import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={200}
    height={250}
    viewBox="0 0 200 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="200" height="250" />
  </ContentLoader>
);

export default Skeleton;

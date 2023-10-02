import React from "react";
const Image = ({
  src,
  className,
}: {
  src: string;
  percent?: string;
  className?: any;
}) => {
  return <img src={src} style={{}} className={className} />;
};

export default Image;

import { useEffect, useState } from "react";
import Image from "next/image";

export const FallbackImage = ({ src, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc ? imgSrc : "/../public/images/naSpell.png"}
      alt={""}
      onError={() => {
        setImgSrc("/../public/images/naSpell.png");
      }}
      width={65}
      height={65}
      style={{ borderRadius: "50%" }}
      className="champions-spell"
    />
  );
};

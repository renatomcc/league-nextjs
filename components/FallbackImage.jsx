import { useEffect, useState } from "react";
import Image from "next/image";
import { keyframes } from "@mantine/core";

export const FallbackImage = ({ src, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc ? imgSrc : "https://i.ibb.co/XsPcjjy/naSpell.png"}
      alt={""}
      onError={() => {
        setImgSrc("https://i.ibb.co/XsPcjjy/naSpell.png");
      }}
      width={65}
      height={65}
      style={{
        borderRadius: "50%",
      }}
    />
  );
};
import Image from "next/image";
import React, { MouseEvent } from "react";
interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
  onMouseEnter?: React.StyleHTMLAttributes<HTMLImageElement>["onMouseEnter"];
  onMouseLeave?: React.StyleHTMLAttributes<HTMLImageElement>["onMouseLeave"];
}
export const ProductImage = ({
  alt,
  height,
  width,
  className,
  src,
  style,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      style={style}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

import { ImageProps } from "next/image";

const position = "absolute";
const alt = "";

export const wrappers: { style: React.CSSProperties; image: ImageProps }[] = [
  {
    style: { zIndex: 9, top: 94, left: 356, position },
    image: { width: 188, height: 230, src: "/avatar.png", alt },
  },
  {
    style: { zIndex: 8, top: 150, left: 432, position },
    image: { width: 440, height: 156, src: "/boat.png", alt },
  },
  {
    style: { zIndex: 7, top: 297, left: 371, position },
    image: { width: 166, height: 49, src: "/avatar-shadow.png", alt },
  },
  {
    style: { zIndex: 6, top: 263, left: 442, position },
    image: { width: 430, height: 75, src: "/boat-shadow.png", alt },
  },
  {
    style: { zIndex: 5, top: 73, left: 467, position },
    image: { width: 304, height: 123, src: "/1.png", alt },
  },
  {
    style: { zIndex: 4, top: 113, left: 762, position },
    image: { width: 116, height: 50, src: "/2.png", alt },
  },
];

interface ImageProps {
        image?: string;
        className?: string;
        style?: React.CSSProperties
}

const Image = ({ image, style, className = "" }: ImageProps) => {
  return (
    <figure className={` ${className}`} style={style}>
      {image && <img src={image} alt="" />}
    </figure>
  );
};

export { Image };

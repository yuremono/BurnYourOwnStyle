interface HeroProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Hero = ({ className = "", style, children }: HeroProps) => {
  return (
    <div className={`Hero ${className}`} style={style}>
      {children}
    </div>
  );
};

interface HeroItemProps {
  className?: string;
  children: React.ReactNode;
}

const HeroItem = ({ className = "", children }: HeroItemProps) => {
  return (
    <div className={`item ${className}`}>
      {children}
    </div>
  );
};

interface HeroBackProps {
  image?: string;
  className?: string;
}

const HeroBack = ({ image, className = "" }: HeroBackProps) => {
  return (
    <figure className={`back ${className}`}>
      {image && <img src={image} alt="" loading="lazy" />}
    </figure>
  );
};

export { Hero, HeroItem, HeroBack };

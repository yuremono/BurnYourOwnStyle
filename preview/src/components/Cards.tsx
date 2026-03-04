interface CardsProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

interface ItemProps {
  className?: string;
  children: React.ReactNode;
}

const Cards: React.FC<CardsProps> = ({ className = '', style, children }) => {
  return (
    <div className={`Cards ${className}`} style={style}>
      {children}
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ className = '', children }) => {
  return (
    <div className={`item ${className}`}>
      {children}
    </div>
  );
};

export { Cards, Item };
export default Cards;

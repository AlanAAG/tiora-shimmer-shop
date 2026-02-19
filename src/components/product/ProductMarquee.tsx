export const ProductMarquee = () => {
  const items = [
    "HANDCRAFTED WITH LOVE",
    "•",
    "18K GOLD PLATED",
    "•",
    "FREE SHIPPING ON ALL NATIONAL ORDERS",
    "•",
    "PURE SILVER",
    "•",
    "HYPOALLERGENIC",
    "•",
  ];

  return (
    <div className="bg-primary py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(4)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-6 mx-6">
            {items.map((item, index) => (
              <span
                key={`${groupIndex}-${index}`}
                className="text-primary-foreground text-xs tracking-[0.2em] font-body"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

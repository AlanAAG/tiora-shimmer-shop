const SaleBanner = () => {
  return <div className="aspect-square bg-primary rounded-xl flex flex-col items-center justify-center p-6 text-center">
      <p className="font-display text-3xl md:text-4xl text-primary-foreground leading-tight">20% Off</p>
      <p className="font-body text-sm text-primary-foreground/90 mt-2">
        Valentine's Day
      </p>
      <p className="font-body text-xs text-primary-foreground/80 mt-1">
        Sitewide Sale
      </p>
    </div>;
};
export default SaleBanner;
const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-[10%] left-[5%] w-3 h-3 rounded-full bg-primary/20 animate-float-slow" />
      <div className="absolute top-[25%] right-[10%] w-2 h-2 rounded-full bg-secondary/30 animate-float-medium" />
      <div className="absolute top-[60%] left-[15%] w-4 h-4 rounded-full bg-primary/10 animate-float-reverse" />
      <div className="absolute top-[40%] right-[20%] w-2.5 h-2.5 rounded-full bg-success/15 animate-bounce-gentle" />
      <div className="absolute bottom-[20%] left-[40%] w-3 h-3 rounded-full bg-secondary/15 animate-float-slow" />
      <div className="absolute top-[75%] right-[35%] w-2 h-2 rounded-full bg-primary/15 animate-float-medium" />
    </div>
  );
};

export default FloatingOrbs;

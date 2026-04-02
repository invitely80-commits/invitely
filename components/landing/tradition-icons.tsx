import { Church, Gavel, Landmark, Moon, Sun } from "lucide-react";

export const TraditionIcons = {
  Hindu: () => (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full" />
      <Landmark className="relative h-8 w-8 text-gold" strokeWidth={1.5} />
    </div>
  ),
  Muslim: () => (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full" />
      <Moon className="relative h-8 w-8 text-gold" strokeWidth={1.5} />
    </div>
  ),
  Christian: () => (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full" />
      <Church className="relative h-8 w-8 text-gold" strokeWidth={1.5} />
    </div>
  ),
  Sikh: () => (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full" />
      <Sun className="relative h-8 w-8 text-gold" strokeWidth={1.5} /> {/* Sun as a universal placeholder */}
    </div>
  ),
  Civil: () => (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gold/10 blur-xl rounded-full" />
      <Gavel className="relative h-8 w-8 text-gold" strokeWidth={1.5} />
    </div>
  ),
};

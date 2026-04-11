import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/catalog", label: "Каталог" },
    { to: "/delivery", label: "Доставка" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Fleur<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-foreground transition-colors hover:text-primary">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <button className="p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="container flex flex-col gap-4 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

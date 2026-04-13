import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductCard = ({ product, discount }: { product: Product; discount?: number }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, discount);
    toast.success(`«${product.name}» добавлен в корзину${discount ? ` со скидкой ${discount}%` : ""}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-accent/30">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all duration-300 hover:scale-110 group-hover:opacity-100"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-heading text-base font-medium text-foreground">{product.name}</h3>
          {discount ? (
            <div className="flex items-center gap-2">
              <p className="font-body text-sm text-muted-foreground line-through">
                {product.price.toLocaleString("ru-RU")} ₽
              </p>
              <p className="font-body text-lg font-semibold text-primary">
                {Math.round(product.price * (1 - discount / 100)).toLocaleString("ru-RU")} ₽
              </p>
            </div>
          ) : (
            <p className="font-body text-lg font-semibold text-primary">
              {product.price.toLocaleString("ru-RU")} ₽
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

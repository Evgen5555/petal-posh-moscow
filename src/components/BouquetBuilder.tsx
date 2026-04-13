import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Flower2, Package } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { toast } from "sonner";

interface BouquetBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SelectedFlower {
  product: Product;
  quantity: number;
}

const BouquetBuilder: React.FC<BouquetBuilderProps> = ({ open, onOpenChange }) => {
  const { products } = useStore();
  const { addItem } = useCart();

  const flowers = useMemo(() => products.filter((p) => p.category === "Штучные" && p.inStock), [products]);
  const packagingOptions = useMemo(() => products.filter((p) => p.category === "Упаковка" && p.inStock), [products]);

  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<Product | null>(null);

  const addFlower = (product: Product) => {
    setSelectedFlowers((prev) => {
      const existing = prev.find((f) => f.product.id === product.id);
      if (existing) {
        return prev.map((f) =>
          f.product.id === product.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFlower = (productId: string) => {
    setSelectedFlowers((prev) => {
      const existing = prev.find((f) => f.product.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((f) =>
          f.product.id === productId ? { ...f, quantity: f.quantity - 1 } : f
        );
      }
      return prev.filter((f) => f.product.id !== productId);
    });
  };

  const getFlowerQty = (id: string) => selectedFlowers.find((f) => f.product.id === id)?.quantity || 0;

  const flowersTotal = selectedFlowers.reduce((sum, f) => sum + f.product.price * f.quantity, 0);
  const packagingTotal = selectedPackaging?.price || 0;
  const grandTotal = flowersTotal + packagingTotal;
  const totalFlowers = selectedFlowers.reduce((sum, f) => sum + f.quantity, 0);

  const handleAddToCart = () => {
    selectedFlowers.forEach((f) => {
      for (let i = 0; i < f.quantity; i++) {
        addItem(f.product);
      }
    });
    if (selectedPackaging) {
      addItem(selectedPackaging);
    }
    toast.success("Букет добавлен в корзину!");
    setSelectedFlowers([]);
    setSelectedPackaging(null);
    onOpenChange(false);
  };

  const reset = () => {
    setSelectedFlowers([]);
    setSelectedPackaging(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-rose-heading">
            Собрать букет
          </DialogTitle>
        </DialogHeader>

        {/* Step 1: Flowers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flower2 className="h-5 w-5 text-primary" />
            <h3 className="font-heading text-lg font-semibold text-foreground">
              1. Выберите цветы
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {flowers.map((flower) => {
              const qty = getFlowerQty(flower.id);
              return (
                <div
                  key={flower.id}
                  className={`relative rounded-xl border p-3 transition-all ${
                    qty > 0 ? "border-primary bg-accent/50" : "border-border"
                  }`}
                >
                  <div className="flex gap-3">
                    <img
                      src={flower.image}
                      alt={flower.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-sm font-semibold text-foreground truncate">
                        {flower.name}
                      </p>
                      <p className="font-body text-sm font-bold text-primary mt-0.5">
                        {flower.price} ₽
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => removeFlower(flower.id)}
                          disabled={qty === 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-body text-sm font-semibold w-5 text-center">
                          {qty}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => addFlower(flower)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {qty > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      {qty}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Packaging */}
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h3 className="font-heading text-lg font-semibold text-foreground">
              2. Выберите упаковку
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {packagingOptions.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackaging(selectedPackaging?.id === pkg.id ? null : pkg)}
                className={`flex gap-3 rounded-xl border p-3 text-left transition-all ${
                  selectedPackaging?.id === pkg.id
                    ? "border-primary bg-accent/50 ring-1 ring-primary"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="font-heading text-sm font-semibold text-foreground truncate">
                    {pkg.name}
                  </p>
                  <p className="font-body text-sm font-bold text-primary mt-0.5">
                    {pkg.price} ₽
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-xl border border-border bg-accent/30 p-4 space-y-2">
          <h3 className="font-heading text-base font-semibold text-foreground">Итого</h3>
          {selectedFlowers.length > 0 ? (
            <>
              {selectedFlowers.map((f) => (
                <div key={f.product.id} className="flex justify-between font-body text-sm text-muted-foreground">
                  <span>{f.product.name} × {f.quantity}</span>
                  <span>{f.product.price * f.quantity} ₽</span>
                </div>
              ))}
              {selectedPackaging && (
                <div className="flex justify-between font-body text-sm text-muted-foreground">
                  <span>{selectedPackaging.name}</span>
                  <span>{selectedPackaging.price} ₽</span>
                </div>
              )}
              <div className="border-t border-border pt-2 flex justify-between font-heading text-lg font-bold text-foreground">
                <span>Всего ({totalFlowers} цв.)</span>
                <span className="text-primary">{grandTotal} ₽</span>
              </div>
            </>
          ) : (
            <p className="font-body text-sm text-muted-foreground">Выберите цветы для букета</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1" onClick={reset}>
            Сбросить
          </Button>
          <Button
            className="flex-1 gap-2"
            disabled={selectedFlowers.length === 0}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            В корзину — {grandTotal} ₽
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BouquetBuilder;

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import type { Product } from "@/data/products";

interface ProductEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (data: Omit<Product, "id">) => void;
  mode: "add" | "edit";
}

const emptyForm = { name: "", price: "", category: "", description: "", composition: "", image: "", inStock: true };

const ProductEditDialog = ({ open, onOpenChange, product, onSave, mode }: ProductEditDialogProps) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (product && mode === "edit") {
      setForm({
        name: product.name,
        price: String(product.price),
        category: product.category,
        description: product.description,
        composition: product.composition,
        image: product.image,
        inStock: product.inStock,
      });
    } else {
      setForm(emptyForm);
    }
  }, [product, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      composition: form.composition,
      image: form.image || "/placeholder.svg",
      inStock: form.inStock,
    });
    onOpenChange(false);
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {mode === "add" ? "Новый товар" : "Редактирование товара"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">Название *</label>
            <input required placeholder="Название букета" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">Цена (₽) *</label>
              <input required placeholder="3500" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">Категория *</label>
              <input required placeholder="Букеты" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">Описание</label>
            <textarea placeholder="Описание товара" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass + " min-h-[80px] resize-y"} />
          </div>
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">Состав</label>
            <textarea placeholder="Перечислите цветы и материалы" value={form.composition} onChange={(e) => setForm({ ...form, composition: e.target.value })} rows={2} className={inputClass + " min-h-[60px] resize-y"} />
          </div>
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-muted-foreground">URL изображения</label>
            <input placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className={inputClass} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <span className="font-body text-sm text-foreground">В наличии</span>
            <Switch checked={form.inStock} onCheckedChange={(v) => setForm({ ...form, inStock: v })} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 rounded-full bg-primary py-2.5 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              {mode === "add" ? "Добавить" : "Сохранить"}
            </button>
            <button type="button" onClick={() => onOpenChange(false)} className="rounded-full bg-accent px-6 py-2.5 font-body text-sm text-accent-foreground hover:bg-accent/80 transition-colors">
              Отмена
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditDialog;

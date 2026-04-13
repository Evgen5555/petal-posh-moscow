import { useState } from "react";
import { Edit, Trash2, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import ProductEditDialog from "./ProductEditDialog";

interface ProductListProps {
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductList = ({ products, addProduct, updateProduct, deleteProduct }: ProductListProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");

  const openAdd = () => { setMode("add"); setEditingProduct(null); setDialogOpen(true); };
  const openEdit = (p: Product) => { setMode("edit"); setEditingProduct(p); setDialogOpen(true); };

  const handleSave = (data: Omit<Product, "id">) => {
    if (mode === "add") {
      addProduct(data);
      toast.success("Товар добавлен");
    } else if (editingProduct) {
      updateProduct(editingProduct.id, data);
      toast.success("Товар обновлён");
    }
  };

  return (
    <div>
      <button onClick={openAdd} className="mb-4 flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
        <Plus className="h-4 w-4" /> Добавить товар
      </button>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              {!p.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                  <span className="rounded-full bg-destructive/90 px-3 py-1 font-body text-xs font-medium text-destructive-foreground">Нет в наличии</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h3 className="font-heading text-sm font-semibold text-foreground leading-tight">{p.name}</h3>
              <p className="mt-0.5 font-body text-xs text-muted-foreground">{p.category}</p>
              <p className="mt-auto pt-2 font-heading text-base font-bold text-primary">{p.price.toLocaleString("ru-RU")} ₽</p>
            </div>
            <div className="flex border-t border-border">
              <button onClick={() => openEdit(p)} className="flex flex-1 items-center justify-center gap-1.5 py-2.5 font-body text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <Edit className="h-3.5 w-3.5" /> Редактировать
              </button>
              <div className="w-px bg-border" />
              <button onClick={() => { deleteProduct(p.id); toast.success("Товар удалён"); }} className="flex flex-1 items-center justify-center gap-1.5 py-2.5 font-body text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                <Trash2 className="h-3.5 w-3.5" /> Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductEditDialog open={dialogOpen} onOpenChange={setDialogOpen} product={editingProduct} onSave={handleSave} mode={mode} />
    </div>
  );
};

export default ProductList;

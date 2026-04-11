import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import type { Order } from "@/context/StoreContext";
import { useAuth } from "@/hooks/useAuth";
import { Package, ShoppingBag, Trash2, Edit, Plus, X, LogOut } from "lucide-react";
import { toast } from "sonner";
const statusLabels: Record<Order["status"], string> = {
  new: "Новый",
  processing: "В работе",
  delivered: "Доставлен",
};

const statusColors: Record<Order["status"], string> = {
  new: "bg-primary/20 text-primary",
  processing: "bg-secondary/40 text-secondary-foreground",
  delivered: "bg-sage-light text-sage",
};

const Admin = () => {
  const { session, loading, signOut } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore();
  const [tab, setTab] = useState<"orders" | "products">("orders");

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="font-body text-muted-foreground">Загрузка...</p>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", category: "", description: "", composition: "", image: "" });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) {
      toast.error("Заполните обязательные поля");
      return;
    }
    addProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      composition: form.composition,
      image: form.image || "/placeholder.svg",
      inStock: true,
    });
    setForm({ name: "", price: "", category: "", description: "", composition: "", image: "" });
    setShowAddForm(false);
    toast.success("Товар добавлен");
  };

  const handleSaveEdit = (id: string) => {
    updateProduct(id, {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      description: form.description,
      composition: form.composition,
    });
    setEditingId(null);
    toast.success("Товар обновлён");
  };

  const startEdit = (p: typeof products[0]) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: String(p.price), category: p.category, description: p.description, composition: p.composition, image: p.image });
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-heading text-3xl font-bold text-foreground">Админ-панель</h1>
            <button
              onClick={() => { signOut(); toast.success("Вы вышли из системы"); }}
              className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-body text-sm text-accent-foreground hover:bg-accent/80"
            >
              <LogOut className="h-4 w-4" /> Выйти
            </button>
          </div>

          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setTab("orders")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-body text-sm font-medium transition-all ${
                tab === "orders" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              <Package className="h-4 w-4" /> Заявки {orders.length > 0 && `(${orders.length})`}
            </button>
            <button
              onClick={() => setTab("products")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-body text-sm font-medium transition-all ${
                tab === "products" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              <ShoppingBag className="h-4 w-4" /> Товары ({products.length})
            </button>
          </div>

          {/* Orders */}
          {tab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="py-20 text-center font-body text-muted-foreground">Заявок пока нет</p>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-heading text-base font-semibold text-foreground">Заказ #{o.id.slice(-6)}</h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[o.status]}`}>
                            {statusLabels[o.status]}
                          </span>
                        </div>
                        <p className="mt-1 font-body text-xs text-muted-foreground">{o.date}</p>
                      </div>
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as Order["status"])}
                        className="rounded-lg border border-input bg-background px-3 py-1.5 font-body text-sm"
                      >
                        <option value="new">Новый</option>
                        <option value="processing">В работе</option>
                        <option value="delivered">Доставлен</option>
                      </select>
                    </div>
                    <div className="mt-3 space-y-1 font-body text-sm text-muted-foreground">
                      <p>👤 {o.customerName} · 📞 {o.customerPhone}</p>
                      <p>📍 {o.customerAddress}</p>
                      {o.comment && <p>💬 {o.comment}</p>}
                    </div>
                    <div className="mt-3 border-t border-border pt-3">
                      {o.items.map((item) => (
                        <p key={item.product.id} className="font-body text-sm text-foreground">
                          {item.product.name} × {item.quantity} — {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                        </p>
                      ))}
                      <p className="mt-2 font-heading text-base font-bold text-primary">
                        Итого: {o.total.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Products */}
          {tab === "products" && (
            <div>
              <button
                onClick={() => { setShowAddForm(!showAddForm); setEditingId(null); setForm({ name: "", price: "", category: "", description: "", composition: "", image: "" }); }}
                className="mb-4 flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-body text-sm font-semibold text-primary-foreground"
              >
                {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {showAddForm ? "Отмена" : "Добавить товар"}
              </button>

              {showAddForm && (
                <form onSubmit={handleAddProduct} className="mb-6 space-y-3 rounded-xl border border-border bg-card p-5">
                  <input placeholder="Название *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2 font-body text-sm" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Цена *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-lg border border-input bg-background px-4 py-2 font-body text-sm" />
                    <input placeholder="Категория *" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-input bg-background px-4 py-2 font-body text-sm" />
                  </div>
                  <textarea placeholder="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-lg border border-input bg-background px-4 py-2 font-body text-sm" />
                  <input placeholder="Состав" value={form.composition} onChange={(e) => setForm({ ...form, composition: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2 font-body text-sm" />
                  <input placeholder="URL изображения" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2 font-body text-sm" />
                  <button type="submit" className="rounded-full bg-primary px-6 py-2 font-body text-sm font-semibold text-primary-foreground">
                    Сохранить
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {products.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                    <img src={p.image} alt={p.name} className="h-14 w-14 rounded-lg object-cover" />
                    {editingId === p.id ? (
                      <div className="flex flex-1 flex-wrap gap-2">
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 font-body text-sm" />
                        <input value={form.price} type="number" onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-24 rounded-lg border border-input bg-background px-3 py-1.5 font-body text-sm" />
                        <button onClick={() => handleSaveEdit(p.id)} className="rounded-full bg-primary px-4 py-1.5 font-body text-xs font-semibold text-primary-foreground">
                          Сохранить
                        </button>
                        <button onClick={() => setEditingId(null)} className="rounded-full bg-accent px-4 py-1.5 font-body text-xs text-accent-foreground">
                          Отмена
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <h3 className="font-heading text-sm font-semibold text-foreground">{p.name}</h3>
                          <p className="font-body text-sm text-primary">{p.price.toLocaleString("ru-RU")} ₽</p>
                        </div>
                        <button onClick={() => startEdit(p)} className="text-muted-foreground hover:text-foreground">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => { deleteProduct(p.id); toast.success("Товар удалён"); }} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;

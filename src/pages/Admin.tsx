import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import type { Order } from "@/context/StoreContext";
import { useAuth } from "@/hooks/useAuth";
import { Package, ShoppingBag, LogOut } from "lucide-react";
import { toast } from "sonner";
import ProductList from "@/components/admin/ProductList";

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
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, loadOrders } = useStore();

  useEffect(() => {
    if (session) loadOrders();
  }, [session, loadOrders]);
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

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Админ-панель</h1>
            <button
              onClick={() => { signOut(); toast.success("Вы вышли из системы"); }}
              className="flex items-center gap-2 self-start rounded-full bg-accent px-4 py-2 font-body text-sm text-accent-foreground hover:bg-accent/80 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Выйти
            </button>
          </div>

          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setTab("orders")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-medium transition-all sm:px-5 ${
                tab === "orders" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              <Package className="h-4 w-4" /> Заявки {orders.length > 0 && `(${orders.length})`}
            </button>
            <button
              onClick={() => setTab("products")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-medium transition-all sm:px-5 ${
                tab === "products" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}
            >
              <ShoppingBag className="h-4 w-4" /> Товары ({products.length})
            </button>
          </div>

          {tab === "orders" && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="py-20 text-center font-body text-muted-foreground">Заявок пока нет</p>
              ) : (
                orders.map((o) => (
                  <div key={o.id} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
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
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 font-body text-sm sm:w-auto"
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

          {tab === "products" && (
            <ProductList
              products={products}
              addProduct={addProduct}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;

import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import type { Order } from "@/context/StoreContext";
import { useAuth } from "@/hooks/useAuth";
import { Package, ShoppingBag, LogOut, BarChart3, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ProductList from "@/components/admin/ProductList";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

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
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, deleteOrder, loadOrders } = useStore();

  useEffect(() => {
    if (session) loadOrders();
  }, [session, loadOrders]);

  const [tab, setTab] = useState<"analytics" | "orders" | "products">("analytics");
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");
  const [productSearch, setProductSearch] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (orderSearch) {
        const q = orderSearch.toLowerCase();
        return (
          o.customerName.toLowerCase().includes(q) ||
          o.customerPhone.includes(q) ||
          o.id.includes(q) ||
          o.items.some((i) => i.product_name.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [orders, orderSearch, statusFilter]);

  const filteredProducts = useMemo(() => {
    if (!productSearch) return products;
    const q = productSearch.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, productSearch]);

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteOrder(id);
      toast.success("Заказ удалён");
    } catch {
      toast.error("Ошибка при удалении заказа");
    }
  };

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

          {/* Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto">
            {[
              { key: "analytics" as const, icon: BarChart3, label: "Аналитика" },
              { key: "orders" as const, icon: Package, label: `Заявки${orders.length > 0 ? ` (${orders.length})` : ""}` },
              { key: "products" as const, icon: ShoppingBag, label: `Товары (${products.length})` },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-medium transition-all sm:px-5 ${
                  tab === t.key ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                }`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          {/* Analytics */}
          {tab === "analytics" && <AdminAnalytics orders={orders} />}

          {/* Orders */}
          {tab === "orders" && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Поиск по имени, телефону, товару..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-lg border border-input bg-background px-3 py-2 font-body text-sm"
                >
                  <option value="all">Все статусы</option>
                  <option value="new">Новые</option>
                  <option value="processing">В работе</option>
                  <option value="delivered">Доставлены</option>
                </select>
              </div>

              {filteredOrders.length === 0 ? (
                <p className="py-20 text-center font-body text-muted-foreground">
                  {orders.length === 0 ? "Заявок пока нет" : "Ничего не найдено"}
                </p>
              ) : (
                filteredOrders.map((o) => (
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
                      <div className="flex items-center gap-2">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as Order["status"])}
                          className="rounded-lg border border-input bg-background px-3 py-1.5 font-body text-sm"
                        >
                          <option value="new">Новый</option>
                          <option value="processing">В работе</option>
                          <option value="delivered">Доставлен</option>
                        </select>
                        <button
                          onClick={() => handleDeleteOrder(o.id)}
                          className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                          title="Удалить заказ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 font-body text-sm text-muted-foreground">
                      <p>👤 {o.customerName} · 📞 {o.customerPhone}</p>
                      <p>📍 {o.customerAddress}</p>
                      {o.comment && <p>💬 {o.comment}</p>}
                    </div>
                    <div className="mt-3 border-t border-border pt-3">
                      {o.items.map((item, idx) => (
                        <p key={idx} className="font-body text-sm text-foreground">
                          {item.product_name} × {item.quantity} — {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
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
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Поиск по названию или категории..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <ProductList
                products={filteredProducts}
                addProduct={addProduct}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;

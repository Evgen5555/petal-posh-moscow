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
              <div className="flex flex-wrap gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-full border border-input bg-background px-4 py-1.5 font-body text-sm"
                >
                  <option value="all">Все статусы</option>
                  <option value="new">Новые</option>
                  <option value="processing">В работе</option>
                  <option value="delivered">Доставлены</option>
                </select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Поиск..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="rounded-full border border-input bg-background pl-9 pr-4 py-1.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <p className="py-20 text-center font-body text-muted-foreground">
                  {orders.length === 0 ? "Заявок пока нет" : "Ничего не найдено"}
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-border bg-card">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground">Дата</th>
                        <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground">Имя</th>
                        <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground">Контакт</th>
                        <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground">Товары</th>
                        <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground">Комментарий</th>
                        <th className="px-4 py-3 text-left font-body text-xs font-medium text-muted-foreground">Статус</th>
                        <th className="px-4 py-3 text-right font-body text-xs font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((o) => (
                        <tr key={o.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground whitespace-nowrap">{o.date}</td>
                          <td className="px-4 py-3 font-body text-sm font-semibold text-foreground">{o.customerName}</td>
                          <td className="px-4 py-3 font-body text-sm text-foreground">{o.customerPhone}</td>
                          <td className="px-4 py-3 font-body text-sm text-foreground">
                            {o.items.map((i) => i.product_name).join(", ")}
                          </td>
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground max-w-[200px] truncate">
                            {o.comment || "—"}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${statusColors[o.status]}`}>
                                {statusLabels[o.status]}
                              </span>
                              <select
                                value={o.status}
                                onChange={(e) => updateOrderStatus(o.id, e.target.value as Order["status"])}
                                className="rounded-lg border border-input bg-background px-2 py-1 font-body text-xs"
                              >
                                <option value="new">Новый</option>
                                <option value="processing">В работе</option>
                                <option value="delivered">Доставлен</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleDeleteOrder(o.id)}
                              className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                              title="Удалить заказ"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

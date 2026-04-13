import { useMemo } from "react";
import type { Order } from "@/context/StoreContext";
import { TrendingUp, ShoppingBag, DollarSign, Clock } from "lucide-react";

interface AdminAnalyticsProps {
  orders: Order[];
}

const AdminAnalytics = ({ orders }: AdminAnalyticsProps) => {
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const newOrders = orders.filter((o) => o.status === "new").length;
    const processingOrders = orders.filter((o) => o.status === "processing").length;
    const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
    const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;

    // Popular products
    const productCounts: Record<string, { name: string; count: number; revenue: number }> = {};
    orders.forEach((o) =>
      o.items.forEach((item) => {
        if (!productCounts[item.product_name]) {
          productCounts[item.product_name] = { name: item.product_name, count: 0, revenue: 0 };
        }
        productCounts[item.product_name].count += item.quantity;
        productCounts[item.product_name].revenue += item.price * item.quantity;
      })
    );
    const topProducts = Object.values(productCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return { totalRevenue, newOrders, processingOrders, deliveredOrders, avgOrder, topProducts, total: orders.length };
  }, [orders]);

  const cards = [
    { icon: ShoppingBag, label: "Всего заказов", value: stats.total, color: "text-primary" },
    { icon: DollarSign, label: "Выручка", value: `${stats.totalRevenue.toLocaleString("ru-RU")} ₽`, color: "text-green-600" },
    { icon: TrendingUp, label: "Средний чек", value: `${Math.round(stats.avgOrder).toLocaleString("ru-RU")} ₽`, color: "text-blue-600" },
    { icon: Clock, label: "Новые", value: stats.newOrders, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <c.icon className={`h-5 w-5 ${c.color}`} />
              <span className="font-body text-xs text-muted-foreground">{c.label}</span>
            </div>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Order status breakdown */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 font-heading text-sm font-semibold text-foreground">Статусы заказов</h3>
        <div className="flex gap-4">
          {[
            { label: "Новые", count: stats.newOrders, bg: "bg-primary/20 text-primary" },
            { label: "В работе", count: stats.processingOrders, bg: "bg-secondary/40 text-secondary-foreground" },
            { label: "Доставлены", count: stats.deliveredOrders, bg: "bg-green-100 text-green-700" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg}`}>{s.count}</span>
              <span className="font-body text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top products */}
      {stats.topProducts.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 font-heading text-sm font-semibold text-foreground">Популярные товары</h3>
          <div className="space-y-2">
            {stats.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent font-body text-xs font-semibold text-accent-foreground">
                    {i + 1}
                  </span>
                  <span className="font-body text-sm text-foreground">{p.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-body text-xs text-muted-foreground">{p.count} шт.</span>
                  <span className="font-heading text-sm font-semibold text-primary">{p.revenue.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;

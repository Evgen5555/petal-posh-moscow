import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { addOrder } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Пожалуйста, заполните обязательные поля");
      return;
    }
    setSubmitting(true);
    try {
      await addOrder({
        items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
        total: totalPrice,
        customerName: form.name,
        customerPhone: form.phone,
        customerAddress: form.address,
        comment: form.comment,
      });
      clearCart();
      setShowForm(false);
      setForm({ name: "", phone: "", address: "", comment: "" });
      toast.success("Заказ оформлен! Мы свяжемся с вами в ближайшее время.");
    } catch {
      toast.error("Ошибка при оформлении заказа. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !showForm) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">Корзина пуста</h1>
          <p className="mb-6 font-body text-muted-foreground">Самое время выбрать букет!</p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> В каталог
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-3xl">
          <h1 className="mb-8 font-heading text-3xl font-bold text-foreground">Корзина</h1>

          <div className="space-y-4">
            {items.map(({ product, quantity, discount }) => {
              const itemPrice = discount ? Math.round(product.price * (1 - discount / 100)) : product.price;
              return (
              <div key={product.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <img src={product.image} alt={product.name} className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-heading text-sm font-semibold text-foreground">{product.name}</h3>
                  {discount ? (
                    <div className="flex items-center gap-2">
                      <p className="font-body text-xs text-muted-foreground line-through">{product.price.toLocaleString("ru-RU")} ₽</p>
                      <p className="font-body text-sm text-primary font-semibold">{itemPrice.toLocaleString("ru-RU")} ₽</p>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">-{discount}%</span>
                    </div>
                  ) : (
                    <p className="font-body text-sm text-primary font-semibold">{product.price.toLocaleString("ru-RU")} ₽</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="rounded-full border border-border p-1 hover:bg-accent">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center font-body text-sm font-semibold">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="rounded-full border border-border p-1 hover:bg-accent">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button onClick={() => removeItem(product.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-accent/50 p-4">
            <span className="font-heading text-lg font-semibold text-foreground">Итого:</span>
            <span className="font-heading text-2xl font-bold text-primary">
              {totalPrice.toLocaleString("ru-RU")} ₽
            </span>
          </div>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 w-full rounded-full bg-primary py-3.5 font-body text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Оформить заказ
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">Данные для доставки</h2>
              <input
                placeholder="Ваше имя *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Телефон *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Адрес доставки *"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Комментарий к заказу"
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3.5 font-body text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Подтвердить заказ
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;

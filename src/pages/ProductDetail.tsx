import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus, Truck, CreditCard, Clock } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useStore();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p className="font-body text-muted-foreground">Товар не найден</p>
          <Link to="/catalog" className="mt-4 inline-block font-body text-primary hover:underline">
            ← Вернуться в каталог
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    toast.success(`«${product.name}» (${qty} шт.) добавлен в корзину`);
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <Link to="/catalog" className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Назад в каталог
          </Link>

          <div className="grid gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden rounded-2xl bg-accent/30"
            >
              <img
                src={product.image}
                alt={product.name}
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div>
                <span className="inline-block rounded-full bg-accent px-3 py-1 font-body text-xs font-medium text-accent-foreground">
                  {product.category}
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>
              <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>
              <div>
                <h4 className="font-heading text-sm font-semibold text-foreground">Состав</h4>
                <p className="mt-1 font-body text-sm text-muted-foreground">{product.composition}</p>
              </div>
              <p className="font-heading text-3xl font-bold text-primary">
                {product.price.toLocaleString("ru-RU")} ₽
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-full border border-border px-4 py-2">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-muted-foreground hover:text-foreground">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-body font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="text-muted-foreground hover:text-foreground">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  <ShoppingBag className="h-4 w-4" /> В корзину
                </button>
              </div>

              {/* Delivery & Payment Info */}
              <div className="space-y-3 rounded-xl border border-border bg-accent/30 p-5">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">Доставка по Москве</p>
                    <p className="font-body text-xs text-muted-foreground">Бесплатно от 5 000 ₽ · от 500 ₽ при заказе меньше</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">Время доставки</p>
                    <p className="font-body text-xs text-muted-foreground">Сегодня при заказе до 15:00 · или в выбранную дату</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">Оплата</p>
                    <p className="font-body text-xs text-muted-foreground">Наличные, карта, перевод · оплата при получении</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;

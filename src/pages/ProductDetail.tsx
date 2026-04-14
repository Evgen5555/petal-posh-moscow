import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus, Truck, CreditCard, Clock, Star, Package } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { reviews } from "@/data/reviews";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const packagingOptions = [
  { id: "standard", name: "Стандартная", price: 0, desc: "Плёнка + лента" },
  { id: "kraft", name: "Крафт", price: 300, desc: "Крафт-бумага + атласная лента" },
  { id: "box", name: "Шляпная коробка", price: 800, desc: "Бархатная коробка" },
  { id: "basket", name: "Корзина", price: 600, desc: "Плетёная корзина" },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const discount = searchParams.get("discount") ? Number(searchParams.get("discount")) : undefined;
  const { products } = useStore();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [selectedPkg, setSelectedPkg] = useState("standard");

  const productReviews = reviews.filter((r) => r.productId === id);

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

  const pkgPrice = packagingOptions.find((p) => p.id === selectedPkg)?.price || 0;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, discount);
    toast.success(`«${product.name}» (${qty} шт.) добавлен в корзину${discount ? ` со скидкой ${discount}%` : ""}`);
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
                className="aspect-[4/5] w-full object-cover shadow-lg"
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

              {/* Packaging Selection */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                  <Package className="h-4 w-4 text-primary" /> Упаковка
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {packagingOptions.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPkg(pkg.id)}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        selectedPkg === pkg.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <p className="font-body text-sm font-medium text-foreground">{pkg.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{pkg.desc}</p>
                      <p className="mt-1 font-body text-xs font-semibold text-primary">
                        {pkg.price === 0 ? "Бесплатно" : `+${pkg.price} ₽`}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {discount ? (
                <div className="space-y-1">
                  <p className="font-body text-lg text-muted-foreground line-through">
                    {(product.price + pkgPrice).toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="font-heading text-3xl font-bold text-primary">
                    {Math.round((product.price + pkgPrice) * (1 - discount / 100)).toLocaleString("ru-RU")} ₽
                    <span className="ml-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium">-{discount}%</span>
                  </p>
                </div>
              ) : (
                <p className="font-heading text-3xl font-bold text-primary">
                  {(product.price + pkgPrice).toLocaleString("ru-RU")} ₽
                </p>
              )}

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
              <Accordion type="single" collapsible defaultValue="delivery">
                <AccordionItem value="delivery">
                  <AccordionTrigger className="font-heading text-sm font-semibold">
                    <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Доставка и оплата</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div>
                          <p className="font-heading text-sm font-semibold text-foreground">Доставка по Москве</p>
                          <p className="font-body text-xs text-muted-foreground">Бесплатно от 5 000 ₽ · от 500 ₽ при заказе меньше</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div>
                          <p className="font-heading text-sm font-semibold text-foreground">Время доставки</p>
                          <p className="font-body text-xs text-muted-foreground">Сегодня при заказе до 15:00 · или в выбранную дату</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div>
                          <p className="font-heading text-sm font-semibold text-foreground">Оплата</p>
                          <p className="font-body text-xs text-muted-foreground">Наличные, карта, перевод · оплата при получении</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <section className="mt-16">
            <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
              Отзывы {productReviews.length > 0 && <span className="text-muted-foreground text-lg">({productReviews.length})</span>}
            </h2>

            {productReviews.length === 0 ? (
              <p className="rounded-xl border border-border p-8 text-center font-body text-muted-foreground">
                Пока нет отзывов на этот товар. Будьте первым!
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {productReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-border p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-heading text-sm font-semibold text-foreground">{review.author}</p>
                      <p className="font-body text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;

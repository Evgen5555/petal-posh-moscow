import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Leaf, Heart, Gift, Sparkles, Percent, Star, Palette } from "lucide-react";
import customBouquet from "@/assets/custom-bouquet.jpg";
import heroImage from "@/assets/hero-flowers.jpg";
import birthdayPromo from "@/assets/birthday-promo.jpg";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { reviews } from "@/data/reviews";

const features = [
  { icon: Leaf, title: "Свежие цветы", desc: "Получаем напрямую от лучших поставщиков каждое утро" },
  { icon: Truck, title: "Доставка за 2 часа", desc: "Бесплатная доставка по Москве при заказе от 3 000 ₽" },
  { icon: Heart, title: "Собрано с любовью", desc: "Каждый букет — авторская работа наших флористов" },
];

const BIRTHDAY_DISCOUNT = 15;

const Index = () => {
  const { products } = useStore();
  const featured = products.filter((p) => p.inStock).slice(0, 4);
  const bouquets = products.filter((p) => p.category === "Букеты" || p.category === "Розы").slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container grid min-h-[80vh] items-center gap-8 py-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
              Цветы, которые<br />
              <span className="text-gradient-rose">говорят за вас</span>
            </h1>
            <p className="max-w-md font-body text-lg text-muted-foreground">
              Авторские букеты с доставкой по Москве. Свежесть, стиль и&nbsp;нежность в каждом лепестке.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Выбрать букет <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={heroImage}
              alt="Букет пионов и роз"
              width={1920}
              height={1080}
              className="w-full max-w-lg rounded-3xl object-cover shadow-2xl shadow-primary/10"
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-background py-16">
        <div className="container grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 font-body text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Популярные букеты</h2>
            <Link to="/catalog" className="font-body text-sm font-medium text-primary hover:underline">
              Смотреть все →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Birthday Promo */}
      <section id="promo" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={birthdayPromo} alt="Букеты на день рождения" width={1200} height={600} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="container relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg space-y-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-body text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Специальное предложение
            </span>
            <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              День рождения? <br />Скидка {BIRTHDAY_DISCOUNT}%!
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Закажите букет ко дню рождения и получите скидку {BIRTHDAY_DISCOUNT}% на любой букет из нашей коллекции.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promo steps + bouquets */}
      <section className="py-12">
        <div className="container">
          <div className="mb-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Gift, title: "Выберите букет", desc: "Выберите любой букет из коллекции ниже" },
              { icon: Percent, title: "Скидка автоматически", desc: `Скидка ${BIRTHDAY_DISCOUNT}% применится при оформлении` },
              { icon: Sparkles, title: "Радуйте близких!", desc: "Мы доставим свежие цветы в лучшем виде" },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border p-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground">{step.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="border-t border-border bg-accent/20 py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Отзывы наших клиентов</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review, i) => {
              const product = products.find((p) => p.id === review.productId);
              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-sm font-semibold text-foreground">{review.author}</p>
                    <p className="font-body text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${j < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                  {product && (
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-body text-xs font-medium text-accent-foreground hover:bg-accent/80 transition-colors"
                    >
                      {product.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link to="/reviews" className="font-body text-sm font-medium text-primary hover:underline">
              Все отзывы →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Leaf, Heart } from "lucide-react";
import heroImage from "@/assets/hero-flowers.jpg";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

const features = [
  { icon: Leaf, title: "Свежие цветы", desc: "Получаем напрямую от лучших поставщиков каждое утро" },
  { icon: Truck, title: "Доставка за 2 часа", desc: "Бесплатная доставка по Москве при заказе от 3 000 ₽" },
  { icon: Heart, title: "Собрано с любовью", desc: "Каждый букет — авторская работа наших флористов" },
];

const Index = () => {
  const { products } = useStore();
  const featured = products.filter((p) => p.inStock).slice(0, 4);

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
    </Layout>
  );
};

export default Index;

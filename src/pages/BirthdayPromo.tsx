import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { motion } from "framer-motion";
import birthdayPromo from "@/assets/birthday-promo.jpg";
import { Gift, Sparkles, Percent } from "lucide-react";

const BIRTHDAY_DISCOUNT = 15; // %

const BirthdayPromo = () => {
  const { products } = useStore();
  // Show bouquets for birthday selection
  const excludeIds = ["7", "9"]; // Белая свадьба, Жёлтое солнце
  const bouquets = products.filter((p) => (p.category === "Букеты" || p.category === "Розы") && !excludeIds.includes(p.id));

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={birthdayPromo} alt="Букеты на день рождения" width={1200} height={600} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="container relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg space-y-4"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 font-body text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Специальное предложение
            </span>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
              День рождения? <br />Скидка {BIRTHDAY_DISCOUNT}%!
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Закажите букет ко дню рождения и получите скидку {BIRTHDAY_DISCOUNT}% на любой букет из нашей коллекции. Сделайте праздник незабываемым!
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border py-12">
        <div className="container">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground">Как воспользоваться</h2>
          <div className="grid gap-6 sm:grid-cols-3">
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

      {/* Bouquet selection */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Выберите букет для подарка</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bouquets.map((p) => (
              <ProductCard key={p.id} product={p} discount={BIRTHDAY_DISCOUNT} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BirthdayPromo;

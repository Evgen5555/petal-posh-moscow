import Layout from "@/components/Layout";
import { Truck, Clock, MapPin, CreditCard } from "lucide-react";

const info = [
  { icon: Truck, title: "Бесплатная доставка", desc: "При заказе от 3 000 ₽ доставка по Москве бесплатно. Стоимость доставки при заказе до 3 000 ₽ — 500 ₽." },
  { icon: Clock, title: "Время доставки", desc: "Доставляем ежедневно с 8:00 до 22:00. Срочная доставка за 2 часа с момента оформления заказа." },
  { icon: MapPin, title: "Зона доставки", desc: "Доставляем по всей Москве в пределах МКАД. Доставка за МКАД до 10 км — 300 ₽, далее — по договорённости." },
  { icon: CreditCard, title: "Оплата", desc: "Принимаем наличные, банковские карты, оплату по QR-коду и переводы. Оплата при получении или онлайн." },
];

const Delivery = () => (
  <Layout>
    <section className="py-12">
      <div className="container max-w-3xl">
        <h1 className="mb-8 font-heading text-3xl font-bold text-foreground md:text-4xl">Доставка и оплата</h1>
        <div className="space-y-6">
          {info.map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Delivery;

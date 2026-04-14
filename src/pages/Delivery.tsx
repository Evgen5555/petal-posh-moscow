import Layout from "@/components/Layout";
import { Truck, Clock, MapPin, CreditCard } from "lucide-react";
import { useSiteContentContext } from "@/context/SiteContentContext";

const icons = [Truck, Clock, MapPin, CreditCard];

const Delivery = () => {
  const { get } = useSiteContentContext();

  const info = [
    { icon: icons[0], title: get("delivery_1_title"), desc: get("delivery_1_desc") },
    { icon: icons[1], title: get("delivery_2_title"), desc: get("delivery_2_desc") },
    { icon: icons[2], title: get("delivery_3_title"), desc: get("delivery_3_desc") },
    { icon: icons[3], title: get("delivery_4_title"), desc: get("delivery_4_desc") },
  ];

  return (
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
};

export default Delivery;

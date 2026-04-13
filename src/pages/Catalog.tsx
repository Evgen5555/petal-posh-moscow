import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { categories } from "@/data/products";

const Catalog = () => {
  const { products } = useStore();
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get("cat");
  const [active, setActive] = useState(catParam && categories.includes(catParam) ? catParam : "Все");

  useEffect(() => {
    if (catParam && categories.includes(catParam)) setActive(catParam);
  }, [catParam]);

  const filtered = active === "Все" ? products : products.filter((p) => p.category === active);

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <h1 className="mb-8 font-heading text-3xl font-bold text-foreground md:text-4xl">Каталог</h1>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-all ${
                  active === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-accent/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center font-body text-muted-foreground">
              В этой категории пока нет товаров
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Catalog;

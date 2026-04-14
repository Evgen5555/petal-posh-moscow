import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import { useReviews } from "@/hooks/useReviews";
import { useSiteContentContext } from "@/context/SiteContentContext";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Reviews = () => {
  const { products } = useStore();
  const { reviews } = useReviews();
  const { get } = useSiteContentContext();

  const visibleReviews = reviews.filter((r) => r.visible);
  const avgRating = visibleReviews.length > 0
    ? (visibleReviews.reduce((sum, r) => sum + r.rating, 0) / visibleReviews.length).toFixed(1)
    : "0";

  return (
    <Layout>
      <section className="py-12">
        <div className="container">
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground md:text-4xl">{get("reviews_title")}</h1>
          <p className="mb-8 font-body text-muted-foreground">
            Средний рейтинг: <span className="font-semibold text-primary">{avgRating}</span> из 5 · {visibleReviews.length} отзывов
          </p>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review, i) => {
              const product = products.find((p) => p.id === review.productId);
              return (
                <motion.div key={review.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-sm font-semibold text-foreground">{review.author}</p>
                    <p className="font-body text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                  {product && (
                    <Link to={`/product/${product.id}`} className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 font-body text-xs font-medium text-accent-foreground hover:bg-accent/80 transition-colors">
                      <img src={product.image} alt={product.name} className="h-5 w-5 rounded-full object-cover" />
                      {product.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;

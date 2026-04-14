import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { reviews as staticReviews } from "@/data/reviews";

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  productId: string | null;
  visible: boolean;
}

export function useReviews(adminMode = false) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    // For admin, we need auth context — use separate query
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    
    if (data && data.length > 0) {
      setReviews(
        data.map((r) => ({
          id: r.id,
          author: r.author,
          rating: r.rating,
          date: r.date,
          text: r.text,
          productId: r.product_id,
          visible: r.visible,
        }))
      );
    } else if (!adminMode) {
      // Fallback to static reviews if DB is empty
      setReviews(
        staticReviews.map((r) => ({
          ...r,
          productId: r.productId,
          visible: true,
        }))
      );
    }
    setLoading(false);
  }, [adminMode]);

  useEffect(() => { load(); }, [load]);

  const addReview = useCallback(async (review: Omit<ReviewItem, "id">) => {
    const { error } = await supabase.from("reviews").insert({
      author: review.author,
      rating: review.rating,
      date: review.date,
      text: review.text,
      product_id: review.productId,
      visible: review.visible,
    });
    if (error) throw error;
    await load();
  }, [load]);

  const updateReview = useCallback(async (id: string, updates: Partial<ReviewItem>) => {
    const mapped: Record<string, unknown> = {};
    if (updates.author !== undefined) mapped.author = updates.author;
    if (updates.rating !== undefined) mapped.rating = updates.rating;
    if (updates.date !== undefined) mapped.date = updates.date;
    if (updates.text !== undefined) mapped.text = updates.text;
    if (updates.productId !== undefined) mapped.product_id = updates.productId;
    if (updates.visible !== undefined) mapped.visible = updates.visible;
    
    const { error } = await supabase.from("reviews").update(mapped).eq("id", id);
    if (error) throw error;
    await load();
  }, [load]);

  const deleteReview = useCallback(async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) throw error;
    await load();
  }, [load]);

  return { reviews, loading, addReview, updateReview, deleteReview, reload: load };
}

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContentItem {
  id: string;
  key: string;
  value: string;
  type: "text" | "image";
  label: string;
}

// Default content values used when DB has no entry
const defaults: Record<string, { value: string; type: "text" | "image"; label: string }> = {
  hero_subtitle: { value: "Доставка по Москве", type: "text", label: "Hero — подзаголовок" },
  hero_title_1: { value: "Цветы, которые", type: "text", label: "Hero — заголовок строка 1" },
  hero_title_2: { value: "говорят за вас", type: "text", label: "Hero — заголовок строка 2" },
  hero_description: { value: "Авторские букеты с доставкой по Москве. Свежесть, стиль и\u00a0нежность в каждом лепестке.", type: "text", label: "Hero — описание" },
  hero_cta: { value: "Выбрать букет", type: "text", label: "Hero — кнопка" },
  feature_1_title: { value: "Свежие цветы", type: "text", label: "Преимущество 1 — заголовок" },
  feature_1_desc: { value: "Получаем напрямую от лучших поставщиков каждое утро", type: "text", label: "Преимущество 1 — описание" },
  feature_2_title: { value: "Доставка за 2 часа", type: "text", label: "Преимущество 2 — заголовок" },
  feature_2_desc: { value: "Бесплатная доставка по Москве при заказе от 3 000 ₽", type: "text", label: "Преимущество 2 — описание" },
  feature_3_title: { value: "Собрано с любовью", type: "text", label: "Преимущество 3 — заголовок" },
  feature_3_desc: { value: "Каждый букет — авторская работа наших флористов", type: "text", label: "Преимущество 3 — описание" },
  popular_title: { value: "Популярные букеты", type: "text", label: "Популярные — заголовок" },
  promo_badge: { value: "Специальное предложение", type: "text", label: "Акция — бейдж" },
  promo_title: { value: "День рождения?\nСкидка 15%!", type: "text", label: "Акция — заголовок" },
  promo_desc: { value: "Закажите букет ко дню рождения и получите скидку 15% на любой букет из нашей коллекции.", type: "text", label: "Акция — описание" },
  promo_cta: { value: "Выбрать букет со скидкой", type: "text", label: "Акция — кнопка" },
  custom_title: { value: "Нужен индивидуальный букет?", type: "text", label: "Индивид. букет — заголовок" },
  custom_desc: { value: "Соберём по вашему желанию — выберите цветы, оттенки и стиль, а наши флористы создадут уникальную композицию специально для вас.", type: "text", label: "Индивид. букет — описание" },
  custom_cta: { value: "Собрать букет", type: "text", label: "Индивид. букет — кнопка" },
  reviews_title: { value: "Отзывы наших клиентов", type: "text", label: "Отзывы — заголовок" },
  footer_desc: { value: "Доставка свежих цветов по Москве. Каждый букет собирается с любовью.", type: "text", label: "Футер — описание" },
  footer_phone: { value: "+7 (495) 123-45-67", type: "text", label: "Футер — телефон" },
  footer_email: { value: "hello@fleur-moscow.ru", type: "text", label: "Футер — email" },
  footer_address: { value: "Москва, ул. Цветочная, 1", type: "text", label: "Футер — адрес" },
  delivery_1_title: { value: "Бесплатная доставка", type: "text", label: "Доставка 1 — заголовок" },
  delivery_1_desc: { value: "При заказе от 3 000 ₽ доставка по Москве бесплатно. Стоимость доставки при заказе до 3 000 ₽ — 500 ₽.", type: "text", label: "Доставка 1 — описание" },
  delivery_2_title: { value: "Время доставки", type: "text", label: "Доставка 2 — заголовок" },
  delivery_2_desc: { value: "Доставляем ежедневно с 8:00 до 22:00. Срочная доставка за 2 часа с момента оформления заказа.", type: "text", label: "Доставка 2 — описание" },
  delivery_3_title: { value: "Зона доставки", type: "text", label: "Доставка 3 — заголовок" },
  delivery_3_desc: { value: "Доставляем по всей Москве в пределах МКАД. Доставка за МКАД до 10 км — 300 ₽, далее — по договорённости.", type: "text", label: "Доставка 3 — описание" },
  delivery_4_title: { value: "Оплата", type: "text", label: "Доставка 4 — заголовок" },
  delivery_4_desc: { value: "Принимаем наличные, банковские карты, оплату по QR-коду и переводы. Оплата при получении или онлайн.", type: "text", label: "Доставка 4 — описание" },
};

export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const [k, v] of Object.entries(defaults)) init[k] = v.value;
    return init;
  });
  const [allItems, setAllItems] = useState<SiteContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from("site_content").select("*");
    if (data) {
      const map: Record<string, string> = {};
      for (const [k, v] of Object.entries(defaults)) map[k] = v.value;
      const items: SiteContentItem[] = [];
      for (const row of data) {
        map[row.key] = row.value;
        items.push({ id: row.id, key: row.key, value: row.value, type: row.type as "text" | "image", label: row.label });
      }
      setContent(map);
      setAllItems(items);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const get = useCallback((key: string) => content[key] ?? defaults[key]?.value ?? "", [content]);

  const upsert = useCallback(async (key: string, value: string) => {
    const def = defaults[key];
    const { data: existing } = await supabase.from("site_content").select("id").eq("key", key).maybeSingle();
    if (existing) {
      await supabase.from("site_content").update({ value }).eq("key", key);
    } else {
      await supabase.from("site_content").insert({
        key,
        value,
        type: def?.type ?? "text",
        label: def?.label ?? key,
      });
    }
    setContent((prev) => ({ ...prev, [key]: value }));
    await load();
  }, [load]);

  return { get, upsert, loading, allItems, defaults };
}

export type { SiteContentItem as ContentItem };
export { defaults as contentDefaults };

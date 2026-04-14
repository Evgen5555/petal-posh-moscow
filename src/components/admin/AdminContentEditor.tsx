import { useState } from "react";
import { useSiteContent, contentDefaults } from "@/hooks/useSiteContent";
import { Save, Pencil } from "lucide-react";
import { toast } from "sonner";

const AdminContentEditor = () => {
  const { get, upsert, loading, defaults } = useSiteContent();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const groups = [
    { title: "Главная — Hero", keys: ["hero_subtitle", "hero_title_1", "hero_title_2", "hero_description", "hero_cta"] },
    { title: "Преимущества", keys: ["feature_1_title", "feature_1_desc", "feature_2_title", "feature_2_desc", "feature_3_title", "feature_3_desc"] },
    { title: "Популярные букеты", keys: ["popular_title"] },
    { title: "Акция", keys: ["promo_badge", "promo_title", "promo_desc", "promo_cta"] },
    { title: "Индивидуальный букет", keys: ["custom_title", "custom_desc", "custom_cta"] },
    { title: "Отзывы", keys: ["reviews_title"] },
    { title: "Доставка", keys: ["delivery_1_title", "delivery_1_desc", "delivery_2_title", "delivery_2_desc", "delivery_3_title", "delivery_3_desc", "delivery_4_title", "delivery_4_desc"] },
    { title: "Футер", keys: ["footer_desc", "footer_phone", "footer_email", "footer_address"] },
  ];

  const handleSave = async (key: string) => {
    try {
      await upsert(key, editValue);
      setEditingKey(null);
      toast.success("Сохранено");
    } catch {
      toast.error("Ошибка при сохранении");
    }
  };

  if (loading) return <p className="py-8 text-center text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.title} className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-heading text-base font-semibold text-foreground">{group.title}</h3>
          <div className="space-y-3">
            {group.keys.map((key) => {
              const def = defaults[key];
              const currentValue = get(key);
              const isEditing = editingKey === key;

              return (
                <div key={key} className="flex flex-col gap-1.5 rounded-lg bg-accent/30 p-3">
                  <div className="flex items-center justify-between">
                    <label className="font-body text-xs font-medium text-muted-foreground">
                      {def?.label || key}
                    </label>
                    {!isEditing ? (
                      <button
                        onClick={() => { setEditingKey(key); setEditValue(currentValue); }}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Pencil className="h-3 w-3" /> Изменить
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSave(key)}
                        className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <Save className="h-3 w-3" /> Сохранить
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={currentValue.length > 80 ? 3 : 1}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setEditingKey(null);
                        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(key); }
                      }}
                    />
                  ) : (
                    <p className="font-body text-sm text-foreground whitespace-pre-wrap">{currentValue}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminContentEditor;

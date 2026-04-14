import { useState } from "react";
import { useReviews, type ReviewItem } from "@/hooks/useReviews";
import { useStore } from "@/context/StoreContext";
import { Plus, Trash2, Eye, EyeOff, Pencil, Save, X, Star } from "lucide-react";
import { toast } from "sonner";

const AdminReviews = () => {
  const { reviews, loading, addReview, updateReview, deleteReview } = useReviews(true);
  const { products } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ author: "", rating: 5, date: "", text: "", productId: "", visible: true });

  const resetForm = () => {
    setForm({ author: "", rating: 5, date: new Date().toLocaleDateString("ru-RU"), text: "", productId: "", visible: true });
    setShowForm(false);
    setEditId(null);
  };

  const handleAdd = async () => {
    if (!form.author || !form.text) { toast.error("Заполните автора и текст"); return; }
    try {
      await addReview({ ...form, productId: form.productId || null });
      toast.success("Отзыв добавлен");
      resetForm();
    } catch { toast.error("Ошибка"); }
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      await updateReview(editId, { ...form, productId: form.productId || null });
      toast.success("Отзыв обновлён");
      resetForm();
    } catch { toast.error("Ошибка"); }
  };

  const handleToggleVisible = async (r: ReviewItem) => {
    try {
      await updateReview(r.id, { visible: !r.visible });
      toast.success(r.visible ? "Отзыв скрыт" : "Отзыв опубликован");
    } catch { toast.error("Ошибка"); }
  };

  const startEdit = (r: ReviewItem) => {
    setEditId(r.id);
    setForm({ author: r.author, rating: r.rating, date: r.date, text: r.text, productId: r.productId || "", visible: r.visible });
    setShowForm(true);
  };

  if (loading) return <p className="py-8 text-center text-muted-foreground">Загрузка...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-body text-sm text-muted-foreground">{reviews.length} отзывов</p>
        <button
          onClick={() => { resetForm(); setForm((f) => ({ ...f, date: new Date().toLocaleDateString("ru-RU") })); setShowForm(true); }}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-body text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Добавить отзыв
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-heading text-base font-semibold">{editId ? "Редактировать отзыв" : "Новый отзыв"}</h3>
            <button onClick={resetForm} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input placeholder="Автор" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <input placeholder="Дата" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Рейтинг:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setForm({ ...form, rating: n })}>
                <Star className={`h-5 w-5 ${n <= form.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
              </button>
            ))}
          </div>
          <textarea placeholder="Текст отзыва" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
          <select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })} className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
            <option value="">Без привязки к товару</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
            Опубликован
          </label>
          <button
            onClick={editId ? handleUpdate : handleAdd}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Save className="h-4 w-4" /> {editId ? "Сохранить" : "Добавить"}
          </button>
        </div>
      )}

      <div className="space-y-2">
        {reviews.map((r) => (
          <div key={r.id} className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${r.visible ? "border-border bg-card" : "border-border/50 bg-muted/30 opacity-60"}`}>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading text-sm font-semibold">{r.author}</span>
                <span className="text-xs text-muted-foreground">{r.date}</span>
                <div className="flex gap-0.5 ml-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className={`h-3 w-3 ${n <= r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
              {r.productId && (
                <span className="text-xs text-primary">
                  Товар: {products.find((p) => p.id === r.productId)?.name || r.productId}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => handleToggleVisible(r)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors" title={r.visible ? "Скрыть" : "Показать"}>
                {r.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button onClick={() => startEdit(r)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent transition-colors" title="Редактировать">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={async () => { await deleteReview(r.id); toast.success("Отзыв удалён"); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Удалить">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="py-8 text-center text-muted-foreground">Отзывов пока нет</p>}
      </div>
    </div>
  );
};

export default AdminReviews;

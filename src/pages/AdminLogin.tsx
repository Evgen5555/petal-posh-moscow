import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Неверный логин или пароль");
    } else {
      navigate("/admin");
    }
  };

  return (
    <Layout>
      <section className="flex min-h-[60vh] items-center justify-center py-12">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8">
          <h1 className="text-center font-heading text-2xl font-bold text-foreground">Вход в админку</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-sm"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 font-body text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-2.5 font-body text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default AdminLogin;

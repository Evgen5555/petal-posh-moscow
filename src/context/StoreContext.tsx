import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { initialProducts, type Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";

export interface Order {
  id: string;
  items: { product_name: string; product_image: string | null; price: number; quantity: number }[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  comment: string;
  date: string;
  status: "new" | "processing" | "delivered";
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (o: { items: { product: Product; quantity: number }[]; total: number; customerName: string; customerPhone: string; customerAddress: string; comment: string }) => Promise<void>;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  deleteOrder: (id: string) => Promise<void>;
  loadOrders: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = useCallback(async () => {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!ordersData) return;

    const { data: itemsData } = await supabase.from("order_items").select("*");

    const mapped: Order[] = ordersData.map((o) => ({
      id: o.id,
      total: Number(o.total),
      customerName: o.customer_name,
      customerPhone: o.customer_phone,
      customerAddress: o.customer_address,
      comment: o.comment || "",
      date: new Date(o.created_at).toLocaleString("ru-RU"),
      status: o.status,
      items: (itemsData || [])
        .filter((i) => i.order_id === o.id)
        .map((i) => ({ product_name: i.product_name, product_image: i.product_image, price: Number(i.price), quantity: i.quantity })),
    }));

    setOrders(mapped);
  }, []);

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: Date.now().toString() }]);
  }, []);

  const updateProduct = useCallback((id: string, p: Partial<Product>) => {
    setProducts((prev) => prev.map((pr) => (pr.id === id ? { ...pr, ...p } : pr)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((pr) => pr.id !== id));
  }, []);

  const addOrder = useCallback(async (o: { items: { product: Product; quantity: number }[]; total: number; customerName: string; customerPhone: string; customerAddress: string; comment: string }) => {
    const { error } = await supabase.rpc("create_order", {
      _customer_name: o.customerName,
      _customer_phone: o.customerPhone,
      _customer_address: o.customerAddress,
      _comment: o.comment,
      _items: o.items.map((i) => ({
        product_name: i.product.name,
        product_image: i.product.image,
        price: i.product.price,
        quantity: i.quantity,
      })),
    });
    if (error) throw error;
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: Order["status"]) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const deleteOrder = useCallback(async (id: string) => {
    await supabase.from("order_items").delete().eq("order_id", id);
    await supabase.from("orders").delete().eq("id", id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  return (
    <StoreContext.Provider value={{ products, orders, addProduct, updateProduct, deleteProduct, addOrder, updateOrderStatus, deleteOrder, loadOrders }}>
      {children}
    </StoreContext.Provider>
  );
};

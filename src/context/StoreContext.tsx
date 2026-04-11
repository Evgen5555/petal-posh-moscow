import React, { createContext, useContext, useState, useCallback } from "react";
import { initialProducts, type Product } from "@/data/products";

export interface Order {
  id: string;
  items: { product: Product; quantity: number }[];
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
  addOrder: (o: Omit<Order, "id" | "date" | "status">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
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

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: Date.now().toString() }]);
  }, []);

  const updateProduct = useCallback((id: string, p: Partial<Product>) => {
    setProducts((prev) => prev.map((pr) => (pr.id === id ? { ...pr, ...p } : pr)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((pr) => pr.id !== id));
  }, []);

  const addOrder = useCallback((o: Omit<Order, "id" | "date" | "status">) => {
    setOrders((prev) => [
      { ...o, id: Date.now().toString(), date: new Date().toLocaleString("ru-RU"), status: "new" as const },
      ...prev,
    ]);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  return (
    <StoreContext.Provider value={{ products, orders, addProduct, updateProduct, deleteProduct, addOrder, updateOrderStatus }}>
      {children}
    </StoreContext.Provider>
  );
};

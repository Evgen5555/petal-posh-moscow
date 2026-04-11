import bouquet1 from "@/assets/bouquet-1.jpg";
import bouquet2 from "@/assets/bouquet-2.jpg";
import bouquet3 from "@/assets/bouquet-3.jpg";
import bouquet4 from "@/assets/bouquet-4.jpg";
import bouquet5 from "@/assets/bouquet-5.jpg";
import bouquet6 from "@/assets/bouquet-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  composition: string;
  inStock: boolean;
}

export const categories = [
  "Все",
  "Букеты",
  "Розы",
  "Композиции",
  "Сухоцветы",
  "Сезонные",
];

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Нежность пионов",
    price: 4500,
    image: bouquet1,
    category: "Букеты",
    description: "Роскошный букет из розовых пионов и кремовых роз. Идеален для романтического подарка.",
    composition: "Пионы розовые — 5 шт., розы кремовые — 7 шт., эвкалипт, крафтовая упаковка",
    inStock: true,
  },
  {
    id: "2",
    name: "Классика красных роз",
    price: 3800,
    image: bouquet2,
    category: "Розы",
    description: "Элегантный букет из красных роз — вечная классика, которая не оставит равнодушной.",
    composition: "Розы красные — 15 шт., зелень рускуса, стеклянная ваза (опционально)",
    inStock: true,
  },
  {
    id: "3",
    name: "Весенняя лаванда",
    price: 3200,
    image: bouquet3,
    category: "Сезонные",
    description: "Нежное сочетание белых тюльпанов с ароматной лавандой — дыхание весны.",
    composition: "Тюльпаны белые — 9 шт., лаванда — 7 веточек, тишью-упаковка",
    inStock: true,
  },
  {
    id: "4",
    name: "Солнечный день",
    price: 2900,
    image: bouquet4,
    category: "Букеты",
    description: "Яркий и жизнерадостный букет из подсолнухов и ромашек — заряд позитива!",
    composition: "Подсолнухи — 5 шт., ромашки — 7 шт., зелень",
    inStock: true,
  },
  {
    id: "5",
    name: "Голубая гортензия",
    price: 5200,
    image: bouquet5,
    category: "Композиции",
    description: "Изысканная шапка голубой гортензии — стильный и необычный подарок.",
    composition: "Гортензия голубая — 3 шт., упаковка премиум",
    inStock: true,
  },
  {
    id: "6",
    name: "Бохо-сухоцветы",
    price: 3600,
    image: bouquet6,
    category: "Сухоцветы",
    description: "Стильная композиция из сухоцветов и хлопка — украсит интерьер надолго.",
    composition: "Пампасная трава, хлопок, лагурус, сухоцветы, натуральная обвязка",
    inStock: true,
  },
];

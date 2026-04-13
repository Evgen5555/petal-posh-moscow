import bouquet1 from "@/assets/bouquet-1.jpg";
import bouquet2 from "@/assets/bouquet-2.jpg";
import bouquet3 from "@/assets/bouquet-3.jpg";
import bouquet4 from "@/assets/bouquet-4.jpg";
import bouquet5 from "@/assets/bouquet-5.jpg";
import bouquet6 from "@/assets/bouquet-6.jpg";
import bouquet7 from "@/assets/bouquet-7.jpg";
import bouquet8 from "@/assets/bouquet-8.jpg";
import roses2 from "@/assets/roses-2.jpg";
import roses3 from "@/assets/roses-3.jpg";
import roses4 from "@/assets/roses-4.jpg";
import composition2 from "@/assets/composition-2.jpg";
import composition3 from "@/assets/composition-3.jpg";
import composition4 from "@/assets/composition-4.jpg";
import dried2 from "@/assets/dried-2.jpg";
import dried3 from "@/assets/dried-3.jpg";
import dried4 from "@/assets/dried-4.jpg";
import seasonal2 from "@/assets/seasonal-2.jpg";
import seasonal3 from "@/assets/seasonal-3.jpg";
import seasonal4 from "@/assets/seasonal-4.jpg";
import packaging1 from "@/assets/packaging-1.jpg";
import packaging2 from "@/assets/packaging-2.jpg";
import packaging3 from "@/assets/packaging-3.jpg";

import single1 from "@/assets/single-1.jpg";
import single2 from "@/assets/single-2.jpg";
import single3 from "@/assets/single-3.jpg";
import single4 from "@/assets/single-4.jpg";
import singleWhiteRose from "@/assets/single-white-rose.jpg";
import singlePinkRose from "@/assets/single-pink-rose.jpg";
import singleYellowRose from "@/assets/single-yellow-rose.jpg";
import singleOrchid from "@/assets/single-orchid.jpg";
import singleLavender from "@/assets/single-lavender.jpg";

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
  "Штучные",
  "Упаковка",
];

export const initialProducts: Product[] = [
  // Букеты (4)
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
    id: "7",
    name: "Белая свадьба",
    price: 5800,
    image: bouquet7,
    category: "Букеты",
    description: "Элегантный свадебный букет из белых роз с нежной зеленью — классика торжества.",
    composition: "Розы белые — 19 шт., рускус, атласная лента",
    inStock: true,
  },
  {
    id: "8",
    name: "Розовый рассвет",
    price: 4200,
    image: bouquet8,
    category: "Букеты",
    description: "Нежный букет из розовых роз в пастельной упаковке — воплощение женственности.",
    composition: "Розы розовые — 15 шт., гипсофила, упаковка тишью",
    inStock: true,
  },
  // Розы (4)
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
    id: "9",
    name: "Жёлтое солнце",
    price: 3500,
    image: roses2,
    category: "Розы",
    description: "Солнечные жёлтые розы в стеклянной вазе — символ радости и дружбы.",
    composition: "Розы жёлтые — 11 шт., стеклянная ваза",
    inStock: true,
  },
  {
    id: "10",
    name: "Персиковая нежность",
    price: 4100,
    image: roses3,
    category: "Розы",
    description: "Букет из персиковых роз — тёплый и уютный подарок для близких.",
    composition: "Розы персиковые — 17 шт., зелень питтоспорума",
    inStock: true,
  },
  {
    id: "11",
    name: "Радуга роз",
    price: 4800,
    image: roses4,
    category: "Розы",
    description: "Яркий микс из роз разных оттенков — настоящий калейдоскоп цвета.",
    composition: "Розы микс — 21 шт., декоративная зелень",
    inStock: true,
  },
  // Композиции (4)
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
    id: "12",
    name: "Романтика в вазе",
    price: 4600,
    image: composition2,
    category: "Композиции",
    description: "Нежная композиция из роз и зелени в керамической вазе — готовый подарок.",
    composition: "Розы розовые и белые — 15 шт., зелень, керамическая ваза",
    inStock: true,
  },
  {
    id: "13",
    name: "Орхидея фаленопсис",
    price: 6500,
    image: composition3,
    category: "Композиции",
    description: "Элегантная орхидея в дизайнерском кашпо — подарок, который радует месяцами.",
    composition: "Фаленопсис 3 ветки, декоративное кашпо",
    inStock: true,
  },
  {
    id: "14",
    name: "Флорариум с суккулентами",
    price: 5900,
    image: composition4,
    category: "Композиции",
    description: "Миниатюрный сад в стеклянной колбе — стильный элемент декора.",
    composition: "Суккуленты микс, мох, стеклянный флорариум",
    inStock: true,
  },
  // Сухоцветы (4)
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
  {
    id: "15",
    name: "Хлопок и эвкалипт",
    price: 3200,
    image: dried2,
    category: "Сухоцветы",
    description: "Уютный букет из хлопка и сушёного эвкалипта — тепло и природная красота.",
    composition: "Хлопок — 7 шт., эвкалипт сушёный, пшеница, рафия",
    inStock: true,
  },
  {
    id: "16",
    name: "Лавандовый пучок",
    price: 1800,
    image: dried3,
    category: "Сухоцветы",
    description: "Ароматный пучок сушёной лаванды — наполнит дом прованским духом.",
    composition: "Лаванда сушёная — большой пучок, джутовая нить",
    inStock: true,
  },
  {
    id: "17",
    name: "Пампасная трава",
    price: 2800,
    image: dried4,
    category: "Сухоцветы",
    description: "Воздушная пампасная трава в минималистичной вазе — тренд современного интерьера.",
    composition: "Пампасная трава — 5 стеблей, керамическая ваза",
    inStock: true,
  },
  // Сезонные (4)
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
    id: "18",
    name: "Весенний шарм",
    price: 3900,
    image: seasonal2,
    category: "Сезонные",
    description: "Нежный букет из ранункулюсов и сакуры — весеннее настроение в каждом лепестке.",
    composition: "Ранункулюсы — 7 шт., веточки сакуры — 3 шт., гипсофила",
    inStock: true,
  },
  {
    id: "19",
    name: "Осенний урожай",
    price: 3400,
    image: seasonal3,
    category: "Сезонные",
    description: "Тёплый осенний букет с хризантемами и ягодами — краски золотой осени.",
    composition: "Хризантемы — 7 шт., ягоды гиперикума, колоски, листья",
    inStock: true,
  },
  {
    id: "20",
    name: "Зимняя сказка",
    price: 4700,
    image: seasonal4,
    category: "Сезонные",
    description: "Праздничный букет из белых амариллисов и еловых веток — дух зимнего волшебства.",
    composition: "Амариллис белый — 3 шт., ветки ели, ягоды илекса, лента",
    inStock: true,
  },
  // Штучные (4)
  {
    id: "21",
    name: "Красная роза",
    price: 350,
    image: single1,
    category: "Штучные",
    description: "Одна роскошная красная роза — классический жест внимания и любви.",
    composition: "Роза красная — 1 шт., зелень, упаковка",
    inStock: true,
  },
  {
    id: "22",
    name: "Белый тюльпан",
    price: 250,
    image: single2,
    category: "Штучные",
    description: "Один нежный белый тюльпан — символ весны и чистоты.",
    composition: "Тюльпан белый — 1 шт.",
    inStock: true,
  },
  {
    id: "23",
    name: "Подсолнух",
    price: 400,
    image: single3,
    category: "Штучные",
    description: "Один яркий подсолнух — маленькое солнце, которое поднимет настроение.",
    composition: "Подсолнух — 1 шт., упаковка",
    inStock: true,
  },
  {
    id: "24",
    name: "Розовый пион",
    price: 500,
    image: single4,
    category: "Штучные",
    description: "Один пышный розовый пион — роскошь и нежность в одном цветке.",
    composition: "Пион розовый — 1 шт., крафт-упаковка",
    inStock: true,
  },
  // Упаковка (4)
  // --- Дополнительные штучные ---
  {
    id: "29",
    name: "Белая роза",
    price: 350,
    image: singleWhiteRose,
    category: "Штучные",
    description: "Элегантная белая роза — символ чистоты и нежности.",
    composition: "Роза белая — 1 шт.",
    inStock: true,
  },
  {
    id: "30",
    name: "Розовая роза",
    price: 350,
    image: singlePinkRose,
    category: "Штучные",
    description: "Нежная розовая роза — воплощение романтики и женственности.",
    composition: "Роза розовая — 1 шт.",
    inStock: true,
  },
  {
    id: "31",
    name: "Жёлтая роза",
    price: 350,
    image: singleYellowRose,
    category: "Штучные",
    description: "Солнечная жёлтая роза — символ радости и дружбы.",
    composition: "Роза жёлтая — 1 шт.",
    inStock: true,
  },
  {
    id: "32",
    name: "Орхидея",
    price: 600,
    image: singleOrchid,
    category: "Штучные",
    description: "Изысканная орхидея фаленопсис — утончённый и стильный цветок.",
    composition: "Орхидея — 1 шт.",
    inStock: true,
  },
  {
    id: "33",
    name: "Веточка лаванды",
    price: 150,
    image: singleLavender,
    category: "Штучные",
    description: "Ароматная веточка лаванды — прованский шарм в одном стебле.",
    composition: "Лаванда — 1 веточка",
    inStock: true,
  },
  // Упаковка (4)
  {
    id: "25",
    name: "Крафт с лентой",
    price: 500,
    image: packaging1,
    category: "Упаковка",
    description: "Стильная крафтовая упаковка с атласной лентой — элегантный и экологичный выбор.",
    composition: "Крафт-бумага, атласная лента, декоративная бирка",
    inStock: true,
  },
  {
    id: "26",
    name: "Шляпная коробка",
    price: 1200,
    image: packaging2,
    category: "Упаковка",
    description: "Бархатная шляпная коробка — роскошная подача для любого букета.",
    composition: "Бархатная коробка, внутренняя флористическая губка, лого-наклейка",
    inStock: true,
  },
  {
    id: "27",
    name: "Плетёная корзина",
    price: 900,
    image: packaging3,
    category: "Упаковка",
    description: "Уютная плетёная корзина — превращает букет в полноценный подарок.",
    composition: "Корзина из ивы, ручка, подкладка, целлофан",
    inStock: true,
  },
];

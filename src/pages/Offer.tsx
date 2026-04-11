import Layout from "@/components/Layout";

const Offer = () => (
  <Layout>
    <section className="py-12">
      <div className="container prose prose-sm max-w-3xl font-body text-muted-foreground">
        <h1 className="font-heading text-3xl font-bold text-foreground">Публичная оферта</h1>
        <p>Дата вступления в силу: 1 января 2025 года</p>

        <h2 className="font-heading text-foreground">1. Общие положения</h2>
        <p>Настоящий документ является официальным предложением (публичной офертой) интернет-магазина Fleur и определяет условия продажи товаров дистанционным способом.</p>

        <h2 className="font-heading text-foreground">2. Предмет оферты</h2>
        <p>Продавец обязуется передать покупателю товар (цветы, букеты, композиции), а покупатель обязуется оплатить и принять товар.</p>

        <h2 className="font-heading text-foreground">3. Оформление заказа</h2>
        <p>Заказ оформляется через сайт или по телефону. Подтверждение заказа осуществляется по телефону или электронной почте.</p>

        <h2 className="font-heading text-foreground">4. Цены и оплата</h2>
        <p>Цены указаны в рублях РФ. Продавец оставляет за собой право изменять цены без предварительного уведомления.</p>

        <h2 className="font-heading text-foreground">5. Доставка</h2>
        <p>Условия доставки указаны в разделе «Доставка» на сайте. Продавец не несёт ответственности за задержки, вызванные обстоятельствами непреодолимой силы.</p>

        <h2 className="font-heading text-foreground">6. Возврат и обмен</h2>
        <p>В связи со спецификой товара (живые цветы) возврат и обмен осуществляется только в случае ненадлежащего качества. Претензии принимаются в день доставки с фото-подтверждением.</p>

        <h2 className="font-heading text-foreground">7. Контакты</h2>
        <p>ИП Иванова А.А., ИНН: 770000000000<br />Адрес: Москва, ул. Цветочная, 1<br />Телефон: +7 (495) 123-45-67<br />Email: hello@fleur-moscow.ru</p>
      </div>
    </section>
  </Layout>
);

export default Offer;

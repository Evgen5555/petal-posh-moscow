import Layout from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <section className="py-12">
      <div className="container prose prose-sm max-w-3xl font-body text-muted-foreground">
        <h1 className="font-heading text-3xl font-bold text-foreground">Политика конфиденциальности</h1>
        <p>Дата вступления в силу: 1 января 2025 года</p>

        <h2 className="font-heading text-foreground">1. Общие положения</h2>
        <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта Fleur (далее — «Сайт»).</p>

        <h2 className="font-heading text-foreground">2. Какие данные мы собираем</h2>
        <p>При оформлении заказа мы запрашиваем: имя, номер телефона, адрес доставки. Эти данные используются исключительно для выполнения заказа.</p>

        <h2 className="font-heading text-foreground">3. Использование данных</h2>
        <p>Ваши персональные данные используются для: обработки и доставки заказов, связи с вами по вопросам заказа, улучшения качества обслуживания.</p>

        <h2 className="font-heading text-foreground">4. Защита данных</h2>
        <p>Мы принимаем все необходимые организационные и технические меры для защиты ваших персональных данных от несанкционированного доступа.</p>

        <h2 className="font-heading text-foreground">5. Передача данных третьим лицам</h2>
        <p>Мы не передаём ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ, и для выполнения доставки.</p>

        <h2 className="font-heading text-foreground">6. Контакты</h2>
        <p>По вопросам обработки персональных данных обращайтесь: hello@fleur-moscow.ru</p>
      </div>
    </section>
  </Layout>
);

export default Privacy;

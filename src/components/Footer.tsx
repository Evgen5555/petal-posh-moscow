import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-muted/40">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground">
            Fleur<span className="text-primary">.</span>
          </h3>
          <p className="mt-2 max-w-xs font-body text-sm text-muted-foreground">
            Доставка свежих цветов по Москве. Каждый букет собирается с любовью.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground">Навигация</h4>
          <ul className="mt-3 space-y-2 font-body text-sm text-muted-foreground">
            <li><Link to="/catalog" className="hover:text-foreground">Каталог</Link></li>
            <li><Link to="/delivery" className="hover:text-foreground">Доставка</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Политика конфиденциальности</Link></li>
            <li><Link to="/offer" className="hover:text-foreground">Публичная оферта</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground">Контакты</h4>
          <ul className="mt-3 space-y-2 font-body text-sm text-muted-foreground">
            <li>📞 +7 (495) 123-45-67</li>
            <li>✉️ hello@fleur-moscow.ru</li>
            <li>📍 Москва, ул. Цветочная, 1</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center font-body text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fleur. Все права защищены.
      </div>
    </div>
  </footer>
);

export default Footer;

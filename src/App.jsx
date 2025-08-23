import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  School, HeartHandshake, Store, Bike, Baby, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Море» — Евпатория, квартал у Мойнакского озера";

  const meta = [
    { name: "description", content: "ЖК «Море» в Евпатории: 12 домов комфорт-класса у озера Мойнаки, школа и детсад, торговая галерея, спорт- и детские зоны, паркинги. Эскроу, 214-ФЗ." },
    { property: "og:title", content: "ЖК «Море» — Евпатория, квартал у Мойнакского озера" },
    { property: "og:description", content: "Студии, 1–3-комн., благоустроенные дворы, инфраструктура рядом с морем. Планировки, сроки, очереди, условия покупки." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop";
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#EAD6C4", backgroundColor: "#FFFFFF", color: "#2B2118" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #C65D3A 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#4B3B30" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div
      className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
      style={{ borderColor: "#EAD6C4", backgroundColor: "#FFF8F2", color: "#2B2118" }}
    >
      {children}
    </div>
  );
}

function FireIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z" />
    </svg>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    // убираем горизонтальный скролл
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative"
      style={{ backgroundColor: "#FFF8F2", color: "#1F1B16", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: градиент + волны */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FFF3EA 0%, #FFF8F2 45%, #FFF8F2 100%)" }} />
        <motion.svg
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2"
          width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z"
            fill="#F6E6D9" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z"
            fill="#FFEADF" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ backgroundColor: "rgba(255,248,242,0.9)", borderColor: "#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4">
          {/* Лого и название */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow"
              style={{ backgroundColor: "#2B2118", color: "#F6E6D9" }}>М</div>
            <div className="leading-tight">
              <div className="font-extrabold flex items-center gap-2"
                style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} /> ЖК «Море»
              </div>
              <div className="text-[11px]" style={{ color: "#7A6A5F" }}>
                <MapPin size={12} className="inline mr-1" /> Евпатория · у озера Мойнаки
              </div>
            </div>
          </a>

          {/* Меню для ПК */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] mx-auto" aria-label="Главное меню">
            {[
              ["О проекте", "#about"],
              ["Локация", "#location"],
              ["Планировки", "#plans"],
              ["Галерея", "#gallery"],
              ["Контакты", "#buy"]
            ].map(([t, href]) => (
              <a key={href} href={href} className="hover:text-orange-600 transition-colors"
                style={{ color: "#4B3B30" }}>{t}</a>
            ))}
          </nav>

          {/* Кнопки для ПК */}
          <div className="ml-auto hidden sm:flex items-center gap-3">
            <a href="https://wa.me/79124530205"
              target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-2xl border hover:shadow-md"
              style={{ borderColor: "#D4A373", color: "#2B2118" }}>Написать в WhatsApp</a>
            <a href="#cta" className="px-4 py-2 rounded-2xl hover:shadow-md"
              style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>Подбор квартиры</a>
          </div>

          {/* Бургер для мобилки */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto" aria-label="Меню">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            {[
              ["О проекте", "#about"],
              ["Локация", "#location"],
              ["Планировки", "#plans"],
              ["Галерея", "#gallery"],
              ["Контакты", "#buy"]
            ].map(([t, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-orange-50">{t}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1
              className="font-extrabold tracking-tight"
              style={{
                fontFamily: "Prata, serif",
                color: "#2B2118",
                fontSize: "clamp(28px, 5vw, 56px)",
                lineHeight: 1.1,
                maxWidth: "18ch" // не даём разбухать в 4 строки
              }}
            >
              Квартал у моря и озера — «ЖК Море», Евпатория
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#4B3B30", maxWidth: 640 }}>
              Масштабный комфорт-класс рядом с озером Мойнаки: 12 домов, благоустроенные дворы, детские и
              спортивные площадки, торговая галерея, школа и детсад. До моря ~1,2 км. Первый этап — ориентир 2026 г.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["~1,2 км до моря", <Waves size={18} key="w" />],
                ["12 домов / до 14 этажей", <Building2 size={18} key="b" />],
                ["Предчистовая / с ремонтом", <Bath size={18} key="ba" />],
                ["Паркинг: гостевой + уровневый", <ParkingSquare size={18} key="p" />],
              ].map(([t, icon], i) => (
                <li key={i}
                  className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white"
                  style={{ borderColor: "#EAD6C4", color: "#2B2118" }}>
                  {icon} {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md"
                style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl border hover:shadow-md"
                style={{ borderColor: "#D4A373", color: "#2B2118" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          {/* КАРТИНКА */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-lg border relative"
            style={{ height: 520, borderColor: "#EAD6C4" }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* тонкая волна поверх фото, чтобы не наезжала на заголовок */}
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none"
              style={{ background: "linear-gradient(180deg, rgba(246,230,217,0.7), transparent)" }} />
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop"
              alt="Визуализация ЖК у моря"
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
              width={1600}
              height={1040}
            />
          </motion.div>
        </div>
      </section>

      {/* KPI */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full">
            <Stat value="~1,2 км" label="До моря" icon={<Waves size={18} />} />
          </div>
          <div className="h-full">
            <Stat value="до 14" label="Этажей" sub="12 жилых домов" icon={<Building2 size={18} />} />
          </div>
          <div className="h-full">
            <Stat value="Студии–3к" label="Форматы" icon={<Ruler size={18} />} />
          </div>
          <div className="h-full">
            <Stat value="Паркинги" label="Гостевой + уровневый" sub="На территории" icon={<ParkingSquare size={18} />} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#4B3B30' }}>
              «ЖК Море» — современный квартал в Евпатории у озера Мойнаки. Дворы без машин, детские и спортивные площадки,
              озеленение, торговая галерея, планируемые школа и детский сад. Форматы квартир от студий до семейных 3-комн.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Сроки', t: 'Постепенный ввод по очередям; ориентир первого этапа — 2026 год.', icon: <FileText size={18} /> },
                { h: 'Технологии', t: 'Современные инженерные решения, панорамные окна, энергоэффективность.', icon: <CircuitBoard size={18} /> },
                { h: 'Юридически', t: '214-ФЗ, эскроу-счета. Покупка по ДДУ.', icon: <ShieldCheck size={18} /> },
                { h: 'Масштаб', t: 'На территории: торговая галерея, спорт- и детские зоны, паркинги.', icon: <Hammer size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                  style={{ borderColor: '#EAD6C4', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#2B2118' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#4B3B30' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border"
            style={{ backgroundColor: '#F6E6D9', borderColor: '#EAD6C4' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <Building2 size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#4B3B30' }}>
              <li><Waves size={14} className="inline mr-2" /> Близость к морю и озеру</li>
              <li><MapPin size={14} className="inline mr-2" /> Евпатория, у Мойнакского озера</li>
              <li><ParkingSquare size={14} className="inline mr-2" /> Паркинги на территории</li>
              <li><Bath size={14} className="inline mr-2" /> Отделка: предчистовая / с ремонтом</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md"
              style={{ backgroundColor: '#C65D3A', color: '#FFF8F2' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* GALLERY (расширенная) */}
      <section id="gallery" className="py-14 md:py-20" style={{ backgroundColor: '#FFF3EA' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
            style={{ fontFamily: 'Prata, serif' }}><Building2 size={22} /> Галерея</h2>
          <p className="mt-2 text-sm" style={{ color: "#7A6A5F" }}>Пока используются иллюстративные фото моря/архитектуры. Когда будут реальные — подменим пути.</p>
          <div className="mt-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {[
              "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1529429612776-e5dd24d49b42?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop"
            ].map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow border group"
                style={{ borderColor: '#EAD6C4' }}>
                <img src={src} alt="Галерея ЖК Море"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                  loading="lazy" width={1600} height={1200} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и окружение</h2>
            <p className="mt-4" style={{ color: '#4B3B30' }}>
              Евпатория, рядом с озером Мойнаки. До пляжей — пешая доступность; вокруг — прогулочные зоны,
              санаторно-курортная инфраструктура, общественный транспорт.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[{ t: "Школа и детсад (план)", icon: <School size={16} /> }, { t: "Медицинская инфраструктура", icon: <HeartHandshake size={16} /> }, { t: "Магазины и услуги", icon: <Store size={16} /> }, { t: "Маршруты и велодорожки", icon: <Bike size={16} /> }].map((i, idx) => (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2"
                  style={{ borderColor: '#EAD6C4', backgroundColor: '#FFFFFF', color: '#2B2118' }}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#EAD6C4' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=33.361%2C45.190&z=12"
              className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* INFRA */}
      <section id="infra" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
            style={{ fontFamily: 'Prata, serif' }}><Store size={22} /> Инфраструктура квартала</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { t: "Для семей", points: [[Baby, "Детсад (план), школа (план)"], [School, "Игровые и образовательные пространства"], [Trees, "Дворы без машин"]] },
              { t: "Для активных", points: [[Dumbbell, "Спортплощадки и воркаут"], [Bike, "Пешие маршруты и вело"], [Waves, "Близость пляжей"]] },
              { t: "Сервис и комфорт", points: [[Store, "Торговая галерея"], [HeartHandshake, "Аптеки и сервисы поблизости"], [ParkingSquare, "Гостевой и уровневый паркинг"]] }
            ].map((b, i) => (
              <div key={i} className="p-6 rounded-2xl border"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
                <div className="font-semibold" style={{ color: '#2B2118' }}>{b.t}</div>
                <ul className="mt-3 space-y-2 text-sm" style={{ color: '#4B3B30' }}>
                  {b.points.map(([Ic, txt], j) => (
                    <li key={j} className="flex gap-3 items-start"><Ic size={16} /> {txt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#FFF3EA' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{ fontFamily: 'Prata, serif' }}><CircuitBoard size={22} /> Технологии и инженерия</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#4B3B30' }}>
              {[
                { t: 'Современный конструктив, энергоэффективные решения', icon: <Building2 size={16} /> },
                { t: 'Панорамное остекление, улучшенная тепло-/шумоизоляция', icon: <Home size={16} /> },
                { t: 'Индивидуальные/покорпусные инженерные системы', icon: <FireIcon /> },
                { t: 'Лифтовое оборудование, системы контроля доступа', icon: <CircuitBoard size={16} /> },
                { t: 'Отделка: предчистовая / варианты с ремонтом', icon: <Bath size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <ShieldCheck size={18} /> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#4B3B30' }}>
              {["Комфорт и энергоэффективность", "Ликвидность для аренды", "Удобные планировки", "Паркинги и сервис рядом"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border"
                  style={{ backgroundColor: '#FFF8F2', borderColor: '#EAD6C4' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
            style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировки и метражи</h2>
          <p className="mt-3" style={{ color: '#4B3B30' }}>
            Студии, 1-комнатные, 2-комнатные и семейные 3-комнатные форматы. Актуальные варианты и PDF-подборка — по запросу.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "Компактные метражи, эргономичные планировки", icon: <Home size={18} /> },
              { t: "1-комнатные", d: "Кухни-гостиные, лоджии, видовые этажи", icon: <Home size={18} /> },
              { t: "2–3-комнатные", d: "Семейные форматы, просторные гостиные", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#2B2118' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#4B3B30' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline"
                    style={{ color: '#C65D3A' }}>Запросить PDF-подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-14 md:py-20" style={{ backgroundColor: '#FFF3EA' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
            style={{ fontFamily: 'Prata, serif' }}><FileSignature size={22} /> Как проходит покупка</h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Заявка", d: "Присылаем подборку планировок и цен", icon: <Handshake size={18} /> },
            { t: "Выбор", d: "Онлайн/офлайн презентация, консультация, бронирование", icon: <KeyRound size={18} /> },
            { t: "Ипотека/оплата", d: "ДДУ на эскроу-счёт, помощь с банками", icon: <Banknote size={18} /> },
            { t: "Сделка", d: "Подписание, регистрация, ключи", icon: <FileSignature size={18} /> },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{ color: '#2B2118' }}>{i + 1}. {s.t}</div>
                <div className="text-sm mt-1" style={{ color: '#4B3B30' }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Видео-тур */}
        <div className="max-w-6xl mx-auto px-4 mt-10 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border"
            style={{ backgroundColor: '#FFF8F2', borderColor: '#EAD6C4' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <Banknote size={18} /> Ипотека и акции
            </div>
            <p className="text-sm mt-3" style={{ color: '#4B3B30' }}>
              Индивидуальные условия от банков-партнёров. Подскажем действующие акции и спецпредложения — уточняйте при запросе.
            </p>
          </div>
          <div className="p-6 rounded-2xl border shadow"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <Home size={18} /> Видео о локации
            </div>
            <div className="mt-3 aspect-video rounded-xl overflow-hidden border"
              style={{ borderColor: '#EAD6C4' }}>
              <iframe title="video" src="https://www.youtube.com/embed/hLcCQA-CH8U"
                className="w-full h-full" loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где расположен квартал?", a: "В Евпатории у озера Мойнаки. До пляжей — пешая доступность." },
              { q: "Какая конструкция домов?", a: "Современный комфорт-класс, энергоэффективные решения, панорамное остекление." },
              { q: "Какие варианты отделки?", a: "Предчистовая и варианты с ремонтом — уточняйте по корпусам и этапам." },
              { q: "Какой формат парковки?", a: "Гостевой и уровневые паркинги на территории." },
              { q: "Сроки ввода очередей?", a: "Проект поэтапный, ориентир первого этапа — 2026 год." },
              { q: "Как проходит покупка?", a: "Бронирование, ДДУ на эскроу-счёт, помощь с ипотекой от банков." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#EAD6C4' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#2B2118' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#4B3B30' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Где расположен квартал?", "acceptedAnswer": { "@type": "Answer", "text": "В Евпатории у озера Мойнаки. До пляжей — пешая доступность." } },
                { "@type": "Question", "name": "Какая конструкция домов?", "acceptedAnswer": { "@type": "Answer", "text": "Современный комфорт-класс, энергоэффективные решения, панорамное остекление." } },
                { "@type": "Question", "name": "Какие варианты отделки?", "acceptedAnswer": { "@type": "Answer", "text": "Предчистовая и варианты с ремонтом — уточняйте по корпусам и этапам." } },
                { "@type": "Question", "name": "Какой формат парковки?", "acceptedAnswer": { "@type": "Answer", "text": "Гостевой и уровневые паркинги на территории." } },
                { "@type": "Question", "name": "Сроки ввода очередей?", "acceptedAnswer": { "@type": "Answer", "text": "Проект поэтапный, ориентир первого этапа — 2026 год." } },
                { "@type": "Question", "name": "Как проходит покупка?", "acceptedAnswer": { "@type": "Answer", "text": "Бронирование, ДДУ на эскроу-счёт, помощь с ипотекой." } }
              ]
            })
          }}
        />
      </section>

      {/* BUY CTA + FORM */}
      <section id="buy" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#4B3B30' }}>
              Подберём планировки и условия под вашу задачу — проживание, аренда, инвестиция. Расскажем о корпусах, этажах, типах отделки и сроках.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
              className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md"
              style={{ borderColor: '#D4A373', color: '#2B2118' }}>Связаться в WhatsApp</a>
          </div>
          <div id="cta" className="p-6 rounded-2xl border shadow"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#2B2118' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#4B3B30' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#2B2118' }}>Получить подборку квартир</div>
                <p className="text-sm mt-1" style={{ color: '#4B3B30' }}>
                  Оставьте контакты — пришлём актуальные планировки, цены и акции по ЖК «Море».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending}
                    className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70"
                    style={{ backgroundColor: '#C65D3A', color: '#FFF8F2' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#7A6A5F' }}>
                  Политика конфиденциальности
                </a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#7A6A5F' }}>
                  Согласие на обработку ПДн
                </a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#EAD6C4' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#4B3B30' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <Home size={16} /> ЖК «Море»
            </div>
            <p className="mt-2">Крым, г.о. Евпатория, район озера Мойнаки</p>
            <p className="mt-1">Договор долевого участия (214-ФЗ), расчёты через эскроу-счета.</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ЖК «Море»",
            "url": typeof location !== "undefined" ? location.href : "https://example.com/",
            "sameAs": ["https://wa.me/79124530205"],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Евпатория",
              "addressRegion": "Республика Крым",
              "addressCountry": "RU"
            }
          })
        }}
      />

      {/* Scroll to top */}
      {showUp && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 rounded-full shadow-lg"
          style={{ backgroundColor: "#C65D3A", color: "#FFF8F2", padding: 12 }}
          aria-label="Наверх"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  School, HeartHandshake, Store, Bike, Baby, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote,
  ArrowUp, Image as ImageIcon, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================
   НАСТРОЙКИ/ДАННЫЕ ДЛЯ ЖК «Море»
   Всё, что нужно уточнить по сайту застройщика — лежит здесь.
   Когда дашь ссылку, подставлю точные факты.
========================= */
const MORE = {
  name: "ЖК «Море»",
  subtitle: "жилой квартал у моря",
  cityline: "Крым · у моря",
  locationText:
    "Крым, побережье Чёрного моря. Удобная транспортная доступность, рядом набережные и прогулочные аллеи.",
  distanceToSea: "≈ 1,2–1,6 км",
  floors: "6–10",
  ceiling: "до ~3,0 м",
  parking: "> 1 000",
  tech: [
    "Монолит-кирпич",
    "Панорамное остекление",
    "Современные инженерные системы",
    "Возможны форматы отделки: предчистовая / с ремонтом (по корпусам)"
  ],
  legal:
    "Договор участия в долевом строительстве с использованием эскроу-счетов (214-ФЗ).",
  phasing: [
    { q: "Очередь 1", s: "ориентир — 2026", c: "Запуск первых корпусов" },
    { q: "Очередь 2", s: "ориентир — 2027", c: "Продолжение строительства" },
    { q: "Очередь 3", s: "ориентир — 2028", c: "Инфраструктура и благоустройство" }
  ],
  plansInfo:
    "Планировки от компактных студий до семейных 2–3-комнатных вариантов. Функциональные кухни-гостиные, лоджии, продуманные площади.",
  benefitsOwner: [
    "Ликвидность для аренды/перепродажи",
    "Энергоэффективность и комфорт",
    "Дворы без машин, детские/спорт-площадки",
    "Коммерция в шаговой доступности"
  ],
  infra: {
    family: ["Детские сады", "Современные школы", "Дворы без машин"],
    active: ["Спортплощадки и воркаут-зоны", "Аллеи для прогулок", "Близость к пляжам"],
    service: ["Торговые галереи и кафе", "Аптеки и сервисы", "Гостевой и многоуровневый паркинг"]
  },
  plans: [
    { t: "Студии", d: "Компактные форматы для инвестиций и отдыха" },
    { t: "1-комнатные", d: "Кухни-гостиные, удобные метражи, лоджии" },
    { t: "2–3-комнатные", d: "Семейные планировки, увеличенные кухни" }
  ],
  gallery: [
    "/media/more/1.jpeg",
    "/media/more/2.jpeg",
    "/media/more/3.jpeg",
    "/media/more/4.jpeg"
  ],
  heroImage: "/media/more/hero.jpeg" // положи в /public/media/more/hero.jpeg
};

// Мета + title
function useSEO() {
  useEffect(() => {
    document.title = `${MORE.name} — ${MORE.subtitle}`;
    const safeSet = (selector, attr, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        if (selector.includes('name=')) el.setAttribute("name", selector.match(/name="([^"]+)/)[1]);
        if (selector.includes('property=')) el.setAttribute("property", selector.match(/property="([^"]+)/)[1]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };
    safeSet('meta[name="description"]', "content",
      `${MORE.name}: ${MORE.subtitle}. ${MORE.locationText} ${MORE.plansInfo}`);
    safeSet('meta[property="og:title"]', "content", `${MORE.name} — ${MORE.subtitle}`);
    safeSet('meta[property="og:description"]', "content", `${MORE.plansInfo}`);
    safeSet('meta[property="og:type"]', "content", "website");
    safeSet('meta[property="og:image"]', "content", "/og-image.jpg");
  }, []);
}

function Pill({ icon, children }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-2xl border text-sm bg-white/90 shadow-sm"
      style={{ borderColor: "#EAD6C4", color: "#2B2118" }}
    >
      {icon}{children}
    </div>
  );
}

function Stat({ icon, label, value, sub }) {
  return (
    <div className="p-5 rounded-2xl border bg-white shadow-sm" style={{ borderColor: "#EAD6C4" }}>
      <div className="text-sm flex items-center gap-2 mb-2" style={{ color: "#4B3B30" }}>
        {icon}{label}
      </div>
      <div className="text-xl font-semibold" style={{ color: "#2B2118" }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#7A6A5F" }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ icon, children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
        style={{ fontFamily: "Prata, serif", color: "#2B2118" }}>
      {icon}{children}
    </h2>
  );
}

function ScrollTopBtn() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 p-3 rounded-2xl shadow-lg border backdrop-blur"
      style={{ background: "#FFF8F2", borderColor: "#EAD6C4", color: "#2B2118", zIndex: 50 }}
    >
      <ArrowUp size={20} />
    </button>
  );
}

/* =========================
   APP
========================= */
export default function App() {
  useSEO();

  // волнистый фон
  const bg = useMemo(() => ({
    background:
      "radial-gradient(1200px 600px at 80% -10%, rgba(198,93,58,0.10), transparent 60%)," +
      "radial-gradient(900px 500px at 0% 10%, rgba(244,215,196,0.6), transparent 60%)," +
      "#FFF8F2"
  }), []);

  return (
    <div className="min-h-screen" style={{ ...bg, color: "#1F1B16", fontFamily: "Montserrat, sans-serif" }}>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b backdrop-blur"
              style={{ backgroundColor: "rgba(255,248,242,0.9)", borderColor: "#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold"
                 style={{ backgroundColor: "#2B2118", color: "#F6E6D9" }}>М</div>
            <div className="leading-tight">
              <div className="font-extrabold flex items-center gap-2" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} /> {MORE.name}
              </div>
              <div className="text-[11px]" style={{ color: "#7A6A5F" }}>
                <MapPin size={12} className="inline mr-1" /> {MORE.cityline}
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-[13px] mx-auto">
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

          <div className="ml-auto hidden sm:flex items-center gap-3">
            <a href="https://wa.me/79124530205"
               className="px-4 py-2 rounded-2xl border hover:shadow-md"
               style={{ borderColor: "#D4A373", color: "#2B2118" }}>
              Написать в WhatsApp
            </a>
            <a href="#cta" className="px-4 py-2 rounded-2xl hover:shadow-md"
               style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>
              Подбор квартиры
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* декоративная крупная волна */}
        <svg aria-hidden="true" className="absolute -top-10 left-0 w-full opacity-60" height="120" viewBox="0 0 1440 120">
          <path d="M0,80 C200,120 400,0 720,60 C1040,120 1240,40 1440,80 L1440,0 L0,0 Z" fill="#F6E6D9"></path>
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-24 grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-3 flex items-center gap-2 text-sm" style={{ color: "#C65D3A" }}>
              <Sparkles size={16} /> Квартал у моря
            </div>

            {/* заголовок держим в 3 строки максимум */}
            <h1 className="text-[36px] md:text-[54px] leading-[1.1] font-extrabold"
                style={{ fontFamily: "Prata, serif", color: "#2B2118", hyphens: "auto" }}>
              {MORE.name} — {MORE.subtitle}
            </h1>

            <p className="mt-5 text-base md:text-lg" style={{ color: "#4B3B30", maxWidth: 640 }}>
              {MORE.locationText} {MORE.plansInfo}
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Pill icon={<Waves size={16} />}>{MORE.distanceToSea} до пляжа</Pill>
              <Pill icon={<Building2 size={16} />}>{MORE.floors} этажей</Pill>
              <Pill icon={<Bath size={16} />}>Предчистовая / с ремонтом</Pill>
              <Pill icon={<ParkingSquare size={16} />}>Паркинг: {MORE.parking}</Pill>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md"
                 style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>
                Получить подборку
              </a>
              <a href="https://wa.me/79124530205"
                 className="px-5 py-3 rounded-2xl border hover:shadow-md"
                 style={{ borderColor: "#D4A373", color: "#2B2118" }}>
                Связаться в WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden shadow-lg border"
            style={{ height: 520, borderColor: "#EAD6C4", background: "#FFF" }}
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          >
            {MORE.heroImage ? (
              <img
                src={MORE.heroImage}
                alt="Визуализация ЖК Море"
                className="w-full h-full object-cover"
                loading="eager"
                fetchpriority="high"
              />
            ) : (
              <div className="w-full h-full grid place-items-center text-sm" style={{ color: "#7A6A5F" }}>
                <ImageIcon className="mb-2" /> Добавь /public/media/more/hero.jpeg
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* KPI */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          <Stat icon={<Waves size={18} />} label="До пляжа" value={MORE.distanceToSea} />
          <Stat icon={<Building2 size={18} />} label="Этажность, домов" value={MORE.floors} sub="Монолит-кирпич" />
          <Stat icon={<Ruler size={18} />} label="Высота потолков" value={MORE.ceiling} />
          <Stat icon={<ParkingSquare size={18} />} label="Паркомест" value={MORE.parking} sub="Гостевые и многоуровневые" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <SectionTitle icon={<Building2 size={22} />}>О проекте</SectionTitle>
            <p className="mt-4" style={{ color: "#4B3B30" }}>
              {MORE.name} — современная квартальная застройка у моря: безопасные дворы без машин, детские и спортивные
              площадки, озеленение и коммерция шаговой доступности. Продуманные планировки и виды на Чёрное море.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <ItemCard icon={<FileText size={18} />} h="Сроки" t="Очередности с поэтапным вводом; точные даты уточняются у отдела продаж." />
              <ItemCard icon={<CircuitBoard size={18} />} h="Технологии" t={MORE.tech.join("; ") + "."} />
              <ItemCard icon={<ShieldCheck size={18} />} h="Юридически" t={MORE.legal} />
              <ItemCard icon={<Hammer size={18} />} h="Масштаб" t="Сады и школы поблизости, торговые галереи в составе квартала." />
            </div>
          </div>

          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: "#F6E6D9", borderColor: "#EAD6C4" }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: "#2B2118" }}>
              <Building2 size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: "#4B3B30" }}>
              <li><Waves size={14} className="inline mr-2" /> {MORE.distanceToSea} до пляжа</li>
              <li><MapPin size={14} className="inline mr-2" /> Удобная локация у моря</li>
              <li><ParkingSquare size={14} className="inline mr-2" /> Паркинг: гостевой + многоуровневый</li>
              <li><Bath size={14} className="inline mr-2" /> Отделка: предчистовая / с ремонтом</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md"
               style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>
              Запросить подборку
            </a>
          </aside>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-14 md:py-20" style={{ backgroundColor: "#FFF3EA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle icon={<ImageIcon size={22} />}>Галерея</SectionTitle>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {MORE.gallery.map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow border group"
                   style={{ borderColor: "#EAD6C4", background: "#FFF" }}>
                <img
                  src={src}
                  alt={`Визуализация ЖК Море ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="w-full h-full grid place-items-center text-xs text-[#7A6A5F]">
                  {/* если картинка не найдена — держим высоту карточки */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitle icon={<MapPin size={22} />}>Локация и окружение</SectionTitle>
            <p className="mt-4" style={{ color: "#4B3B30" }}>{MORE.locationText}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                { t: "Школы и детские сады", icon: <School size={16} /> },
                { t: "Медицинские центры поблизости", icon: <HeartHandshake size={16} /> },
                { t: "Магазины и услуги", icon: <Store size={16} /> },
                { t: "Транспортная доступность", icon: <Bike size={16} /> }
              ].map((i, idx) => (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2"
                    style={{ borderColor: "#EAD6C4", backgroundColor: "#FFFFFF", color: "#2B2118" }}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: "#EAD6C4" }}>
            {/* Встрой любую публичную карту/видео, пока — заглушка */}
            <iframe
              title="map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructor"
              className="w-full h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* INFRA */}
      <section id="infra" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle icon={<Store size={22} />}>Инфраструктура квартала</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <InfraCard title="Для семей" items={MORE.infra.family} />
            <InfraCard title="Для активных" items={MORE.infra.active} />
            <InfraCard title="Сервис и комфорт" items={MORE.infra.service} />
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: "#FFF3EA" }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <SectionTitle icon={<CircuitBoard size={22} />}>Технологии и инженерия</SectionTitle>
            <ul className="mt-4 space-y-2" style={{ color: "#4B3B30" }}>
              <li className="flex gap-3 items-start"><Building2 size={16} /> Конструктив: монолит-кирпич</li>
              <li className="flex gap-3 items-start"><Home size={16} /> Панорамное остекление, улучшенная тепло-/шумоизоляция</li>
              <li className="flex gap-3 items-start"><CircuitBoard size={16} /> Современные лифты и инженерия</li>
              <li className="flex gap-3 items-start"><Bath size={16} /> Варианты отделки: предчистовая / с ремонтом</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: "#FFFFFF", borderColor: "#EAD6C4" }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: "#2B2118" }}>
              <ShieldCheck size={18} /> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: "#4B3B30" }}>
              {MORE.benefitsOwner.map((t, i) => (
                <div key={i} className="p-4 rounded-xl border"
                     style={{ backgroundColor: "#FFF8F2", borderColor: "#EAD6C4" }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle icon={<Ruler size={22} />}>Планировки и метражи</SectionTitle>
          <p className="mt-3" style={{ color: "#4B3B30" }}>{MORE.plansInfo}</p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {MORE.plans.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                   style={{ backgroundColor: "#FFFFFF", borderColor: "#EAD6C4" }}>
                <div className="w-9 h-9 rounded-xl grid place-items-center border"
                     style={{ borderColor: "#EAD6C4", backgroundColor: "#FFF8F2", color: "#2B2118" }}>
                  <Home size={18} />
                </div>
                <div>
                  <div className="font-semibold" style={{ color: "#2B2118" }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: "#4B3B30" }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: "#C65D3A" }}>
                    Запросить PDF-подборку планировок
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASING */}
      <section id="phasing" className="py-14 md:py-20" style={{ backgroundColor: "#FFF3EA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle icon={<Building2 size={22} />}>Очереди строительства</SectionTitle>
          <div className="mt-6 overflow-x-auto rounded-2xl border"
               style={{ backgroundColor: "#FFFFFF", borderColor: "#EAD6C4" }}>
            <table className="min-w-full text-sm">
              <thead style={{ backgroundColor: "#F6E6D9", color: "#2B2118" }}>
                <tr>
                  <th className="text-left px-4 py-3">Очередь</th>
                  <th className="text-left px-4 py-3">Ориентировочный срок</th>
                  <th className="text-left px-4 py-3">Комментарий</th>
                </tr>
              </thead>
              <tbody style={{ color: "#4B3B30" }}>
                {MORE.phasing.map((r, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "#EAD6C4" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: "#2B2118" }}>{r.q}</td>
                    <td className="px-4 py-3">{r.s}</td>
                    <td className="px-4 py-3">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROCESS + CTA */}
      <section id="process" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle icon={<FileSignature size={22} />}>Как проходит покупка</SectionTitle>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              { t: "Заявка", d: "Присылаем подборку планировок и цен", icon: <Handshake size={18} /> },
              { t: "Выбор", d: "Презентация, консультация, бронирование", icon: <KeyRound size={18} /> },
              { t: "Ипотека/оплата", d: "Договор долевого участия на эскроу-счёт", icon: <Banknote size={18} /> },
              { t: "Сделка", d: "Подписание, регистрация, ключи", icon: <FileSignature size={18} /> }
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                   style={{ backgroundColor: "#FFFFFF", borderColor: "#EAD6C4" }}>
                <div className="w-9 h-9 rounded-xl grid place-items-center border"
                     style={{ borderColor: "#EAD6C4", backgroundColor: "#FFF8F2", color: "#2B2118" }}>
                  {s.icon}
                </div>
                <div>
                  <div className="text-lg font-semibold" style={{ color: "#2B2118" }}>{i + 1}. {s.t}</div>
                  <div className="text-sm mt-1" style={{ color: "#4B3B30" }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div id="buy" className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: "#FFF8F2", borderColor: "#EAD6C4" }}>
              <div className="font-semibold flex items-center gap-2" style={{ color: "#2B2118" }}>
                <Banknote size={18} /> Ипотека и банки-партнёры
              </div>
              <p className="text-sm mt-3" style={{ color: "#4B3B30" }}>
                Работаем с крупными банками России. Подбор условий — индивидуально под вашу задачу.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-3 text-sm" style={{ color: "#4B3B30" }}>
                {["Сбер", "ВТБ", "Дом.РФ", "Альфа", "Газпромбанк", "РНКБ"].map((b, i) => (
                  <div key={i} className="h-14 rounded-xl border grid place-items-center"
                       style={{ backgroundColor: "#FFFFFF", borderColor: "#EAD6C4" }}>
                    {b}
                  </div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: "#7A6A5F" }}>
                Список банков расширяется. Не является публичной офертой.
              </p>
            </div>

            <CtaForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: "#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: "#4B3B30" }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: "#2B2118" }}>
              <Home size={16} /> {MORE.name}
            </div>
            <p className="mt-2">{MORE.locationText}</p>
            <p className="mt-1">Информация на сайте носит ознакомительный характер и не является публичной офертой.</p>
          </div>
          <div className="md:text-right">
            <a href="/privacy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      <ScrollTopBtn />
    </div>
  );
}

/* =========================
   ВСПОМОГАТЕЛЬНЫЕ
========================= */
function ItemCard({ icon, h, t }) {
  return (
    <div className="p-5 rounded-2xl border flex items-start gap-3"
         style={{ borderColor: "#EAD6C4", backgroundColor: "#FFFFFF" }}>
      <div className="w-9 h-9 rounded-xl grid place-items-center border"
           style={{ borderColor: "#EAD6C4", backgroundColor: "#FFF8F2", color: "#2B2118" }}>
        {icon}
      </div>
      <div>
        <div className="font-semibold" style={{ color: "#2B2118" }}>{h}</div>
        <div className="text-sm mt-1" style={{ color: "#4B3B30" }}>{t}</div>
      </div>
    </div>
  );
}

function InfraCard({ title, items }) {
  return (
    <div className="p-6 rounded-2xl border" style={{ backgroundColor: "#FFFFFF", borderColor: "#EAD6C4" }}>
      <div className="font-semibold" style={{ color: "#2B2118" }}>{title}</div>
      <ul className="mt-3 space-y-2 text-sm" style={{ color: "#4B3B30" }}>
        {items.map((txt, j) => (
          <li key={j} className="flex gap-3 items-start"><span className="mt-0.5">•</span> {txt}</li>
        ))}
      </ul>
    </div>
  );
}

function CtaForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="cta" className="p-6 rounded-2xl border shadow" style={{ backgroundColor: "#FFFFFF", borderColor: "#EAD6C4" }}>
      {sent ? (
        <div className="text-center">
          <div className="text-xl font-semibold" style={{ color: "#2B2118" }}>Спасибо! Заявка отправлена.</div>
          <p className="mt-2" style={{ color: "#4B3B30" }}>Мы свяжемся с вами в ближайшее время.</p>
        </div>
      ) : (
        <>
          <div className="text-xl font-semibold" style={{ color: "#2B2118" }}>Получить подборку квартир</div>
          <p className="text-sm mt-1" style={{ color: "#4B3B30" }}>
            Оставьте контакты — пришлём актуальные планировки, цены и акции по {MORE.name}.
          </p>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            {/* ключ Web3Forms замени на свой */}
            <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
            <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: "#EAD6C4" }}
                   name="name" placeholder="Ваше имя" required />
            <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: "#EAD6C4" }}
                   name="phone" placeholder="Телефон" required />
            <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: "#EAD6C4" }}
                   name="email" placeholder="Email (по желанию)" />
            <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: "#EAD6C4" }}
                      name="message" placeholder="Комментарий" rows={3} />
            <button type="submit" disabled={sending}
                    className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70"
                    style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>
              {sending ? "Отправляем..." : "Отправить"}
            </button>
          </form>
          <a href="https://wa.me/79124530205"
             className="mt-3 block text-center px-4 py-3 rounded-xl border hover:shadow-md"
             style={{ borderColor: "#D4A373", color: "#2B2118" }}>
            Или написать в WhatsApp
          </a>
          <p className="mt-3 text-xs" style={{ color: "#7A6A5F" }}>
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
          </p>
        </>
      )}
    </div>
  );
}

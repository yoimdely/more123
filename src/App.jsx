import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  School, HeartHandshake, Store, Bike, Baby, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

/* ================== SEO + ШРИФТЫ ================ */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "ЖК «Море» — жилой квартал у моря в Крыму";

  const meta = [
    { name: "description", content: "ЖК «Море» в Крыму: квартальная застройка у моря, монолит-кирпич, благоустроенные дворы, детские и спортплощадки, варианты отделки. Планировки, цены, очереди." },
    { property: "og:title", content: "ЖК «Море» — жилой квартал у моря в Крыму" },
    { property: "og:description", content: "Комфорт-класс у Чёрного моря: планировки, цены, сроки очередей, инфраструктура и ипотека." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach(m => {
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

  // preload hero image (LCP)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop";
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

/* ================== UI helpers ================== */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full shadow-sm"
         style={{ borderColor: "#EAD6C4", backgroundColor: "#FFFFFF", color: "#2B2118" }}>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#4B3B30" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div
      className="w-9 h-9 rounded-xl grid place-items-center border shadow-sm"
      style={{ borderColor: "#EAD6C4", backgroundColor: "#FFF8F2", color: "#2B2118" }}
    >
      {children}
    </div>
  );
}

function FireIcon(props){
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z"/>
    </svg>
  );
}

/* ================== SCROLL TO TOP ================== */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Вверх"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 bottom-4 z-40 rounded-2xl px-3 py-3 border shadow-lg transition-all ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
      style={{ backgroundColor: "#2B2118", color: "#FFF8F2", borderColor: "#00000020" }}
    >
      <ArrowUpRight size={18}/>
    </button>
  );
}

/* ================== APP ================== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    // убрать горизонтальный скролл
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
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
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите нам в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen"
         style={{ backgroundColor: "#FFF8F2", color: "#1F1B16", fontFamily: "Montserrat, sans-serif", overflowX: "hidden" }}>
      {/* Фоновая декорация (градиентные пятна) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(40% 40% at 50% 50%, #F6E6D9 0%, transparent 70%)" }}/>
        <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(40% 40% at 50% 50%, #FFE1CC 0%, transparent 70%)" }}/>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-30 border-b backdrop-blur"
              style={{ backgroundColor: "rgba(255,248,242,0.9)", borderColor: "#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow-sm"
                 style={{ backgroundColor: "#2B2118", color: "#F6E6D9" }}>М</div>
            <div className="leading-tight">
              <div className="font-extrabold flex items-center gap-2"
                   style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} /> ЖК «Море»
              </div>
              <div className="text-[11px]" style={{ color: "#7A6A5F" }}>
                <MapPin size={12} className="inline mr-1" /> Крым · у моря
              </div>
            </div>
          </a>

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

          <div className="ml-auto hidden sm:flex items-center gap-3">
            {/* WhatsApp вместо TG */}
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 rounded-2xl border hover:shadow-md"
               style={{ borderColor: "#D4A373", color: "#2B2118" }}>Написать в WhatsApp</a>
            <a href="#cta" className="px-4 py-2 rounded-2xl hover:shadow-md"
               style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>Подбор квартиры</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto" aria-label="Меню">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            {[
              ["О проекте", "#about"],
              ["Локация", "#location"],
              ["Планировки", "#plans"],
              ["Галерея", "#gallery"],
              ["Контакты", "#buy"]
            ].map(([t, href]) => (
              <a key={href} href={href} onClick={()=>setMenuOpen(false)}
                 className="block px-4 py-2 text-gray-700 hover:bg-orange-50">{t}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Волны-слои */}
        <svg aria-hidden className="absolute -bottom-1 left-0 w-[140%] -translate-x-10 opacity-70" viewBox="0 0 1440 240" preserveAspectRatio="none">
          <path d="M0,160L60,176C120,192,240,224,360,208C480,192,600,128,720,112C840,96,960,128,1080,138.7C1200,149,1320,139,1380,133.3L1440,128L1440,240L1380,240C1320,240,1200,240,1080,240C960,240,840,240,720,240C600,240,480,240,360,240C240,240,120,240,60,240L0,240Z" fill="#FFF3EA"></path>
        </svg>
        <svg aria-hidden className="absolute -bottom-2 left-0 w-[140%] -translate-x-8 opacity-90" viewBox="0 0 1440 240" preserveAspectRatio="none">
          <path d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,181.3C672,181,768,139,864,117.3C960,96,1056,96,1152,122.7C1248,149,1344,203,1392,229.3L1440,256L1440,240L1392,240C1344,240,1248,240,1152,240C1056,240,960,240,864,240C768,240,672,240,576,240C480,240,384,240,288,240C192,240,96,240,48,240L0,240Z" fill="#FFF8F2"></path>
        </svg>

        <div className="absolute inset-0" style={{background:"linear-gradient(180deg, #F6E6D9 0%, #FFF8F2 60%)"}} />
        <div className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-20 pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h1 className="text-[34px] md:text-[48px] xl:text-[56px] leading-[1.1] font-extrabold"
                style={{fontFamily:'Prata, serif', color:'#2B2118', maxWidth: 720}}>
              Жилой квартал у Чёрного моря — <span className="whitespace-nowrap">ЖК «Море»</span> в Крыму
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{color:'#4B3B30', maxWidth:660}}>
              Современная квартальная застройка у моря: монолит-кирпич, благоустроенные дворы без машин, детские и спортивные площадки,
              коммерция шаговой доступности и панорамные виды. Варианты отделки: предчистовая или с готовым ремонтом.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Близость к пляжу", <Waves size={18} key="w"/>],
                ["6–12 этажей", <Building2 size={18} key="b"/>],
                ["Предчистовая / с ремонтом", <Bath size={18} key="ba"/>],
                ["Паркинг: многоуровневый и гостевой", <ParkingSquare size={18} key="p"/>],
              ].map(([t,icon], i)=> (
                <li key={i}
                    className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white"
                    style={{borderColor:'#EAD6C4', color:'#2B2118'}}>
                  {icon} {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md"
                 style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
                 className="px-5 py-3 rounded-2xl border hover:shadow-md"
                 style={{borderColor:'#D4A373', color:'#2B2118'}}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden shadow-xl border relative"
            style={{height:520, borderColor:'#EAD6C4'}}
            initial={{opacity:0, scale:0.98}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.6}}
          >
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop"
              alt="Панорамный вид на море и современную архитектуру"
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
              width={1600}
              height={1040}
            />
            {/* легкая анимация блика */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.12) 40%, transparent 70%)", transform: "translateX(-20%) skewX(-12deg)" }}/>
          </motion.div>
        </div>
      </section>

      {/* KPI */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full">
            <Stat value="до 15 мин" label="Пешком до пляжа" icon={<Waves size={18} />} />
          </div>
          <div className="h-full">
            <Stat value="6–12" label="Этажность домов" sub="Монолит-кирпич" icon={<Building2 size={18} />} />
          </div>
          <div className="h-full">
            <Stat value="~3 м" label="Высота потолков" icon={<Ruler size={18} />} />
          </div>
          <div className="h-full">
            <Stat value="Гостевой/многоуровн." label="Паркинг" sub="По корпусам" icon={<ParkingSquare size={18} />} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{fontFamily:'Prata, serif'}}>О проекте</h2>
            <p className="mt-4" style={{color:'#4B3B30'}}>
              ЖК «Море» — это продуманная среда для жизни у моря: дворы без машин, прогулочные бульвары, детские и спортивные площадки,
              озеленение и коммерция на первых этажах. Планировки с акцентом на просторные кухни-гостиные и панорамное остекление.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {h:'Сроки', t:'Сдача очередей поэтапно; уточняйте доступные корпуса и графики ввода в отделе продаж.', icon:<FileText size={18}/>},
                {h:'Технологии', t:'Монолит-кирпич, энергоэффективные решения, панорамные окна, индивидуальные инженерные узлы.', icon:<CircuitBoard size={18}/>},
                {h:'Юридически', t:'Договор долевого участия (ДДУ) с расчетами через эскроу-счета — по проектам, где применимо.', icon:<ShieldCheck size={18}/>},
                {h:'Масштаб', t:'Во дворах — детские и спортзоны; у корпусов — сервисы повседневной инфраструктуры.', icon:<Hammer size={18}/>},
              ].map((c,i)=> (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                     style={{borderColor:'#EAD6C4', backgroundColor:'#FFFFFF'}}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{color:'#2B2118'}}>{c.h}</div>
                    <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border shadow-sm"
                 style={{backgroundColor:'#F6E6D9', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <Building2 size={18}/> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{color:'#4B3B30'}}>
              <li><Waves size={14} className="inline mr-2"/> Пешая близость к пляжу</li>
              <li><MapPin size={14} className="inline mr-2"/> Видовые квартиры</li>
              <li><ParkingSquare size={14} className="inline mr-2"/> Гостевой и многоуровневый паркинг</li>
              <li><Bath size={14} className="inline mr-2"/> Предчистовая / с ремонтом</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md"
               style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* GALLERY (расширенная) */}
      <section id="gallery" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><Building2 size={22}/> Галерея</h2>
          <p className="mt-2 text-sm" style={{color:'#4B3B30'}}>Фотографии и визуализации для представления концепции. Реальные фото можно заменить в /media.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1469796466635-455ede028aka?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505692794403-34d4982a86e8?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow border group"
                   style={{borderColor:'#EAD6C4'}}>
                <img src={src} alt="Визуализации фасадов/интерьеров"
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
                style={{fontFamily:'Prata, serif'}}><MapPin size={22}/> Локация и окружение</h2>
            <p className="mt-4" style={{color:'#4B3B30'}}>
              Крым, курортная локация на побережье Чёрного моря. Рядом — прогулочные зоны, пляжи, сервисы повседневной инфраструктуры,
              транспортная доступность по основным магистралям полуострова.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[{t:"Школы и детские сады", icon:<School size={16}/>}, {t:"Медицинские сервисы", icon:<HeartHandshake size={16}/>}, {t:"Магазины и услуги", icon:<Store size={16}/>}, {t:"Транспорт и дороги", icon:<Bike size={16}/> }].map((i,idx)=> (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2"
                    style={{borderColor:'#EAD6C4', backgroundColor:'#FFFFFF', color:'#2B2118'}}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{borderColor:'#EAD6C4'}}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?um=constructor%3A&scroll=true&z=12"
                    className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* INFRA */}
      <section id="infra" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><Store size={22}/> Инфраструктура квартала</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {t:"Для семей", points:[[Baby,"Детские площадки"],[School,"Школы и секции"],[Trees,"Зелёные дворы"]]},
              {t:"Для активных", points:[[Dumbbell,"Спортплощадки"],[Bike,"Веломаршруты и набережная"],[Waves,"Пляжи рядом"]]},
              {t:"Сервис и комфорт", points:[[Store,"Коммерция на первых этажах"],[HeartHandshake,"Аптеки и сервисы"],[ParkingSquare,"Гостевой и многоуровневый паркинг"]]}
            ].map((b, i)=> (
              <div key={i} className="p-6 rounded-2xl border"
                   style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <div className="font-semibold" style={{color:'#2B2118'}}>{b.t}</div>
                <ul className="mt-3 space-y-2 text-sm" style={{color:'#4B3B30'}}>
                  {b.points.map(([Ic,txt], j)=>(
                    <li key={j} className="flex gap-3 items-start"><Ic size={16}/> {txt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
                style={{fontFamily:'Prata, serif'}}><CircuitBoard size={22}/> Технологии и инженерия</h2>
            <ul className="mt-4 space-y-2" style={{color:'#4B3B30'}}>
              {[
                {t:'Конструктив: монолит-кирпич', icon:<Building2 size={16}/>},
                {t:'Панорамное остекление и улучшенная изоляция', icon:<Home size={16}/>},
                {t:'Индивидуальные инженерные решения', icon:<FireIcon/>},
                {t:'Современные лифты и «умные» системы', icon:<CircuitBoard size={16}/>},
                {t:'Отделка: предчистовая / с ремонтом', icon:<Bath size={16}/>},
              ].map((i,idx)=> (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow"
               style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <ShieldCheck size={18}/> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{color:'#4B3B30'}}>
              {["Энергоэффективность и комфорт","Ликвидность для аренды/перепродажи","Удобные планировки","Паркинг и коммерция у дома"].map((t,i)=> (
                <div key={i} className="p-4 rounded-xl border"
                     style={{backgroundColor:'#FFF8F2', borderColor:'#EAD6C4'}}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><Ruler size={22}/> Планировки и метражи</h2>
          <p className="mt-3" style={{color:'#4B3B30'}}>
            Студии от ~28 м², 1-комнатные ~35–45 м², 2-комнатные ~50–65 м², 3-комнатные ~70–85 м².
            Варианты: предчистовая и с ремонтом (зависит от корпуса/очереди).
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "~28–30 м² — компактны и ликвидны для аренды", icon:<Home size={18}/> },
              { t: "1-комнатные", d: "~35–45 м² — кухни-гостиные, лоджии", icon:<Home size={18}/> },
              { t: "2–3-комнатные", d: "~50–85 м² — семейные форматы", icon:<Home size={18}/> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                   style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{color:'#2B2118'}}>{c.t}</div>
                  <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline"
                     style={{color:'#C65D3A'}}>Запросить PDF-подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASING */}
      <section id="phasing" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><Building2 size={22}/> Очереди строительства</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border"
               style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            <table className="min-w-full text-sm">
              <thead style={{backgroundColor:'#F6E6D9', color:'#2B2118'}}>
                <tr>
                  <th className="text-left px-4 py-3">Очередь</th>
                  <th className="text-left px-4 py-3">Плановый срок</th>
                  <th className="text-left px-4 py-3">Комментарий</th>
                </tr>
              </thead>
              <tbody style={{color:'#4B3B30'}}>
                {[
                  {q:"1 очередь", s:"уточняется", c:"Старт реализации и ввод первых корпусов"},
                  {q:"2 очередь", s:"уточняется", c:"Продолжение строительства"},
                  {q:"3 очередь", s:"уточняется", c:"Развитие инфраструктуры"},
                  {q:"Итог", s:"поэтапно", c:"Финал проекта"},
                ].map((r,i)=> (
                  <tr key={i} className="border-t" style={{borderColor:'#EAD6C4'}}>
                    <td className="px-4 py-3 font-medium" style={{color:'#2B2118'}}>{r.q}</td>
                    <td className="px-4 py-3">{r.s}</td>
                    <td className="px-4 py-3">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><FileSignature size={22}/> Как проходит покупка</h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 grid md:grid-cols-4 gap-4">
          {[
            {t:"Заявка", d:"Присылаем подборку планировок и цен", icon:<Handshake size={18}/>},
            {t:"Выбор", d:"Презентация, консультация, бронирование", icon:<KeyRound size={18}/>},
            {t:"Ипотека/оплата", d:"ДДУ и расчёты через эскроу (при применимости)", icon:<Banknote size={18}/>},
            {t:"Сделка", d:"Подписание, регистрация, ключи", icon:<FileSignature size={18}/>},
          ].map((s,i)=> (
            <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                 style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
              <IconWrap>{s.icon}</IconWrap>
              <div>
                <div className="text-lg font-semibold" style={{color:'#2B2118'}}>{i+1}. {s.t}</div>
                <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-10 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border"
               style={{backgroundColor:'#FFF8F2', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <Banknote size={18}/> Банки-партнёры (пример)
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3 text-sm" style={{color:'#4B3B30'}}>
              {["Сбер","ВТБ","Дом.РФ","Альфа","Газпромбанк","РНКБ"].map((b,i)=>(
                <div key={i} className="h-14 rounded-xl border grid place-items-center"
                     style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>{b}</div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{color:'#7A6A5F'}}>Фактический список партнёров уточняйте у менеджера.</p>
          </div>
          <div className="p-6 rounded-2xl border shadow"
               style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <Home size={18}/> Видео о локации
            </div>
            <div className="mt-3 aspect-video rounded-xl overflow-hidden border"
                 style={{borderColor:'#EAD6C4'}}>
              <iframe title="video" src="https://www.youtube.com/embed/hLcCQA-CH8U"
                      className="w-full h-full" loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen />
            </div>
          </div>
        </div>
      </section>

      {/* BUY CTA + FORM */}
      <section id="buy" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
                style={{fontFamily:'Prata, serif'}}><Handshake size={22}/> Получить индивидуальную подборку</h2>
            <p style={{color:'#4B3B30'}}>
              Подберём планировки и условия под вашу задачу — проживание, аренда, инвестиция. Расскажем о корпусах и сроках.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
               className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md"
               style={{borderColor:'#D4A373', color:'#2B2118'}}>Написать в WhatsApp</a>
            <div className="text-xs" style={{color:'#7A6A5F'}}>
              Нажимая кнопку «Отправить», вы подтверждаете согласие с{" "}
              <a href="/privacy.html" className="underline">Политикой конфиденциальности</a> и{" "}
              <a href="/consent.html" className="underline">Согласием на обработку ПДн</a>.
            </div>
          </div>
          <div id="cta" className="p-6 rounded-2xl border shadow"
               style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{color:'#2B2118'}}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{color:'#4B3B30'}}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{color:'#2B2118'}}>Получить подборку квартир</div>
                <p className="text-sm mt-1" style={{color:'#4B3B30'}}>
                  Оставьте контакты — пришлём актуальные планировки, цены и акции по ЖК «Море».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                         name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                         name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                         name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                            name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending}
                          className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70"
                          style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer"
                   className="mt-3 block text-center px-4 py-3 rounded-xl border hover:shadow-md"
                   style={{borderColor:'#D4A373', color:'#2B2118'}}>Или написать в WhatsApp</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{borderColor:'#EAD6C4'}}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{color:'#4B3B30'}}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <Home size={16}/> ЖК «Море»
            </div>
            <p className="mt-2">Республика Крым, побережье Чёрного моря (уточняйте точный адрес у менеджера)</p>
            <p className="mt-1">Договор долевого участия с расчётами через эскроу-счета — по проектам, где применимо.</p>
          </div>
          <div className="md:text-right">
            <a href="/privacy.html" className="underline">Политика конфиденциальности</a>
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
              "addressRegion": "Республика Крым",
              "addressCountry": "RU"
            }
          })
        }}
      />

      <ScrollTop />
    </div>
  );
}

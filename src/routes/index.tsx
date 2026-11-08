import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Menu, X, LayoutDashboard, MapPin, Phone, MessageCircle, Navigation, Sparkles,
  Clock, Check, CalendarDays, Instagram,
} from "lucide-react";
import hero from "@/assets/hero-nails.jpg";
import nailArt from "@/assets/nail-art.jpg";
import gelNails from "@/assets/gel-nails.jpg";
import maniLash from "@/assets/manicure-lash.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lorevia Nail — Protez Tırnak & Nail Art | Çankaya Ankara" },
      { name: "description", content: "Ankara Çankaya'da sanatsal protez tırnak, nail art, jel tırnak ve manikür. Online randevu alın." },
      { property: "og:title", content: "Lorevia Nail — Protez Tırnak & Nail Art Ankara" },
      { property: "og:description", content: "Çankaya'da lüks protez tırnak ve nail art stüdyosu. Erken randevu önerilir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PHONE = "0551 856 88 40";
const WA = "https://wa.me/905518568840";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Me%C5%9Frutiyet+Caddesi+Karanfil+Sokak+24%2F5+%C3%87ankaya+Ankara";

type Service = { id: string; name: string; desc: string; price: number; img: string };
type Status = "Bekliyor" | "Onaylandı";
type Appt = { id: number; name: string; phone: string; service: string; date: string; time: string; status: Status };

const initialServices: Service[] = [
  { id: "art", name: "Protez Tırnak Tasarımı", desc: "Nail art, 3D krom, taş ve el çizimi detaylarla kişiye özel tasarım.", price: 1800, img: nailArt },
  { id: "gel", name: "Jel Tırnak & Kalıcı Oje", desc: "Uzun ömürlü parlaklık, French ve nude tonlarda kusursuz bitiş.", price: 1100, img: gelNails },
  { id: "care", name: "Tırnak Bakımı & Manikür", desc: "Kütikül bakımı, şekillendirme ve besleyici yağ ritüeli.", price: 650, img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85" },
  { id: "lash", name: "Manikür/Pedikür & İpek Kirpik", desc: "El-ayak bakımı ile tek tek uygulanan doğal ipek kirpik.", price: 1400, img: maniLash },
];

const initialAppts: Appt[] = [
  { id: 1, name: "Elif Yıldız", phone: "0532 111 22 33", service: "Protez Tırnak Tasarımı", date: "2026-11-10", time: "14:00", status: "Onaylandı" },
  { id: 2, name: "Zeynep Kaya", phone: "0544 222 33 44", service: "Jel Tırnak & Kalıcı Oje", date: "2026-11-11", time: "11:30", status: "Bekliyor" },
  { id: 3, name: "Melis Arslan", phone: "0555 333 44 55", service: "Manikür/Pedikür & İpek Kirpik", date: "2026-11-12", time: "16:00", status: "Bekliyor" },
];

const tl = (n: number) => `₺${n.toLocaleString("tr-TR")}`;
const nav = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#galeri", label: "Galeri" },
  { href: "#randevu", label: "Randevu" },
  { href: "#iletisim", label: "İletişim" },
];

const btnGold = "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground shadow-gold transition hover:brightness-110 active:scale-[.98]";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 px-6 py-3 text-sm font-medium tracking-wide text-primary transition hover:bg-primary/10";
const field = "w-full min-w-0 rounded-md border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-ring";

function Index() {
  const [services, setServices] = useState(initialServices);
  const [appts, setAppts] = useState(initialAppts);
  const [menu, setMenu] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu || admin ? "hidden" : "";
  }, [menu, admin]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-40 transition ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:h-20 sm:gap-3 sm:px-6">
          <a href="#" className="flex min-w-0 items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/60 font-display text-sm text-gold sm:h-9 sm:w-9">LN</span>
            <span className="truncate font-display text-base tracking-[0.12em] text-gold sm:text-2xl sm:tracking-[0.2em]">LOREVIA</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm tracking-wide text-muted-foreground transition hover:text-primary">{n.label}</a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={() => setAdmin(true)} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/70 bg-primary/15 px-2 py-2 text-[10px] font-semibold text-gold shadow-gold transition hover:bg-primary/25 sm:gap-2 sm:px-4 sm:text-sm">
              <LayoutDashboard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Yönetim Paneli</span>
            </button>
            <button aria-label="Menü" aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(true)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menu && (
        <div id="mobile-navigation" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background/97 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden animate-rise">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-[0.2em] text-gold">LOREVIA</span>
            <button aria-label="Kapat" onClick={() => setMenu(false)} className="grid h-10 w-10 place-items-center rounded-full border border-border"><X className="h-5 w-5" /></button>
          </div>
          <nav className="mt-10 flex flex-col gap-5">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="font-display text-3xl text-foreground sm:text-4xl">{n.label}</a>
            ))}
          </nav>
          <button onClick={() => { setMenu(false); setAdmin(true); }} className={`${btnGold} mt-auto min-h-12 w-full`}>
            <LayoutDashboard className="h-4 w-4" /> Yönetim Paneli
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-0">
        <img src={hero} alt="Leopar desenli altın detaylı protez tırnaklar" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-fade" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-background/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Erken Randevu Önerilir
            </span>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
              Ankara Çankaya'da <em className="text-gold">Sanatsal</em> Protez Tırnak & Nail Art Deneyimi
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              Kişiye özel tasarımlar, kusursuz işçilik ve lüks bir atmosfer. By Kübra Merzi.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#randevu" className={btnGold}><CalendarDays className="h-4 w-4" /> Online Randevu Al</a>
              <a href="#hizmetler" className={btnGhost}>Hizmetleri İncele</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="hizmetler" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <SectionTitle kicker="Hizmetlerimiz" title="Fiyat Listesi" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.id} className="group overflow-hidden rounded-lg border border-border bg-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-gold">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" width={768} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl leading-tight text-foreground">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">başlayan</span>
                  <span className="font-display text-2xl text-gold">{tl(s.price)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="galeri" className="scroll-mt-20 border-y border-border bg-card/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle kicker="Galeri" title="İmza Tasarımlarımız" />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {[hero, nailArt, gelNails, maniLash].map((src, i) => (
              <div key={i} className={`overflow-hidden rounded-lg ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={src} alt="Lorevia Nail tasarımı" loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="https://instagram.com/lorevianail" target="_blank" rel="noreferrer" className={btnGhost}><Instagram className="h-4 w-4" /> @lorevianail</a>
          </div>
        </div>
      </section>

      <Booking services={services} onCreate={(a) => setAppts((p) => [{ ...a, id: Date.now(), status: "Bekliyor" }, ...p])} />

      {/* Contact */}
      <section id="iletisim" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
        <SectionTitle kicker="İletişim" title="Stüdyomuza Bekleriz" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <InfoRow icon={<MapPin className="h-5 w-5" />} label="Adres" value="Meşrutiyet Caddesi Karanfil Sokak 24/5, Çankaya / Ankara" />
            <InfoRow icon={<Phone className="h-5 w-5" />} label="Telefon" value={PHONE} href="tel:+905518568840" />
            <InfoRow icon={<Clock className="h-5 w-5" />} label="Randevu" value="Erken randevu önerilir" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={WA} target="_blank" rel="noreferrer" className={btnGold}><MessageCircle className="h-4 w-4" /> WhatsApp'tan Yaz</a>
              <a href={MAPS} target="_blank" rel="noreferrer" className={btnGhost}><Navigation className="h-4 w-4" /> Yol Tarifi</a>
            </div>
          </div>
          <div className="min-h-[300px] overflow-hidden rounded-lg border border-border">
            <iframe title="Lorevia Nail konum" className="h-full min-h-[300px] w-full grayscale invert-[.9]" loading="lazy" src="https://www.google.com/maps?q=Me%C5%9Frutiyet+Caddesi+Karanfil+Sokak+24+%C3%87ankaya+Ankara&output=embed" />
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs tracking-widest text-muted-foreground">
        © 2026 LOREVIA NAIL · BY KÜBRA MERZİ · ÇANKAYA / ANKARA
      </footer>

      {admin && <AdminPanel appts={appts} setAppts={setAppts} services={services} setServices={setServices} onClose={() => setAdmin(false)} />}
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 h-px w-20 bg-gold" />
    </div>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex gap-4 border-b border-border py-4 last:border-0">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/40 text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        {href ? <a href={href} className="break-words text-foreground hover:text-primary">{value}</a> : <p className="break-words text-foreground">{value}</p>}
      </div>
    </div>
  );
}

function Booking({ services, onCreate }: { services: Service[]; onCreate: (a: Omit<Appt, "id" | "status">) => void }) {
  const empty = { name: "", phone: "", service: services[0]?.name ?? "", date: "", time: "" };
  const [f, setF] = useState(empty);
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || f.phone.replace(/\D/g, "").length < 10 || !f.date || !f.time) {
      toast.error("Lütfen tüm alanları doğru doldurun.");
      return;
    }
    onCreate(f);
    toast.success("Randevu talebiniz alındı!", { description: `${f.date} · ${f.time} — Size en kısa sürede dönüş yapacağız.` });
    setF(empty);
  };

  return (
    <section id="randevu" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionTitle kicker="Online Randevu" title="DM Karmaşasına Son" />
        <p className="mx-auto mt-5 max-w-md text-center text-muted-foreground">Formu doldurun, talebiniz doğrudan stüdyoya ulaşsın.</p>
        <form onSubmit={submit} className="mt-10 grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-2 sm:p-8">
          <label className="grid gap-2 text-sm text-muted-foreground">Ad Soyad
            <input className={field} maxLength={80} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Adınız Soyadınız" />
          </label>
          <label className="grid gap-2 text-sm text-muted-foreground">Telefon
            <input className={field} type="tel" maxLength={20} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="05xx xxx xx xx" />
          </label>
          <label className="grid gap-2 text-sm text-muted-foreground sm:col-span-2">İstenen Hizmet
            <select className={field} value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })}>
              {services.map((s) => <option key={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-muted-foreground">Tarih
            <input className={field} type="date" min={today} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
          </label>
          <label className="grid gap-2 text-sm text-muted-foreground">Saat
            <select className={field} value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}>
              <option value="">Saat seçin</option>
              {["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <button type="submit" className={`${btnGold} mt-2 sm:col-span-2`}><CalendarDays className="h-4 w-4" /> Randevu Talebi Oluştur</button>
        </form>
      </div>
    </section>
  );
}

function AdminPanel({ appts, setAppts, services, setServices, onClose }: {
  appts: Appt[]; setAppts: React.Dispatch<React.SetStateAction<Appt[]>>;
  services: Service[]; setServices: React.Dispatch<React.SetStateAction<Service[]>>; onClose: () => void;
}) {
  const [tab, setTab] = useState<"appts" | "prices">("appts");
  const pending = appts.filter((a) => a.status === "Bekliyor").length;
  const toggle = (id: number) => setAppts((p) => p.map((a) => a.id === id ? { ...a, status: a.status === "Bekliyor" ? "Onaylandı" : "Bekliyor" } : a));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-border bg-popover shadow-gold animate-rise sm:rounded-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-border p-4 sm:p-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Lorevia Nail</p>
            <h2 className="truncate font-display text-2xl text-foreground sm:text-3xl">Yönetim Paneli</h2>
          </div>
          <button aria-label="Kapat" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border hover:border-primary"><X className="h-5 w-5" /></button>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 sm:p-6">
          <Stat label="Toplam" value={appts.length} />
          <Stat label="Bekleyen" value={pending} />
          <Stat label="Onaylı" value={appts.length - pending} />
        </div>

        <div className="flex gap-2 px-4 sm:px-6">
          {([["appts", "Randevu Talepleri"], ["prices", "Fiyat Listesi"]] as const).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm transition ${tab === k ? "bg-gold text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>{l}</button>
          ))}
        </div>

        <div className="mt-4 flex-1 overflow-y-auto px-4 pb-6 sm:px-6">
          {tab === "appts" ? (
            <ul className="grid gap-3">
              {appts.map((a) => (
                <li key={a.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{a.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{a.service}</p>
                    <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                      <span>{a.phone}</span><span>{a.date}</span><span>{a.time}</span>
                    </p>
                  </div>
                  <button onClick={() => toggle(a.id)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${a.status === "Onaylandı" ? "bg-success/15 text-success" : "border border-primary/50 text-primary hover:bg-primary/10"}`}>
                    {a.status === "Onaylandı" ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}{a.status}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-3">
              {services.map((s) => (
                <li key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border bg-card p-4">
                  <p className="min-w-0 truncate text-foreground">{s.name}</p>
                  <div className="flex items-center gap-1 text-primary">₺
                    <input type="number" min={0} value={s.price} onChange={(e) => setServices((p) => p.map((x) => x.id === s.id ? { ...x, price: Math.max(0, Number(e.target.value)) } : x))} className="w-24 rounded-md border border-input bg-background px-2 py-1.5 text-right text-foreground focus:border-primary focus:outline-none" />
                  </div>
                </li>
              ))}
              <p className="text-xs text-muted-foreground">Fiyatlar sitede anında güncellenir (demo).</p>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-center sm:p-4">
      <p className="font-display text-3xl text-gold">{value}</p>
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

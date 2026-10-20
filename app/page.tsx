"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, PlusCircle, Heart, MapPin, Grid, List, Phone, X, 
  ShoppingBag, CheckCircle2, Mail, User, Clock, Upload, Image as ImageIcon,
  LogIn, UserPlus, Sparkles, Compass, Menu, Tag, Car, Home, ShieldCheck, Video, CreditCard, Crown, Package, Trash2, Shield
} from "lucide-react";

const ZUPANIJE = [
  "Bjelovarsko-bilogorska", "Brodsko-posavska", "Dubrovačko-neretvanska", "Grad Zagreb",
  "Istarska", "Karlovačka", "Koprivničko-križevačka", "Krapinsko-zagorska", "Ličko-senjska",
  "Međimurska", "Osječko-baranjska", "Požeško-slavonska", "Primorsko-goranska", "Sisačko-moslavačka",
  "Splitsko-dalmatinska", "Šibensko-kninska", "Varaždinska", "Virovitičko-podravska",
  "Vukovarsko-srijemska", "Zadarska", "Zagrebačka"
];

const SVE_KATEGORIJE = [
  {
    id: "auto-moto",
    naziv: "Auto Moto",
    ikona: "🚗",
    podkategorije: ["Osobna vozila", "Motocikli i skuteri", "Gospodarska vozila", "Auto dijelovi i oprema", "Nautika i plovila", "Kamperi i prikolice", "Ostalo - Auto Moto"]
  },
  {
    id: "nekretnine",
    naziv: "Nekretnine",
    ikona: "🏠",
    podkategorije: ["Stanovi - Prodaja", "Stanovi - Najam", "Kuće - Prodaja", "Kuće - Najam", "Zemljišta", "Poslovni prostori", "Novogradnja", "Nekretnine za odmor", "Garaže", "Sobe i Cimeri", "Ostalo - Nekretnine"]
  },
  {
    id: "elektronika",
    naziv: "Elektronika",
    ikona: "📱",
    podkategorije: ["Mobiteli i oprema", "Računala i komponente", "TV, Video i Audio", "Konzole i igrice", "Foto i video oprema", "Ostalo - Elektronika"]
  },
  {
    id: "dom-vrt",
    naziv: "Dom i Vrt",
    ikona: "🛋️",
    podkategorije: ["Namještaj", "Kućanski aparati", "Vrt i gradnja", "Posuđe i pribor", "Rasvjeta", "Ostalo - Dom i Vrt"]
  },
  {
    id: "sport",
    naziv: "Sport i Oprema",
    ikona: "⚽",
    podkategorije: ["Bicikli i oprema", "Fitness i teretana", "Loptački sportovi", "Zimski sportovi", "Lov i ribolov", "Ostalo - Sport"]
  },
  {
    id: "ostalo",
    naziv: "Ostalo / Razno",
    ikona: "📦",
    podkategorije: ["Kolekcionarstvo i antikviteti", "Knjige i literatura", "Glazbeni instrumenti", "Dječja oprema i igračke", "Kućni ljubimci i oprema", "Sve ostalo"]
  }
];

const POCETNI_OGLASI = [
  {
    id: 1,
    naslov: "BMW Serija 3 320d Automatic M-Sport - Full Oprema",
    cijena: "18.900",
    kategorija: "auto-moto",
    podkategorija: "Osobna vozila",
    zupanija: "Grad Zagreb",
    grad: "Zagreb - Maksimir",
    stanje: "Korišteno - Kao novo",
    slika: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    top: true,
    promoviran: true,
    datum: "Objavljeno danas u 15:30",
    opis: "Garažirano vozilo u izvanrednom stanju. Redovito servisiran u ovlaštenom BMW servisu.",
    prodavac: "Ivan Horvat",
    autorEmail: "ivan@gmail.com",
    telefon: "0912345678",
    email: "ivan.zagreb@gmail.com"
  },
  {
    id: 2,
    naslov: "Stari Antički Sat i Kolekcionarski Predmeti",
    cijena: "120",
    kategorija: "ostalo",
    podkategorija: "Kolekcionarstvo i antikviteti",
    zupanija: "Istarska",
    grad: "Pula",
    stanje: "Korišteno - Dobro",
    slika: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Stari zidni sat u ispravnom stanju.",
    prodavac: "Petar Istra",
    autorEmail: "petar@gmail.com",
    telefon: "0981112233",
    email: "petar.pula@gmail.com"
  }
];

export default function KupkoApp() {
  const [oglasi, setOglasi] = useState(POCETNI_OGLASI);
  const [pojamPretrage, setPojamPretrage] = useState("");
  const [odabranaKategorija, setOdabranaKategorija] = useState("sve");
  const [odabranaPodkategorija, setOdabranaPodkategorija] = useState("sve");
  const [odabranaZupanija, setOdabranaZupanija] = useState("sve");
  const [omiljeni, setOmiljeni] = useState<number[]>([]);
  const [prikaz, setPrikaz] = useState("grid");
  const [odabraniOglas, setOdabraniOglas] = useState<any>(null);

  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [prikaziPrijavu, setPrikaziPrijavu] = useState(false);
  const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);

  // Korisničko stanje (Owner = admin@kupko.hr)
  const [korisnik, setKorisnik] = useState<{ ime: string; email: string; isOwner: boolean } | null>(null);
  const [formaPrijava, setFormaPrijava] = useState({ email: "", lozinka: "" });
  const [formaRegistracija, setFormaRegistracija] = useState({ ime: "", email: "", lozinka: "" });

  useEffect(() => {
    const lokalniOglasi = localStorage.getItem("kupko_oglasi_v4");
    if (lokalniOglasi) {
      try {
        setOglasi(JSON.parse(lokalniOglasi));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const spremiOglase = (noviNiz: any) => {
    setOglasi(noviNiz);
    localStorage.setItem("kupko_oglasi_v4", JSON.stringify(noviNiz));
  };

  const rukujPrijavom = (e: React.FormEvent) => {
    e.preventDefault();
    const emailLower = formaPrijava.email.toLowerCase();
    const jeOwner = emailLower === "admin@kupko.hr";
    setKorisnik({ ime: formaPrijava.email.split("@")[0], email: emailLower, isOwner: jeOwner });
    setPrikaziPrijavu(false);
    setFormaPrijava({ email: "", lozinka: "" });
  };

  const rukujRegistracijom = (e: React.FormEvent) => {
    e.preventDefault();
    const emailLower = formaRegistracija.email.toLowerCase();
    const jeOwner = emailLower === "admin@kupko.hr";
    setKorisnik({ ime: formaRegistracija.ime, email: emailLower, isOwner: jeOwner });
    setPrikaziRegistraciju(false);
    setFormaRegistracija({ ime: "", email: "", lozinka: "" });
  };

  const obrisiOglas = (glas: any) => {
    if (!korisnik) {
      alert("Morate biti prijavljeni da biste izbrisali oglas!");
      return;
    }

    const jeAutor = glas.autorEmail && glas.autorEmail.toLowerCase() === korisnik.email.toLowerCase();
    const jeOwner = korisnik.isOwner;

    if (!jeAutor && !jeOwner) {
      alert("Nemate ovlasti za brisanje tuđeg oglasa!");
      return;
    }

    if (confirm("Jeste li sigurni da želite trajno izbrisati ovaj oglas?")) {
      const noviOglasi = oglasi.filter((o) => o.id !== glas.id);
      spremiOglase(noviOglasi);
      setOdabraniOglas(null);
    }
  };

  const [noviOglas, setNoviOglas] = useState({
    naslov: "", cijena: "", kategorija: "ostalo", podkategorija: "Sve ostalo",
    zupanija: "Grad Zagreb", grad: "", stanje: "Novo", slika: "", opis: "",
    prodavac: "", telefon: "", email: "", promoviran: false
  });

  const rukujDodavanjemOglasa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noviOglas.naslov || !noviOglas.cijena) return;

    const sad = new Date();
    const datumString = `Objavljeno u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;

    const stvoreniOglas = {
      ...noviOglas,
      id: Date.now(),
      top: noviOglas.promoviran,
      datum: datumString,
      prodavac: korisnik ? korisnik.ime : (noviOglas.prodavac || "Gost"),
      autorEmail: korisnik ? korisnik.email : (noviOglas.email || "gost@kupko.hr"),
      email: noviOglas.email || (korisnik ? korisnik.email : ""),
      slika: noviOglas.slika || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"
    };

    const azurirano = stvoreniOglas.promoviran ? [stvoreniOglas, ...oglasi] : [...oglasi, stvoreniOglas];
    spremiOglase(azurirano);
    setPrikaziFormu(false);
  };

  const rukujUcitavanjemSlika = (e: React.ChangeEvent<HTMLInputElement>) => {
    const datoteka = e.target.files && e.target.files[0];
    if (datoteka) {
      const citac = new FileReader();
      citac.onloadend = () => {
        setNoviOglas((prev) => ({ ...prev, slika: citac.result as string }));
      };
      citac.readAsDataURL(datoteka);
    }
  };

  const filtriraniOglasi = oglasi.filter((o) => {
    const odgovaraTrazilici = o.naslov.toLowerCase().includes(pojamPretrage.toLowerCase());
    const odgovaraKategoriji = odabranaKategorija === "sve" || o.kategorija === odabranaKategorija;
    const odgovaraPodkategoriji = odabranaPodkategorija === "sve" || o.podkategorija === odabranaPodkategorija;
    const odgovaraZupaniji = odabranaZupanija === "sve" || o.zupanija === odabranaZupanija;
    return odgovaraTrazilici && odgovaraKategoriji && odgovaraPodkategoriji && odgovaraZupaniji;
  });

  const promoviraniOglasi = oglasi.filter((o) => o.promoviran);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-16">
      {/* TOP KORISNIČKA TRAKA */}
      <div className="bg-blue-950 text-blue-200 text-xs py-1.5 px-4 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>🇭🇷 Kupko.hr - Hrvatski Marketplace Oglasnik</span>
          <div className="flex items-center gap-4">
            {korisnik ? (
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {korisnik.ime} {korisnik.isOwner && "(👑 Owner)"}
                </span>
                <button onClick={() => setKorisnik(null)} className="text-slate-400 hover:text-white ml-2">Odjava</button>
              </div>
            ) : (
              <div className="flex items-center gap-3 font-semibold">
                <button onClick={() => setPrikaziPrijavu(true)} className="hover:text-white flex items-center gap-1">
                  <LogIn className="w-3.5 h-3.5" /> Prijava
                </button>
                <span>|</span>
                <button onClick={() => setPrikaziRegistraciju(true)} className="hover:text-amber-400 flex items-center gap-1 text-white font-bold">
                  <UserPlus className="w-3.5 h-3.5 text-amber-400" /> Registracija
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 text-white shadow-xl sticky top-0 z-40 border-b border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setOdabranaKategorija("sve"); setOdabranaPodkategorija("sve"); setPojamPretrage(""); }}
          >
            <div className="relative bg-amber-400 p-2.5 rounded-2xl text-blue-950 shadow-lg group-hover:scale-105 transition">
              <ShoppingBag className="w-7 h-7 stroke-[2.5]" />
              <CheckCircle2 className="w-4 h-4 text-blue-700 absolute -bottom-1 -right-1 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-3xl tracking-tight text-white">KUP</span>
                <span className="font-black text-3xl tracking-tight text-amber-400">KO</span>
                <span className="text-amber-400 text-xs font-bold bg-amber-400/20 px-1.5 py-0.5 rounded ml-1 border border-amber-400/30">HR</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full md:max-w-2xl flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Pretraži ponudu (npr. BMW, Stan, Antikviteti...)"
                value={pojamPretrage}
                onChange={(e) => setPojamPretrage(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-slate-900 bg-white shadow-inner text-sm font-medium outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="absolute left-3 top-3 text-slate-400 w-4 h-4" />
            </div>

            <select
              value={odabranaZupanija}
              onChange={(e) => setOdabranaZupanija(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-blue-900/80 text-white border border-blue-500/50 text-xs font-bold outline-none cursor-pointer"
            >
              <option value="sve">🇭🇷 Cijela Hrvatska</option>
              {ZUPANIJE.map((z) => <option key={z} value={z} className="bg-slate-800">{z}</option>)}
            </select>
          </div>

          <button 
            onClick={() => setPrikaziFormu(true)}
            className="w-full md:w-auto bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition text-sm uppercase tracking-wider"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>Predaj oglas</span>
          </button>
        </div>
      </header>

      {/* BANNER PROMOVIRANI OGLASI */}
      {promoviraniOglasi.length > 0 && (
        <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-5 border-b border-amber-600 shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-6 h-6 text-blue-950 fill-blue-950" />
              <h2 className="text-lg font-black text-blue-950 uppercase tracking-wider">Promovirani Oglasi na Naslovnici</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {promoviraniOglasi.map((o) => (
                <div 
                  key={o.id}
                  onClick={() => setOdabraniOglas(o)}
                  className="bg-white rounded-2xl p-3 shadow-lg border-2 border-blue-700 flex gap-3 cursor-pointer hover:scale-102 transition relative overflow-hidden"
                >
                  <span className="absolute top-0 right-0 bg-blue-700 text-amber-300 text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-amber-300" /> TOP
                  </span>
                  <img src={o.slika} alt={o.naslov} className="w-24 h-24 object-cover rounded-xl" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block">{o.zupanija}</span>
                      <h4 className="font-black text-slate-900 text-sm truncate">{o.naslov}</h4>
                    </div>
                    <p className="text-base font-black text-blue-700">{o.cijena} €</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAIN KATEGORIJE SELEKTOR */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">Sve Kategorije na Kupku</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setOdabranaKategorija("sve"); setOdabranaPodkategorija("sve"); }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${odabranaKategorija === "sve" ? "bg-blue-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
            >
              Svi Oglasi
            </button>
            {SVE_KATEGORIJE.map((kat) => (
              <button
                key={kat.id}
                onClick={() => { setOdabranaKategorija(kat.id); setOdabranaPodkategorija("sve"); }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition ${odabranaKategorija === kat.id ? "bg-blue-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                <span>{kat.ikona}</span>
                <span>{kat.naziv}</span>
              </button>
            ))}
          </div>

          {odabranaKategorija !== "sve" && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-blue-900 uppercase mb-2">
                Podkategorije za {SVE_KATEGORIJE.find((k) => k.id === odabranaKategorija)?.naziv}:
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setOdabranaPodkategorija("sve")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${odabranaPodkategorija === "sve" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700"}`}
                >
                  Sve podkategorije
                </button>
                {SVE_KATEGORIJE.find((k) => k.id === odabranaKategorija)?.podkategorije.map((pod) => (
                  <button
                    key={pod}
                    onClick={() => setOdabranaPodkategorija(pod)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${odabranaPodkategorija === pod ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700 hover:bg-blue-50"}`}
                  >
                    {pod}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* LISTA OGLASA */}
        <section>
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900">
              Aktivni Oglasi ({filtriraniOglasi.length})
            </h3>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              <button onClick={() => setPrikaz("grid")} className={`p-2 rounded-lg ${prikaz === "grid" ? "bg-white text-blue-700 shadow" : "text-slate-500"}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setPrikaz("list")} className={`p-2 rounded-lg ${prikaz === "list" ? "bg-white text-blue-700 shadow" : "text-slate-500"}`}><List className="w-4 h-4" /></button>
            </div>
          </div>

          <div className={prikaz === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
            {filtriraniOglasi.map((o) => (
              <div 
                key={o.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between group"
              >
                <div className="relative">
                  <img src={o.slika} alt={o.naslov} className="w-full h-52 object-cover group-hover:scale-105 transition" />
                  {o.promoviran && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow flex items-center gap-1">
                      <Crown className="w-3 h-3 fill-blue-950" /> PROMOVIRANO
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{o.zupanija}</span>
                      {o.grad && <span>({o.grad})</span>}
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 hover:text-blue-700 cursor-pointer" onClick={() => setOdabraniOglas(o)}>
                      {o.naslov}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xl font-black text-blue-700">{o.cijena} €</span>
                    <button onClick={() => setOdabraniOglas(o)} className="bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition">
                      Detalji
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL: PREDAJ OGLAS */}
      {prikaziFormu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziFormu(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100">
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle className="w-7 h-7 text-amber-500" />
              <div>
                <h2 className="text-2xl font-black text-slate-900">Predaj novi oglas na Kupku</h2>
                <p className="text-xs text-slate-500">
                  {korisnik ? `Objavljuješ kao: ${korisnik.email}` : "Niste prijavljeni (bit ćete zabilježeni kao gost)"}
                </p>
              </div>
            </div>

            <form onSubmit={rukujDodavanjemOglasa} className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 p-4 rounded-2xl border border-amber-400/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-6 h-6 text-amber-600 fill-amber-500" />
                    <div>
                      <h4 className="font-black text-sm text-slate-900">Istakni oglas na naslovnici (Promocija)</h4>
                      <p className="text-xs text-slate-600">Prikaz na samom vrhu naslovnice u zlatnom VIP dijelu!</p>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer font-extrabold text-xs bg-amber-400 text-blue-950 px-3 py-1.5 rounded-xl shadow">
                    <input 
                      type="checkbox" 
                      checked={noviOglas.promoviran} 
                      onChange={(e) => setNoviOglas({ ...noviOglas, promoviran: e.target.checked })}
                    /> Želim promociju (5 €)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Naslov oglasa *</label>
                <input 
                  type="text" required placeholder="Npr. Antički sat, PlayStation 5, Bicikl..."
                  value={noviOglas.naslov} onChange={(e) => setNoviOglas({ ...noviOglas, naslov: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cijena (€) *</label>
                  <input 
                    type="text" required placeholder="npr. 120"
                    value={noviOglas.cijena} onChange={(e) => setNoviOglas({ ...noviOglas, cijena: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Glavna Kategorija</label>
                  <select 
                    value={noviOglas.kategorija} 
                    onChange={(e) => {
                      const novaKat = e.target.value;
                      const prvaPod = SVE_KATEGORIJE.find((k) => k.id === novaKat)?.podkategorije[0] || "";
                      setNoviOglas({ ...noviOglas, kategorija: novaKat, podkategorija: prvaPod });
                    }}
                    className="w-full p-3 rounded-xl border text-sm bg-white font-bold"
                  >
                    {SVE_KATEGORIJE.map((k) => (
                      <option key={k.id} value={k.id}>{k.ikona} {k.naziv}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Podkategorija</label>
                  <select 
                    value={noviOglas.podkategorija} onChange={(e) => setNoviOglas({ ...noviOglas, podkategorija: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm bg-white"
                  >
                    {SVE_KATEGORIJE.find((k) => k.id === noviOglas.kategorija)?.podkategorije.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input type="text" placeholder="Ime Prodavača" value={noviOglas.prodavac} onChange={(e) => setNoviOglas({ ...noviOglas, prodavac: e.target.value })} className="p-3 rounded-xl border text-sm" />
                <input type="text" placeholder="Broj Mobitela" value={noviOglas.telefon} onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })} className="p-3 rounded-xl border text-sm" />
                <input type="email" placeholder="E-mail (za provjeru vlasništva)" value={noviOglas.email} onChange={(e) => setNoviOglas({ ...noviOglas, email: e.target.value })} className="p-3 rounded-xl border text-sm" />
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Slika predmeta</label>
                {noviOglas.slika ? (
                  <div className="relative rounded-2xl overflow-hidden border max-h-48">
                    <img src={noviOglas.slika} alt="Pregled" className="w-full h-48 object-cover" />
                    <button type="button" onClick={() => setNoviOglas({ ...noviOglas, slika: "" })} className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 bg-white cursor-pointer relative">
                    <input type="file" accept="image/*" onChange={rukujUcitavanjemSlika} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    <Upload className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm font-bold">Dovuci ili odaberi sliku s uređaja</p>
                  </div>
                )}
              </div>

              <textarea rows={3} placeholder="Opis oglasa..." value={noviOglas.opis} onChange={(e) => setNoviOglas({ ...noviOglas, opis: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />

              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition text-sm uppercase">
                {noviOglas.promoviran ? "Plati i objavi Oglas na Kupku" : "Objavi Oglas na Kupku"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETALJI OGLASA */}
      {odabraniOglas && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl">
            <button onClick={() => setOdabraniOglas(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full"><X className="w-5 h-5" /></button>
            
            <img src={odabraniOglas.slika} alt={odabraniOglas.naslov} className="w-full h-80 object-cover rounded-2xl mb-5" />
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{odabraniOglas.naslov}</h2>
                <p className="text-xs text-slate-400 mt-1">📍 {odabraniOglas.zupanija} • Podkategorija: {odabraniOglas.podkategorija || "Ostalo"}</p>
                <p className="text-[11px] text-blue-600 font-medium mt-0.5">Autor oglasa: {odabraniOglas.autorEmail || "nepoznato"}</p>
              </div>
              <span className="text-3xl font-black text-blue-700">{odabraniOglas.cijena} €</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border text-sm mb-6">
              <h4 className="font-bold text-xs uppercase text-slate-400 mb-1">Opis oglasa</h4>
              <p className="whitespace-pre-line">{odabraniOglas.opis || "Nema opisa."}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl flex justify-between items-center mb-4">
              <div>
                <p className="font-extrabold text-base">{odabraniOglas.prodavac || "Korisnik Kupka"}</p>
                <p className="text-xs text-blue-200">Lokacija: {odabraniOglas.zupanija}</p>
              </div>
              {odabraniOglas.telefon && (
                <a href={`tel:${odabraniOglas.telefon}`} className="bg-amber-400 text-blue-950 font-black px-5 py-3 rounded-xl flex items-center gap-2 text-sm shadow">
                  <Phone className="w-4 h-4 stroke-[2.5]" />
                  NAZOVI: {odabraniOglas.telefon}
                </a>
              )}
            </div>

            {/* GUMB ZA BRISANJE */}
            {korisnik && (korisnik.isOwner || (odabraniOglas.autorEmail && odabraniOglas.autorEmail.toLowerCase() === korisnik.email.toLowerCase())) ? (
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Ovlašteni ste za upravljanje ovim oglasom
                </span>
                <button 
                  onClick={() => obrisiOglas(odabraniOglas)}
                  className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Izbriši ovaj oglas</span>
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 text-right italic">Samo autor oglasa ili administrator mogu izbrisati ovaj oglas.</p>
            )}
          </div>
        </div>
      )}

      {/* MODAL: PRIJAVA */}
      {prikaziPrijavu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative">
            <button onClick={() => setPrikaziPrijavu(false)} className="absolute top-4 right-4 text-slate-400"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-black mb-1">Prijava na Kupko</h2>
            <p className="text-xs text-slate-500 mb-4">Savjet: Prijavi se s <strong className="text-blue-700">admin@kupko.hr</strong> da postaneš Owner!</p>
            <form onSubmit={rukujPrijavom} className="space-y-3">
              <input 
                type="email" 
                required 
                placeholder="E-mail (npr. admin@kupko.hr)" 
                value={formaPrijava.email} 
                onChange={(e) => setFormaPrijava({ ...formaPrijava, email: e.target.value })}
                className="w-full p-3 rounded-xl border text-sm outline-none"
              />
              <input 
                type="password" 
                required 
                placeholder="Lozinka" 
                value={formaPrijava.lozinka} 
                onChange={(e) => setFormaPrijava({ ...formaPrijava, lozinka: e.target.value })}
                className="w-full p-3 rounded-xl border text-sm outline-none"
              />
              <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl text-sm">
                Prijavi se
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRACIJA */}
      {prikaziRegistraciju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative">
            <button onClick={() => setPrikaziRegistraciju(false)} className="absolute top-4 right-4 text-slate-400"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-black mb-4">Registracija na Kupko</h2>
            <form onSubmit={rukujRegistracijom} className="space-y-3">
              <input 
                type="text" 
                required 
                placeholder="Korisničko Ime" 
                value={formaRegistracija.ime} 
                onChange={(e) => setFormaRegistracija({ ...formaRegistracija, ime: e.target.value })}
                className="w-full p-3 rounded-xl border text-sm outline-none"
              />
              <input 
                type="email" 
                required 
                placeholder="E-mail adresa" 
                value={formaRegistracija.email} 
                onChange={(e) => setFormaRegistracija({ ...formaRegistracija, email: e.target.value })}
                className="w-full p-3 rounded-xl border text-sm outline-none"
              />
              <input 
                type="password" 
                required 
                placeholder="Lozinka" 
                value={formaRegistracija.lozinka} 
                onChange={(e) => setFormaRegistracija({ ...formaRegistracija, lozinka: e.target.value })}
                className="w-full p-3 rounded-xl border text-sm outline-none"
              />
              <button type="submit" className="w-full bg-amber-400 text-blue-950 font-bold py-3 rounded-xl text-sm">
                Registriraj se
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, PlusCircle, Heart, MapPin, Grid, List, Phone, X, 
  ShoppingBag, CheckCircle2, Mail, User, Clock, Upload, Image as ImageIcon,
  LogIn, UserPlus, Sparkles, Compass, Menu, Tag, Car, Home, ShieldCheck, Video, CreditCard, Crown, Package, Trash2, Shield, RotateCw, ArrowLeft, Lock, Gauge, Calendar, Fuel, Cog
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
    email: "ivan.zagreb@gmail.com",
    godiste: "2019",
    kilometri: "145000",
    snagaKw: "140",
    gorivo: "Dizel",
    mjenjac: "Automatski"
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
  
  // Omiljeni oglasi
  const [omiljeniIds, setOmiljeniIds] = useState<number[]>([]);
  const [prikaziSamoOmiljene, setPrikaziSamoOmiljene] = useState(false);

  const [prikaz, setPrikaz] = useState("grid");
  const [odabraniOglas, setOdabraniOglas] = useState<any>(null);
  
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [prikaziPrijavu, setPrikaziPrijavu] = useState(false);
  const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);

  const [korisnik, setKorisnik] = useState<{ ime: string; email: string; isOwner: boolean } | null>(null);
  const [formaPrijava, setFormaPrijava] = useState({ email: "", lozinka: "" });
  const [formaRegistracija, setFormaRegistracija] = useState({ ime: "", email: "", lozinka: "" });

  // Sigurnosna provjera (Anti-Spam Captcha)
  const [sigurnosniKod, setSigurnosniKod] = useState({ a: 3, b: 4, unos: "" });

  useEffect(() => {
    const lokalniOglasi = localStorage.getItem("kupko_oglasi_v4");
    if (lokalniOglasi) {
      try { setOglasi(JSON.parse(lokalniOglasi)); } catch (e) { console.error(e); }
    }
    const spremljeniOmiljeni = localStorage.getItem("kupko_omiljeni");
    if (spremljeniOmiljeni) {
      try { setOmiljeniIds(JSON.parse(spremljeniOmiljeni)); } catch (e) { console.error(e); }
    }
    generirajKôd();
  }, []);

  const generirajKôd = () => {
    const num1 = Math.floor(Math.random() * 8) + 1;
    const num2 = Math.floor(Math.random() * 8) + 1;
    setSigurnosniKod({ a: num1, b: num2, unos: "" });
  };

  const spremiOglase = (noviNiz: any) => {
    setOglasi(noviNiz);
    localStorage.setItem("kupko_oglasi_v4", JSON.stringify(noviNiz));
  };

  const toggleOmiljeni = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    let noviIds: number[];
    if (omiljeniIds.includes(id)) {
      noviIds = omiljeniIds.filter((item) => item !== id);
    } else {
      noviIds = [...omiljeniIds, id];
    }
    setOmiljeniIds(noviIds);
    localStorage.setItem("kupko_omiljeni", JSON.stringify(noviIds));
  };

  const obnoviOglas = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;
    
    const azuriraniNiz = oglasi.map((item) =>
      item.id === id ? { ...item, datum: datumString, top: true } : item
    );
    spremiOglase(azuriraniNiz);
    alert("Oglas je uspješno obnovljen i vraćen na sam vrh ponude!");
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

  const prijavaPrekoMreze = (mreza: string) => {
    const simuliraniEmail = `korisnik_${mreza.toLowerCase()}@kupko.hr`;
    setKorisnik({
      ime: `${mreza} Korisnik`,
      email: simuliraniEmail,
      isOwner: false
    });
    setPrikaziPrijavu(false);
    setPrikaziRegistraciju(false);
    alert(`Uspješno ste se prijavili putem ${mreza} računa!`);
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
    prodavac: "", telefon: "", email: "", promoviran: false,
    godiste: "", kilometri: "", snagaKw: "", gorivo: "Dizel", mjenjac: "Ručni"
  });

  const rukujDodavanjemOglasa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noviOglas.naslov || !noviOglas.cijena) return;

    if (parseInt(sigurnosniKod.unos) !== sigurnosniKod.a + sigurnosniKod.b) {
      alert("Točan zbroj u sigurnosnoj provjeri je obavezan kako bismo spriječili spam!");
      return;
    }

    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;

    const konacniEmail = noviOglas.email.trim() !== "" 
      ? noviOglas.email 
      : (korisnik ? korisnik.email : `korisnik_${Date.now()}@kupko.hr`);

    const stvoreniOglas = {
      ...noviOglas,
      id: Date.now(),
      top: noviOglas.promoviran,
      datum: datumString,
      prodavac: korisnik ? korisnik.ime : (noviOglas.prodavac || "Korisnik"),
      autorEmail: konacniEmail,
      email: konacniEmail,
      slika: noviOglas.slika || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"
    };

    const azurirano = stvoreniOglas.promoviran ? [stvoreniOglas, ...oglasi] : [...oglasi, stvoreniOglas];
    spremiOglase(azurirano);
    setPrikaziFormu(false);
    generirajKôd();
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
    const odgovaraOmiljenima = !prikaziSamoOmiljene || omiljeniIds.includes(o.id);
    return odgovaraTrazilici && odgovaraKategoriji && odgovaraPodkategoriji && odgovaraZupaniji && odgovaraOmiljenima;
  });

  const promoviraniOglasi = oglasi.filter((o) => o.promoviran);

  const slicniOglasi = odabraniOglas
    ? oglasi.filter(
        (o) =>
          o.id !== odabraniOglas.id &&
          (o.kategorija === odabraniOglas.kategorija || o.zupanija === odabraniOglas.zupanija)
      ).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-16">
      {/* TOP KORISNIČKA TRAKA */}
      <div className="bg-blue-950 text-blue-200 text-xs py-1.5 px-4 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            🇭🇷 Kupko.hr - Sigurni Hrvatski Oglasnik
          </span>
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
            onClick={() => { setOdabranaKategorija("sve"); setOdabranaPodkategorija("sve"); setPojamPretrage(""); setPrikaziSamoOmiljene(false); setOdabraniOglas(null); }}
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

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setPrikaziSamoOmiljene(!prikaziSamoOmiljene)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow ${
                prikaziSamoOmiljene ? "bg-red-500 text-white" : "bg-blue-900 text-slate-200 hover:bg-blue-800 border border-blue-500/40"
              }`}
            >
              <Heart className={`w-4 h-4 ${prikaziSamoOmiljene ? "fill-white" : "text-red-400"}`} />
              <span>Omiljeni ({omiljeniIds.length})</span>
            </button>

            <button 
              onClick={() => setPrikaziFormu(true)}
              className="flex-1 md:flex-none bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition text-sm uppercase tracking-wider"
            >
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
              <span>Predaj oglas</span>
            </button>
          </div>
        </div>
      </header>

      {/* BANNER PROMOVIRANI OGLASI */}
      {promoviraniOglasi.length > 0 && !prikaziSamoOmiljene && (
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
              {prikaziSamoOmiljene ? "Vaši omiljeni oglasi" : "Aktivni Oglasi"} ({filtriraniOglasi.length})
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
                onClick={() => setOdabraniOglas(o)}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between group cursor-pointer"
              >
                <div className="relative">
                  <img src={o.slika} alt={o.naslov} className="w-full h-52 object-cover group-hover:scale-105 transition" />
                  {o.promoviran && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow flex items-center gap-1">
                      <Crown className="w-3 h-3 fill-blue-950" /> PROMOVIRANO
                    </span>
                  )}
                  <button
                    onClick={(e) => toggleOmiljeni(e, o.id)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2.5 rounded-full shadow hover:bg-white transition"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        omiljeniIds.includes(o.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-600"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" /> {o.zupanija}
                      </span>
                      <span>{o.datum}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1 line-clamp-2 hover:text-blue-700">
                      {o.naslov}
                    </h4>

                    {/* BRZI TEHNIČKI INFO ZA VOZILA */}
                    {o.kategorija === "auto-moto" && (o.godiste || o.kilometri) && (
                      <p className="text-xs text-slate-500 font-medium mb-2">
                        {o.godiste && `${o.godiste}. god.`} {o.kilometri && `• ${Number(o.kilometri).toLocaleString("hr-HR")} km`} {o.gorivo && `• ${o.gorivo}`}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xl font-black text-blue-700">{o.cijena} €</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => obnoviOglas(e, o.id)}
                        title="Obnovi oglas na vrh"
                        className="p-2 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 rounded-xl transition"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                      <button className="bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white font-bold text-xs px-3.5 py-2 rounded-xl transition">
                        Detalji
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtriraniOglasi.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-semibold">Nema pronađenih oglasa za odabrane kriterije.</p>
            </div>
          )}
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
                  Brza objava oglasa. Unos e-mail adrese je opcionalan!
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
                  type="text" required placeholder="Npr. BMW 320d M-Sport, PlayStation 5, Bicikl..."
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

              {/* SPECIFIČNA TEHNIČKA POLJA ZA AUTO MOTO */}
              {noviOglas.kategorija === "auto-moto" && (
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                  <p className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Car className="w-4 h-4" /> Specifikacije Vozila
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Godište</label>
                      <input
                        type="text"
                        placeholder="npr. 2019"
                        value={noviOglas.godiste}
                        onChange={(e) => setNoviOglas({ ...noviOglas, godiste: e.target.value })}
                        className="w-full border border-slate-300 bg-white rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Kilometraža (km)</label>
                      <input
                        type="number"
                        placeholder="npr. 150000"
                        value={noviOglas.kilometri}
                        onChange={(e) => setNoviOglas({ ...noviOglas, kilometri: e.target.value })}
                        className="w-full border border-slate-300 bg-white rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Snaga (kW)</label>
                      <input
                        type="number"
                        placeholder="kW"
                        value={noviOglas.snagaKw}
                        onChange={(e) => setNoviOglas({ ...noviOglas, snagaKw: e.target.value })}
                        className="w-full border border-slate-300 bg-white rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Gorivo</label>
                      <select
                        value={noviOglas.gorivo}
                        onChange={(e) => setNoviOglas({ ...noviOglas, gorivo: e.target.value })}
                        className="w-full border border-slate-300 bg-white rounded-xl p-2.5 text-xs outline-none"
                      >
                        <option value="Dizel">Dizel</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Hibrid">Hibrid</option>
                        <option value="Električni">Električni</option>
                        <option value="Plin">Plin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Mjenjač</label>
                      <select
                        value={noviOglas.mjenjac}
                        onChange={(e) => setNoviOglas({ ...noviOglas, mjenjac: e.target.value })}
                        className="w-full border border-slate-300 bg-white rounded-xl p-2.5 text-xs outline-none"
                      >
                        <option value="Ručni">Ručni</option>
                        <option value="Automatski">Automatski</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Županija</label>
                  <select
                    value={noviOglas.zupanija}
                    onChange={(e) => setNoviOglas({ ...noviOglas, zupanija: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm bg-white font-bold"
                  >
                    {ZUPANIJE.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                <input type="text" placeholder="Ime Prodavača" value={noviOglas.prodavac} onChange={(e) => setNoviOglas({ ...noviOglas, prodavac: e.target.value })} className="p-3 rounded-xl border text-sm mt-5" />
                <input type="text" placeholder="Broj Mobitela *" required value={noviOglas.telefon} onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })} className="p-3 rounded-xl border text-sm mt-5" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">E-mail adresa (Nije obavezno)</label>
                <input 
                  type="email" 
                  placeholder="Ako nemate e-mail, ostavite prazno!" 
                  value={noviOglas.email} 
                  onChange={(e) => setNoviOglas({ ...noviOglas, email: e.target.value })} 
                  className="w-full p-3 rounded-xl border text-sm bg-slate-50" 
                />
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

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h5 className="font-bold text-xs text-slate-800">Sigurnosna Anti-Spam Provjera</h5>
                    <p className="text-[11px] text-slate-500">Izračunajte koliko je: <strong>{sigurnosniKod.a} + {sigurnosniKod.b} = ?</strong></p>
                  </div>
                </div>
                <input
                  type="number"
                  required
                  placeholder="Unesite rezultat"
                  value={sigurnosniKod.unos}
                  onChange={(e) => setSigurnosniKod({ ...sigurnosniKod, unos: e.target.value })}
                  className="w-32 p-2 rounded-xl border border-emerald-300 text-center font-bold text-sm bg-white"
                />
              </div>

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
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl space-y-6">
            <button onClick={() => setOdabraniOglas(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full z-10"><X className="w-5 h-5" /></button>
            
            <div className="relative rounded-2xl overflow-hidden max-h-80">
              <img src={odabraniOglas.slika} alt={odabraniOglas.naslov} className="w-full h-80 object-cover" />
              <button
                onClick={(e) => toggleOmiljeni(e, odabraniOglas.id)}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur p-2.5 rounded-full shadow hover:bg-white transition"
              >
                <Heart
                  className={`w-6 h-6 ${
                    omiljeniIds.includes(odabraniOglas.id)
                      ? "fill-red-500 text-red-500"
                      : "text-slate-600"
                  }`}
                />
              </button>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{odabraniOglas.naslov}</h2>
                <p className="text-xs text-slate-400 mt-1">📍 {odabraniOglas.zupanija} • Podkategorija: {odabraniOglas.podkategorija || "Ostalo"}</p>
                <p className="text-[11px] text-blue-600 font-medium mt-0.5">{odabraniOglas.datum}</p>
              </div>
              <span className="text-3xl font-black text-blue-700">{odabraniOglas.cijena} €</span>
            </div>

            {/* PRIKAZ SPECIFIKACIJA VOZILA AKO POSTOJE */}
            {odabraniOglas.kategorija === "auto-moto" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {odabraniOglas.godiste && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Godište</p>
                      <p className="text-sm font-bold text-slate-800">{odabraniOglas.godiste}.</p>
                    </div>
                  </div>
                )}
                {odabraniOglas.kilometri && (
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Kilometraža</p>
                      <p className="text-sm font-bold text-slate-800">{Number(odabraniOglas.kilometri).toLocaleString("hr-HR")} km</p>
                    </div>
                  </div>
                )}
                {odabraniOglas.snagaKw && (
                  <div className="flex items-center gap-2">
                    <Cog className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Snaga (kW / KS)</p>
                      <p className="text-sm font-bold text-slate-800">{odabraniOglas.snagaKw} kW ({Math.round(Number(odabraniOglas.snagaKw) * 1.36)} KS)</p>
                    </div>
                  </div>
                )}
                {odabraniOglas.gorivo && (
                  <div className="flex items-center gap-2">
                    <Fuel className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Gorivo / Mjenjač</p>
                      <p className="text-sm font-bold text-slate-800">{odabraniOglas.gorivo} / {odabraniOglas.mjenjac || "Ručni"}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-slate-50 p-4 rounded-2xl border text-sm">
              <h4 className="font-bold text-xs uppercase text-slate-400 mb-1">Opis oglasa</h4>
              <p className="whitespace-pre-line">{odabraniOglas.opis || "Nema opisa."}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                Lokacija oglasa: {odabraniOglas.zupanija}
              </h3>
              <div className="w-full h-36 bg-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-200">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:12px_12px]"></div>
                <div className="z-10 text-center p-3 bg-white/90 rounded-xl shadow-md backdrop-blur border border-slate-200">
                  <MapPin className="w-6 h-6 text-red-500 mx-auto animate-bounce mb-1" />
                  <p className="font-bold text-slate-800 text-xs">{odabraniOglas.zupanija}</p>
                  <p className="text-[10px] text-slate-500">Približna lokacija prodavača</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="font-extrabold text-base">{odabraniOglas.prodavac || "Korisnik Kupka"}</p>
                <p className="text-xs text-blue-200">Lokacija: {odabraniOglas.zupanija}</p>
              </div>
              <div className="flex items-center gap-2">
                {odabraniOglas.telefon && (
                  <a href={`tel:${odabraniOglas.telefon}`} className="bg-amber-400 text-blue-950 font-black px-4 py-3 rounded-xl flex items-center gap-2 text-xs shadow">
                    <Phone className="w-4 h-4 stroke-[2.5]" />
                    NAZOVI: {odabraniOglas.telefon}
                  </a>
                )}
                <button
                  onClick={(e) => obnoviOglas(e, odabraniOglas.id)}
                  className="bg-blue-800 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-2 text-xs transition border border-blue-600"
                >
                  <RotateCw className="w-4 h-4 text-amber-400" /> Obnovi oglas
                </button>
              </div>
            </div>

            {slicniOglasi.length > 0 && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-wide">Slični oglasi</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {slicniOglasi.map((slicni) => (
                    <div
                      key={slicni.id}
                      onClick={() => setOdabraniOglas(slicni)}
                      className="bg-slate-50 rounded-xl p-2 border border-slate-200 cursor-pointer hover:bg-blue-50 transition flex gap-3 items-center"
                    >
                      <img src={slicni.slika} alt={slicni.naslov} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-xs text-slate-900 truncate">{slicni.naslov}</h5>
                        <p className="text-blue-700 font-black text-xs mt-1">{slicni.cijena} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
            <p className="text-xs text-slate-500 mb-4">Prijavite se putem računa ili društvenih mreža:</p>
            
            <div className="space-y-2 mb-4">
              <button 
                type="button" 
                onClick={() => prijavaPrekoMreze("Google")}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl text-xs shadow-sm transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.05.0 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Nastavi s Google (Gmail)</span>
              </button>

              <button 
                type="button" 
                onClick={() => prijavaPrekoMreze("Apple")}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.97.99-3.12-0.97.04-2.16.65-2.85 1.46-.61.72-1.15 1.89-.99 3.01 1.09.08 2.21-.54 2.85-1.35z"/>
                </svg>
                <span>Nastavi s Apple ID</span>
              </button>

              <button 
                type="button" 
                onClick={() => prijavaPrekoMreze("Facebook")}
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Nastavi s Facebookom</span>
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-3 text-[11px] font-bold text-slate-400 uppercase">ili klasično</span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>

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
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-sm transition">
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
            <h2 className="text-2xl font-black mb-1">Registracija na Kupko</h2>
            <p className="text-xs text-slate-500 mb-4">Registrirajte se brzo putem društvenih mreža:</p>
            
            <div className="space-y-2 mb-4">
              <button 
                type="button" 
                onClick={() => prijavaPrekoMreze("Google")}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl text-xs shadow-sm transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.0 10.05.0 12s.46 3.8 1.27 5.42l4.01-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Registracija s Google (Gmail)</span>
              </button>

              <button 
                type="button" 
                onClick={() => prijavaPrekoMreze("Apple")}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.12-1.97.99-3.12-0.97.04-2.16.65-2.85 1.46-.61.72-1.15 1.89-.99 3.01 1.09.08 2.21-.54 2.85-1.35z"/>
                </svg>
                <span>Registracija s Apple ID</span>
              </button>

              <button 
                type="button" 
                onClick={() => prijavaPrekoMreze("Facebook")}
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Registracija s Facebookom</span>
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-3 text-[11px] font-bold text-slate-400 uppercase">ili klasično</span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>

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
              <button type="submit" className="w-full bg-amber-400 text-blue-950 font-bold py-3 rounded-xl text-sm hover:bg-amber-300 transition">
                Registriraj se
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
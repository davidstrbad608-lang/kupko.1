"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, PlusCircle, MapPin, Phone, Mail, Heart, 
  RotateCw, ArrowLeft, ShieldCheck, User, LogIn, UserPlus, Tag 
} from "lucide-react";

// Sučelje za Oglas
interface Oglas {
  id: number;
  naslov: string;
  cijena: number;
  kategorija: string;
  podkategorija: string;
  zupanija: string;
  opis: string;
  slika: string;
  prodavac: string;
  telefon: string;
  email: string;
  isPromoviran?: boolean;
  datumObjave: string;
  autoreEmail?: string;
}

// Početni oglasi
const POCETNI_OGLASI: Oglas[] = [
  {
    id: 1,
    naslov: "BMW Serija 3 320d Automatic M-Sport - Full Oprema",
    cijena: 18500,
    kategorija: "Vozila",
    podkategorija: "Automobili",
    zupanija: "Grad Zagreb",
    opis: "Izvrsno stanje, redovito servisiran u ovlaštenom servisu. M-Sport paket opreme, navigacija, kožna sjedala, parking senzori.",
    slika: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
    prodavac: "Ivan Horvat",
    telefon: "091 234 5678",
    email: "ivan@example.com",
    isPromoviran: true,
    datumObjave: new Date().toISOString(),
    autoreEmail: "ivan@example.com"
  },
  {
    id: 2,
    naslov: "iPhone 15 Pro Max 256GB Natural Titanium",
    cijena: 1100,
    kategorija: "Elektronika",
    podkategorija: "Mobiteli",
    zupanija: "Splitsko-dalmatinska",
    opis: "Kao nov, bez tragova korištenja. Garancija još 12 mjeseci. Uz mobitel dolazi originalna kutija i punjač.",
    slika: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=1000",
    prodavac: "Marko Marić",
    telefon: "098 765 4321",
    email: "marko@example.com",
    isPromoviran: true,
    datumObjave: new Date().toISOString(),
    autoreEmail: "marko@example.com"
  },
  {
    id: 3,
    naslov: "Audi A4 2.0 TDI S-Line 2020",
    cijena: 21000,
    kategorija: "Vozila",
    podkategorija: "Automobili",
    zupanija: "Grad Zagreb",
    opis: "S-Line unutarnji i vanjski paket, Virtual Cockpit, matrična LED svjetla. Registriran godinu dana.",
    slika: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000",
    prodavac: "Petar Kovač",
    telefon: "095 111 2233",
    email: "petar@example.com",
    isPromoviran: false,
    datumObjave: new Date().toISOString(),
    autoreEmail: "petar@example.com"
  }
];

export default function KupkoApp() {
  const [oglasi, setOglasi] = useState<Oglas[]>(POCETNI_OGLASI);
  const [pretraga, setPretraga] = useState("");
  const [odabranaKategorija, setOdabranaKategorija] = useState("Sve");
  const [odabranaZupanija, setOdabranaZupanija] = useState("Sve");
  const [odabraniOglas, setOdabraniOglas] = useState<Oglas | null>(null);

  // Omiljeni oglasi
  const [omiljeniIds, setOmiljeniIds] = useState<number[]>([]);
  const [prikaziSamoOmiljene, setPrikaziSamoOmiljene] = useState(false);

  // Prijava i Registracija
  const [prijavljeniKorisnik, setPrijavljeniKorisnik] = useState<{ ime: string; email: string } | null>(null);
  const [prikaziPrijavu, setPrikaziPrijavu] = useState(false);
  const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);

  const [formaPrijava, setFormaPrijava] = useState({ email: "", lozinka: "" });
  const [formaRegistracija, setFormaRegistracija] = useState({ ime: "", email: "", lozinka: "" });

  // Forma za novi oglas
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [noviOglas, setNoviOglas] = useState({
    naslov: "",
    cijena: "",
    kategorija: "Vozila",
    podkategorija: "Automobili",
    zupanija: "Grad Zagreb",
    opis: "",
    slika: "",
    prodavac: "",
    telefon: "",
    email: ""
  });

  // Učitavanje omiljenih iz localStorage-a
  useEffect(() => {
    const spremljeno = localStorage.getItem("kupko_omiljeni");
    if (spremljeno) {
      try {
        setOmiljeniIds(JSON.parse(spremljeno));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Prebacivanje omiljenog oglasa
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

  // Automatsko obnavljanje oglasa
  const obnoviOglas = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setOglasi((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, datumObjave: new Date().toISOString() }
          : item
      )
    );
    alert("Oglas je uspješno obnovljen i vraćen na sam vrh ponude!");
  };

  // Prijava
  const rukujPrijavom = (e: React.FormEvent) => {
    e.preventDefault();
    if (formaPrijava.email) {
      const imeKorisnika = formaPrijava.email.split("@")[0];
      setPrijavljeniKorisnik({ ime: imeKorisnika, email: formaPrijava.email });
      setPrikaziPrijavu(false);
      setFormaPrijava({ email: "", lozinka: "" });
    }
  };

  // Registracija
  const rukujRegistracijom = (e: React.FormEvent) => {
    e.preventDefault();
    if (formaRegistracija.email && formaRegistracija.ime) {
      setPrijavljeniKorisnik({ ime: formaRegistracija.ime, email: formaRegistracija.email });
      setPrikaziRegistraciju(false);
      setFormaRegistracija({ ime: "", email: "", lozinka: "" });
    }
  };

  // Slanje novog oglasa
  const rukujPredajom = (e: React.FormEvent) => {
    e.preventDefault();
    const stvoreniOglas: Oglas = {
      id: Date.now(),
      naslov: noviOglas.naslov,
      cijena: Number(noviOglas.cijena) || 0,
      kategorija: noviOglas.kategorija,
      podkategorija: noviOglas.podkategorija,
      zupanija: noviOglas.zupanija,
      opis: noviOglas.opis,
      slika: noviOglas.slika || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
      prodavac: prijavljeniKorisnik ? prijavljeniKorisnik.ime : (noviOglas.prodavac || "Korisnik"),
      telefon: noviOglas.telefon,
      email: prijavljeniKorisnik ? prijavljeniKorisnik.email : noviOglas.email,
      datumObjave: new Date().toISOString(),
      autoreEmail: prijavljeniKorisnik ? prijavljeniKorisnik.email : noviOglas.email
    };

    setOglasi([stvoreniOglas, ...oglasi]);
    setPrikaziFormu(false);
    setNoviOglas({
      naslov: "", cijena: "", kategorija: "Vozila", podkategorija: "Automobili",
      zupanija: "Grad Zagreb", opis: "", slika: "", prodavac: "", telefon: "", email: ""
    });
  };

  // Filtrirani oglasi
  const filtriraniOglasi = oglasi.filter((o) => {
    const ujedaPretraga = o.naslov.toLowerCase().includes(pretraga.toLowerCase()) ||
                          o.opis.toLowerCase().includes(pretraga.toLowerCase());
    const ujedaKat = odabranaKategorija === "Sve" || o.kategorija === odabranaKategorija;
    const ujedaZup = odabranaZupanija === "Sve" || o.zupanija === odabranaZupanija;
    const ujedaOmiljene = !prikaziSamoOmiljene || omiljeniIds.includes(o.id);

    return ujedaPretraga && ujedaKat && ujedaZup && ujedaOmiljene;
  });

  // Slični oglasi
  const slicniOglasi = odabraniOglas
    ? oglasi.filter(
        (o) =>
          o.id !== odabraniOglas.id &&
          (o.kategorija === odabraniOglas.kategorija || o.zupanija === odabraniOglas.zupanija)
      ).slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* VRŠNA TRAKA - PRIJAVA & REGISTRACIJA */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 border-b border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>Kupko.hr - Hrvatski Marketplace Oglasnik</span>
          <div className="flex items-center gap-4">
            {prijavljeniKorisnik ? (
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {prijavljeniKorisnik.ime}
                </span>
                <button
                  onClick={() => setPrijavljeniKorisnik(null)}
                  className="hover:text-white transition underline"
                >
                  Odjava
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setPrikaziPrijavu(true)}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" /> Prijava
                </button>
                <button
                  onClick={() => setPrikaziRegistraciju(true)}
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Registracija
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* HEADER / ZAGLAVLJE */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => { setOdabraniOglas(null); setPrikaziSamoOmiljene(false); }}
          >
            <div className="bg-amber-400 text-slate-900 font-black px-3 py-1 rounded-xl text-xl tracking-wider">
              KUPKO.hr
            </div>
          </div>

          {/* Pretraživanje */}
          <div className="flex-1 max-w-2xl flex items-center bg-slate-800 rounded-xl px-3 py-1.5 border border-slate-700">
            <Search className="w-5 h-5 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Pretraži ponudu (npr. BMW, iPhone...)"
              value={pretraga}
              onChange={(e) => setPretraga(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none w-full text-sm placeholder-slate-400"
            />
          </div>

          {/* Tipke u zaglavlju */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPrikaziSamoOmiljene(!prikaziSamoOmiljene)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition ${
                prikaziSamoOmiljene ? "bg-red-500 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              <Heart className={`w-4 h-4 ${prikaziSamoOmiljene ? "fill-white" : "text-red-400"}`} />
              <span>Omiljeni ({omiljeniIds.length})</span>
            </button>

            <button
              onClick={() => setPrikaziFormu(true)}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition shadow"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Predaj oglas</span>
            </button>
          </div>
        </div>
      </header>

      {/* GLAVNI SADRŽAJ */}
      <main className="max-w-7xl mx-auto px-4 mt-6">
        {/* DETALJNI PRIKAZ OGLASA */}
        {odabraniOglas ? (
          <div>
            <button
              onClick={() => setOdabraniOglas(null)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium mb-4"
            >
              <ArrowLeft className="w-5 h-5" /> Nazad na sve oglase
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lijeva strana - Slika i Detalji */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                  <div className="relative rounded-xl overflow-hidden bg-slate-100 max-h-[450px]">
                    <img
                      src={odabraniOglas.slika}
                      alt={odabraniOglas.naslov}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => toggleOmiljeni(e, odabraniOglas.id)}
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2.5 rounded-full shadow hover:bg-white transition"
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

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-md">
                        {odabraniOglas.kategorija} / {odabraniOglas.podkategorija}
                      </span>
                      <span className="text-xs text-slate-400">
                        Objavljeno: {new Date(odabraniOglas.datumObjave).toLocaleDateString("hr-HR")}
                      </span>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900">{odabraniOglas.naslov}</h1>
                    <div className="text-3xl font-black text-amber-600">
                      {odabraniOglas.cijena.toLocaleString("hr-HR")} €
                    </div>

                    <hr className="my-4 border-slate-100" />

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Opis oglasa</h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                        {odabraniOglas.opis}
                      </p>
                    </div>
                  </div>
                </div>

                {/* KARTA / LOKACIJA */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    Lokacija: {odabraniOglas.zupanija}
                  </h3>
                  
                  <div className="w-full h-48 bg-slate-200 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-300">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="z-10 text-center p-4 bg-white/90 rounded-xl shadow-md backdrop-blur border border-slate-200">
                      <MapPin className="w-8 h-8 text-red-500 mx-auto animate-bounce mb-1" />
                      <p className="font-bold text-slate-800 text-sm">{odabraniOglas.zupanija}</p>
                      <p className="text-xs text-slate-500">Približna lokacija prodavača</p>
                    </div>
                  </div>
                </div>

                {/* SLIČNI OGLASI */}
                {slicniOglasi.length > 0 && (
                  <div className="space-y-4 mt-8">
                    <h3 className="text-xl font-bold text-slate-900">Slični oglasi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {slicniOglasi.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setOdabraniOglas(item)}
                          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition"
                        >
                          <img src={item.slika} alt={item.naslov} className="w-full h-32 object-cover" />
                          <div className="p-3">
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.naslov}</h4>
                            <p className="text-amber-600 font-black text-sm mt-1">{item.cijena} €</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Desna strana - Prodavač i Kontakt */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-800 text-xl">
                      {odabraniOglas.prodavac.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{odabraniOglas.prodavac}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verificirani korisnik
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${odabraniOglas.telefon}`}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition shadow"
                  >
                    <Phone className="w-5 h-5" /> Nazovi: {odabraniOglas.telefon}
                  </a>

                  <a
                    href={`mailto:${odabraniOglas.email}`}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <Mail className="w-5 h-5" /> Pošalji poruku
                  </a>

                  {/* Gumb za Obnavljanje */}
                  <button
                    onClick={(e) => obnoviOglas(e, odabraniOglas.id)}
                    className="w-full border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition"
                  >
                    <RotateCw className="w-4 h-4 text-amber-500" /> Obnovi oglas na vrh
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* POPIS SVIH OGLASA */
          <div className="space-y-6">
            {/* Filteri */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-bold text-slate-700">Kategorija:</span>
                {["Sve", "Vozila", "Elektronika", "Nekretnine"].map((kat) => (
                  <button
                    key={kat}
                    onClick={() => setOdabranaKategorija(kat)}
                    className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition ${
                      odabranaKategorija === kat
                        ? "bg-amber-400 text-slate-900 shadow"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {kat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <select
                  value={odabranaZupanija}
                  onChange={(e) => setOdabranaZupanija(e.target.value)}
                  className="bg-slate-100 border-none rounded-xl text-sm font-semibold p-2 focus:outline-none"
                >
                  <option value="Sve">Sve županije</option>
                  <option value="Grad Zagreb">Grad Zagreb</option>
                  <option value="Splitsko-dalmatinska">Splitsko-dalmatinska</option>
                  <option value="Primorsko-goranska">Primorsko-goranska</option>
                </select>
              </div>
            </div>

            {/* Mreža oglasa */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtriraniOglasi.map((o) => (
                <div
                  key={o.id}
                  onClick={() => setOdabraniOglas(o)}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col group relative"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={o.slika}
                      alt={o.naslov}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    {o.isPromoviran && (
                      <span className="absolute top-3 left-3 bg-amber-400 text-slate-900 text-xs font-black px-2.5 py-1 rounded-md shadow">
                        TOP OGLAS
                      </span>
                    )}
                    <button
                      onClick={(e) => toggleOmiljeni(e, o.id)}
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white transition"
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
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{o.kategorija}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {o.zupanija}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition line-clamp-2">
                        {o.naslov}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xl font-black text-amber-600">
                        {o.cijena.toLocaleString("hr-HR")} €
                      </span>

                      <button
                        onClick={(e) => obnoviOglas(e, o.id)}
                        title="Obnovi oglas"
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-amber-600 transition"
                      >
                        <RotateCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtriraniOglasi.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <p className="text-slate-500 font-semibold">Nema pronađenih oglasa za odabrane kriterije.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL ZA PRIJAVU */}
      {prikaziPrijavu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative">
            <button onClick={() => setPrikaziPrijavu(false)} className="absolute top-4 right-4 text-slate-400">✕</button>
            <h2 className="text-2xl font-black mb-4">Prijava na Kupko.hr</h2>
            <form onSubmit={rukujPrijavom} className="space-y-3">
              <input
                type="email"
                required
                placeholder="E-mail adresa"
                value={formaPrijava.email}
                onChange={(e) => setFormaPrijava({ ...formaPrijava, email: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              />
              <input
                type="password"
                required
                placeholder="Lozinka"
                value={formaPrijava.lozinka}
                onChange={(e) => setFormaPrijava({ ...formaPrijava, lozinka: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              />
              <button type="submit" className="w-full bg-amber-400 text-slate-900 font-bold py-3 rounded-xl text-sm">
                Prijavi se
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ZA REGISTRACIJU */}
      {prikaziRegistraciju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative">
            <button onClick={() => setPrikaziRegistraciju(false)} className="absolute top-4 right-4 text-slate-400">✕</button>
            <h2 className="text-2xl font-black mb-4">Registracija</h2>
            <form onSubmit={rukujRegistracijom} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Ime / Korisničko ime"
                value={formaRegistracija.ime}
                onChange={(e) => setFormaRegistracija({ ...formaRegistracija, ime: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              />
              <input
                type="email"
                required
                placeholder="E-mail adresa"
                value={formaRegistracija.email}
                onChange={(e) => setFormaRegistracija({ ...formaRegistracija, email: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              />
              <input
                type="password"
                required
                placeholder="Lozinka"
                value={formaRegistracija.lozinka}
                onChange={(e) => setFormaRegistracija({ ...formaRegistracija, lozinka: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
              />
              <button type="submit" className="w-full bg-amber-400 text-slate-900 font-bold py-3 rounded-xl text-sm">
                Registriraj se
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ZA PREDAJU OGLASA */}
      {prikaziFormu && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setPrikaziFormu(false)} className="absolute top-4 right-4 text-slate-400 font-bold">
              ✕
            </button>
            <h2 className="text-xl font-black text-slate-900 mb-4">Predaj novi oglas na Kupko.hr</h2>

            <form onSubmit={rukujPredajom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Naslov oglasa</label>
                <input
                  type="text"
                  required
                  placeholder="npr. iPhone 15 Pro Max"
                  value={noviOglas.naslov}
                  onChange={(e) => setNoviOglas({ ...noviOglas, naslov: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cijena (€)</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={noviOglas.cijena}
                    onChange={(e) => setNoviOglas({ ...noviOglas, cijena: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategorija</label>
                  <select
                    value={noviOglas.kategorija}
                    onChange={(e) => setNoviOglas({ ...noviOglas, kategorija: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                  >
                    <option value="Vozila">Vozila</option>
                    <option value="Elektronika">Elektronika</option>
                    <option value="Nekretnine">Nekretnine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Županija</label>
                <select
                  value={noviOglas.zupanija}
                  onChange={(e) => setNoviOglas({ ...noviOglas, zupanija: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                >
                  <option value="Grad Zagreb">Grad Zagreb</option>
                  <option value="Splitsko-dalmatinska">Splitsko-dalmatinska</option>
                  <option value="Primorsko-goranska">Primorsko-goranska</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Slike</label>
                <input
                  type="text"
                  placeholder="https://link-do-slike.com/slika.jpg"
                  value={noviOglas.slika}
                  onChange={(e) => setNoviOglas({ ...noviOglas, slika: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Opis oglasa</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Unesite detaljan opis..."
                  value={noviOglas.opis}
                  onChange={(e) => setNoviOglas({ ...noviOglas, opis: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefon</label>
                  <input
                    type="text"
                    required
                    placeholder="091 234 567"
                    value={noviOglas.telefon}
                    onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vaše Ime</label>
                  <input
                    type="text"
                    required
                    placeholder="Petar"
                    value={noviOglas.prodavac}
                    onChange={(e) => setNoviOglas({ ...noviOglas, prodavac: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-black py-3 rounded-xl transition shadow mt-2"
              >
                Objavi oglas
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
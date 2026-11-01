"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { 
  Search, PlusCircle, Heart, MapPin, Grid, List, Phone, X, 
  ShoppingBag, CheckCircle2, Mail, User, Clock, Upload, Image as ImageIcon,
  LogIn, UserPlus, Sparkles, Compass, Menu, Tag, Car, Home, ShieldCheck, Video, CreditCard, Crown, Package, Trash2, Shield, RotateCw, ArrowLeft, Lock, Gauge, Calendar, Fuel, Cog, HelpCircle, FileText, Cookie, Map, Info, Megaphone, Edit3, TrendingDown, ChevronLeft, ChevronRight, Percent, Check, AlertCircle, Send, ShieldAlert, SlidersHorizontal, Eye, Bot, Navigation, MessageSquare, Wallet, Bell, Settings, Flame, Play, KeyRound, Share2, BarChart2
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
    id: "kucni-ljubimci",
    naziv: "Kućni ljubimci",
    ikona: "🐾",
    podkategorije: ["Psi", "Mačke", "Ptice", "Akvaristika i ribice", "Glodavci", "Oprema za ljubimce", "Ostalo - Kućni ljubimci"]
  },
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

const DEMO_OGLASI = [
  {
    id: 9001, naslov: "Škoda Kodiaq 2.0 TDI DSG 4x4", cijena: "28900", kategorija: "auto-moto", podkategorija: "Osobna vozila", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Vukovarska", stanje: "Korišteno", opis: "Osnovne informacije: Marka vozila Škoda, Model vozila Kodiaq, Oblik karoserije Terensko vozilo (SUV), Motor 2.0 TDI. Dodatne opcije: Načini plaćanja, Ostali dodaci, Gume i naplatci, Multimedia, Zaštita od krađe, Svjetla i farovi, Udobnost putnika, Sigurnost putnika, Sustavi pomoći.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0911234567", promoviran: true, top: true, datum: "Objavljeno danas u 10:00", pregledi: 45, isDemo: true, slike: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"]
  }
];

export default function KupkoApp() {
  const [oglasi, setOglasi] = useState<any[]>([]);
  const [registriraniKorisnici, setRegistriraniKorisnici] = useState<any[]>([]);
  const [poruke, setPoruke] = useState<any[]>([]);
  const [prijavljeniOglasi, setPrijavljeniOglasi] = useState<any[]>([]);
  
  const [pojamPretrage, setPojamPretrage] = useState("");
  const [odabranaKategorija, setOdabranaKategorija] = useState("sve");
  const [odabranaPodkategorija, setOdabranaPodkategorija] = useState("sve");
  const [odabranaZupanija, setOdabranaZupanija] = useState("sve");
  
  const [minCijena, setMinCijena] = useState("");
  const [maxCijena, setMaxCijena] = useState("");
  const [odabranoStanje, setOdabranoStanje] = useState("sve");

  const [sortiranje, setSortiranje] = useState("najnovije"); 
  const [odabraniProdavacFilter, setOdabraniProdavacFilter] = useState<string | null>(null);
  const [noviTekstPoruke, setNoviTekstPoruke] = useState("");

  const [trenutnaStranica, setTrenutnaStranica] = useState(1);
  const oglasiPoStranici = 9;

  const [omiljeniIds, setOmiljeniIds] = useState<number[]>([]);
  const [prikaziSamoOmiljene, setPrikaziSamoOmiljene] = useState(false);
  const [prikaziSamoMojeOglase, setPrikaziSamoMojeOglase] = useState(false);

  const [prikaziReelsMod, setPrikaziReelsMod] = useState(false);
  const [reelsIndex, setReelsIndex] = useState(0);

  const [prikaz, setPrikaz] = useState("grid");
  const [odabraniOglas, setOdabraniOglas] = useState<any>(null);
  
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [prikaziPrijavu, setPrikaziPrijavu] = useState(false);
  const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);
  const [prikaziMeniKorisnika, setPrikaziMeniKorisnika] = useState(false);

  const [prikaziUvjeteModal, setPrikaziUvjeteModal] = useState(false);
  const [prikaziPrivatnostModal, setPrikaziPrivatnostModal] = useState(false);
  const [prikaziCookieBanner, setPrikaziCookieBanner] = useState(false);

  const [prikaziZaboravljenuLozinku, setPrikaziZaboravljenuLozinku] = useState(false);
  const [zaboravljeniEmail, setZaboravljeniEmail] = useState("");
  const [korakResetiranja, setKorakResetiranja] = useState(1);
  const [kodResetiranja, setKodResetiranja] = useState("");
  const [uneseniKodReset, setUneseniKodReset] = useState("");
  const [novaLozinka, setNovaLozinka] = useState("");

  const [prikaziUnosPodatakaModal, setPrikaziUnosPodatakaModal] = useState(false);
  const [korisnickiPodaci, setKorisnickiPodaci] = useState({
    ime: "", prezime: "", adresa: "", grad: "", postanskiBroj: "", telefon: ""
  });

  const [prikaziSanducicPoruka, setPrikaziSanducicPoruka] = useState(false);
  const [aktivniRazgovorEmail, setAktivniRazgovorEmail] = useState<string | null>(null);

  const [prikaziUredivanje, setPrikaziUredivanje] = useState(false);
  const [oglasZaUrediti, setOglasZaUrediti] = useState<any>(null);

  const [prikaziPlacanjePromo, setPrikaziPlacanjePromo] = useState(false);
  const [oglasZaPromociju, setOglasZaPromociju] = useState<any>(null);
  const [odabraniPromoPaket, setOdabraniPromoPaket] = useState<any>(null);

  const [prikaziModalPrijaveOglasa, setPrikaziModalPrijaveOglasa] = useState(false);
  const [razlogPrijave, setRazlogPrijave] = useState("Prevara / Lažni oglas");
  const [opisPrijave, setOpisPrijave] = useState("");

  const [korakVerifikacije, setKorakVerifikacije] = useState(false);
  const [privremeniEmail, setPrivremeniEmail] = useState("");
  const [privremenoIme, setPrivremenoIme] = useState("");
  const [privremenaLozinka, setPrivremenaLozinka] = useState("");
  const [uneseniKod, setUneseniKod] = useState("");
  const [generiraniKod, setGeneriraniKod] = useState("");

  const [promoSlajderIndex, setPromoSlajderIndex] = useState(0);

  const [korisnik, setKorisnik] = useState<{ ime: string; email: string; isOwner: boolean; promoKrediti?: number } | null>(null);
  
  const [formaPrijava, setFormaPrijava] = useState({ korisnickoIme: "", lozinka: "" });
  const [formaRegistracija, setFormaRegistracija] = useState({ 
    ime: "", email: "", lozinka: "", prihvacenaPrivatnost: false, prihvaceniUvjeti: false 
  });
  
  const [sigurnosniKod, setSigurnosniKod] = useState({ a: 3, b: 4, unos: "" });

  const [noviOglas, setNoviOglas] = useState({
    naslov: "", cijena: "", staraCijena: "", popustPostotak: "", snizeno: false,
    kategorija: "auto-moto", podkategorija: "Osobna vozila",
    zupanija: "Grad Zagreb", grad: "", adresa: "", stanje: "Novo", slike: [] as string[], opis: "",
    prodavac: "", telefon: "", email: "", promoviran: false,
    godiste: "", kilometri: "", snagaKw: "", gorivo: "Dizel", mjenjac: "Ručni",
    kvadratura: "", sobe: "",
    // Dodatne auto opcije
    markaVozila: "Škoda",
    modelVozila: "Kodiaq",
    oblikKaroserije: "Terensko vozilo (SUV)",
    motor: "2.0 TDI",
    naciniPlacanja: "",
    ostaliDodaci: "",
    gumeNaplatci: "",
    multimedia: "",
    zastitaOdKrade: "",
    svjetlaFarovi: "",
    udobnostPutnika: "",
    sigurnostPutnika: "",
    sustaviPomoci: ""
  });

  useEffect(() => {
    dohvatiOglaseIzSupabase();

    const urlParams = new URLSearchParams(window.location.search);
    const refKod = urlParams.get("ref");
    const isSuccess = urlParams.get("success");

    if (refKod) {
      localStorage.setItem("kupko_referral", refKod);
    }

    if (isSuccess === "true") {
      setTimeout(() => {
        alert("🎉 Uplata uspješno evidentirana! Vaš oglas je promoviran.");
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 500);
    }

    const spremljeniKorisnici = localStorage.getItem("kupko_baza_korisnika");
    if (spremljeniKorisnici) { try { setRegistriraniKorisnici(JSON.parse(spremljeniKorisnici)); } catch (e) { console.error(e); } }
    const spremljenePoruke = localStorage.getItem("kupko_poruke_v2");
    if (spremljenePoruke) { try { setPoruke(JSON.parse(spremljenePoruke)); } catch (e) { console.error(e); } }
    const spremljenePrijave = localStorage.getItem("kupko_prijavljeni_oglasi");
    if (spremljenePrijave) { try { setPrijavljeniOglasi(JSON.parse(spremljenePrijave)); } catch (e) { console.error(e); } }
    const spremljeniOmiljeni = localStorage.getItem("kupko_omiljeni");
    if (spremljeniOmiljeni) { try { setOmiljeniIds(JSON.parse(spremljeniOmiljeni)); } catch (e) { console.error(e); } }
    const spremljeniKorisnik = localStorage.getItem("kupko_aktivni_korisnik");
    if (spremljeniKorisnik) { try { setKorisnik(JSON.parse(spremljeniKorisnik)); } catch (e) { console.error(e); } }
    const spremljeniOsobniPodaci = localStorage.getItem("kupko_osobni_podaci");
    if (spremljeniOsobniPodaci) { try { setKorisnickiPodaci(JSON.parse(spremljeniOsobniPodaci)); } catch (e) { console.error(e); } }
    
    const kolaciciPrihvaceni = localStorage.getItem("kupko_kolacici_prihvaceni");
    if (!kolaciciPrihvaceni) {
      setPrikaziCookieBanner(true);
    }

    generirajKôd();
  }, []);

  const dohvatiOglaseIzSupabase = async () => {
    try {
      const { data, error } = await supabase.from('oglasi').select('*');
      if (error || !data || data.length === 0) {
        setOglasi(DEMO_OGLASI);
      } else {
        setOglasi([...data, ...DEMO_OGLASI]);
      }
    } catch (err) {
      setOglasi(DEMO_OGLASI);
    }
  };

  const otvoriDetaljeOglasa = async (o: any) => {
    const noviPregledi = (o.pregledi || 0) + 1;
    setOglasi(prev => prev.map(item => item.id === o.id ? { ...item, pregledi: noviPregledi } : item));
    setOdabraniOglas({ ...o, pregledi: noviPregledi });
  };

  const posaljiPorukuProdavacu = (oglasId: any, primateljEmail: string) => {
    if (!korisnik) {
      alert("Morate biti prijavljeni da biste poslali poruku prodavaču!");
      setPrikaziPrijavu(true);
      return;
    }
    if (!noviTekstPoruke.trim()) {
      alert("Molimo unesite tekst poruke.");
      return;
    }

    const novaPoruka = {
      id: Date.now().toString(),
      oglasId: String(oglasId),
      posiljatelj: korisnik.email,
      primatelj: primateljEmail || "nepoznato@kupko.hr",
      tekst: noviTekstPoruke,
      datum: new Date().toLocaleDateString("hr-HR") + " " + new Date().toLocaleTimeString("hr-HR", { hour: '2-digit', minute: '2-digit' }),
      procitano: false
    };

    const azuriranePoruke = [novaPoruka, ...poruke];
    setPoruke(azuriranePoruke);
    localStorage.setItem("kupko_poruke_v2", JSON.stringify(azuriranePoruke));
    setNoviTekstPoruke("");
    alert("Poruka je uspješno poslana prodavaču!");
  };

  const posaljiOdgovorU_Inboxu = (primateljEmail: string) => {
    if (!korisnik || !noviTekstPoruke.trim()) return;

    const novaPoruka = {
      id: Date.now().toString(),
      oglasId: "0",
      posiljatelj: korisnik.email,
      primatelj: primateljEmail,
      tekst: noviTekstPoruke,
      datum: new Date().toLocaleDateString("hr-HR") + " " + new Date().toLocaleTimeString("hr-HR", { hour: '2-digit', minute: '2-digit' }),
      procitano: false
    };

    const azuriranePoruke = [...poruke, novaPoruka];
    setPoruke(azuriranePoruke);
    localStorage.setItem("kupko_poruke_v2", JSON.stringify(azuriranePoruke));
    setNoviTekstPoruke("");
  };

  const otvoriSanducicISveProcitaj = () => {
    setPrikaziSanducicPoruka(true);
    if (korisnik) {
      const azurirane = poruke.map(p => p.primatelj === korisnik.email ? { ...p, procitano: true } : p);
      setPoruke(azurirane);
      localStorage.setItem("kupko_poruke_v2", JSON.stringify(azurirane));
    }
  };

  const prihvatiKolacice = () => {
    localStorage.setItem("kupko_kolacici_prihvaceni", "true");
    setPrikaziCookieBanner(false);
  };

  const generirajKôd = () => {
    const num1 = Math.floor(Math.random() * 8) + 1;
    const num2 = Math.floor(Math.random() * 8) + 1;
    setSigurnosniKod({ a: num1, b: num2, unos: "" });
  };

  const postaviKorisnika = (podaciKorisnika: { ime: string; email: string; isOwner: boolean; promoKrediti?: number } | null) => {
    setKorisnik(podaciKorisnika);
    if (podaciKorisnika) {
      localStorage.setItem("kupko_aktivni_korisnik", JSON.stringify(podaciKorisnika));
    } else {
      localStorage.removeItem("kupko_aktivni_korisnik");
    }
  };

  const toggleOmiljeni = (e: React.MouseEvent, id: any) => {
    e.stopPropagation();
    let noviIds: any[];
    if (omiljeniIds.includes(id)) {
      noviIds = omiljeniIds.filter((item) => item !== id);
    } else {
      noviIds = [...omiljeniIds, id];
    }
    setOmiljeniIds(noviIds);
    localStorage.setItem("kupko_omiljeni", JSON.stringify(noviIds));
  };

  const rukujPrijavom = (e: React.FormEvent) => {
    e.preventDefault();
    const imeClean = formaPrijava.korisnickoIme.trim().toLowerCase();
    
    if (imeClean === "admin" && formaPrijava.lozinka === "admin123") {
      const adminKorisnik = { ime: "Admin", email: "admin@kupko.hr", isOwner: true, promoKrediti: 99 };
      postaviKorisnika(adminKorisnik);
      setPrikaziPrijavu(false);
      setFormaPrijava({ korisnickoIme: "", lozinka: "" });
      alert("Uspješno prijavljeni kao Administrator!");
      return;
    }

    const pronadjeniKorisnik = registriraniKorisnici.find(
      (k) => k.ime.toLowerCase() === imeClean && k.lozinka === formaPrijava.lozinka
    );

    if (!pronadjeniKorisnik) {
      alert("Neispravno korisničko ime ili lozinka!");
      return;
    }

    const aktivni = { 
      ime: pronadjeniKorisnik.ime, 
      email: pronadjeniKorisnik.email, 
      isOwner: false,
      promoKrediti: pronadjeniKorisnik.promoKrediti ?? 0 
    };
    postaviKorisnika(aktivni);
    setPrikaziPrijavu(false);
    setFormaPrijava({ korisnickoIme: "", lozinka: "" });
  };

  const rukujRegistracijom = async (e: React.FormEvent) => {
    e.preventDefault();
    const imeClean = formaRegistracija.ime.trim();
    const emailLower = formaRegistracija.email.toLowerCase().trim();

    if (!formaRegistracija.prihvacenaPrivatnost || !formaRegistracija.prihvaceniUvjeti) {
      alert("Morate prihvatiti uvjete i privatnost.");
      return;
    }

    const noviRegKorisnik = {
      ime: imeClean, 
      email: emailLower, 
      lozinka: formaRegistracija.lozinka,
      promoKrediti: 1
    };

    const azuriraniBazaKorisnika = [...registriraniKorisnici, noviRegKorisnik];
    setRegistriraniKorisnici(azuriraniBazaKorisnika);
    localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniBazaKorisnika));

    postaviKorisnika({ ime: imeClean, email: emailLower, isOwner: false, promoKrediti: 1 });
    setPrikaziRegistraciju(false);
    alert("Uspješna registracija!");
    setPrikaziUnosPodatakaModal(true);
  };

  const spremiOsobnePodatke = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("kupko_osobni_podaci", JSON.stringify(korisnickiPodaci));
    setPrikaziUnosPodatakaModal(false);
    alert("Osobni podaci su uspješno spremljeni!");
  };

  const rukujDodavanjemOglasa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!korisnik) {
      alert("Morate biti prijavljeni!");
      setPrikaziFormu(false);
      setPrikaziPrijavu(true);
      return;
    }

    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;

    const stvoreniOglas = {
      naslov: noviOglas.naslov,
      cijena: noviOglas.cijena,
      kategorija: noviOglas.kategorija,
      podkategorija: noviOglas.podkategorija,
      zupanija: noviOglas.zupanija,
      grad: noviOglas.grad || null,
      adresa: noviOglas.adresa || null,
      stanje: noviOglas.stanje,
      opis: `Osnovne informacije: Marka vozila ${noviOglas.markaVozila}, Model vozila ${noviOglas.modelVozila}, Oblik karoserije ${noviOglas.oblikKaroserije}, Motor ${noviOglas.motor}. \nDodatne opcije: Načini plaćanja: ${noviOglas.naciniPlacanja}, Ostali dodaci: ${noviOglas.ostaliDodaci}, Gume i naplatci: ${noviOglas.gumeNaplatci}, Multimedia: ${noviOglas.multimedia}, Zaštita od krađe: ${noviOglas.zastitaOdKrade}, Svjetla i farovi: ${noviOglas.svjetlaFarovi}, Udobnost putnika: ${noviOglas.udobnostPutnika}, Sigurnost putnika: ${noviOglas.sigurnostPutnika}, Sustavi pomoći: ${noviOglas.sustaviPomoci}.\n\n${noviOglas.opis}`,
      prodavac: korisnik.ime,
      autor_email: korisnik.email,
      telefon: noviOglas.telefon,
      promoviran: noviOglas.promoviran,
      top: noviOglas.promoviran,
      datum: datumString,
      pregledi: 0,
      slike: noviOglas.slike.length > 0 ? noviOglas.slike : ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"]
    };

    const { error } = await supabase.from('oglasi').insert([stvoreniOglas]);
    if (error) {
      alert("Greška pri spremanju u bazu: " + error.message);
    } else {
      dohvatiOglaseIzSupabase();
      setPrikaziFormu(false);
      alert("Oglas je uspješno objavljen!");
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kupko_preset");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dzc1mpgz/auto/upload", { method: "POST", body: formData });
      const data = await response.json();
      return data.secure_url || null;
    } catch (error) {
      return null;
    }
  };

  const rukujVisestrukimUcitavanjemSlika = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const datoteke = e.target.files;
    if (datoteke) {
      for (const file of Array.from(datoteke)) {
        const url = await uploadToCloudinary(file);
        if (url) {
          setNoviOglas((prev) => ({ ...prev, slike: [...prev.slike, url] }));
        }
      }
    }
  };

  const filtriraniOglasi = oglasi.filter((o) => {
    const odgovaraTrazilici = o.naslov?.toLowerCase().includes(pojamPretrage.toLowerCase());
    const odgovaraKategoriji = odabranaKategorija === "sve" || o.kategorija === odabranaKategorija;
    const odgovaraZupaniji = odabranaZupanija === "sve" || o.zupanija === odabranaZupanija;
    const odgovaraOmiljenima = !prikaziSamoOmiljene || omiljeniIds.includes(o.id);
    const odgovaraMojima = !prikaziSamoMojeOglase || (korisnik && o.autor_email === korisnik.email);
    return odgovaraTrazilici && odgovaraKategoriji && odgovaraZupaniji && odgovaraOmiljenima && odgovaraMojima;
  });

  const neprocitanePorukeBroj = korisnik ? poruke.filter(p => p.primatelj === korisnik.email && !p.procitano).length : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* TOP BAR SA SVJETLEĆIM INBOX NOTIFIKACIJAMA */}
        <div className="bg-blue-950 text-slate-300 text-xs py-2 px-6 border-b border-blue-900">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="flex items-center gap-2 font-bold text-slate-200">
              <Shield className="w-4 h-4 text-emerald-400" /> 🇭🇷 Kupko.hr - Vodeći domaći oglasnik
            </span>

            <div className="flex items-center gap-5">
              {korisnik && (
                <button 
                  onClick={otvoriSanducicISveProcitaj}
                  className={`relative px-3.5 py-1.5 rounded-xl border flex items-center gap-2 transition font-bold shadow-sm ${
                    neprocitanePorukeBroj > 0 
                      ? "bg-rose-600 text-white border-rose-400 animate-pulse ring-2 ring-rose-400" 
                      : "bg-blue-900/85 text-amber-400 border-blue-700/50"
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Sandučić</span>
                  {neprocitanePorukeBroj > 0 && (
                    <span className="bg-amber-400 text-blue-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      {neprocitanePorukeBroj}
                    </span>
                  )}
                </button>
              )}

              {korisnik ? (
                <div className="relative">
                  <button 
                    onClick={() => setPrikaziMeniKorisnika(!prikaziMeniKorisnika)}
                    className="text-amber-400 font-extrabold flex items-center gap-2 bg-blue-900/85 px-3.5 py-1.5 rounded-xl border border-blue-700/50"
                  >
                    <User className="w-3.5 h-3.5" /> <span>{korisnik.ime}</span>
                  </button>

                  {prikaziMeniKorisnika && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border text-slate-900 z-50 py-2 text-sm">
                      <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSamoMojeOglase(true); }} className="w-full text-left px-4 py-2 font-bold hover:bg-blue-50">Moji oglasi</button>
                      <button onClick={() => { setPrikaziMeniKorisnika(false); otvoriSanducicISveProcitaj(); }} className="w-full text-left px-4 py-2 font-bold hover:bg-blue-50">Sandučić poruka</button>
                      <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziUnosPodatakaModal(true); }} className="w-full text-left px-4 py-2 font-bold hover:bg-blue-50">Osobni podaci</button>
                      <button onClick={() => { setPrikaziMeniKorisnika(false); postaviKorisnika(null); }} className="w-full text-left px-4 py-2 font-bold text-rose-600 hover:bg-rose-50">Odjava</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4 font-bold">
                  <button onClick={() => setPrikaziPrijavu(true)} className="hover:text-white">Prijava</button>
                  <button onClick={() => setPrikaziRegistraciju(true)} className="text-amber-400 font-black">Registracija</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* GLAVNI HEADER */}
        <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-40 border-b border-blue-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setOdabranaKategorija("sve"); setPrikaziSamoOmiljene(false); setPrikaziSamoMojeOglase(false); }}>
              <div className="bg-amber-400 p-2.5 rounded-2xl text-blue-950 font-black text-xl">KUPKO</div>
            </div>

            <div className="flex-1 max-w-2xl flex gap-2">
              <input
                type="text"
                placeholder="Pretraži ponudu..."
                value={pojamPretrage}
                onChange={(e) => setPojamPretrage(e.target.value)}
                className="w-full pl-4 py-3 rounded-2xl text-slate-900 bg-white shadow-sm text-sm font-medium outline-none"
              />
            </div>

            <button 
              onClick={() => {
                if (!korisnik) { alert("Prijavite se!"); setPrikaziPrijavu(true); return; }
                setPrikaziFormu(true);
              }}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-3 rounded-2xl flex items-center gap-2 uppercase text-xs"
            >
              <PlusCircle className="w-4 h-4" /> Predaj oglas
            </button>
          </div>
        </header>

        {/* SADRŽAJ */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filtriraniOglasi.map((o) => (
              <div key={o.id} onClick={() => otvoriDetaljeOglasa(o)} className="bg-white rounded-3xl shadow-sm border p-4 cursor-pointer hover:shadow-xl transition">
                <img src={o.slike?.[0] || ""} alt={o.naslov} className="w-full h-48 object-cover rounded-2xl mb-3" />
                <h4 className="font-extrabold text-sm mb-1">{o.naslov}</h4>
                <p className="text-lg font-black text-blue-700">{o.cijena} €</p>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-2 inline-block">📍 {o.zupanija}</span>
              </div>
            ))}
          </div>
        </main>

        {/* MODAL: OSOBNI PODACI (S ETIKETAMA I BROJEM MOBITELA) */}
        {prikaziUnosPodatakaModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-3">
              <button onClick={() => setPrikaziUnosPodatakaModal(false)} className="absolute top-5 right-5 text-slate-400"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black mb-3">Osobni podaci</h2>
              <form onSubmit={spremiOsobnePodatke} className="space-y-3 text-xs font-bold">
                <div>
                  <label className="block mb-1 text-slate-600 uppercase">Ime</label>
                  <input type="text" required value={korisnickiPodaci.ime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, ime: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600 uppercase">Prezime</label>
                  <input type="text" required value={korisnickiPodaci.prezime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, prezime: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600 uppercase">Broj mobitela</label>
                  <input type="text" required placeholder="091123456" value={korisnickiPodaci.telefon} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, telefon: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                </div>
                <div>
                  <label className="block mb-1 text-slate-600 uppercase">Adresa</label>
                  <input type="text" required value={korisnickiPodaci.adresa} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, adresa: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1 text-slate-600 uppercase">Grad</label>
                    <input type="text" required value={korisnickiPodaci.grad} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, grad: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                  </div>
                  <div>
                    <label className="block mb-1 text-slate-600 uppercase">Poštanski broj</label>
                    <input type="text" required value={korisnickiPodaci.postanskiBroj} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, postanskiBroj: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl uppercase shadow mt-2">Spremi</button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: SANDUČIĆ I DOPISIVANJE U INBOXU */}
        {prikaziSanducicPoruka && korisnik && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] flex flex-col">
              <button onClick={() => setPrikaziSanducicPoruka(false)} className="absolute top-5 right-5 text-slate-400"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black mb-4">Inbox / Sandučić poruka</h2>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                {poruke.filter(p => p.primatelj === korisnik.email || p.posiljatelj === korisnik.email).length === 0 ? (
                  <p className="text-slate-400 text-xs py-10 text-center font-medium">Nemate poruka.</p>
                ) : (
                  poruke.filter(p => p.primatelj === korisnik.email || p.posiljatelj === korisnik.email).map(p => (
                    <div key={p.id} className={`p-3.5 rounded-2xl border text-xs space-y-1 ${p.posiljatelj === korisnik.email ? "bg-blue-50/50 border-blue-100 ml-6" : "bg-slate-50 border-slate-200 mr-6"}`}>
                      <div className="flex justify-between font-bold text-slate-500">
                        <span>{p.posiljatelj === korisnik.email ? "Vi" : `Od: ${p.posiljatelj}`}</span>
                        <span>{p.datum}</span>
                      </div>
                      <p className="text-slate-800 font-semibold">{p.tekst}</p>
                      
                      {p.posiljatelj !== korisnik.email && (
                        <button 
                          onClick={() => setAktivniRazgovorEmail(p.posiljatelj)}
                          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-[10px]"
                        >
                          Odgovori
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {aktivniRazgovorEmail && (
                <div className="border-t pt-3 flex gap-2">
                  <input 
                    type="text" 
                    placeholder={`Odgovori za ${aktivniRazgovorEmail}...`} 
                    value={noviTekstPoruke} 
                    onChange={(e) => setNoviTekstPoruke(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl border text-xs outline-none"
                  />
                  <button 
                    onClick={() => {
                      posaljiOdgovorU_Inboxu(aktivniRazgovorEmail);
                      setAktivniRazgovorEmail(null);
                    }}
                    className="bg-blue-600 text-white px-4 rounded-xl font-black text-xs uppercase"
                  >
                    Pošalji
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL: PREDAJA OGLASA S DODATNIM OPCIJAMA ZA AUTOMOBILE */}
        {prikaziFormu && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto space-y-4">
              <button onClick={() => setPrikaziFormu(false)} className="absolute top-5 right-5 text-slate-400"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black">Predaj novi oglas</h2>

              <form onSubmit={rukujDodavanjemOglasa} className="space-y-3.5 text-xs font-bold">
                <div>
                  <label className="block uppercase mb-1 text-slate-600">Naslov *</label>
                  <input type="text" required placeholder="Škoda Kodiaq 2.0 TDI" value={noviOglas.naslov} onChange={(e) => setNoviOglas({ ...noviOglas, naslov: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block uppercase mb-1 text-slate-600">Cijena (€) *</label>
                    <input type="text" required placeholder="28900" value={noviOglas.cijena} onChange={(e) => setNoviOglas({ ...noviOglas, cijena: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                  </div>
                  <div>
                    <label className="block uppercase mb-1 text-slate-600">Kategorija</label>
                    <select value={noviOglas.kategorija} onChange={(e) => setNoviOglas({ ...noviOglas, kategorija: e.target.value })} className="w-full p-3 rounded-xl border outline-none bg-white">
                      {SVE_KATEGORIJE.map((k) => <option key={k.id} value={k.id}>{k.naziv}</option>)}
                    </select>
                  </div>
                </div>

                {/* DODATNE OPCIJE ZA AUTOMOBILE (KODIRANO PREMA TVOJIM UPUTAMA) */}
                {noviOglas.kategorija === "auto-moto" && (
                  <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-3">
                    <h4 className="text-xs font-black text-blue-900 uppercase">Osnovne informacije i dodatne opcije</h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-600 mb-1">Marka vozila</label>
                        <input type="text" value={noviOglas.markaVozila} onChange={(e) => setNoviOglas({ ...noviOglas, markaVozila: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-600 mb-1">Model vozila</label>
                        <input type="text" value={noviOglas.modelVozila} onChange={(e) => setNoviOglas({ ...noviOglas, modelVozila: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-600 mb-1">Oblik karoserije</label>
                        <input type="text" value={noviOglas.oblikKaroserije} onChange={(e) => setNoviOglas({ ...noviOglas, oblikKaroserije: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-600 mb-1">Motor</label>
                        <input type="text" value={noviOglas.motor} onChange={(e) => setNoviOglas({ ...noviOglas, motor: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <input type="text" placeholder="Načini plaćanja" value={noviOglas.naciniPlacanja} onChange={(e) => setNoviOglas({ ...noviOglas, naciniPlacanja: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Ostali dodaci" value={noviOglas.ostaliDodaci} onChange={(e) => setNoviOglas({ ...noviOglas, ostaliDodaci: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Gume i naplatci" value={noviOglas.gumeNaplatci} onChange={(e) => setNoviOglas({ ...noviOglas, gumeNaplatci: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Multimedia" value={noviOglas.multimedia} onChange={(e) => setNoviOglas({ ...noviOglas, multimedia: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Zaštita od krađe" value={noviOglas.zastitaOdKrade} onChange={(e) => setNoviOglas({ ...noviOglas, zastitaOdKrade: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Svjetla i farovi" value={noviOglas.svjetlaFarovi} onChange={(e) => setNoviOglas({ ...noviOglas, svjetlaFarovi: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Udobnost putnika" value={noviOglas.udobnostPutnika} onChange={(e) => setNoviOglas({ ...noviOglas, udobnostPutnika: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Sigurnost putnika" value={noviOglas.sigurnostPutnika} onChange={(e) => setNoviOglas({ ...noviOglas, sigurnostPutnika: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Sustavi pomoći" value={noviOglas.sustaviPomoci} onChange={(e) => setNoviOglas({ ...noviOglas, sustaviPomoci: e.target.value })} className="w-full p-2.5 rounded-xl border bg-white text-[11px]" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block uppercase mb-1 text-slate-600">Županija</label>
                    <select value={noviOglas.zupanija} onChange={(e) => setNoviOglas({ ...noviOglas, zupanija: e.target.value })} className="w-full p-3 rounded-xl border outline-none bg-white">
                      {ZUPANIJE.map((z) => <option key={z} value={z}>{z}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase mb-1 text-slate-600">Mobitel *</label>
                    <input type="text" required placeholder="091..." value={noviOglas.telefon} onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block uppercase mb-1 text-slate-600">Slike</label>
                  <input type="file" accept="image/*" multiple onChange={visestrukoUcitavanje => rukujVisestrukimUcitavanjemSlika(visestrukoUcitavanje)} className="w-full p-2 border rounded-xl" />
                </div>

                <textarea rows={3} placeholder="Opis..." value={noviOglas.opis} onChange={(e) => setNoviOglas({ ...noviOglas, opis: e.target.value })} className="w-full p-3 rounded-xl border outline-none" />

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider text-xs shadow transition">
                  Objavi oglas
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
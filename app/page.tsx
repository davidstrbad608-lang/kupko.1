"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, PlusCircle, Heart, MapPin, Grid, List, Phone, X, 
  ShoppingBag, CheckCircle2, Mail, User, Clock, Upload, Image as ImageIcon,
  LogIn, UserPlus, Sparkles, Compass, Menu, Tag, Car, Home, ShieldCheck, Video, CreditCard, Crown, Package, Trash2, Shield, RotateCw, ArrowLeft, Lock, Gauge, Calendar, Fuel, Cog, HelpCircle, FileText, Cookie, Map, Info, Megaphone, Edit3, TrendingDown, ChevronLeft, ChevronRight, Percent, Check, AlertCircle, Send, ShieldAlert, SlidersHorizontal, Eye, Bot, Navigation, MessageSquare, Wallet, Bell, Settings
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
    cijena: "18900",
    staraCijena: "21500",
    popustPostotak: "-12%",
    snizeno: true,
    kategorija: "auto-moto",
    podkategorija: "Osobna vozila",
    zupanija: "Grad Zagreb",
    grad: "Zagreb - Maksimir",
    stanje: "Korišteno - Kao novo",
    slike: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    ],
    top: true,
    promoviran: true,
    datum: "Objavljeno danas u 15:30",
    opis: "Garažirano vozilo u izvanrednom stanju. Redovito servisiran u ovlaštenom BMW servisu.",
    prodavac: "Ivan Horvat",
    autorEmail: "ivan@kupko.hr",
    telefon: "0912345678",
    email: "ivan.zagreb@gmail.com",
    godiste: "2019",
    kilometri: "145000",
    snagaKw: "140",
    gorivo: "Dizel",
    mjenjac: "Automatski"
  }
];

export default function KupkoApp() {
  const [oglasi, setOglasi] = useState(POCETNI_OGLASI);
  const [registriraniKorisnici, setRegistriraniKorisnici] = useState<any[]>([]);
  
  const [pojamPretrage, setPojamPretrage] = useState("");
  const [odabranaKategorija, setOdabranaKategorija] = useState("sve");
  const [odabranaPodkategorija, setOdabranaPodkategorija] = useState("sve");
  const [odabranaZupanija, setOdabranaZupanija] = useState("sve");
  
  const [omiljeniIds, setOmiljeniIds] = useState<number[]>([]);
  const [prikaziSamoOmiljene, setPrikaziSamoOmiljene] = useState(false);

  const [prikaz, setPrikaz] = useState("grid");
  const [odabraniOglas, setOdabraniOglas] = useState<any>(null);
  
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [prikaziPrijavu, setPrikaziPrijavu] = useState(false);
  const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);
  const [prikaziMeniKorisnika, setPrikaziMeniKorisnika] = useState(false);

  const [prikaziUnosPodatakaModal, setPrikaziUnosPodatakaModal] = useState(false);
  const [korisnickiPodaci, setKorisnickiPodaci] = useState({
    ime: "",
    prezime: "",
    adresa: "",
    grad: "",
    postanskiBroj: "",
    telefon: ""
  });

  const [prikaziUredivanje, setPrikaziUredivanje] = useState(false);
  const [oglasZaUrediti, setOglasZaUrediti] = useState<any>(null);

  const [prikaziPlacanjePromo, setPrikaziPlacanjePromo] = useState(false);
  const [oglasZaPromociju, setOglasZaPromociju] = useState<any>(null);
  const [odabraniNacinPlacanja, setOdabraniNacinPlacanja] = useState("kartica");

  const [korakVerifikacije, setKorakVerifikacije] = useState(false);
  const [privremeniEmail, setPrivremeniEmail] = useState("");
  const [privremenoIme, setPrivremenoIme] = useState("");
  const [privremenaLozinka, setPrivremenaLozinka] = useState("");
  const [uneseniKod, setUneseniKod] = useState("");
  const [generiraniKod, setGeneriraniKod] = useState("");

  const [promoSlajderIndex, setPromoSlajderIndex] = useState(0);
  const [snizenjaSlajderIndex, setSnizenjaSlajderIndex] = useState(0);

  const [korisnik, setKorisnik] = useState<{ ime: string; email: string; isOwner: boolean } | null>(null);
  
  const [formaPrijava, setFormaPrijava] = useState({ korisnickoIme: "", lozinka: "" });
  const [formaRegistracija, setFormaRegistracija] = useState({ 
    ime: "", 
    email: "", 
    lozinka: "",
    prihvacenaPrivatnost: false,
    prihvaceniUvjeti: false 
  });
  
  const [sigurnosniKod, setSigurnosniKod] = useState({ a: 3, b: 4, unos: "" });

  useEffect(() => {
    const lokalniOglasi = localStorage.getItem("kupko_oglasi_v19");
    if (lokalniOglasi) {
      try { setOglasi(JSON.parse(lokalniOglasi)); } catch (e) { console.error(e); }
    }
    const spremljeniKorisnici = localStorage.getItem("kupko_baza_korisnika");
    if (spremljeniKorisnici) {
      try { setRegistriraniKorisnici(JSON.parse(spremljeniKorisnici)); } catch (e) { console.error(e); }
    }
    const spremljeniOmiljeni = localStorage.getItem("kupko_omiljeni");
    if (spremljeniOmiljeni) {
      try { setOmiljeniIds(JSON.parse(spremljeniOmiljeni)); } catch (e) { console.error(e); }
    }
    const spremljeniKorisnik = localStorage.getItem("kupko_aktivni_korisnik");
    if (spremljeniKorisnik) {
      try { setKorisnik(JSON.parse(spremljeniKorisnik)); } catch (e) { console.error(e); }
    }
    const spremljeniOsobniPodaci = localStorage.getItem("kupko_osobni_podaci");
    if (spremljeniOsobniPodaci) {
      try { setKorisnickiPodaci(JSON.parse(spremljeniOsobniPodaci)); } catch (e) { console.error(e); }
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
    localStorage.setItem("kupko_oglasi_v19", JSON.stringify(noviNiz));
  };

  const postaviKorisnika = (podaciKorisnika: { ime: string; email: string; isOwner: boolean } | null) => {
    setKorisnik(podaciKorisnika);
    if (podaciKorisnika) {
      localStorage.setItem("kupko_aktivni_korisnik", JSON.stringify(podaciKorisnika));
    } else {
      localStorage.removeItem("kupko_aktivni_korisnik");
    }
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
    alert("Oglas je uspješno obnovljen!");
  };

  const rukujPrijavom = (e: React.FormEvent) => {
    e.preventDefault();
    const imeClean = formaPrijava.korisnickoIme.trim().toLowerCase();
    
    if (imeClean === "admin" && formaPrijava.lozinka === "admin123") {
      const adminKorisnik = { ime: "Admin", email: "admin@kupko.hr", isOwner: true };
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

    const aktivni = { ime: pronadjeniKorisnik.ime, email: pronadjeniKorisnik.email, isOwner: false };
    postaviKorisnika(aktivni);
    setPrikaziPrijavu(false);
    setFormaPrijava({ korisnickoIme: "", lozinka: "" });
    alert(`Dobrodošli natrag, ${pronadjeniKorisnik.ime}!`);
  };

  const rukujRegistracijom = (e: React.FormEvent) => {
    e.preventDefault();
    const imeClean = formaRegistracija.ime.trim();
    const emailLower = formaRegistracija.email.toLowerCase().trim();

    if (!formaRegistracija.prihvacenaPrivatnost || !formaRegistracija.prihvaceniUvjeti) {
      alert("Morate pročitati i prihvatiti Politiku privatnosti te Uvjete i pravila korištenja da biste se registrirali.");
      return;
    }

    const zauzetoIme = registriraniKorisnici.some((k) => k.ime.toLowerCase() === imeClean.toLowerCase());
    if (zauzetoIme || imeClean.toLowerCase() === "admin") {
      alert("Korisničko ime je već zauzeto! Molimo odaberite drugo korisničko ime.");
      return;
    }

    const zauzetMail = registriraniKorisnici.some((k) => k.email.toLowerCase() === emailLower);
    if (zauzetMail) {
      alert("Ova e-mail adresa je već povezana s drugim računom!");
      return;
    }

    const slucajniKod = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneriraniKod(slucajniKod);
    setPrivremeniEmail(emailLower);
    setPrivremenoIme(imeClean);
    setPrivremenaLozinka(formaRegistracija.lozinka);
    setKorakVerifikacije(true);
    setPrikaziRegistraciju(false);

    alert(`[Simulacija E-maila]: Na adresu ${emailLower} poslan je verifikacijski kod. Vaš kod je: ${slucajniKod}`);
  };

  const potvrdiVerifikacijskiKod = (e: React.FormEvent) => {
    e.preventDefault();
    if (uneseniKod.trim() !== generiraniKod) {
      alert("Netočan verifikacijski kod!");
      return;
    }

    const noviRegKorisnik = {
      ime: privremenoIme,
      email: privremeniEmail,
      lozinka: privremenaLozinka
    };

    const azuriraniBazaKorisnika = [...registriraniKorisnici, noviRegKorisnik];
    setRegistriraniKorisnici(azuriraniBazaKorisnika);
    localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniBazaKorisnika));

    const aktivni = { ime: privremenoIme, email: privremeniEmail, isOwner: false };
    postaviKorisnika(aktivni);

    setKorakVerifikacije(false);
    setUneseniKod("");
    setFormaRegistracija({ ime: "", email: "", lozinka: "", prihvacenaPrivatnost: false, prihvaceniUvjeti: false });
    
    // SLANJE E-MAILA DOBRODOŠLICE
    alert(`📧 [Simulacija E-maila za Dobrodošlicu na ${privremeniEmail}]:\n\n"Dobrodošli na Kupko, ${privremenoIme}!\nVaš račun je uspješno kreiran i potvrđen. Nadamo se ugodnom korištenju našeg oglasnika!"`);

    setPrikaziUnosPodatakaModal(true);
  };

  const spremiOsobnePodatke = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("kupko_osobni_podaci", JSON.stringify(korisnickiPodaci));
    setPrikaziUnosPodatakaModal(false);
    alert("Osobni podaci su uspješno spremljeni!");
  };

  const obrisiOglas = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) {
      alert("Morate biti prijavljeni!");
      return;
    }
    const jeAutor = (glas.autorEmail && glas.autorEmail.toLowerCase() === korisnik.email.toLowerCase()) || 
                    (glas.prodavac && glas.prodavac.toLowerCase() === korisnik.ime.toLowerCase());
    if (!jeAutor && !korisnik.isOwner) {
      alert("Nemate ovlasti!");
      return;
    }
    if (confirm("Jeste li sigurni da želite obrisati oglas?")) {
      const noviOglasi = oglasi.filter((o) => o.id !== glas.id);
      spremiOglase(noviOglasi);
      setOdabraniOglas(null);
      alert("Oglas obrisan.");
    }
  };

  const pokreniUredivanje = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) {
      alert("Morate biti prijavljeni!");
      return;
    }
    setOglasZaUrediti({ ...glas });
    setPrikaziUredivanje(true);
  };

  const pokreniPromociju = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) {
      alert("Morate biti prijavljeni!");
      return;
    }
    setOglasZaPromociju(glas);
    setPrikaziPlacanjePromo(true);
  };

  const potvrdiUplatuPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oglasZaPromociju) return;

    const azuriraniNiz = oglasi.map((o) =>
      o.id === oglasZaPromociju.id ? { ...o, promoviran: true, top: true } : o
    );
    spremiOglase(azuriraniNiz);
    setPrikaziPlacanjePromo(false);
    setOglasZaPromociju(null);
    
    // SLANJE E-MAIL POTVRDE NAKON UPLATE
    const ciljaniMail = korisnik ? korisnik.email : "korisnik@kupko.hr";
    alert(`📧 [Simulacija E-mail Potvrde o Uplati na ${ciljaniMail}]:\n\n"Uspješno ste izvršili uplatu od 5.00 € za promidžbu Vašeg oglasa '${oglasZaPromociju.naslov}'. Oglas je sada istaknut na vrhu pretrage. Hvala Vam!"`);
  };

  const rukujSpremanjemUredivanja = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oglasZaUrediti.naslov || !oglasZaUrediti.cijena) return;
    const noviNiz = oglasi.map((o) => (o.id === oglasZaUrediti.id ? oglasZaUrediti : o));
    spremiOglase(noviNiz);
    setOdabraniOglas(null);
    setPrikaziUredivanje(false);
    alert("Uređivanje uspješno spremljeno!");
  };

  const [noviOglas, setNoviOglas] = useState({
    naslov: "", cijena: "", staraCijena: "", popustPostotak: "", snizeno: false,
    kategorija: "auto-moto", podkategorija: "Osobna vozila",
    zupanija: "Grad Zagreb", grad: "", stanje: "Novo", slike: [] as string[], opis: "",
    prodavac: "", telefon: "", email: "", promoviran: false,
    godiste: "", kilometri: "", snagaKw: "", gorivo: "Dizel", mjenjac: "Ručni",
    kvadratura: "", sobe: ""
  });

  const izracunajAiProcjenuZaOglas = (glas: any) => {
    const filtriraniKat = oglasi.filter(o => o.kategorija === glas.kategorija && o.cijena);
    if (filtriraniKat.length <= 1) return "Tržište je stabilno. Cijena je unutar očekivanih okvira za ovu kategoriju.";
    const zbroj = filtriraniKat.reduce((acc, curr) => acc + parseFloat(curr.cijena || "0"), 0);
    const prosjek = Math.round(zbroj / filtriraniKat.length);
    const trenutna = parseFloat(glas.cijena || "0");

    if (trenutna < prosjek * 0.85) {
      return `🔥 Izuzetna prilika! Ova cijena je ${Math.round(prosjek - trenutna)} € niža od prosjeka kategorije (${prosjek} €).`;
    } else if (trenutna > prosjek * 1.15) {
      return `⚠️ Cijena je nešto viša od prosjeka ove kategorije (${prosjek} €). Preporučuje se pregovaranje.`;
    } else {
      return `✅ Fer cijena! Usklađena je s prosjekom tržišta za ovu kategoriju (~${prosjek} €).`;
    }
  };

  const rukujDodavanjemOglasa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noviOglas.naslov || !noviOglas.cijena) return;
    if (parseInt(sigurnosniKod.unos) !== sigurnosniKod.a + sigurnosniKod.b) {
      alert("Netočan zbroj u anti-spam provjeri!");
      return;
    }

    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;
    const autorEmailFinal = korisnik ? korisnik.email : (noviOglas.email.trim() || `anonimni_${Date.now()}@kupko.hr`);
    const prodavacFinal = korisnik ? korisnik.ime : (noviOglas.prodavac || "Korisnik");

    const stvoreniOglas = {
      ...noviOglas,
      id: Date.now(),
      top: noviOglas.promoviran,
      datum: datumString,
      prodavac: prodavacFinal,
      autorEmail: autorEmailFinal,
      email: autorEmailFinal,
      slike: noviOglas.slike.length > 0 ? noviOglas.slike : ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"]
    };

    const azurirano = [stvoreniOglas, ...oglasi];
    spremiOglase(azurirano);
    setPrikaziFormu(false);
    setNoviOglas({
      naslov: "", cijena: "", staraCijena: "", popustPostotak: "", snizeno: false,
      kategorija: "auto-moto", podkategorija: "Osobna vozila",
      zupanija: "Grad Zagreb", grad: "", stanje: "Novo", slike: [], opis: "",
      prodavac: "", telefon: "", email: "", promoviran: false,
      godiste: "", kilometri: "", snagaKw: "", gorivo: "Dizel", mjenjac: "Ručni",
      kvadratura: "", sobe: ""
    });
    generirajKôd();
    alert("Oglas uspješno predan!");
  };

  const rukujVisestrukimUcitavanjemSlika = (e: React.ChangeEvent<HTMLInputElement>, uredi = false) => {
    const datoteke = e.target.files;
    if (datoteke) {
      Array.from(datoteke).forEach((file) => {
        const citac = new FileReader();
        citac.onloadend = () => {
          if (uredi) {
            setOglasZaUrediti((prev: any) => ({
              ...prev,
              slike: [...(prev.slike || []), citac.result as string]
            }));
          } else {
            setNoviOglas((prev) => ({
              ...prev,
              slike: [...prev.slike, citac.result as string]
            }));
          }
        };
        citac.readAsDataURL(file);
      });
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

  const promoOglasi = oglasi.filter((o) => o.promoviran);
  const snizeniOglasi = oglasi.filter((o) => (o.snizeno || o.staraCijena) && !o.promoviran);

  const mozeUreditiIliBrisati = (o: any) => {
    if (!korisnik) return false;
    if (korisnik.isOwner) return true;
    const jeAutorEmail = o.autorEmail && o.autorEmail.toLowerCase() === korisnik.email.toLowerCase();
    const jeAutorIme = o.prodavac && o.prodavac.toLowerCase() === korisnik.ime.toLowerCase();
    return jeAutorEmail || jeAutorIme;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        {/* TOP KORISNIČKA TRAKA */}
        <div className="bg-blue-950 text-blue-200 text-xs py-1.5 px-4 border-b border-blue-900 relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              🇭🇷 Kupko.hr - Sigurni Hrvatski Oglasnik
            </span>
            <div className="flex items-center gap-4">
              {korisnik ? (
                <div className="relative">
                  <button 
                    onClick={() => setPrikaziMeniKorisnika(!prikaziMeniKorisnika)}
                    className="text-amber-400 font-bold flex items-center gap-1.5 bg-blue-900/80 px-3 py-1 rounded-xl border border-blue-500/40 hover:bg-blue-900 transition"
                  >
                    <User className="w-3.5 h-3.5" /> 
                    <span>Moje Kupko ({korisnik.ime})</span>
                    <span className="text-[10px] bg-amber-400 text-blue-950 px-1 rounded font-black">▼</span>
                  </button>

                  {/* PADAJUĆI IZBORNIK "MOJE KUPKO" */}
                  {prikaziMeniKorisnika && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 z-50 overflow-hidden py-2">
                      <div className="px-4 py-2 border-b bg-slate-50">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Prijavljeni korisnik</span>
                        <p className="font-black text-slate-900 text-sm">{korisnik.ime}</p>
                        <p className="text-[11px] text-blue-600">{korisnik.email}</p>
                      </div>

                      <div className="py-1">
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSamoOmiljene(false); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-700" /> Moji oglasi
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("PayProtect: Sigurna kupoprodaja preko Kupka uz escrow zaštitu sredstava."); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" /> PayProtect
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSamoOmiljene(true); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" /> Spremljeno ({omiljeniIds.length})
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("Nemate novih poruka u sandučiću."); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-indigo-600" /> Poruke
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("Financije: Stanje Vašeg Kupko novčanika je 0.00 €."); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-amber-600" /> Financije
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziUnosPodatakaModal(true); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <Settings className="w-4 h-4 text-slate-600" /> Postavke (Moji podaci)
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("Nemate novih obavijesti sustava."); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <Bell className="w-4 h-4 text-rose-600" /> Obavijesti
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("Česta pitanja: Kako predati oglas? Kako kupiti putem PayProtecta? Slobodno nas kontaktirajte."); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-100 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-blue-500" /> Česta pitanja
                        </button>
                      </div>

                      <div className="border-t pt-1">
                        <button onClick={() => { setPrikaziMeniKorisnika(false); postaviKorisnika(null); }} className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <LogIn className="w-4 h-4" /> Odjavi se
                        </button>
                      </div>
                    </div>
                  )}
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

        {/* 1. SEKTOR: PLAĆENI PROMO OGLASI */}
        {!prikaziSamoOmiljene && promoOglasi.length > 0 && (
          <section className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 py-6 text-blue-950 shadow-xl border-b-2 border-amber-700">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-950 text-amber-400 rounded-xl font-black shadow">
                    <Sparkles className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wide text-blue-950">Izdvojeni Promo Oglasi</h2>
                    <p className="text-xs text-blue-900 font-bold">Plaćene sponzorirane objave na vrhu ponude</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPromoSlajderIndex((prev) => (prev - 1 + promoOglasi.length) % promoOglasi.length)} className="p-2 bg-blue-950/20 hover:bg-blue-950/40 rounded-xl transition text-blue-950">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setPromoSlajderIndex((prev) => (prev + 1) % promoOglasi.length)} className="p-2 bg-blue-950/20 hover:bg-blue-950/40 rounded-xl transition text-blue-950">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promoOglasi.slice(promoSlajderIndex, promoSlajderIndex + 3).map((o) => (
                  <div 
                    key={o.id}
                    onClick={() => setOdabraniOglas(o)}
                    className="bg-white text-slate-900 rounded-2xl p-4 shadow-xl border-2 border-blue-950 flex gap-4 cursor-pointer hover:scale-102 transition relative overflow-hidden group"
                  >
                    <span className="absolute top-0 right-0 bg-blue-950 text-amber-400 text-[11px] font-black uppercase px-3 py-1 rounded-bl-xl shadow flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> PROMO
                    </span>

                    <img src={o.slike ? o.slike[0] : o.slika} alt={o.naslov} className="w-28 h-28 object-cover rounded-xl group-hover:scale-105 transition" />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-0.5">📍 {o.zupanija}</span>
                        <h4 className="font-black text-slate-900 text-sm line-clamp-2">{o.naslov}</h4>
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-black text-blue-700">{o.cijena} €</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 2. SEKTOR: SNIŽENJA */}
        {!prikaziSamoOmiljene && snizeniOglasi.length > 0 && (
          <section className="bg-gradient-to-r from-red-700 via-rose-600 to-red-800 py-6 text-white shadow-lg border-b-2 border-red-900">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-400 text-slate-900 rounded-xl font-black">
                    <TrendingDown className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wide">Aktualna Sniženja Cijena</h2>
                    <p className="text-xs text-red-200">Artikli kojima su prodavači sami spustili cijene</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSnizenjaSlajderIndex((prev) => (prev - 1 + snizeniOglasi.length) % snizeniOglasi.length)} className="p-2 bg-red-900/80 hover:bg-red-900 rounded-xl transition text-white">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setSnizenjaSlajderIndex((prev) => (prev + 1) % snizeniOglasi.length)} className="p-2 bg-red-900/80 hover:bg-red-900 rounded-xl transition text-white">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {snizeniOglasi.slice(snizenjaSlajderIndex, snizenjaSlajderIndex + 3).map((o) => (
                  <div 
                    key={o.id}
                    onClick={() => setOdabraniOglas(o)}
                    className="bg-white text-slate-900 rounded-2xl p-4 shadow-xl border-2 border-red-500 flex gap-4 cursor-pointer hover:scale-102 transition relative overflow-hidden group"
                  >
                    <span className="absolute top-0 right-0 bg-red-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-bl-xl shadow flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5" /> {o.popustPostotak || "SNIŽENO"}
                    </span>

                    <img src={o.slike ? o.slike[0] : o.slika} alt={o.naslov} className="w-28 h-28 object-cover rounded-xl group-hover:scale-105 transition" />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-0.5">📍 {o.zupanija}</span>
                        <h4 className="font-black text-slate-900 text-sm line-clamp-2">{o.naslov}</h4>
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        {o.staraCijena && (
                          <span className="text-xs text-slate-400 line-through font-bold">{o.staraCijena} €</span>
                        )}
                        <span className="text-lg font-black text-red-600">{o.cijena} €</span>
                      </div>
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
              {filtriraniOglasi.map((o) => {
                const glavnaSlika = o.slike && o.slike.length > 0 ? o.slike[0] : (o.slika || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80");
                return (
                  <div 
                    key={o.id}
                    onClick={() => setOdabraniOglas(o)}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between group cursor-pointer relative"
                  >
                    <div className="relative">
                      <img src={glavnaSlika} alt={o.naslov} className="w-full h-52 object-cover group-hover:scale-105 transition" />
                      
                      {o.promoviran && (
                        <span className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> PROMO
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
                            <MapPin className="w-3.5 h-3.5 text-blue-600" /> {o.zupanija} {o.grad ? `(${o.grad})` : ""}
                          </span>
                          <span>{o.datum}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base mb-1 line-clamp-2 hover:text-blue-700">
                          {o.naslov}
                        </h4>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-2">
                        <div className="flex items-baseline gap-2">
                          {o.staraCijena && (
                            <span className="text-xs text-slate-400 line-through font-bold">{o.staraCijena} €</span>
                          )}
                          <span className="text-xl font-black text-blue-700">{o.cijena} €</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => obnoviOglas(e, o.id)}
                            title="Obnovi oglas"
                            className="p-2 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 rounded-xl transition"
                          >
                            <RotateCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {mozeUreditiIliBrisati(o) && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                          {!o.promoviran && (
                            <button
                              onClick={(e) => pokreniPromociju(e, o)}
                              className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-extrabold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow"
                            >
                              <Sparkles className="w-4 h-4" /> Plati Promo Oglas (5 €)
                            </button>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => pokreniUredivanje(e, o)}
                              className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" /> Uredi
                            </button>
                            <button
                              onClick={(e) => obrisiOglas(e, o)}
                              className="flex-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold py-1.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Izbriši
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-slate-300 mt-16 border-t-4 border-amber-400 pt-10 pb-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1 mb-3">
              <span className="font-black text-2xl tracking-tight text-white">KUP</span>
              <span className="font-black text-2xl tracking-tight text-amber-400">KO</span>
              <span className="text-amber-400 text-[10px] font-bold bg-amber-400/20 px-1.5 py-0.5 rounded ml-1 border border-amber-400/30">HR</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] mb-4">
              Kupko.hr je vodeći hrvatski besplatni oglasnik za brzu i sigurnu kupoprodaju.
            </p>
            <p className="text-amber-400 font-bold text-[11px]">© 2026 Kupko.hr - Sva prava pridržana.</p>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs mb-3 tracking-wider text-amber-400">Pomoć i Korisnici</h4>
            <ul className="space-y-2">
              <li><button onClick={() => alert("Kontakt: podrskakupko@gmail.com")} className="hover:text-amber-400 transition">Kontakt i pomoć</button></li>
              <li><button onClick={() => alert("O nama: Kupko je prvi pravi hrvatski oglasnik.")} className="hover:text-amber-400 transition">O nama</button></li>
              <li><button onClick={() => setPrikaziFormu(true)} className="hover:text-amber-400 transition text-amber-300 font-bold">Predaj oglas</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs mb-3 tracking-wider text-amber-400">Pravne Informacije</h4>
            <ul className="space-y-2">
              <li><button onClick={() => alert("Uvjeti korištenja su usklađeni sa zakonima RH.")} className="hover:text-amber-400 transition">Uvjeti korištenja</button></li>
              <li><button onClick={() => alert("Politika privatnosti štiti vaše podatke prema GDPR-u.")} className="hover:text-amber-400 transition">Politika privatnosti</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-xs mb-3 tracking-wider text-amber-400">Sigurnost</h4>
            <p className="text-slate-400 text-[11px]">Potpuno sigurna kupoprodaja i provjereni korisnici.</p>
          </div>
        </div>
      </footer>

      {/* MODAL: MOJI PODACI */}
      {prikaziUnosPodatakaModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziUnosPodatakaModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-2 text-slate-900">Moji osobni podaci</h2>
            <p className="text-xs text-slate-500 mb-6">Molimo unesite vaše osobne podatke kako biste mogli predavati oglase i koristiti PayProtect uslugu.</p>

            <form onSubmit={spremiOsobnePodatke} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ime *</label>
                  <input type="text" required placeholder="Ime" value={korisnickiPodaci.ime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, ime: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Prezime *</label>
                  <input type="text" required placeholder="Prezime" value={korisnickiPodaci.prezime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, prezime: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ulica i kućni broj *</label>
                <input type="text" required placeholder="npr. Ilica 10" value={korisnickiPodaci.adresa} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, adresa: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Grad *</label>
                  <input type="text" required placeholder="Grad" value={korisnickiPodaci.grad} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, grad: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Poštanski broj *</label>
                  <input type="text" required placeholder="10000" value={korisnickiPodaci.postanskiBroj} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, postanskiBroj: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Broj telefona / mobitela *</label>
                <input type="text" required placeholder="0912345678" value={korisnickiPodaci.telefon} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, telefon: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
              </div>

              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider shadow-lg">
                Spremi podatke i nastavi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ODABIR NAČINA PLAĆANJA PROMO OGLASA */}
      {prikaziPlacanjePromo && oglasZaPromociju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button onClick={() => setPrikaziPlacanjePromo(false)} className="absolute top-4 right-4 text-slate-400"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 text-amber-600">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-xl font-black text-slate-900">Plaćanje Promo Oglasa</h2>
            </div>
            <p className="text-xs text-slate-500">Istaknite oglas na sam vrh: <strong>{oglasZaPromociju.naslov}</strong></p>
            <p className="text-sm font-bold text-blue-700 bg-blue-50 p-3 rounded-xl border border-blue-100">Cijena promocije: <strong>5.00 €</strong> (vrijedi 7 dana)</p>

            <form onSubmit={potvrdiUplatuPromo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Odaberite način plaćanja:</label>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${odabraniNacinPlacanja === 'kartica' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'}`}>
                    <input type="radio" name="placanje" value="kartica" checked={odabraniNacinPlacanja === 'kartica'} onChange={(e) => setOdabraniNacinPlacanja(e.target.value)} />
                    <CreditCard className="w-5 h-5 text-blue-700" />
                    <div>
                      <span className="block text-xs font-bold">Kreditna / Debitna kartica</span>
                      <span className="text-[10px] text-slate-400">Visa, Mastercard, Maestro</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${odabraniNacinPlacanja === 'paypal' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'}`}>
                    <input type="radio" name="placanje" value="paypal" checked={odabraniNacinPlacanja === 'paypal'} onChange={(e) => setOdabraniNacinPlacanja(e.target.value)} />
                    <ShoppingBag className="w-5 h-5 text-blue-500" />
                    <div>
                      <span className="block text-xs font-bold">PayPal</span>
                      <span className="text-[10px] text-slate-400">Brzo i sigurno online plaćanje</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${odabraniNacinPlacanja === 'sms' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'}`}>
                    <input type="radio" name="placanje" value="sms" checked={odabraniNacinPlacanja === 'sms'} onChange={(e) => setOdabraniNacinPlacanja(e.target.value)} />
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <div>
                      <span className="block text-xs font-bold">SMS Poruka</span>
                      <span className="text-[10px] text-slate-400">Pošaljite KUPKO na 12345 (5.00 €)</span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-extrabold py-3.5 rounded-xl uppercase tracking-wider shadow-lg">
                Plati 5.00 € i Aktiviraj Promo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PREDAJ OGLAS */}
      {prikaziFormu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziFormu(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            
            <h2 className="text-2xl font-black text-slate-900 mb-4">Predaj novi oglas na Kupku</h2>

            <form onSubmit={rukujDodavanjemOglasa} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Naslov oglasa *</label>
                <input 
                  type="text" required placeholder="Npr. BMW 320d, Stan, mobitel..."
                  value={noviOglas.naslov} onChange={(e) => setNoviOglas({ ...noviOglas, naslov: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cijena (€) *</label>
                  <input 
                    type="text" required placeholder="npr. 120"
                    value={noviOglas.cijena} onChange={(e) => setNoviOglas({ ...noviOglas, cijena: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm outline-none"
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

              {noviOglas.kategorija === "auto-moto" && (
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                  <p className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Car className="w-4 h-4" /> Detaljne specifikacije vozila (Godište, Kilometri, Snaga, Gorivo, Mjenjač)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Godište</label>
                      <input type="text" placeholder="npr. 2019" value={noviOglas.godiste} onChange={(e) => setNoviOglas({ ...noviOglas, godiste: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Kilometraža (km)</label>
                      <input type="number" placeholder="npr. 145000" value={noviOglas.kilometri} onChange={(e) => setNoviOglas({ ...noviOglas, kilometri: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Snaga (kW)</label>
                      <input type="number" placeholder="npr. 140" value={noviOglas.snagaKw} onChange={(e) => setNoviOglas({ ...noviOglas, snagaKw: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Gorivo</label>
                      <select value={noviOglas.gorivo} onChange={(e) => setNoviOglas({ ...noviOglas, gorivo: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white font-bold">
                        <option value="Dizel">Dizel</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Hibrid">Hibrid</option>
                        <option value="Električni">Električni</option>
                        <option value="Plin">Plin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Mjenjač</label>
                      <select value={noviOglas.mjenjac} onChange={(e) => setNoviOglas({ ...noviOglas, mjenjac: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white font-bold">
                        <option value="Ručni">Ručni</option>
                        <option value="Automatski">Automatski</option>
                        <option value="Poluautomatski">Poluautomatski</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {noviOglas.kategorija === "nekretnine" && (
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 space-y-3">
                  <p className="text-xs font-black text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Home className="w-4 h-4" /> Detaljne specifikacije nekretnine
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Stambena površina (m²)</label>
                      <input type="number" placeholder="npr. 65" value={noviOglas.kvadratura} onChange={(e) => setNoviOglas({ ...noviOglas, kvadratura: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Broj soba</label>
                      <input type="text" placeholder="npr. 2.5" value={noviOglas.sobe} onChange={(e) => setNoviOglas({ ...noviOglas, sobe: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
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
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Grad / Mjesto</label>
                  <input type="text" placeholder="Npr. Zagreb - Maksimir" value={noviOglas.grad} onChange={(e) => setNoviOglas({ ...noviOglas, grad: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Broj Mobitela *</label>
                  <input type="text" placeholder="091..." required value={noviOglas.telefon} onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Galerija slika</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 bg-white cursor-pointer relative mb-3">
                  <input type="file" accept="image/*" multiple onChange={(e) => rukujVisestrukimUcitavanjemSlika(e, false)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <Upload className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-sm font-bold">Odaberite slike s uređaja</p>
                </div>

                {noviOglas.slike.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {noviOglas.slike.map((s, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden border h-20">
                        <img src={s} alt="Upload" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setNoviOglas({ ...noviOglas, slike: noviOglas.slike.filter((_, i) => i !== idx) })} className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-full"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <textarea rows={3} placeholder="Opis oglasa..." value={noviOglas.opis} onChange={(e) => setNoviOglas({ ...noviOglas, opis: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">Anti-Spam Provjera</h5>
                  <p className="text-[11px] text-slate-500">Koliko je: <strong>{sigurnosniKod.a} + {sigurnosniKod.b} = ?</strong></p>
                </div>
                <input
                  type="number" required placeholder="Rezultat"
                  value={sigurnosniKod.unos} onChange={(e) => setSigurnosniKod({ ...sigurnosniKod, unos: e.target.value })}
                  className="w-32 p-2 rounded-xl border text-center font-bold text-sm bg-white"
                />
              </div>

              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-3.5 rounded-xl uppercase">
                Objavi Oglas
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VERIFIKACIJA KODA */}
      {korakVerifikacije && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <h2 className="text-xl font-black text-slate-900">Potvrdite vaš E-mail</h2>
            <p className="text-xs text-slate-500">Poslali smo verifikacijski kod na: <strong>{privremeniEmail}</strong></p>
            <form onSubmit={potvrdiVerifikacijskiKod} className="space-y-3">
              <input 
                type="text" required maxLength={6} placeholder="Unesite kod" 
                value={uneseniKod} onChange={(e) => setUneseniKod(e.target.value)}
                className="w-full p-3 rounded-xl border text-center text-lg tracking-widest font-black"
              />
              <button type="submit" className="w-full bg-blue-700 text-white font-extrabold py-3 rounded-xl uppercase">
                Potvrdi Kod i Dovrši Registraciju
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UREDI OGLAS */}
      {prikaziUredivanje && oglasZaUrediti && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziUredivanje(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Uredi oglas i specifikacije</h2>

            <form onSubmit={rukujSpremanjemUredivanja} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Naslov oglasa *</label>
                <input 
                  type="text" required 
                  value={oglasZaUrediti.naslov} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, naslov: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cijena (€) *</label>
                  <input 
                    type="text" required 
                    value={oglasZaUrediti.cijena} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, cijena: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Stara Cijena (Sniženje)</label>
                  <input 
                    type="text" placeholder="npr. 21500"
                    value={oglasZaUrediti.staraCijena || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, staraCijena: e.target.value, snizeno: true })}
                    className="w-full p-3 rounded-xl border text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Postotak popusta</label>
                  <input 
                    type="text" placeholder="npr. -12%"
                    value={oglasZaUrediti.popustPostotak || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, popustPostotak: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Glavna Kategorija</label>
                  <select 
                    value={oglasZaUrediti.kategorija} 
                    onChange={(e) => {
                      const novaKat = e.target.value;
                      const prvaPod = SVE_KATEGORIJE.find((k) => k.id === novaKat)?.podkategorije[0] || "";
                      setOglasZaUrediti({ ...oglasZaUrediti, kategorija: novaKat, podkategorija: prvaPod });
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
                    value={oglasZaUrediti.podkategorija} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, podkategorija: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm bg-white"
                  >
                    {SVE_KATEGORIJE.find((k) => k.id === oglasZaUrediti.kategorija)?.podkategorije.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {oglasZaUrediti.kategorija === "auto-moto" && (
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 space-y-3">
                  <p className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Car className="w-4 h-4" /> Uredi specifikacije vozila
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Godište</label>
                      <input type="text" value={oglasZaUrediti.godiste || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, godiste: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Kilometraža (km)</label>
                      <input type="number" value={oglasZaUrediti.kilometri || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, kilometri: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Snaga (kW)</label>
                      <input type="number" value={oglasZaUrediti.snagaKw || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, snagaKw: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Gorivo</label>
                      <select value={oglasZaUrediti.gorivo || "Dizel"} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, gorivo: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white font-bold">
                        <option value="Dizel">Dizel</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Hibrid">Hibrid</option>
                        <option value="Električni">Električni</option>
                        <option value="Plin">Plin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Mjenjač</label>
                      <select value={oglasZaUrediti.mjenjac || "Ručni"} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, mjenjac: e.target.value })} className="w-full border rounded-xl p-2.5 text-xs bg-white font-bold">
                        <option value="Ručni">Ručni</option>
                        <option value="Automatski">Automatski</option>
                        <option value="Poluautomatski">Poluautomatski</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Županija</label>
                  <select
                    value={oglasZaUrediti.zupanija}
                    onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, zupanija: e.target.value })}
                    className="w-full p-3 rounded-xl border text-sm bg-white font-bold"
                  >
                    {ZUPANIJE.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Grad / Mjesto</label>
                  <input type="text" value={oglasZaUrediti.grad || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, grad: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobitel</label>
                  <input type="text" value={oglasZaUrediti.telefon || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, telefon: e.target.value })} className="w-full p-3 rounded-xl border text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Opis oglasa</label>
                <textarea 
                  rows={4} 
                  value={oglasZaUrediti.opis || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, opis: e.target.value })} 
                  className="w-full p-3 rounded-xl border text-sm" 
                />
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider">
                Spremi Sve Promjene
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
            
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden max-h-80">
                <img 
                  src={odabraniOglas.slike && odabraniOglas.slike.length > 0 ? odabraniOglas.slike[0] : (odabraniOglas.slika || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80")} 
                  alt={odabraniOglas.naslov} 
                  className="w-full h-80 object-cover" 
                />
              </div>
              {odabraniOglas.slike && odabraniOglas.slike.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {odabraniOglas.slike.map((s: string, idx: number) => (
                    <img key={idx} src={s} alt="Thumbnail" className="w-20 h-20 object-cover rounded-xl border cursor-pointer hover:opacity-80" onClick={() => {
                      const temp = odabraniOglas.slike[0];
                      odabraniOglas.slike[0] = s;
                      odabraniOglas.slike[idx] = temp;
                      setOdabraniOglas({ ...odabraniOglas });
                    }} />
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{odabraniOglas.naslov}</h2>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> {odabraniOglas.zupanija} {odabraniOglas.grad ? `- ${odabraniOglas.grad}` : ""} • {odabraniOglas.datum}
                </p>
              </div>
              <div className="text-right">
                {odabraniOglas.staraCijena && (
                  <span className="text-sm text-slate-400 line-through font-bold block">{odabraniOglas.staraCijena} €</span>
                )}
                <span className="text-3xl font-black text-blue-700">{odabraniOglas.cijena} €</span>
              </div>
            </div>

            {odabraniOglas.kategorija === "auto-moto" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200">
                {odabraniOglas.godiste && <div><span className="text-[10px] text-slate-500 uppercase block font-bold">Godište</span><strong className="text-xs">{odabraniOglas.godiste}</strong></div>}
                {odabraniOglas.kilometri && <div><span className="text-[10px] text-slate-500 uppercase block font-bold">Kilometraža</span><strong className="text-xs">{odabraniOglas.kilometri} km</strong></div>}
                {odabraniOglas.snagaKw && <div><span className="text-[10px] text-slate-500 uppercase block font-bold">Snaga</span><strong className="text-xs">{odabraniOglas.snagaKw} kW</strong></div>}
                {odabraniOglas.gorivo && <div><span className="text-[10px] text-slate-500 uppercase block font-bold">Gorivo</span><strong className="text-xs">{odabraniOglas.gorivo}</strong></div>}
                {odabraniOglas.mjenjac && <div><span className="text-[10px] text-slate-500 uppercase block font-bold">Mjenjač</span><strong className="text-xs">{odabraniOglas.mjenjac}</strong></div>}
              </div>
            )}

            {/* VIZUALNA MAPA */}
            <div className="bg-slate-900 text-white p-5 rounded-3xl relative overflow-hidden shadow-lg border border-slate-800">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6">
                <Navigation className="w-56 h-56 text-blue-400" />
              </div>
              <div className="flex items-center gap-2 mb-3 text-amber-400">
                <Map className="w-5 h-5" />
                <h4 className="font-black text-sm uppercase tracking-wide">Lokacija prodavača (Mapa)</h4>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
                <div>
                  <p className="text-base font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-500" /> {odabraniOglas.zupanija} {odabraniOglas.grad ? `(${odabraniOglas.grad})` : ""}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Hrvatska • Točna lokacija dostupna na poziv prodavača</p>
                </div>
                <div className="bg-blue-600/30 border border-blue-400/40 text-blue-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> Kontakt: {odabraniOglas.telefon || "Dostupno u oglasu"}
                </div>
              </div>
            </div>

            {/* AI PROCJENITELJ */}
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl flex items-start gap-3">
              <Bot className="w-6 h-6 text-indigo-600 mt-0.5 shrink-0" />
              <div className="text-xs text-indigo-950">
                <strong className="block font-bold text-indigo-900 mb-1">Kupko AI Analiza Cijene</strong>
                {izracunajAiProcjenuZaOglas(odabraniOglas)}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border text-sm">
              <p className="whitespace-pre-line">{odabraniOglas.opis || "Nema opisa."}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRIJAVA */}
      {prikaziPrijavu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setPrikaziPrijavu(false)} className="absolute top-4 right-4 text-slate-400"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-black mb-4">Prijava na Kupko</h2>
            <form onSubmit={rukujPrijavom} className="space-y-3">
              <input 
                type="text" required placeholder="Korisničko ime (npr. admin)" 
                value={formaPrijava.korisnickoIme} onChange={(e) => setFormaPrijava({ ...formaPrijava, korisnickoIme: e.target.value })}
                className="w-full p-3 rounded-xl border text-sm"
              />
              <input 
                type="password" required placeholder="Lozinka" 
                value={formaPrijava.lozinka} onChange={(e) => setFormaPrijava({ ...formaPrijava, lozinka: e.target.value })}
                className="w-full p-3 rounded-xl border text-sm"
              />
              <button type="submit" className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl">Prijavi se</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTRACIJA */}
      {prikaziRegistraciju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziRegistraciju(false)} className="absolute top-4 right-4 text-slate-400"><X className="w-5 h-5" /></button>
            <h2 className="text-2xl font-black mb-4">Registracija na Kupko</h2>
            
            <form onSubmit={rukujRegistracijom} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jedinstveno korisničko ime *</label>
                <input 
                  type="text" required placeholder="npr. ivan_zg" 
                  value={formaRegistracija.ime} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, ime: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">E-mail adresa (Obavezno) *</label>
                <input 
                  type="email" required placeholder="vas.email@gmail.com" 
                  value={formaRegistracija.email} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, email: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lozinka *</label>
                <input 
                  type="password" required placeholder="Lozinka" 
                  value={formaRegistracija.lozinka} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, lozinka: e.target.value })}
                  className="w-full p-3 rounded-xl border text-sm"
                />
              </div>

              <div className="space-y-2.5 pt-2 border-t text-xs">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="checkbox" required
                    checked={formaRegistracija.prihvacenaPrivatnost} 
                    onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvacenaPrivatnost: e.target.checked })}
                    className="mt-0.5 rounded text-blue-700"
                  />
                  <span>Pročitao sam Politiku privatnosti *</span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="checkbox" required
                    checked={formaRegistracija.prihvaceniUvjeti} 
                    onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvaceniUvjeti: e.target.checked })}
                    className="mt-0.5 rounded text-blue-700"
                  />
                  <span>Potvrđujem da imam više od 16 godina te prihvaćam Uvjete i pravila korištenja *</span>
                </label>
              </div>

              <button type="submit" className="w-full bg-amber-400 text-blue-950 font-bold py-3 rounded-xl mt-3">
                Nastavi na Verifikaciju E-maila
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
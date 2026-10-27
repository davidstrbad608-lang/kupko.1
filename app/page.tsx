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
    kvadratura: "", sobe: ""
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
      if (error) {
        console.error("Greška pri dohvatu iz Supabase:", error.message);
      } else if (data) {
        setOglasi(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const otvoriDetaljeOglasa = async (o: any) => {
    const noviPregledi = (o.pregledi || 0) + 1;
    setOglasi(prev => prev.map(item => item.id === o.id ? { ...item, pregledi: noviPregledi } : item));
    setOdabraniOglas({ ...o, pregledi: noviPregledi });

    try {
      await supabase.from('oglasi').update({ pregledi: noviPregledi }).eq('id', o.id);
    } catch (err) {
      console.error("Greška pri ažuriranju pregleda:", err);
    }
  };

  const posaljiPrijavuOglasa = (e: React.FormEvent) => {
    e.preventDefault();
    if (!odabraniOglas) return;

    const novaPrijava = {
      id: Date.now().toString(),
      oglasId: odabraniOglas.id,
      naslovOglasa: odabraniOglas.naslov,
      autorOglasa: odabraniOglas.prodavac || odabraniOglas.autor_email,
      razlog: razlogPrijave,
      opis: opisPrijave,
      prijavio: korisnik ? korisnik.email : "Gost",
      datum: new Date().toLocaleDateString("hr-HR") + " " + new Date().toLocaleTimeString("hr-HR", { hour: '2-digit', minute: '2-digit' })
    };

    const azuriranePrijave = [novaPrijava, ...prijavljeniOglasi];
    setPrijavljeniOglasi(azuriranePrijave);
    localStorage.setItem("kupko_prijavljeni_oglasi", JSON.stringify(azuriranePrijave));

    setPrikaziModalPrijaveOglasa(false);
    setOpisPrijave("");
    alert("🚨 Oglas je uspješno prijavljen administratoru. Hvala vam što pomažete održati Kupko.hr sigurnim!");
  };

  const detektirajLokacijuIBlizuOglase = () => {
    if (!navigator.geolocation) {
      alert("Geolokacija nije podržana u vašem pregledniku.");
      return;
    }

    alert("Molimo dopustite pristup lokaciji kako bismo pronašli oglase u vašoj blizini.");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=hr`);
          const data = await response.json();
          const address = data.address || {};
          const gradIliOkrug = (address.city || address.town || address.village || address.county || "").toLowerCase();
          
          let pronadjenaZupanija = ZUPANIJE.find(z => gradIliOkrug.includes(z.toLowerCase().replace("-", " ")));
          
          if (gradIliOkrug.includes("zagreb")) {
            pronadjenaZupanija = "Grad Zagreb";
          } else if (gradIliOkrug.includes("split")) {
            pronadjenaZupanija = "Splitsko-dalmatinska";
          } else if (gradIliOkrug.includes("rijeka")) {
            pronadjenaZupanija = "Primorsko-goranska";
          } else if (gradIliOkrug.includes("osijek")) {
            pronadjenaZupanija = "Osječko-baranjska";
          } else if (gradIliOkrug.includes("varaždin")) {
            pronadjenaZupanija = "Varaždinska";
          }

          if (pronadjenaZupanija) {
            setOdabranaZupanija(pronadjenaZupanija);
            alert(`📍 Uspješno detektirana lokacija! Prikazujem oglase za županiju: ${pronadjenaZupanija}`);
          } else {
            const nazivGrada = address.city || address.town || address.village || "";
            if (nazivGrada) {
              setPojamPretrage(nazivGrada);
              alert(`📍 Detektiran grad: ${nazivGrada}. Filtriram oglase.`);
            } else {
              alert("Lokacija detektirana, ali nismo uspjeli mapirati točnu regiju. Pokušajte ručno odabrati županiju.");
            }
          }
          setTrenutnaStranica(1);
        } catch (err) {
          console.error(err);
          alert("Došlo je do greške prilikom dohvaćanja naziva lokacije.");
        }
      },
      () => {
        alert("Pristup lokaciji je odbijen. Molimo omogućite dozvolu za lokaciju u postavkama preglednika.");
      }
    );
  };

  const podjeliOglas = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: glas.naslov,
        text: `Pogledaj ovaj oglas na Kupko.hr: ${glas.naslov} - ${glas.cijena} €`,
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert("Link oglasa je kopiran u međuspremnik!");
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

  const obnoviOglas = async (e: React.MouseEvent, id: any) => {
    e.stopPropagation();
    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;
    
    const { error } = await supabase
      .from('oglasi')
      .update({ datum: datumString, promoviran: true, top: true })
      .eq('id', id);

    if (error) {
      alert("Greška pri obnavljanju oglasa: " + error.message);
    } else {
      dohvatiOglaseIzSupabase();
      alert("Oglas je uspješno obnovljen i promoviran!");
    }
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
      datum: new Date().toLocaleDateString("hr-HR") + " " + new Date().toLocaleTimeString("hr-HR", { hour: '2-digit', minute: '2-digit' })
    };

    const azuriranePoruke = [novaPoruka, ...poruke];
    setPoruke(azuriranePoruke);
    localStorage.setItem("kupko_poruke_v2", JSON.stringify(azuriranePoruke));
    setNoviTekstPoruke("");
    alert("Poruka je uspješno poslana prodavaču!");
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
    alert(`Dobrodošli natrag, ${pronadjeniKorisnik.ime}!`);
  };

  const rukujRegistracijom = async (e: React.FormEvent) => {
    e.preventDefault();
    const imeClean = formaRegistracija.ime.trim();
    const emailLower = formaRegistracija.email.toLowerCase().trim();

    if (imeClean.toLowerCase() === "admin") {
      alert("Korisničko ime 'admin' je rezervirano i nije dozvoljeno za registraciju!");
      return;
    }

    if (!formaRegistracija.prihvacenaPrivatnost || !formaRegistracija.prihvaceniUvjeti) {
      alert("Morate pročitati i prihvatiti Politiku privatnosti te Uvjete i pravila korištenja da biste se registrirali.");
      return;
    }

    const zauzetoIme = registriraniKorisnici.some((k) => k.ime.toLowerCase() === imeClean.toLowerCase());
    if (zauzetoIme) {
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

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailLower,
          subject: 'Vaš verifikacijski kod - Kupko.hr',
          message: `Pozdrav ${imeClean}, vaš verifikacijski kod za registraciju na Kupko.hr je: <strong style="font-size: 20px; color: #2563eb;">${slucajniKod}</strong>`
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`📧 Verifikacijski kod poslan je na adresu: ${emailLower}`);
      } else {
        alert("Greška pri slanju e-maila: " + (data.error || "Nepoznata greška"));
      }
    } catch (err) {
      console.error(err);
      alert("Došlo je do mrežne greške prilikom slanja e-maila.");
    }
  };

  const potvrdiVerifikacijskiKod = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uneseniKod.trim() !== generiraniKod) {
      alert("Netočan verifikacijski kod!");
      return;
    }

    const brojTrenutnih = registriraniKorisnici.length;
    const dobivaKredite = brojTrenutnih < 20;
    const dodijeljeniKrediti = dobivaKredite ? 1 : 0;

    const noviRegKorisnik = {
      ime: privremenoIme, 
      email: privremeniEmail, 
      lozinka: privremenaLozinka,
      promoKrediti: dodijeljeniKrediti
    };

    let azuriraniBazaKorisnika = [...registriraniKorisnici, noviRegKorisnik];

    const pozivateljIme = localStorage.getItem("kupko_referral");
    if (pozivateljIme) {
      azuriraniBazaKorisnika = azuriraniBazaKorisnika.map(k => {
        if (k.ime.toLowerCase() === pozivateljIme.toLowerCase()) {
          return { ...k, promoKrediti: (k.promoKrediti || 0) + 1 };
        }
        return k;
      });
      localStorage.removeItem("kupko_referral");
    }

    setRegistriraniKorisnici(azuriraniBazaKorisnika);
    localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniBazaKorisnika));

    const aktivni = { ime: privremenoIme, email: privremeniEmail, isOwner: false, promoKrediti: dodijeljeniKrediti };
    postaviKorisnika(aktivni);

    setKorakVerifikacije(false);
    setUneseniKod("");
    setFormaRegistracija({ ime: "", email: "", lozinka: "", prihvacenaPrivatnost: false, prihvaceniUvjeti: false });
    
    let porukaObavijesti = dobivaKredite 
      ? `🎉 Čestitamo! Ušlište u Giveaway (prvih 20 korisnika) i dobili ste 🌟 1 promo post na poklon!`
      : `Uspješno ste se registrirali na Kupko.hr!`;

    if (pozivateljIme) {
      porukaObavijesti += ` (Prijatelj ${pozivateljIme} koji vas je pozvao upravo je dobio 1 promo post!)`;
    }

    alert(porukaObavijesti);
    setPrikaziUnosPodatakaModal(true);
  };

  const pokreniZaboravljenuLozinku = async (e: React.FormEvent) => {
    e.preventDefault();
    const mailClean = zaboravljeniEmail.trim().toLowerCase();
    const postoji = registriraniKorisnici.find(k => k.email.toLowerCase() === mailClean);

    if (!postoji && mailClean !== "admin@kupko.hr") {
      alert("Uneseni e-mail ne postoji u našoj bazi korisnika!");
      return;
    }

    const kod = Math.floor(100000 + Math.random() * 900000).toString();
    setKodResetiranja(kod);
    setKorakResetiranja(2);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: mailClean,
          subject: 'Kod za oporavak lozinke - Kupko.hr',
          message: `Vaš kod za promjenu lozinke je: <strong style="font-size: 20px; color: #2563eb;">${kod}</strong>`
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`📧 Kod za oporavak poslan je na adresu: ${mailClean}`);
      } else {
        alert("Greška pri slanju e-maila: " + (data.error || "Nepoznata greška"));
      }
    } catch (err) {
      console.error(err);
      alert("Došlo je do mrežne greške prilikom slanja e-maila.");
    }
  };

  const potvrdiResetLozinke = (e: React.FormEvent) => {
    e.preventDefault();
    if (uneseniKodReset.trim() !== kodResetiranja) {
      alert("Netočan kod za potvrdu!");
      return;
    }

    const mailClean = zaboravljeniEmail.trim().toLowerCase();
    if (mailClean === "admin@kupko.hr") {
      alert("Admin lozinka se ne može mijenjati ovim putem.");
      setPrikaziZaboravljenuLozinku(false);
      setKorakResetiranja(1);
      setZaboravljeniEmail("");
      setUneseniKodReset("");
      setNovaLozinka("");
      return;
    }

    const azuriraniKorisnici = registriraniKorisnici.map(k => {
      if (k.email.toLowerCase() === mailClean) {
        return { ...k, lozinka: novaLozinka };
      }
      return k;
    });

    setRegistriraniKorisnici(azuriraniKorisnici);
    localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniKorisnici));

    alert("Lozinka je uspješno promijenjena! Sada se možete prijaviti s novom lozinkom.");
    setPrikaziZaboravljenuLozinku(false);
    setKorakResetiranja(1);
    setZaboravljeniEmail("");
    setUneseniKodReset("");
    setNovaLozinka("");
    setPrikaziPrijavu(true);
  };

  const spremiOsobnePodatke = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("kupko_osobni_podaci", JSON.stringify(korisnickiPodaci));
    setPrikaziUnosPodatakaModal(false);
    alert("Osobni podaci su uspješno spremljeni!");
  };

  const mozeUreditiIliBrisati = (glas: any) => {
    if (!korisnik) return false;
    if (glas.autor_email) {
      return glas.autor_email.toLowerCase() === korisnik.email.toLowerCase() || korisnik.isOwner;
    }
    return korisnik.isOwner;
  };

  const obrisiOglas = async (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni!"); return; }
    
    if (!mozeUreditiIliBrisati(glas)) { 
      alert("Nemate ovlasti brisati tuđi oglas!"); 
      return; 
    }
    
    if (confirm("Jeste li sigurni da želite obrisati oglas?")) {
      const { error } = await supabase.from('oglasi').delete().eq('id', glas.id);
      if (error) {
        alert("Greška prilikom brisanja oglasa: " + error.message);
      } else {
        dohvatiOglaseIzSupabase();
        setOdabraniOglas(null);
        alert("Oglas uspješno obrisan iz baze.");
      }
    }
  };

  const pokreniUredivanje = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni!"); return; }
    
    if (!mozeUreditiIliBrisati(glas)) { 
      alert("Nemate ovlasti uređivati tuđi oglas!"); 
      return; 
    }
    
    setOglasZaUrediti({ 
      ...glas, 
      slike: glas.slike || [] 
    });
    setPrikaziUredivanje(true);
  };

  const dohvatiPaketeZaOglas = (glas: any) => {
    const cijenaNum = parseFloat(glas?.cijena || "0");
    if (cijenaNum < 200) {
      return [
        { naziv: "Mini Boost (3 dana)", cijena: "2.00" },
        { naziv: "Standardni Paket (7 dana)", cijena: "3.50" },
        { naziv: "Dugotrajni Paket (30 dana)", cijena: "6.00" }
      ];
    } else if (cijenaNum >= 200 && cijenaNum < 2000) {
      return [
        { naziv: "Mini Boost (3 dana)", cijena: "4.00" },
        { naziv: "Standardni Paket (7 dana)", cijena: "7.00" },
        { naziv: "Dugotrajni Paket (30 dana)", cijena: "12.00" }
      ];
    } else {
      return [
        { naziv: "Premium Objava (7 dana)", cijena: "15.00" },
        { naziv: "Maksimalni VIP Paket (30 dana)", cijena: "30.00" }
      ];
    }
  };

  const pokreniPromociju = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni da biste mogli promovirati oglas!"); return; }
    setOglasZaPromociju(glas);
    const paketi = dohvatiPaketeZaOglas(glas);
    setOdabraniPromoPaket(paketi[0]);
    setPrikaziPlacanjePromo(true);
  };

  const iskoristiBesplatniBoost = async () => {
    if (!oglasZaPromociju || !korisnik) return;
    if ((korisnik.promoKrediti || 0) <= 0) return;

    const datumIsteka = new Date();
    datumIsteka.setDate(datumIsteka.getDate() + 7);

    const { error } = await supabase.from('oglasi').update({ 
      promoviran: true, 
      top: true, 
      promo_istek: datumIsteka.toISOString() 
    }).eq('id', oglasZaPromociju.id);

    if (error) {
      alert("Greška: " + error.message);
      return;
    }

    dohvatiOglaseIzSupabase();

    const noviKrediti = (korisnik.promoKrediti || 0) - 1;
    const azuriraniKorisnik = { ...korisnik, promoKrediti: noviKrediti };
    postaviKorisnika(azuriraniKorisnik);

    const azuriraniRegKorisnici = registriraniKorisnici.map(k => 
      k.email.toLowerCase() === korisnik.email.toLowerCase() ? { ...k, promoKrediti: noviKrediti } : k
    );
    setRegistriraniKorisnici(azuriraniRegKorisnici);
    localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniRegKorisnici));

    setPrikaziPlacanjePromo(false);
    setOglasZaPromociju(null);
    alert(`🌟 Uspješno iskorišten vaš promo post! Oglas je promoviran. Preostalo promo postova: ${noviKrediti}`);
  };

  const potvrdiUplatuPromoStripe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oglasZaPromociju || !odabraniPromoPaket) return;

    const stripeLink = "https://buy.stripe.com/tvoj_pravi_link"; 
    window.location.href = stripeLink;
  };

  const rukujSpremanjemUredivanja = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oglasZaUrediti.naslov || !oglasZaUrediti.cijena) return;

    const { error } = await supabase
      .from('oglasi')
      .update({ 
        naslov: oglasZaUrediti.naslov, 
        cijena: oglasZaUrediti.cijena, 
        opis: oglasZaUrediti.opis,
        kategorija: oglasZaUrediti.kategorija,
        podkategorija: oglasZaUrediti.podkategorija,
        zupanija: oglasZaUrediti.zupanija,
        grad: oglasZaUrediti.grad || null,
        adresa: oglasZaUrediti.adresa || null,
        telefon: oglasZaUrediti.telefon,
        godiste: oglasZaUrediti.godiste || null,
        kilometri: oglasZaUrediti.kilometri || null,
        snagaKw: oglasZaUrediti.snagaKw || null,
        gorivo: oglasZaUrediti.gorivo || null,
        mjenjac: oglasZaUrediti.mjenjac || null,
        kvadratura: oglasZaUrediti.kvadratura || null,
        sobe: oglasZaUrediti.sobe || null,
        slike: oglasZaUrediti.slike || []
      })
      .eq('id', oglasZaUrediti.id);

    if (error) {
      alert("Greška pri spremanju uređivanja: " + error.message);
    } else {
      dohvatiOglaseIzSupabase();
      setOdabraniOglas(null);
      setPrikaziUredivanje(false);
      alert("Uređivanje uspješno spremljeno u bazu!");
    }
  };

  const izracunajAiProcjenuZaOglas = (glas: any) => {
    const filtriraniKat = oglasi.filter(o => o.kategorija === glas.kategorija && o.cijena);
    if (filtriraniKat.length <= 1) return "Tržište je stabilno. Cijena je unutar očekivanih okvira za ovu kategoriju.";
    const zbroj = filtriraniKat.reduce((acc, curr) => acc + parseFloat(curr.cijena || "0"), 0);
    const prosjek = Math.round(zbroj / filtriraniKat.length);
    const trenutna = parseFloat(glas.cijena || "0");

    if (trenutna < prosjek * 0.85) {
      return `Izuzetna prilika! Ova cijena je ${Math.round(prosjek - trenutna)} € niža od prosjeka kategorije (${prosjek} €).`;
    } else if (trenutna > prosjek * 1.15) {
      return `Cijena je nešto viša od prosjeka ove kategorije (${prosjek} €). Preporučuje se pregovaranje s prodavačem.`;
    } else {
      return `Fer cijena! Usklađena je s prosjekom tržišta za ovu kategoriju (~${prosjek} €).`;
    }
  };

  const rukujDodavanjemOglasa = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!korisnik) {
      alert("Morate biti prijavljeni da biste predali oglas!");
      setPrikaziFormu(false);
      setPrikaziPrijavu(true);
      return;
    }

    if (!noviOglas.naslov || !noviOglas.cijena) return;
    if (parseInt(sigurnosniKod.unos) !== sigurnosniKod.a + sigurnosniKod.b) {
      alert("Netočan zbroj u anti-spam provjeri!");
      return;
    }

    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;

    const stvoreniOglas = {
      naslov: noviOglas.naslov,
      cijena: noviOglas.cijena,
      staraCijena: noviOglas.staraCijena || null,
      popustPostotak: noviOglas.popustPostotak || null,
      snizeno: noviOglas.snizeno,
      kategorija: noviOglas.kategorija,
      podkategorija: noviOglas.podkategorija,
      zupanija: noviOglas.zupanija,
      grad: noviOglas.grad || null,
      adresa: noviOglas.adresa || null,
      stanje: noviOglas.stanje,
      opis: noviOglas.opis || null,
      prodavac: korisnik.ime,
      autor_email: korisnik.email,
      telefon: noviOglas.telefon,
      promoviran: noviOglas.promoviran,
      top: noviOglas.promoviran,
      datum: datumString,
      pregledi: 0,
      godiste: noviOglas.godiste || null,
      kilometri: noviOglas.kilometri || null,
      snagaKw: noviOglas.snagaKw || null,
      gorivo: noviOglas.gorivo || null,
      mjenjac: noviOglas.mjenjac || null,
      kvadratura: noviOglas.kvadratura || null,
      sobe: noviOglas.sobe || null,
      slike: noviOglas.slike.length > 0 ? noviOglas.slike : ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"]
    };

    const { data, error } = await supabase.from('oglasi').insert([stvoreniOglas]).select();

    if (error) {
      alert("Greška pri spremanju u bazu: " + error.message);
    } else {
      dohvatiOglaseIzSupabase();
      setPrikaziFormu(false);
      setNoviOglas({
        naslov: "", cijena: "", staraCijena: "", popustPostotak: "", snizeno: false,
        kategorija: "auto-moto", podkategorija: "Osobna vozila",
        zupanija: "Grad Zagreb", grad: "", adresa: "", stanje: "Novo", slike: [], opis: "",
        prodavac: "", telefon: "", email: "", promoviran: false,
        godiste: "", kilometri: "", snagaKw: "", gorivo: "Dizel", mjenjac: "Ručni",
        kvadratura: "", sobe: ""
      });
      generirajKôd();

      if (data && data[0]) {
        if (noviOglas.promoviran) {
          setOglasZaPromociju(data[0]);
          const paketi = dohvatiPaketeZaOglas(data[0]);
          setOdabraniPromoPaket(paketi[0]);
          setPrikaziPlacanjePromo(true);
        } else {
          alert("Oglas je uspješno objavljen!");
        }
      }
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kupko_preset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzc1mpgz/auto/upload",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      return data.secure_url || null;
    } catch (error) {
      console.error(error);
      alert("Došlo je do greške prilikom uploada datoteke.");
      return null;
    }
  };

  const rukujVisestrukimUcitavanjemSlika = async (e: React.ChangeEvent<HTMLInputElement>, uredi = false) => {
    const datoteke = e.target.files;
    if (datoteke) {
      for (const file of Array.from(datoteke)) {
        const cloudinaryUrl = await uploadToCloudinary(file);
        if (cloudinaryUrl) {
          if (uredi) {
            setOglasZaUrediti((prev: any) => ({
              ...prev,
              slike: [...(prev.slike || []), cloudinaryUrl]
            }));
          } else {
            setNoviOglas((prev) => ({
              ...prev,
              slike: [...prev.slike, cloudinaryUrl]
            }));
          }
        }
      }
    }
  };

  const filtriraniOglasi = oglasi.filter((o) => {
    const odgovaraTrazilici = o.naslov?.toLowerCase().includes(pojamPretrage.toLowerCase());
    const odgovaraKategoriji = odabranaKategorija === "sve" || o.kategorija === odabranaKategorija;
    const odgovaraPodkategoriji = odabranaPodkategorija === "sve" || o.podkategorija === odabranaPodkategorija;
    const odgovaraZupaniji = odabranaZupanija === "sve" || o.zupanija === odabranaZupanija;
    const odgovaraOmiljenima = !prikaziSamoOmiljene || omiljeniIds.includes(o.id);
    const odgovaraMojima = !prikaziSamoMojeOglase || (korisnik && (o.autor_email === korisnik.email || o.prodavac === korisnik.ime));
    const odgovaraProdavacu = !odabraniProdavacFilter || o.autor_email === odabraniProdavacFilter;
    
    const cijenaNum = parseFloat(o.cijena || "0");
    const minNum = minCijena !== "" ? parseFloat(minCijena) : 0;
    const maxNum = maxCijena !== "" ? parseFloat(maxCijena) : Infinity;
    const odgovaraCijeni = cijenaNum >= minNum && cijenaNum <= maxNum;

    const odgovaraStanju = odabranoStanje === "sve" || (o.stanje && o.stanje.toLowerCase().includes(odabranoStanje.toLowerCase()));

    return odgovaraTrazilici && odgovaraKategoriji && odgovaraPodkategoriji && odgovaraZupaniji && odgovaraOmiljenima && odgovaraMojima && odgovaraCijeni && odgovaraStanju && odgovaraProdavacu;
  }).sort((a, b) => {
    if (sortiranje === "cijena-uzlazno") return Number(a.cijena || 0) - Number(b.cijena || 0);
    if (sortiranje === "cijena-silazno") return Number(b.cijena || 0) - Number(a.cijena || 0);
    return Number(b.id || 0) - Number(a.id || 0);
  });

  const ukupnoStranica = Math.ceil(filtriraniOglasi.length / oglasiPoStranici) || 1;
  const indeksPocetka = (trenutnaStranica - 1) * oglasiPoStranici;
  const trenutniOglasiNaStranici = filtriraniOglasi.slice(indeksPocetka, indeksPocetka + oglasiPoStranici);

  const promoOglasi = oglasi.filter((o) => o.promoviran);
  const preostaloMjestaZaGrateis = Math.max(0, 20 - registriraniKorisnici.length);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-amber-400 selection:text-blue-950">
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {preostaloMjestaZaGrateis > 0 && (
          <div className="bg-amber-400 text-blue-950 px-4 py-3 text-xs sm:text-sm font-black text-center shadow-sm flex items-center justify-center gap-2 border-b border-amber-500 tracking-wide">
            <Sparkles className="w-5 h-5 fill-blue-950 text-amber-400 animate-pulse" />
            <span>GIVEAWAY AKCIJA: Prvih 20 registriranih korisnika dobiva 1 promo post na poklon! (Preostalo još: {preostaloMjestaZaGrateis} / 20)</span>
          </div>
        )}

        <div className="bg-blue-950 text-slate-300 text-xs py-2 px-6 border-b border-blue-900">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="flex items-center gap-2 font-bold tracking-wide text-slate-200">
              <Shield className="w-4 h-4 text-emerald-400" />
              🇭🇷 Kupko.hr - Vodeći domaći oglasnik 
            </span>

            <div className="flex items-center gap-5">
              {korisnik && (
                <button 
                  onClick={() => setPrikaziSanducicPoruka(true)}
                  className="relative bg-blue-900/85 hover:bg-blue-900 text-amber-400 px-3.5 py-1.5 rounded-xl border border-blue-700/50 flex items-center gap-2 transition font-bold shadow-sm"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Sandučić</span>
                  {poruke.filter(p => p.primatelj === korisnik.email).length > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      {poruke.filter(p => p.primatelj === korisnik.email).length}
                    </span>
                  )}
                </button>
              )}

              {korisnik ? (
                <div className="relative">
                  <button 
                    onClick={() => setPrikaziMeniKorisnika(!prikaziMeniKorisnika)}
                    className="text-amber-400 font-extrabold flex items-center gap-2 bg-blue-900/85 hover:bg-blue-900 px-3.5 py-1.5 rounded-xl border border-blue-700/50 transition shadow-sm"
                  >
                    <User className="w-3.5 h-3.5" /> 
                    <span>{korisnik.ime}</span>
                    <span className="text-[10px] bg-amber-400 text-blue-950 px-1.5 py-0.5 rounded font-black">▼</span>
                  </button>

                  {prikaziMeniKorisnika && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 text-slate-900 z-50 overflow-hidden py-2 text-sm">
                      <div className="px-5 py-3 border-b bg-slate-50/70">
                        <span className="text-[11px] text-slate-400 uppercase font-extrabold tracking-wider">Aktivni račun</span>
                        <p className="font-black text-slate-900 text-base">{korisnik.ime}</p>
                        <p className="text-xs text-blue-600 font-medium truncate">{korisnik.email}</p>
                        
                        <div className="mt-3 bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-xl flex items-center justify-between text-xs font-black">
                          <span>🌟 Promo postovi:</span>
                          <span className="bg-amber-500 text-white px-2 py-0.5 rounded-lg text-sm">{korisnik.promoKrediti || 0}</span>
                        </div>

                        <div className="mt-3 bg-blue-50 border border-blue-200 text-blue-900 p-2.5 rounded-xl text-xs space-y-1.5">
                          <span className="font-black block">🔗 Tvoj link za pozivanje:</span>
                          <input 
                            type="text" 
                            readOnly 
                            value={`https://kupko.hr/?ref=${korisnik.ime}`} 
                            onClick={(e) => {
                              e.currentTarget.select();
                              navigator.clipboard.writeText(`https://kupko.hr/?ref=${korisnik.ime}`);
                              alert("Link za pozivanje je kopiran! Pošalji ga prijatelju.");
                            }}
                            className="w-full p-1.5 bg-white border rounded text-[10px] font-bold text-center cursor-pointer select-all"
                            title="Klikni za kopiranje"
                          />
                          <p className="text-[10px] text-slate-500">Kada se prijatelj registrira preko ovog linka, ti dobivaš 1 promo post!</p>
                        </div>
                      </div>

                      <div className="py-1.5 px-2 space-y-0.5">
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSamoMojeOglase(true); setPrikaziSamoOmiljene(false); setTrenutnaStranica(1); }} className="w-full text-left px-3.5 py-2.5 font-bold hover:bg-blue-50/80 rounded-xl flex items-center gap-3 text-slate-700 hover:text-blue-700 transition">
                          <Package className="w-4 h-4 text-blue-600" /> Moji oglasi (Dashboard)
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSanducicPoruka(true); }} className="w-full text-left px-3.5 py-2.5 font-bold hover:bg-blue-50/80 rounded-xl flex items-center gap-3 text-slate-700 hover:text-blue-700 transition">
                          <MessageSquare className="w-4 h-4 text-indigo-600" /> Sandučić poruka
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSamoOmiljene(true); setPrikaziSamoMojeOglase(false); setTrenutnaStranica(1); }} className="w-full text-left px-3.5 py-2.5 font-bold hover:bg-blue-50/80 rounded-xl flex items-center gap-3 text-slate-700 hover:text-blue-700 transition">
                          <Heart className="w-4 h-4 text-rose-500" /> Spremljeni oglasi ({omiljeniIds.length})
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziUnosPodatakaModal(true); }} className="w-full text-left px-3.5 py-2.5 font-bold hover:bg-blue-50/80 rounded-xl flex items-center gap-3 text-slate-700 hover:text-blue-700 transition">
                          <Settings className="w-4 h-4 text-slate-600" /> Osobni podaci
                        </button>
                      </div>

                      <div className="border-t pt-1.5 px-2 mt-1">
                        <button onClick={() => { setPrikaziMeniKorisnika(false); postaviKorisnika(null); }} className="w-full text-left px-3.5 py-2.5 font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-3 transition">
                          <LogIn className="w-4 h-4" /> Odjava
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-4 font-bold text-xs sm:text-sm">
                  <button onClick={() => setPrikaziPrijavu(true)} className="hover:text-white transition flex items-center gap-1.5">
                    <LogIn className="w-4 h-4" /> Prijava
                  </button>
                  <span className="text-blue-700">|</span>
                  <button onClick={() => setPrikaziRegistraciju(true)} className="hover:text-amber-300 transition flex items-center gap-1.5 text-amber-400 font-black">
                    <UserPlus className="w-4 h-4" /> Registracija
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-40 border-b border-blue-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { 
                setOdabranaKategorija("sve"); 
                setOdabranaPodkategorija("sve"); 
                setOdabranaZupanija("sve");
                setPojamPretrage(""); 
                setMinCijena("");
                setMaxCijena("");
                setOdabranoStanje("sve");
                setPrikaziSamoOmiljene(false); 
                setPrikaziSamoMojeOglase(false); 
                setOdabraniOglas(null); 
                setPrikaziReelsMod(false); 
                setOdabraniProdavacFilter(null); 
                setTrenutnaStranica(1); 
                setPrikaz("grid");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative bg-amber-400 p-2.5 rounded-2xl text-blue-950 shadow-md group-hover:scale-105 transition duration-300">
                <ShoppingBag className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-black text-2xl sm:text-3xl tracking-tight text-white">KUP</span>
                  <span className="font-black text-2xl sm:text-3xl tracking-tight text-amber-400">KO</span>
                  <span className="text-amber-400 text-xs font-black bg-amber-400/20 px-2 py-0.5 rounded-lg ml-2 border border-amber-400/30">.HR</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full md:max-w-2xl flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Pretraži ponudu (npr. Stan, BMW, Bicikl...)"
                  value={pojamPretrage}
                  onChange={(e) => { setPojamPretrage(e.target.value); setTrenutnaStranica(1); }}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-slate-900 bg-white shadow-sm text-sm font-medium outline-none focus:ring-4 focus:ring-amber-400/50 placeholder:text-slate-400 transition"
                />
                <Search className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
              </div>

              <div className="flex gap-2">
                <select
                  value={odabranaZupanija}
                  onChange={(e) => { setOdabranaZupanija(e.target.value); setTrenutnaStranica(1); }}
                  className="px-4 py-3 rounded-2xl bg-blue-950 text-white border border-blue-700/60 text-xs sm:text-sm font-bold outline-none cursor-pointer shadow-sm hover:border-blue-500 transition"
                >
                  <option value="sve">🇭🇷 Cijela Hrvatska</option>
                  {ZUPANIJE.map((z) => <option key={z} value={z} className="bg-slate-900">{z}</option>)}
                </select>

                <button
                  type="button"
                  onClick={detektirajLokacijuIBlizuOglase}
                  title="Pronađi oglase u mojoj blizini"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition shrink-0"
                >
                  <Navigation className="w-4 h-4 animate-pulse" />
                  <span className="hidden lg:inline">Blizina 📍</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={() => { setPrikaziReelsMod(true); setReelsIndex(0); }}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black px-4 py-3 rounded-2xl flex items-center gap-2 shadow-md transition text-xs tracking-wider uppercase animate-pulse"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>Reels 🔥</span>
              </button>

              <button
                onClick={() => { setPrikaziSamoOmiljene(!prikaziSamoOmiljene); setPrikaziSamoMojeOglase(false); setPrikaziReelsMod(false); setTrenutnaStranica(1); }}
                className={`p-3 rounded-2xl text-sm font-black transition shadow-sm ${
                  prikaziSamoOmiljene ? "bg-rose-500 text-white" : "bg-blue-950/80 text-slate-200 hover:bg-blue-950 border border-blue-700/60"
                }`}
                title="Spremljeni oglasi"
              >
                <Heart className={`w-5 h-5 ${prikaziSamoOmiljene ? "fill-white" : "text-rose-400"}`} />
              </button>

              <button 
                onClick={() => {
                  if (!korisnik) {
                    alert("Morate biti prijavljeni da biste predali oglas!");
                    setPrikaziPrijavu(true);
                    return;
                  }
                  setPrikaziFormu(true);
                }}
                className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition text-xs uppercase tracking-wider"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Predaj oglas</span>
              </button>
            </div>
          </div>
        </header>

        {!prikaziSamoOmiljene && !prikaziSamoMojeOglase && !prikaziReelsMod && promoOglasi.length > 0 && (
          <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 py-6 text-blue-950 shadow-md border-b border-amber-600/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-950 text-amber-400 rounded-xl font-black shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wide text-blue-950">Izdvojeni Sponzorirani Oglasi</h2>
                    <p className="text-xs font-bold text-blue-900/80">Istaknute ponude na vrhu pretrage</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setPromoSlajderIndex((prev) => (prev - 1 + promoOglasi.length) % promoOglasi.length)} className="p-2 bg-blue-950/15 hover:bg-blue-950/30 rounded-xl transition text-blue-950">
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>
                  <button onClick={() => setPromoSlajderIndex((prev) => (prev + 1) % promoOglasi.length)} className="p-2 bg-blue-950/15 hover:bg-blue-950/30 rounded-xl transition text-blue-950">
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {promoOglasi.slice(promoSlajderIndex, promoSlajderIndex + 3).map((o) => (
                  <div 
                    key={o.id}
                    onClick={() => otvoriDetaljeOglasa(o)}
                    className="bg-white text-slate-900 rounded-3xl p-4 shadow-md border border-amber-300/60 flex gap-4 cursor-pointer hover:shadow-xl hover:scale-[1.01] transition duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute top-0 right-0 bg-blue-950 text-amber-400 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> PROMO
                    </span>

                    <img src={o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} alt={o.naslov} className="w-28 h-28 object-cover rounded-2xl group-hover:scale-105 transition duration-300" />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">📍 {o.zupanija}</span>
                        <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">{o.naslov}</h4>
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

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 flex-1 w-full">
          
          {korisnik?.isOwner && (
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 border border-amber-400/40 rounded-3xl p-6 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-400 text-blue-950 rounded-2xl shadow-md">
                    <Crown className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-wide text-white">👑 Admin Upravljačka Ploča</h3>
                    <p className="text-xs text-blue-200 font-medium">Uvid u rad baze i statistiku sustava</p>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-400 text-blue-950 font-black px-3 py-1 rounded-full uppercase tracking-wider">Vlasnik</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
                <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl">
                  <span className="text-[11px] text-blue-200 uppercase font-bold block mb-1">📦 Ukupno oglasa</span>
                  <span className="text-3xl font-black text-white">{oglasi.length}</span>
                </div>
                <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl">
                  <span className="text-[11px] text-blue-200 uppercase font-bold block mb-1">⭐ Promo postovi</span>
                  <span className="text-3xl font-black text-amber-400">{promoOglasi.length}</span>
                </div>
                <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl">
                  <span className="text-[11px] text-blue-200 uppercase font-bold block mb-1">👥 Giveaway korisnici</span>
                  <span className="text-3xl font-black text-emerald-400">{registriraniKorisnici.length} / 20</span>
                </div>
                <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl">
                  <span className="text-[11px] text-rose-300 uppercase font-bold block mb-1">🚨 Prijavljeni oglasi</span>
                  <span className="text-3xl font-black text-rose-400">{prijavljeniOglasi.length}</span>
                </div>
              </div>
            </div>
          )}

          {prikaziReelsMod ? (
            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl max-w-lg mx-auto relative border border-slate-200 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-rose-600 font-black">
                  <Flame className="w-6 h-6 animate-bounce" />
                  <span className="text-lg uppercase tracking-wider">Kupko Reels & Swipe</span>
                </div>
                <button 
                  onClick={() => setPrikaziReelsMod(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-black transition"
                >
                  ✕ Zatvori
                </button>
              </div>

              {oglasi.length === 0 ? (
                <p className="text-center py-20 text-slate-400 font-bold text-sm">Nema oglasa u bazi.</p>
              ) : (
                <div className="relative bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-800">
                  {(() => {
                    const currentOglas = oglasi[reelsIndex % oglasi.length];
                    const slika = currentOglas.slike && currentOglas.slike.length > 0 ? currentOglas.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80";
                    return (
                      <div>
                        <div className="relative h-96 w-full bg-black">
                          {slika.endsWith(".mp4") || slika.includes("video") ? (
                            <video src={slika} controls autoPlay className="w-full h-full object-cover" />
                          ) : (
                            <img src={slika} alt={currentOglas.naslov} className="w-full h-full object-cover" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>
                          
                          <span className="absolute top-4 left-4 bg-rose-600 text-white font-black text-xs uppercase px-3 py-1.5 rounded-full shadow">
                            📍 {currentOglas.zupanija}
                          </span>

                          <button
                            onClick={(e) => toggleOmiljeni(e, currentOglas.id)}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2.5 rounded-full shadow hover:bg-white transition"
                          >
                            <Heart className={`w-5 h-5 ${omiljeniIds.includes(currentOglas.id) ? "fill-rose-500 text-rose-500" : "text-slate-700"}`} />
                          </button>

                          <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                            <span className="text-2xl font-black text-amber-400">{currentOglas.cijena} €</span>
                            <h3 className="text-base font-black text-white leading-snug line-clamp-2">{currentOglas.naslov}</h3>
                            <p className="text-xs text-slate-300 line-clamp-2 font-medium">{currentOglas.opis}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-900 flex gap-3 border-t border-slate-800">
                          <button
                            onClick={() => otvoriDetaljeOglasa(currentOglas)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow transition"
                          >
                            Detalji
                          </button>
                          
                          <button
                            onClick={() => setReelsIndex((prev) => prev + 1)}
                            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow transition flex items-center justify-center gap-1.5"
                          >
                            <span>Sljedeći ⏭️</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          ) : (
            <>
              {!prikaziSamoOmiljene && !prikaziSamoMojeOglase && odabranaKategorija === "sve" && pojamPretrage === "" && prikaz !== "karta" && (
                <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-50 text-blue-700 rounded-xl font-black">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-base text-slate-900">Popularne kategorije</h3>
                      <p className="text-xs text-slate-400 font-semibold">Brzi pregled ponude po kategorijama</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                    {SVE_KATEGORIJE.map((kat) => {
                      const count = oglasi.filter(o => o.kategorija === kat.id).length;
                      return (
                        <div
                          key={kat.id}
                          onClick={() => { setOdabranaKategorija(kat.id); setOdabranaPodkategorija("sve"); setTrenutnaStranica(1); }}
                          className="bg-slate-50 hover:bg-blue-50/50 border border-slate-100 p-4 rounded-2xl cursor-pointer transition duration-300 flex flex-col items-center text-center group shadow-sm hover:shadow"
                        >
                          <span className="text-3xl mb-2 group-hover:scale-110 transition duration-300">{kat.ikona}</span>
                          <span className="font-bold text-slate-800 text-xs line-clamp-1">{kat.naziv}</span>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full mt-2">
                            {count} oglasa
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Filtriranje ponude</h3>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1"><SlidersHorizontal className="w-3.5 h-3.5" /> Cijena (€):</span>
                    <input 
                      type="number" placeholder="Min" value={minCijena} onChange={(e) => { setMinCijena(e.target.value); setTrenutnaStranica(1); }}
                      className="w-20 p-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 outline-none focus:border-blue-600"
                    />
                    <span className="text-slate-300 font-bold">-</span>
                    <input 
                      type="number" placeholder="Max" value={maxCijena} onChange={(e) => { setMaxCijena(e.target.value); setTrenutnaStranica(1); }}
                      className="w-20 p-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50 outline-none focus:border-blue-600"
                    />

                    <select 
                      value={odabranoStanje} onChange={(e) => { setOdabranoStanje(e.target.value); setTrenutnaStranica(1); }}
                      className="p-2 rounded-xl border border-slate-200 text-xs bg-slate-50 font-bold text-slate-700 outline-none"
                    >
                      <option value="sve">Sva stanja</option>
                      <option value="novo">Novo / Kao novo</option>
                      <option value="korišteno">Korišteno</option>
                    </select>

                    {(minCijena || maxCijena || odabranoStanje !== "sve") && (
                      <button onClick={() => { setMinCijena(""); setMaxCijena(""); setOdabranoStanje("sve"); setTrenutnaStranica(1); }} className="text-xs text-rose-600 font-bold hover:underline ml-1">
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Sortiranje:</label>
                    <select
                      value={sortiranje}
                      onChange={(e) => { setSortiranje(e.target.value); setTrenutnaStranica(1); }}
                      className="p-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 text-slate-700 outline-none"
                    >
                      <option value="najnovije">Najnovije prvo</option>
                      <option value="cijena-uzlazno">Cijena: od najniže</option>
                      <option value="cijena-silazno">Cijena: od najviše</option>
                    </select>
                  </div>

                  {odabraniProdavacFilter && (
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                      <span className="text-xs text-blue-900 font-bold">Prodavač: <b>{odabraniProdavacFilter}</b></span>
                      <button 
                        onClick={() => { setOdabraniProdavacFilter(null); setTrenutnaStranica(1); }}
                        className="text-xs text-rose-600 font-black hover:underline"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => { setOdabranaKategorija("sve"); setOdabranaPodkategorija("sve"); setTrenutnaStranica(1); }}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition shadow-sm ${odabranaKategorija === "sve" ? "bg-blue-600 text-white shadow" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
                  >
                    Sve Kategorije
                  </button>
                  {SVE_KATEGORIJE.map((kat) => (
                    <button
                      key={kat.id}
                      onClick={() => { setOdabranaKategorija(kat.id); setOdabranaPodkategorija("sve"); setTrenutnaStranica(1); }}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm ${odabranaKategorija === kat.id ? "bg-blue-600 text-white shadow" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
                    >
                      <span>{kat.ikona}</span>
                      <span>{kat.naziv}</span>
                    </button>
                  ))}
                </div>

                {odabranaKategorija !== "sve" && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-blue-900 uppercase mb-2.5">
                      Podkategorije:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => { setOdabranaPodkategorija("sve"); setTrenutnaStranica(1); }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${odabranaPodkategorija === "sve" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                      >
                        Sve
                      </button>
                      {SVE_KATEGORIJE.find((k) => k.id === odabranaKategorija)?.podkategorije.map((pod) => (
                        <button
                          key={pod}
                          onClick={() => { setOdabranaPodkategorija(pod); setTrenutnaStranica(1); }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${odabranaPodkategorija === pod ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                        >
                          {pod}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <section>
                <div className="flex justify-between items-center mb-5 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                    {prikaziSamoOmiljene ? "Spremljeni oglasi" : (prikaziSamoMojeOglase ? "Moji oglasi (Dashboard)" : (prikaz === "karta" ? "Karta po županijama" : "Aktivni Oglasi"))} ({filtriraniOglasi.length})
                  </h3>
                  <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl">
                    <button onClick={() => setPrikaz("grid")} className={`p-2 rounded-xl text-xs transition ${prikaz === "grid" ? "bg-white text-blue-600 shadow-sm font-bold" : "text-slate-500"}`} title="Grid"><Grid className="w-4 h-4" /></button>
                    <button onClick={() => setPrikaz("list")} className={`p-2 rounded-xl text-xs transition ${prikaz === "list" ? "bg-white text-blue-600 shadow-sm font-bold" : "text-slate-500"}`} title="Lista"><List className="w-4 h-4" /></button>
                    <button onClick={() => setPrikaz("karta")} className={`p-2 rounded-xl text-xs transition flex items-center gap-1 ${prikaz === "karta" ? "bg-white text-blue-600 shadow-sm font-bold" : "text-slate-500"}`} title="Karta"><Map className="w-4 h-4" /></button>
                  </div>
                </div>

                {prikaz === "karta" ? (
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5">
                    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-amber-400" />
                        <div>
                          <h4 className="font-black text-sm">Hrvatska - Pregled po županijama</h4>
                          <p className="text-xs text-blue-200">Kliknite na županiju za filtriranje oglasa</p>
                        </div>
                      </div>
                      {odabranaZupanija !== "sve" && (
                        <button onClick={() => { setOdabranaZupanija("sve"); setTrenutnaStranica(1); }} className="bg-amber-400 text-blue-950 font-bold px-3 py-1.5 rounded-xl text-xs">
                          Poništi filter
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {ZUPANIJE.map((z) => {
                        const brojOglasauZupaniji = oglasi.filter(o => o.zupanija === z).length;
                        const jeOdabrana = odabranaZupanija === z;
                        return (
                          <div 
                            key={z}
                            onClick={() => { setOdabranaZupanija(jeOdabrana ? "sve" : z); setTrenutnaStranica(1); }}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition duration-300 flex flex-col justify-between ${
                              jeOdabrana ? "bg-blue-600 text-white border-blue-700 shadow" : "bg-slate-50 hover:bg-blue-50/60 border-slate-100 text-slate-800"
                            }`}
                          >
                            <span className="font-bold text-xs line-clamp-1">{z}</span>
                            <span className={`text-[10px] font-black mt-2 inline-block px-2 py-0.5 rounded-lg w-max ${jeOdabrana ? "bg-amber-400 text-blue-950" : "bg-blue-50 text-blue-700"}`}>
                              {brojOglasauZupaniji} oglasa
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={prikaz === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-5" : "flex flex-col gap-3.5"}>
                      {trenutniOglasiNaStranici.map((o) => {
                        const glavnaSlika = o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80";
                        return (
                          <div 
                            key={o.id}
                            onClick={() => otvoriDetaljeOglasa(o)}
                            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col justify-between group cursor-pointer relative"
                          >
                            <div className="relative overflow-hidden bg-slate-100 h-56">
                              <img src={glavnaSlika} alt={o.naslov} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                              
                              {o.promoviran && (
                                <span className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl shadow flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" /> PROMO
                                </span>
                              )}

                              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                <button
                                  onClick={(e) => podjeliOglas(e, o)}
                                  className="bg-white/90 backdrop-blur p-2.5 rounded-full shadow hover:bg-white transition text-slate-700"
                                  title="Podijeli oglas"
                                >
                                  <Share2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => toggleOmiljeni(e, o.id)}
                                  className="bg-white/90 backdrop-blur p-2.5 rounded-full shadow hover:bg-white transition"
                                  title="Spremi oglas"
                                >
                                  <Heart
                                    className={`w-4 h-4 ${
                                      omiljeniIds.includes(o.id)
                                        ? "fill-rose-500 text-rose-500"
                                        : "text-slate-600"
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-bold">
                                  <span className="flex items-center gap-1 truncate max-w-[150px]">
                                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" /> {o.zupanija}
                                  </span>
                                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {o.pregledi || 0}</span>
                                </div>
                                <h4 className="font-extrabold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition leading-snug">
                                  {o.naslov}
                                </h4>
                              </div>

                              <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-2">
                                <span className="text-xl font-black text-blue-700">{o.cijena} €</span>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={(e) => obnoviOglas(e, o.id)}
                                    title="Obnovi oglas"
                                    className="p-2 bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-600 rounded-xl transition"
                                  >
                                    <RotateCw className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {korisnik && !o.promoviran && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                  <button
                                    type="button"
                                    onClick={(e) => pokreniPromociju(e, o)}
                                    className="w-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-black py-2 px-3 rounded-xl text-[11px] transition flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider"
                                  >
                                    <Sparkles className="w-3.5 h-3.5" /> Boostaj oglas
                                  </button>
                                </div>
                              )}

                              {mozeUreditiIliBrisati(o) && (
                                <div className="mt-2.5 pt-2.5 flex gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => pokreniUredivanje(e, o)}
                                    className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold py-2 px-3 rounded-xl text-[11px] transition flex items-center justify-center gap-1"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" /> Uredi
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => obrisiOglas(e, o)}
                                    className="flex-1 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold py-2 px-3 rounded-xl text-[11px] transition flex items-center justify-center gap-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Izbriši
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {ukupnoStranica > 1 && (
                      <div className="flex items-center justify-center gap-1.5 mt-8 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                        <button
                          onClick={() => setTrenutnaStranica((prev) => Math.max(prev - 1, 1))}
                          disabled={trenutnaStranica === 1}
                          className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-xs font-bold text-slate-700 transition"
                        >
                          Prethodna
                        </button>
                        
                        <div className="flex items-center gap-1 px-2">
                          {Array.from({ length: ukupnoStranica }, (_, i) => i + 1).map((broj) => (
                            <button
                              key={broj}
                              onClick={() => setTrenutnaStranica(broj)}
                              className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                                trenutnaStranica === broj
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                              }`}
                            >
                              {broj}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setTrenutnaStranica((prev) => Math.min(prev + 1, ukupnoStranica))}
                          disabled={trenutnaStranica === ukupnoStranica}
                          className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-xs font-bold text-slate-700 transition"
                        >
                          Sljedeća
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>
            </>
          )}
        </main>

        <footer className="bg-blue-950 text-slate-400 mt-20 border-t border-blue-900 pt-12 pb-10 text-xs relative z-10 shadow-inner">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-1.5 mb-3">
                <span className="font-black text-2xl tracking-tight text-white">KUP</span>
                <span className="font-black text-2xl tracking-tight text-amber-400">KO</span>
                <span className="text-amber-400 text-[10px] font-bold bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/30">.HR</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px] mb-4">
                Kupko.hr je vodeći hrvatski oglasnik za brzu, sigurnu i jednostavnu kupoprodaju.
              </p>
              <div className="mb-4">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl transition shadow-sm"
                >
                  <span>📘 Naša Facebook stranica</span>
                </a>
              </div>
              <p className="text-amber-400 font-bold text-[11px]">© 2026 Kupko.hr - Sva prava pridržana.</p>
            </div>

            <div>
              <h4 className="font-black text-white uppercase text-xs mb-3 tracking-wider text-amber-400">Pomoć i Korisnici</h4>
              <ul className="space-y-2 font-medium">
                <li><button type="button" onClick={() => alert("Kontakt: kupko.podrska@gmail.com")} className="hover:text-amber-400 transition">Kontakt i podrška</button></li>
                <li><button type="button" onClick={() => alert("O nama: Kupko je prvi pravi domaći oglasnik.")} className="hover:text-amber-400 transition">O nama</button></li>
                <li><button type="button" onClick={() => { if(!korisnik){setPrikaziPrijavu(true); return;} setPrikaziFormu(true); }} className="hover:text-amber-400 transition text-amber-300 font-bold">Predaj oglas</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white uppercase text-xs mb-3 tracking-wider text-amber-400">Pravne Informacije</h4>
              <ul className="space-y-2 font-medium">
                <li><button type="button" onClick={() => setPrikaziUvjeteModal(true)} className="hover:text-amber-400 transition">Uvjeti korištenja</button></li>
                <li><button type="button" onClick={() => setPrikaziPrivatnostModal(true)} className="hover:text-amber-400 transition">Politika privatnosti</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-white uppercase text-xs mb-3 tracking-wider text-amber-400">Sigurnost</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">Sigurna kupoprodaja, provjereni korisnici i napredna Supabase baza podataka.</p>
            </div>
          </div>
        </footer>

        {prikaziCookieBanner && (
          <div className="fixed bottom-0 left-0 right-0 bg-blue-950 text-white p-4 z-50 shadow-2xl border-t border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs max-w-4xl font-medium">
              <span className="font-bold text-amber-400">🍪 Kolačići:</span> Kupko.hr koristi kolačiće radi osiguranja ispravnog rada stranice i stabilnosti.
            </div>
            <div className="flex gap-2 shrink-0">
              <button type="button" onClick={prihvatiKolacice} className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-4 py-2 rounded-xl text-xs uppercase shadow">
                Prihvaćam sve
              </button>
            </div>
          </div>
        )}

        {prikaziUvjeteModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <button type="button" onClick={() => setPrikaziUvjeteModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black text-slate-900">Uvjeti korištenja</h2>
              <div className="text-xs text-slate-600 space-y-2 font-medium leading-relaxed">
                <p>Dobrodošli na Kupko.hr. Ovi Uvjeti korištenja definiraju pravila i uvjete korištenja portala.</p>
                <p>Korisnik je dužan unijeti točne podatke i pridržavati se zakona Republike Hrvatske prilikom objavljivanja oglasa.</p>
              </div>
            </div>
          </div>
        )}

        {prikaziPrivatnostModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <button type="button" onClick={() => setPrikaziPrivatnostModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black text-slate-900">Politika privatnosti (GDPR)</h2>
              <div className="text-xs text-slate-600 space-y-2 font-medium leading-relaxed">
                <p>Kupko.hr štiti vašu privatnost u skladu s GDPR propisima.</p>
                <p>Prikupljamo samo nužne podatke za rad oglasnika i ne dijelimo ih s trećim stranama.</p>
              </div>
            </div>
          </div>
        )}

        {prikaziSanducicPoruka && korisnik && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
              <button type="button" onClick={() => setPrikaziSanducicPoruka(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black text-slate-900">Sandučić poruka</h2>
              {poruke.filter(p => p.primatelj === korisnik.email || p.posiljatelj === korisnik.email).length === 0 ? (
                <p className="text-slate-400 text-xs py-8 text-center font-medium">Nemate aktivnih poruka.</p>
              ) : (
                <div className="space-y-2.5">
                  {poruke.filter(p => p.primatelj === korisnik.email || p.posiljatelj === korisnik.email).map(p => (
                    <div key={p.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                        <span>{p.posiljatelj === korisnik.email ? `Za: ${p.primatelj}` : `Od: ${p.posiljatelj}`}</span>
                        <span>{p.datum}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800">{p.tekst}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {prikaziUnosPodatakaModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
              <button type="button" onClick={() => setPrikaziUnosPodatakaModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black mb-3 text-slate-900">Osobni podaci</h2>
              <form onSubmit={spremiOsobnePodatke} className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <input type="text" required placeholder="Ime" value={korisnickiPodaci.ime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, ime: e.target.value })} className="w-full p-3 rounded-xl border text-xs font-semibold outline-none focus:border-blue-600" />
                  <input type="text" required placeholder="Prezime" value={korisnickiPodaci.prezime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, prezime: e.target.value })} className="w-full p-3 rounded-xl border text-xs font-semibold outline-none focus:border-blue-600" />
                </div>
                <input type="text" required placeholder="Adresa" value={korisnickiPodaci.adresa} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, adresa: e.target.value })} className="w-full p-3 rounded-xl border text-xs font-semibold outline-none focus:border-blue-600" />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl uppercase text-xs shadow transition">Spremi</button>
              </form>
            </div>
          </div>
        )}

        {prikaziPlacanjePromo && oglasZaPromociju && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
              <button type="button" onClick={() => setPrikaziPlacanjePromo(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber-500" /> Promocija i objava oglasa</h2>
              <p className="text-xs text-slate-500 font-medium">Oglas: <strong className="text-slate-800">{oglasZaPromociju.naslov}</strong></p>

              {korisnik && (korisnik.promoKrediti || 0) > 0 ? (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center space-y-3">
                  <p className="text-xs font-black text-amber-900">
                    🌟 Čestitamo! Imate još {korisnik.promoKrediti} besplatni promo post iz Giveaway akcije!
                  </p>
                  <button 
                    type="button"
                    onClick={iskoristiBesplatniBoost}
                    className="w-full bg-amber-400 hover:bg-amber-300 text-blue-950 font-black py-3 rounded-xl text-xs uppercase shadow tracking-wider transition"
                  >
                    Iskoristi besplatni promo post (0 €)
                  </button>
                </div>
              ) : (
                <form onSubmit={potvrdiUplatuPromoStripe} className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-[11px] text-blue-900 font-medium">
                    Nemate više besplatnih promo postova. Nastavite na sigurno plaćanje karticom putem Stripe-a.
                  </div>
                  
                  <label className="block text-[11px] font-bold text-slate-600 uppercase">Odaberite paket promocije:</label>
                  <div className="space-y-2">
                    {dohvatiPaketeZaOglas(oglasZaPromociju).map((paket) => (
                      <div 
                        key={paket.naziv}
                        onClick={() => setOdabraniPromoPaket(paket)}
                        className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center transition ${
                          odabraniPromoPaket?.naziv === paket.naziv 
                            ? "bg-blue-50 border-blue-600" 
                            : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <span className="font-bold text-xs text-slate-800">{paket.naziv}</span>
                        <span className="font-black text-blue-700 text-xs">{paket.cijena} €</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl uppercase text-xs shadow transition flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" /> Plati {odabraniPromoPaket ? odabraniPromoPaket.cijena : dohvatiPaketeZaOglas(oglasZaPromociju)[0].cijena} € (Stripe)
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {prikaziFormu && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto space-y-4">
              <button type="button" onClick={() => setPrikaziFormu(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              
              <h2 className="text-xl font-black text-slate-900">Predaj novi oglas</h2>

              <form onSubmit={rukujDodavanjemOglasa} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Naslov *</label>
                  <input 
                    type="text" required placeholder="Npr. Stan, Auto..."
                    value={noviOglas.naslov} onChange={(e) => setNoviOglas({ ...noviOglas, naslov: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Cijena (€) *</label>
                    <input 
                      type="text" required placeholder="120"
                      value={noviOglas.cijena} onChange={(e) => setNoviOglas({ ...noviOglas, cijena: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Kategorija</label>
                    <select 
                      value={noviOglas.kategorija} 
                      onChange={(e) => {
                        const novaKat = e.target.value;
                        const prvaPod = SVE_KATEGORIJE.find((k) => k.id === novaKat)?.podkategorije[0] || "";
                        setNoviOglas({ ...noviOglas, kategorija: novaKat, podkategorija: prvaPod });
                      }}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white font-bold outline-none"
                    >
                      {SVE_KATEGORIJE.map((k) => (
                        <option key={k.id} value={k.id}>{k.ikona} {k.naziv}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Podkategorija</label>
                    <select 
                      value={noviOglas.podkategorija} onChange={(e) => setNoviOglas({ ...noviOglas, podkategorija: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white font-semibold outline-none"
                    >
                      {SVE_KATEGORIJE.find((k) => k.id === noviOglas.kategorija)?.podkategorije.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {noviOglas.kategorija === "auto-moto" && (
                  <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-2.5">
                    <h4 className="text-[11px] font-black text-blue-900 uppercase flex items-center gap-1.5"><Car className="w-3.5 h-3.5" /> Specifikacije vozila</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Godište</label>
                        <input type="text" placeholder="npr. 2020" value={noviOglas.godiste} onChange={(e) => setNoviOglas({ ...noviOglas, godiste: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Kilometri</label>
                        <input type="text" placeholder="npr. 120000" value={noviOglas.kilometri} onChange={(e) => setNoviOglas({ ...noviOglas, kilometri: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Snaga (kW)</label>
                        <input type="text" placeholder="npr. 110" value={noviOglas.snagaKw} onChange={(e) => setNoviOglas({ ...noviOglas, snagaKw: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Gorivo</label>
                        <select value={noviOglas.gorivo} onChange={(e) => setNoviOglas({ ...noviOglas, gorivo: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-bold bg-white">
                          <option value="Dizel">Dizel</option>
                          <option value="Benzin">Benzin</option>
                          <option value="Hibrid">Hibrid</option>
                          <option value="Električni">Električni</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Mjenjač</label>
                        <select value={noviOglas.mjenjac} onChange={(e) => setNoviOglas({ ...noviOglas, mjenjac: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-bold bg-white">
                          <option value="Ručni">Ručni</option>
                          <option value="Automatski">Automatski</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {noviOglas.kategorija === "nekretnine" && (
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2.5">
                    <h4 className="text-[11px] font-black text-emerald-900 uppercase flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Specifikacije nekretnine</h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Kvadratura (m²)</label>
                        <input type="text" placeholder="npr. 65" value={noviOglas.kvadratura} onChange={(e) => setNoviOglas({ ...noviOglas, kvadratura: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Broj soba</label>
                        <input type="text" placeholder="npr. 2" value={noviOglas.sobe} onChange={(e) => setNoviOglas({ ...noviOglas, sobe: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Županija</label>
                    <select
                      value={noviOglas.zupanija}
                      onChange={(e) => setNoviOglas({ ...noviOglas, zupanija: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white font-bold outline-none"
                    >
                      {ZUPANIJE.map((z) => <option key={z} value={z}>{z}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Grad / Mjesto</label>
                    <input type="text" placeholder="Zagreb" value={noviOglas.grad} onChange={(e) => setNoviOglas({ ...noviOglas, grad: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Mobitel *</label>
                    <input type="text" placeholder="091..." required value={noviOglas.telefon} onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Točna adresa (Ulica i kućni broj)</label>
                  <input type="text" placeholder="Npr. Ilica 10" value={noviOglas.adresa} onChange={(e) => setNoviOglas({ ...noviOglas, adresa: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-blue-600" />
                </div>

                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={noviOglas.promoviran}
                      onChange={(e) => setNoviOglas({ ...noviOglas, promoviran: e.target.checked })}
                      className="rounded text-amber-500 w-4 h-4"
                    />
                    <span className="font-bold text-amber-900 text-xs flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Odmah želim istaknuti (promovirati) oglas
                    </span>
                  </label>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-2">Slike i videozapisi</label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-white cursor-pointer relative mb-2 hover:bg-slate-50 transition">
                    <input type="file" accept="image/*,video/*" multiple onChange={(e) => rukujVisestrukimUcitavanjemSlika(e, false)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    <Upload className="w-6 h-6 text-blue-600 mb-1" />
                    <p className="text-xs font-bold text-slate-700">Kliknite za odabir datoteka</p>
                  </div>

                  {noviOglas.slike.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {noviOglas.slike.map((s, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border h-16 bg-black">
                          <img src={s} alt="Upload" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setNoviOglas({ ...noviOglas, slike: noviOglas.slike.filter((_, i) => i !== idx) })} className="absolute top-0.5 right-0.5 bg-rose-600 text-white p-0.5 rounded-full"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <textarea rows={3} placeholder="Opis oglasa..." value={noviOglas.opis} onChange={(e) => setNoviOglas({ ...noviOglas, opis: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none" />

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-[11px] text-slate-700">Anti-Spam provjera</h5>
                    <p className="text-[11px] text-slate-600">Koliko je: <strong className="text-slate-900">{sigurnosniKod.a} + {sigurnosniKod.b} = ?</strong></p>
                  </div>
                  <input
                    type="number" required placeholder="Rezultat"
                    value={sigurnosniKod.unos} onChange={(e) => setSigurnosniKod({ ...sigurnosniKod, unos: e.target.value })}
                    className="w-24 p-2 rounded-xl border border-slate-200 text-center font-bold text-xs bg-white outline-none"
                  />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider text-xs shadow transition">
                  Objavi oglas
                </button>
              </form>
            </div>
          </div>
        )}

        {korakVerifikacije && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 text-center space-y-3.5 shadow-2xl relative">
              <button type="button" onClick={() => setKorakVerifikacije(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black text-slate-900">Verifikacija E-maila</h2>
              <p className="text-xs text-slate-500">Unesite kod poslan na: <strong className="text-slate-800">{privremeniEmail}</strong></p>
              <form onSubmit={potvrdiVerifikacijskiKod} className="space-y-3">
                <input 
                  type="text" required maxLength={6} placeholder="123456" 
                  value={uneseniKod} onChange={(e) => setUneseniKod(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-center text-lg tracking-widest font-black bg-slate-50 outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 text-white font-black py-3 rounded-xl uppercase text-xs shadow transition">
                  Potvrdi kod
                </button>
              </form>
            </div>
          </div>
        )}

        {prikaziZaboravljenuLozinku && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 relative shadow-2xl space-y-3.5">
              <button type="button" onClick={() => { setPrikaziZaboravljenuLozinku(false); setKorakResetiranja(1); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2"><KeyRound className="w-5 h-5 text-blue-600" /> Oporavak lozinke</h2>

              {korakResetiranja === 1 ? (
                <form onSubmit={pokreniZaboravljenuLozinku} className="space-y-3">
                  <p className="text-xs text-slate-500">Unesite vaš registrirani e-mail.</p>
                  <input 
                    type="email" required placeholder="email@gmail.com"
                    value={zaboravljeniEmail} onChange={(e) => setZaboravljeniEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                  />
                  <button type="submit" className="w-full bg-blue-600 text-white font-black py-3 rounded-xl uppercase text-xs shadow transition">
                    Pošalji kod
                  </button>
                </form>
              ) : (
                <form onSubmit={potvrdiResetLozinke} className="space-y-3">
                  <p className="text-xs text-slate-500">Unesite primljeni kod i novu lozinku.</p>
                  <input 
                    type="text" required maxLength={6} placeholder="Kod"
                    value={uneseniKodReset} onChange={(e) => setUneseniKodReset(e.target.value)}
                    className="w-full p-2.5 rounded-xl border text-center tracking-widest font-black text-base outline-none"
                  />
                  <input 
                    type="password" required placeholder="Nova lozinka"
                    value={novaLozinka} onChange={(e) => setNovaLozinka(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                  />
                  <button type="submit" className="w-full bg-emerald-600 text-white font-black py-3 rounded-xl uppercase text-xs shadow transition">
                    Spremi lozinku
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {prikaziUredivanje && oglasZaUrediti && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto space-y-3.5">
              <button type="button" onClick={() => setPrikaziUredivanje(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black text-slate-900">Uredi oglas</h2>

              <form onSubmit={rukujSpremanjemUredivanja} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Naslov *</label>
                  <input 
                    type="text" required 
                    value={oglasZaUrediti.naslov} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, naslov: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Cijena (€) *</label>
                    <input 
                      type="text" required 
                      value={oglasZaUrediti.cijena} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, cijena: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Županija</label>
                    <select
                      value={oglasZaUrediti.zupanija}
                      onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, zupanija: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white font-bold outline-none"
                    >
                      {ZUPANIJE.map((z) => <option key={z} value={z}>{z}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Mobitel *</label>
                    <input type="text" required value={oglasZaUrediti.telefon || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, telefon: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Točna adresa (Ulica i kućni broj)</label>
                  <input type="text" value={oglasZaUrediti.adresa || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, adresa: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none" />
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-2">Upravljanje slikama oglasa</label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-3 bg-white cursor-pointer relative mb-2 hover:bg-slate-50 transition">
                    <input type="file" accept="image/*" multiple onChange={(e) => rukujVisestrukimUcitavanjemSlika(e, true)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    <Upload className="w-5 h-5 text-blue-600 mb-1" />
                    <p className="text-xs font-bold text-slate-700">Dodaj još slika</p>
                  </div>

                  {oglasZaUrediti.slike && oglasZaUrediti.slike.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {oglasZaUrediti.slike.map((s: string, idx: number) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden border h-16 bg-black">
                          <img src={s} alt="Uredi oglas" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setOglasZaUrediti({ ...oglasZaUrediti, slike: oglasZaUrediti.slike.filter((_: any, i: number) => i !== idx) })} className="absolute top-0.5 right-0.5 bg-rose-600 text-white p-0.5 rounded-full"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {oglasZaUrediti.kategorija === "auto-moto" && (
                  <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-2.5">
                    <h4 className="text-[11px] font-black text-blue-900 uppercase">Specifikacije vozila</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Godište</label>
                        <input type="text" value={oglasZaUrediti.godiste || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, godiste: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Kilometri</label>
                        <input type="text" value={oglasZaUrediti.kilometri || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, kilometri: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Snaga (kW)</label>
                        <input type="text" value={oglasZaUrediti.snagaKw || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, snagaKw: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                    </div>
                  </div>
                )}

                {oglasZaUrediti.kategorija === "nekretnine" && (
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2.5">
                    <h4 className="text-[11px] font-black text-emerald-900 uppercase">Specifikacije nekretnine</h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Kvadratura (m²)</label>
                        <input type="text" value={oglasZaUrediti.kvadratura || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, kvadratura: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Broj soba</label>
                        <input type="text" value={oglasZaUrediti.sobe || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, sobe: e.target.value })} className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-white" />
                      </div>
                    </div>
                  </div>
                )}

                <textarea 
                  rows={3}
                  value={oglasZaUrediti.opis || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, opis: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                />

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-2xl uppercase text-xs shadow transition">
                  Spremi promjene
                </button>
              </form>
            </div>
          </div>
        )}

        {prikaziModalPrijaveOglasa && odabraniOglas && (
          <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
              <button type="button" onClick={() => setPrikaziModalPrijaveOglasa(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-lg font-black text-rose-600 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Prijavi sumnjiv ili ilegalan oglas</h2>
              <p className="text-xs text-slate-500 font-medium">Prijavljujete oglas: <strong className="text-slate-800">{odabraniOglas.naslov}</strong></p>

              <form onSubmit={posaljiPrijavuOglasa} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Razlog prijave:</label>
                  <select 
                    value={razlogPrijave} 
                    onChange={(e) => setRazlogPrijave(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold bg-white outline-none"
                  >
                    <option value="Prevara / Lažni oglas">Prevara / Lažni oglas</option>
                    <option value="Zabranjen ili ilegalan sadržaj">Zabranjen ili ilegalan sadržaj</option>
                    <option value="Lažna cijena / Krivi podaci">Lažna cijena / Krivi podaci</option>
                    <option value="Duplikat oglasa">Duplikat oglasa</option>
                    <option value="Uvredljiv sadržaj">Uvredljiv sadržaj</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Dodatan opis (opcionalno):</label>
                  <textarea 
                    rows={3}
                    placeholder="Opišite detaljnije zašto prijavljujete ovaj oglas..."
                    value={opisPrijave}
                    onChange={(e) => setOpisPrijave(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                  />
                </div>

                <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 rounded-xl uppercase text-xs shadow transition">
                  Pošalji prijavu administratoru
                </button>
              </form>
            </div>
          </div>
        )}

        {odabraniOglas && (
          <div 
            onClick={() => setOdabraniOglas(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl space-y-5 cursor-default"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={(e) => podjeliOglas(e, odabraniOglas)}
                  className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition text-slate-700"
                  title="Podijeli oglas"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => setOdabraniOglas(null)} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden h-72 bg-slate-900 flex items-center justify-center">
                <img 
                  src={odabraniOglas.slike && odabraniOglas.slike.length > 0 ? odabraniOglas.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} 
                  alt={odabraniOglas.naslov} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 font-black px-2.5 py-1 rounded-lg uppercase tracking-wider mb-1.5 inline-block">
                    {odabraniOglas.kategorija}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">{odabraniOglas.naslov}</h2>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> {odabraniOglas.adresa ? `${odabraniOglas.adresa}, ` : ""}{odabraniOglas.grad ? `${odabraniOglas.grad}, ` : ""}{odabraniOglas.zupanija}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-blue-700">{odabraniOglas.cijena} €</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-blue-600" /> 
                  Statistika: Oglas pregledan <strong className="text-blue-700">{odabraniOglas.pregledi || 1}</strong> puta
                </span>
                <span className="flex items-center gap-1 text-slate-500 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> {odabraniOglas.datum}
                </span>
              </div>

              {odabraniOglas.kategorija === "auto-moto" && (odabraniOglas.godiste || odabraniOglas.kilometri || odabraniOglas.snagaKw) && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs font-bold text-blue-950">
                  {odabraniOglas.godiste && <div>📅 Godište: <span className="font-normal">{odabraniOglas.godiste}</span></div>}
                  {odabraniOglas.kilometri && <div>🛣️ Kilometri: <span className="font-normal">{odabraniOglas.kilometri} km</span></div>}
                  {odabraniOglas.snagaKw && <div>⚡ Snaga: <span className="font-normal">{odabraniOglas.snagaKw} kW</span></div>}
                  {odabraniOglas.gorivo && <div>⛽ Gorivo: <span className="font-normal">{odabraniOglas.gorivo}</span></div>}
                  {odabraniOglas.mjenjac && <div>⚙️ Mjenjač: <span className="font-normal">{odabraniOglas.mjenjac}</span></div>}
                </div>
              )}

              {odabraniOglas.kategorija === "nekretnine" && (odabraniOglas.kvadratura || odabraniOglas.sobe) && (
                <div className="grid grid-cols-2 gap-2.5 bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950">
                  {odabraniOglas.kvadratura && <div>🏠 Kvadratura: <span className="font-normal">{odabraniOglas.kvadratura} m²</span></div>}
                  {odabraniOglas.sobe && <div>🚪 Sobe: <span className="font-normal">{odabraniOglas.sobe}</span></div>}
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 rounded-2xl shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-black text-xs uppercase">
                  <Bot className="w-4 h-4" /> Kupko AI Procjena Tržišta
                </div>
                <p className="text-xs text-blue-100 font-medium">
                  {izracunajAiProcjenuZaOglas(odabraniOglas)}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs leading-relaxed text-slate-700 font-medium">
                <p className="whitespace-pre-line">{odabraniOglas.opis || "Nema opisa."}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-black text-sm text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" /> Točna lokacija na karti
                </h3>
                <div className="w-full h-56 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent((odabraniOglas.adresa ? odabraniOglas.adresa + ", " : "") + (odabraniOglas.grad ? odabraniOglas.grad + ", " : "") + odabraniOglas.zupanija + ", Hrvatska")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Lokacija: <strong className="text-slate-600">{odabraniOglas.adresa ? `${odabraniOglas.adresa}, ` : ""}{odabraniOglas.grad ? `${odabraniOglas.grad}, ` : ""}{odabraniOglas.zupanija}</strong></p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-[10px] text-blue-600 uppercase font-bold block">Prodavač</span>
                  <p className="font-black text-sm text-blue-950 flex items-center gap-1.5 mt-0.5">
                    <User className="w-4 h-4 text-blue-600" /> {odabraniOglas.prodavac || "Korisnik"}
                  </p>
                  {odabraniOglas.autor_email && (
                    <button 
                      onClick={() => { setOdabraniProdavacFilter(odabraniOglas.autor_email); setOdabraniOglas(null); setTrenutnaStranica(1); }}
                      className="text-[11px] text-blue-600 font-bold underline hover:text-blue-800 mt-0.5 block"
                    >
                      Svi oglasi ovog prodavača
                    </button>
                  )}
                </div>
                <div className="text-right text-xs text-slate-700 font-bold">
                  <span>📞 <strong className="text-slate-900">{odabraniOglas.telefon || "Na upit"}</strong></span>
                </div>
              </div>

              {korisnik && korisnik.email !== odabraniOglas.autor_email && (
                <div className="border-t pt-4 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 space-y-2.5">
                  <h5 className="text-[11px] font-black uppercase text-slate-600 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-600" /> Ponudi nižu cijenu (Cjenkanje):
                  </h5>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        const c = parseFloat(odabraniOglas.cijena) * 0.9;
                        setNoviTekstPoruke(`Pozdrav, nudim ${c.toFixed(2)} € za vaš oglas (${odabraniOglas.naslov}). Je li prihvatljivo?`);
                      }}
                      className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                    >
                      -10% ({Math.round(parseFloat(odabraniOglas.cijena || "0") * 0.9)} €)
                    </button>
                    <button 
                      onClick={() => {
                        const c = parseFloat(odabraniOglas.cijena) * 0.8;
                        setNoviTekstPoruke(`Pozdrav, nudim ${c.toFixed(2)} € za vaš oglas (${odabraniOglas.naslov}). Je li prihvatljivo?`);
                      }}
                      className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                    >
                      -20% ({Math.round(parseFloat(odabraniOglas.cijena || "0") * 0.8)} €)
                    </button>
                  </div>
                  <textarea
                    placeholder="Upišite poruku prodavaču..."
                    value={noviTekstPoruke}
                    onChange={(e) => setNoviTekstPoruke(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium bg-white outline-none"
                    rows={2}
                  />
                  <button
                    onClick={() => posaljiPorukuProdavacu(odabraniOglas.id, odabraniOglas.autor_email)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider transition shadow flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Pošalji ponudu
                  </button>
                </div>
              )}

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setPrikaziModalPrijaveOglasa(true)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1.5 ml-auto transition"
                >
                  <ShieldAlert className="w-4 h-4" /> Prijavi sumnjiv ili ilegalan oglas
                </button>
              </div>
            </div>
          </div>
        )}

        {prikaziPrijavu && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 relative shadow-2xl">
              <button type="button" onClick={() => setPrikaziPrijavu(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black mb-3 text-slate-900">Prijava</h2>
              <form onSubmit={rukujPrijavom} className="space-y-3">
                <input 
                  type="text" required placeholder="Korisničko ime (npr. admin)" 
                  value={formaPrijava.korisnickoIme} onChange={(e) => setFormaPrijava({ ...formaPrijava, korisnickoIme: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-blue-600"
                />
                <input 
                  type="password" required placeholder="Lozinka" 
                  value={formaPrijava.lozinka} onChange={(e) => setFormaPrijava({ ...formaPrijava, lozinka: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-blue-600"
                />
                <div className="flex justify-end text-xs">
                  <button type="button" onClick={() => { setPrikaziPrijavu(false); setPrikaziZaboravljenuLozinku(true); }} className="text-blue-600 font-bold hover:underline">
                    Zaboravljena lozinka?
                  </button>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-black py-3 rounded-xl text-xs shadow transition mt-1">Prijavi se</button>
              </form>
            </div>
          </div>
        )}

        {prikaziRegistraciju && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl max-w-sm w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
              <button type="button" onClick={() => setPrikaziRegistraciju(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
              <h2 className="text-xl font-black mb-1.5 text-slate-900">Registracija</h2>
              <p className="text-[11px] text-amber-700 font-bold mb-3 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                🎁 Giveaway: Prvih 20 korisnika dobiva promo post!
              </p>
               
              <form onSubmit={rukujRegistracijom} className="space-y-3">
                <input 
                  type="text" required placeholder="Korisničko ime" 
                  value={formaRegistracija.ime} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, ime: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                />
                <input 
                  type="email" required placeholder="E-mail adresa" 
                  value={formaRegistracija.email} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                />
                <input 
                  type="password" required placeholder="Lozinka" 
                  value={formaRegistracija.lozinka} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, lozinka: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none"
                />

                <div className="space-y-2 pt-1 text-xs font-medium text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" required
                      checked={formaRegistracija.prihvacenaPrivatnost} 
                      onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvacenaPrivatnost: e.target.checked })}
                      className="rounded text-blue-600 w-3.5 h-3.5"
                    />
                    <span>Prihvaćam Politiku privatnosti *</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" required
                      checked={formaRegistracija.prihvaceniUvjeti} 
                      onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvaceniUvjeti: e.target.checked })}
                      className="rounded text-blue-600 w-3.5 h-3.5"
                    />
                    <span>Prihvaćam Uvjete korištenja *</span>
                  </label>
                </div>

                <button type="submit" className="w-full bg-amber-400 text-blue-950 font-black py-3 rounded-xl mt-2 text-xs shadow transition">
                  Registriraj se
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
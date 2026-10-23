"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { 
  Search, PlusCircle, Heart, MapPin, Grid, List, Phone, X, 
  ShoppingBag, CheckCircle2, Mail, User, Clock, Upload, Image as ImageIcon,
  LogIn, UserPlus, Sparkles, Compass, Menu, Tag, Car, Home, ShieldCheck, Video, CreditCard, Crown, Package, Trash2, Shield, RotateCw, ArrowLeft, Lock, Gauge, Calendar, Fuel, Cog, HelpCircle, FileText, Cookie, Map, Info, Megaphone, Edit3, TrendingDown, ChevronLeft, ChevronRight, Percent, Check, AlertCircle, Send, ShieldAlert, SlidersHorizontal, Eye, Bot, Navigation, MessageSquare, Wallet, Bell, Settings, Flame, Play, KeyRound
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
  
  const [pojamPretrage, setPojamPretrage] = useState("");
  const [odabranaKategorija, setOdabranaKategorija] = useState("sve");
  const [odabranaPodkategorija, setOdabranaPodkategorija] = useState("sve");
  const [odabranaZupanija, setOdabranaZupanija] = useState("sve");
  
  const [minCijena, setMinCijena] = useState("");
  const [maxCijena, setMaxCijena] = useState("");
  const [odabranoStanje, setOdabranoStanje] = useState("sve");

  const [omiljeniIds, setOmiljeniIds] = useState<number[]>([]);
  const [prikaziSamoOmiljene, setPrikaziSamoOmiljene] = useState(false);

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
    zupanija: "Grad Zagreb", grad: "", stanje: "Novo", slike: [] as string[], opis: "",
    prodavac: "", telefon: "", email: "", promoviran: false,
    godiste: "", kilometri: "", snagaKw: "", gorivo: "Dizel", mjenjac: "Ručni",
    kvadratura: "", sobe: ""
  });

  useEffect(() => {
    dohvatiOglaseIzSupabase();

    const spremljeniKorisnici = localStorage.getItem("kupko_baza_korisnika");
    if (spremljeniKorisnici) { try { setRegistriraniKorisnici(JSON.parse(spremljeniKorisnici)); } catch (e) { console.error(e); } }
    const spremljenePoruke = localStorage.getItem("kupko_poruke_v2");
    if (spremljenePoruke) { try { setPoruke(JSON.parse(spremljenePoruke)); } catch (e) { console.error(e); } }
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
        console.error("Greška pri dohvatu iz Supabase:", error.message, error.details);
      } else if (data) {
        setOglasi(data);
      }
    } catch (err) {
      console.error(err);
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
      console.error("Greška pri obnavljanju:", error.message);
      alert("Greška pri obnavljanju oglasa: " + error.message);
    } else {
      dohvatiOglaseIzSupabase();
      alert("Oglas je uspješno obnovljen i promoviran!");
    }
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

  const rukujRegistracijom = (e: React.FormEvent) => {
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

    alert(`[Simulacija E-maila]: Na adresu ${emailLower} poslan je verifikacijski kod. Vaš kod je: ${slucajniKod}`);
  };

  const potvrdiVerifikacijskiKod = (e: React.FormEvent) => {
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

    const azuriraniBazaKorisnika = [...registriraniKorisnici, noviRegKorisnik];
    setRegistriraniKorisnici(azuriraniBazaKorisnika);
    localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniBazaKorisnika));

    const aktivni = { ime: privremenoIme, email: privremeniEmail, isOwner: false, promoKrediti: dodijeljeniKrediti };
    postaviKorisnika(aktivni);

    setKorakVerifikacije(false);
    setUneseniKod("");
    setFormaRegistracija({ ime: "", email: "", lozinka: "", prihvacenaPrivatnost: false, prihvaceniUvjeti: false });
    
    if (dobivaKredite) {
      alert(`🎉 Čestitamo! Ušli ste među prvih 20 korisnika i dobili ste 🌟 1 besplatni promo post na poklon!`);
    } else {
      alert(`📧 [Simulacija E-maila za Dobrodošlicu na ${privremeniEmail}]:\n\n"Dobrodošli na Kupko, ${privremenoIme}!"`);
    }
    
    setPrikaziUnosPodatakaModal(true);
  };

  const pokreniZaboravljenuLozinku = (e: React.FormEvent) => {
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
    alert(`📧 [Simulacija E-maila za Oporavak Lozinke]:\nNa adresu ${mailClean} poslan je kod za promjenu lozinke. Vaš kod je: ${kod}`);
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
    const jeAutor = (glas.autorEmail && glas.autorEmail.toLowerCase() === korisnik.email.toLowerCase()) || 
                    (glas.prodavac && glas.prodavac.toLowerCase() === korisnik.ime.toLowerCase());
    return jeAutor || korisnik.isOwner;
  };

  const obrisiOglas = async (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni!"); return; }
    const jeAutor = (glas.autorEmail && glas.autorEmail.toLowerCase() === korisnik.email.toLowerCase()) || 
                    (glas.prodavac && glas.prodavac.toLowerCase() === korisnik.ime.toLowerCase());
    if (!jeAutor && !korisnik.isOwner) { alert("Nemate ovlasti brisati tuđi oglas!"); return; }
    
    if (confirm("Jeste li sigurni da želite obrisati oglas?")) {
      const { error } = await supabase.from('oglasi').delete().eq('id', glas.id);
      if (error) {
        console.error("Greška pri brisanju:", error.message);
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
    const jeAutor = (glas.autorEmail && glas.autorEmail.toLowerCase() === korisnik.email.toLowerCase()) || 
                    (glas.prodavac && glas.prodavac.toLowerCase() === korisnik.ime.toLowerCase());
    if (!jeAutor && !korisnik.isOwner) { alert("Nemate ovlasti uređivati tuđi oglas!"); return; }
    setOglasZaUrediti({ ...glas });
    setPrikaziUredivanje(true);
  };

  const dohvatiPaketeZaOglas = (glas: any) => {
    const cijenaNum = parseFloat(glas?.cijena || "0");
    if (cijenaNum < 200) {
      return [
        { naziv: "Mini Boost (3 dana)", cijena: "2.00" },
        { naziv: "Standardni Boost (7 dana)", cijena: "3.50" },
        { naziv: "Dugotrajni Boost (30 dana)", cijena: "6.00" }
      ];
    } else if (cijenaNum >= 200 && cijenaNum < 2000) {
      return [
        { naziv: "Mini Boost (3 dana)", cijena: "4.00" },
        { naziv: "Standardni Boost (7 dana)", cijena: "7.00" },
        { naziv: "Dugotrajni Boost (30 dana)", cijena: "12.00" }
      ];
    } else if (cijenaNum >= 2000 && cijenaNum < 20000) {
      return [
        { naziv: "Mini Boost (3 dana)", cijena: "6.00" },
        { naziv: "Standardni Boost (7 dana)", cijena: "11.00" },
        { naziv: "Maksimalni Boost (30 dana)", cijena: "20.00" }
      ];
    } else {
      return [
        { naziv: "Premium Standard (7 dana)", cijena: "15.00" },
        { naziv: "Premium Produženi (14 dana)", cijena: "25.00" },
        { naziv: "Maksimalni VIP Boost (30 dana)", cijena: "40.00" }
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

    const { error } = await supabase.from('oglasi').update({ promoviran: true, top: true }).eq('id', oglasZaPromociju.id);
    if (error) {
      alert("Greška pri boostanju: " + error.message);
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
    alert(`🌟 Uspješno iskorišten 1 besplatni promo post! Oglas je promoviran. Preostalo kredita: ${noviKrediti}`);
  };

  const potvrdiUplatuPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oglasZaPromociju || !odabraniPromoPaket) return;

    const { error } = await supabase.from('oglasi').update({ promoviran: true, top: true }).eq('id', oglasZaPromociju.id);
    if (error) {
      alert("Greška pri uplati promo paketa: " + error.message);
      return;
    }

    dohvatiOglaseIzSupabase();
    setPrikaziPlacanjePromo(false);
    setOglasZaPromociju(null);
    
    const ciljaniMail = korisnik ? korisnik.email : "kupko.podrska@gmail.com";
    alert(`📧 [Simulacija E-mail Potvrde o Uplati na ${ciljaniMail}]:\n\n"Uspješno ste izvršili uplatu od ${odabraniPromoPaket.cijena} € (${odabraniPromoPaket.naziv}) za promidžbu Vašeg oglasa '${oglasZaPromociju.naslov}'."`);
  };

  const rukujSpremanjemUredivanja = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oglasZaUrediti.naslov || !oglasZaUrediti.cijena) return;

    const { error } = await supabase
      .from('oglasi')
      .update({ 
        naslov: oglasZaUrediti.naslov, 
        cijena: oglasZaUrediti.cijena, 
        opis: oglasZaUrediti.opis 
      })
      .eq('id', oglasZaUrediti.id);

    if (error) {
      console.error("Greška pri uređivanju:", error.message);
      alert("Greška pri spremanju uređivanja u bazu: " + error.message);
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

    let konacniPromoviran = noviOglas.promoviran;
    let noviKreditiKorisnika = korisnik.promoKrediti || 0;

    if (konacniPromoviran && noviKreditiKorisnika > 0) {
      noviKreditiKorisnika -= 1;
      const azuriraniKorisnik = { ...korisnik, promoKrediti: noviKreditiKorisnika };
      postaviKorisnika(azuriraniKorisnik);

      const azuriraniRegKorisnici = registriraniKorisnici.map(k => 
        k.email.toLowerCase() === korisnik.email.toLowerCase() ? { ...k, promoKrediti: noviKreditiKorisnika } : k
      );
      setRegistriraniKorisnici(azuriraniRegKorisnici);
      localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniRegKorisnici));
      
      alert("🌟 Uspješno iskorišten vaš besplatni promo post pri objavi oglasa!");
    }

    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;
    const autorEmailFinal = korisnik.email;
    const prodavacFinal = korisnik.ime;

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
      stanje: noviOglas.stanje,
      opis: noviOglas.opis || null,
      prodavac: prodavacFinal,
      autorEmail: autorEmailFinal,
      telefon: noviOglas.telefon,
      promoviran: konacniPromoviran,
      top: konacniPromoviran,
      datum: datumString,
      godiste: noviOglas.godiste || null,
      kilometri: noviOglas.kilometri || null,
      snagaKw: noviOglas.snagaKw || null,
      gorivo: noviOglas.gorivo || null,
      mjenjac: noviOglas.mjenjac || null,
      kvadratura: noviOglas.kvadratura || null,
      sobe: noviOglas.sobe || null,
      slike: noviOglas.slike.length > 0 ? noviOglas.slike : ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"]
    };

    const { error } = await supabase.from('oglasi').insert([stvoreniOglas]);

    if (error) {
      console.error("Detaljna greška iz Supabase-a:", error.message, error.details, error.hint);
      alert("Greška pri spremanju u bazu: " + error.message);
    } else {
      dohvatiOglaseIzSupabase();
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
      alert("Oglas uspješno predan i spremljen u Supabase bazu podataka!");
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
      console.error("Greška Cloudinary:", error);
      alert("Došlo je do greške prilikom uploada datoteke na Cloudinary.");
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
    
    const cijenaNum = parseFloat(o.cijena || "0");
    const minNum = minCijena !== "" ? parseFloat(minCijena) : 0;
    const maxNum = maxCijena !== "" ? parseFloat(maxCijena) : Infinity;
    const odgovaraCijeni = cijenaNum >= minNum && cijenaNum <= maxNum;

    const odgovaraStanju = odabranoStanje === "sve" || (o.stanje && o.stanje.toLowerCase().includes(odabranoStanje.toLowerCase()));

    return odgovaraTrazilici && odgovaraKategoriji && odgovaraPodkategoriji && odgovaraZupaniji && odgovaraOmiljenima && odgovaraCijeni && odgovaraStanju;
  });

  const promoOglasi = oglasi.filter((o) => o.promoviran);
  const preostaloMjestaZaGrateis = Math.max(0, 20 - registriraniKorisnici.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-100/60 text-slate-900 font-sans flex flex-col justify-between relative overflow-x-hidden">
      
      <div className="relative z-10">
        
        {preostaloMjestaZaGrateis > 0 && (
          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-blue-950 px-4 py-2.5 text-xs sm:text-sm font-black text-center shadow-md flex items-center justify-center gap-2 border-b border-amber-600">
            <Sparkles className="w-5 h-5 fill-blue-950 text-amber-400 animate-spin" />
            <span>AKCIJA LANSIRANJA: Prvih 20 registriranih korisnika dobiva 1 besplatni promo post! (Preostalo još: {preostaloMjestaZaGrateis} / 20)</span>
          </div>
        )}

        <div className="bg-blue-950 text-blue-200 text-sm py-2 px-4 shadow-sm relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="flex items-center gap-1.5 font-bold tracking-wide">
              <Shield className="w-4 h-4 text-emerald-400" />
              🇭🇷 Kupko.hr - Sigurni Hrvatski Oglasnik (Supabase baza aktivna)
            </span>
            <div className="flex items-center gap-4">
              {korisnik ? (
                <div className="relative">
                  <button 
                    onClick={() => setPrikaziMeniKorisnika(!prikaziMeniKorisnika)}
                    className="text-amber-400 font-extrabold flex items-center gap-1.5 bg-blue-900 px-3.5 py-1.5 rounded-xl border border-blue-500/40 hover:bg-blue-800 transition text-sm"
                  >
                    <User className="w-4 h-4" /> 
                    <span>Moje Kupko ({korisnik.ime})</span>
                    <span className="text-xs bg-amber-400 text-blue-950 px-1.5 py-0.5 rounded font-black">▼</span>
                  </button>

                  {prikaziMeniKorisnika && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-900 z-50 overflow-hidden py-2 text-sm">
                      <div className="px-4 py-2.5 border-b bg-slate-50">
                        <span className="text-xs text-slate-500 uppercase font-black">Prijavljeni korisnik</span>
                        <p className="font-black text-slate-900 text-base">{korisnik.ime}</p>
                        <p className="text-xs text-blue-700 font-semibold">{korisnik.email}</p>
                        
                        <div className="mt-2.5 bg-amber-100 border border-amber-300 text-amber-900 p-2 rounded-xl flex items-center justify-between text-xs font-black">
                          <span>🌟 Besplatni Promo Post:</span>
                          <span className="bg-amber-500 text-white px-2 py-0.5 rounded-lg text-sm">{korisnik.promoKrediti || 0}</span>
                        </div>
                      </div>

                      <div className="py-1">
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSamoOmiljene(false); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-blue-700" /> Moji oglasi
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("PayProtect: Sigurna kupoprodaja preko Kupka uz escrow zaštitu sredstava."); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" /> PayProtect
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSamoOmiljene(true); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-red-500" /> Spremljeno ({omiljeniIds.length})
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziUnosPodatakaModal(true); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <Settings className="w-4 h-4 text-slate-700" /> Postavke (Moji podaci)
                        </button>
                      </div>

                      <div className="border-t pt-1">
                        <button onClick={() => { setPrikaziMeniKorisnika(false); postaviKorisnika(null); }} className="w-full text-left px-4 py-2.5 font-bold text-red-600 hover:bg-red-50 flex items-center gap-2.5">
                          <LogIn className="w-4 h-4" /> Odjavi se
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 font-bold text-sm">
                  <button onClick={() => setPrikaziPrijavu(true)} className="hover:text-white flex items-center gap-1.5">
                    <LogIn className="w-4 h-4" /> Prijava
                  </button>
                  <span>|</span>
                  <button onClick={() => setPrikaziRegistraciju(true)} className="hover:text-amber-300 flex items-center gap-1.5 text-white font-black">
                    <UserPlus className="w-4 h-4 text-amber-400" /> Registracija
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-xl sticky top-0 z-40 border-b border-blue-700">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div 
              className="flex items-center gap-3.5 cursor-pointer group"
              onClick={() => { setOdabranaKategorija("sve"); setOdabranaPodkategorija("sve"); setPojamPretrage(""); setPrikaziSamoOmiljene(false); setOdabraniOglas(null); setPrikaziReelsMod(false); }}
            >
              <div className="relative bg-amber-400 p-3 rounded-2xl text-blue-950 shadow-xl group-hover:scale-105 transition">
                <ShoppingBag className="w-8 h-8 stroke-[2.5]" />
                <CheckCircle2 className="w-5 h-5 text-blue-700 absolute -bottom-1 -right-1 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-black text-3xl sm:text-4xl tracking-tight text-white">KUP</span>
                  <span className="font-black text-3xl sm:text-4xl tracking-tight text-amber-400">KO</span>
                  <span className="text-amber-400 text-sm font-black bg-amber-400/25 px-2 py-0.5 rounded-lg ml-1.5 border border-amber-400/40">HR</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full md:max-w-3xl flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Pretraži ponudu iz baze (npr. Zlatni retriver, BMW, Stan...)"
                  value={pojamPretrage}
                  onChange={(e) => setPojamPretrage(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl text-slate-900 bg-white shadow-md text-base font-semibold outline-none focus:ring-4 focus:ring-amber-400 placeholder:text-slate-400"
                />
                <Search className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
              </div>

              <select
                value={odabranaZupanija}
                onChange={(e) => setOdabranaZupanija(e.target.value)}
                className="px-4 py-3 rounded-2xl bg-blue-950 text-white border border-blue-400/50 text-sm font-bold outline-none cursor-pointer shadow-md"
              >
                <option value="sve">🇭🇷 Cijela Hrvatska</option>
                {ZUPANIJE.map((z) => <option key={z} value={z} className="bg-slate-900">{z}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <button
                onClick={() => { setPrikaziReelsMod(true); setReelsIndex(0); }}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black px-4 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition text-sm tracking-wide uppercase animate-pulse"
              >
                <Flame className="w-5 h-5 fill-white" />
                <span>Kupko Reels 🔥</span>
              </button>

              <button
                onClick={() => { setPrikaziSamoOmiljene(!prikaziSamoOmiljene); setPrikaziReelsMod(false); }}
                className={`flex items-center justify-center gap-2 px-3.5 py-3 rounded-2xl text-sm font-black transition shadow-md ${
                  prikaziSamoOmiljene ? "bg-red-500 text-white" : "bg-blue-950 text-slate-200 hover:bg-blue-900 border border-blue-400/40"
                }`}
              >
                <Heart className={`w-5 h-5 ${prikaziSamoOmiljene ? "fill-white" : "text-red-400"}`} />
                <span className="hidden sm:inline">({omiljeniIds.length})</span>
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
                className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition text-sm uppercase tracking-wider"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden sm:inline">Predaj oglas</span>
              </button>
            </div>
          </div>
        </header>

        {!prikaziSamoOmiljene && !prikaziReelsMod && promoOglasi.length > 0 && (
          <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 py-6 text-blue-950 shadow-xl border-b-2 border-amber-600">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 bg-blue-950 text-amber-400 rounded-2xl font-black shadow-md">
                    <Sparkles className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-wide text-blue-950">Izdvojeni Promo Oglasi</h2>
                    <p className="text-xs font-extrabold text-blue-900">Plaćene sponzorirane objave na vrhu ponude</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPromoSlajderIndex((prev) => (prev - 1 + promoOglasi.length) % promoOglasi.length)} className="p-2.5 bg-blue-950/20 hover:bg-blue-950/40 rounded-2xl transition text-blue-950">
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <button onClick={() => setPromoSlajderIndex((prev) => (prev + 1) % promoOglasi.length)} className="p-2.5 bg-blue-950/20 hover:bg-blue-950/40 rounded-2xl transition text-blue-950">
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {promoOglasi.slice(promoSlajderIndex, promoSlajderIndex + 3).map((o) => (
                  <div 
                    key={o.id}
                    onClick={() => setOdabraniOglas(o)}
                    className="bg-white text-slate-900 rounded-3xl p-4 shadow-xl border-2 border-blue-950 flex gap-4 cursor-pointer hover:scale-102 transition relative overflow-hidden group"
                  >
                    <span className="absolute top-0 right-0 bg-blue-950 text-amber-400 text-xs font-black uppercase px-3.5 py-1.5 rounded-bl-2xl shadow flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> PROMO
                    </span>

                    <img src={o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} alt={o.naslov} className="w-32 h-32 object-cover rounded-2xl group-hover:scale-105 transition" />
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <span className="text-xs font-bold text-slate-500 block mb-1">📍 {o.zupanija}</span>
                        <h4 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">{o.naslov}</h4>
                      </div>

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-xl font-black text-blue-700">{o.cijena} €</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          
          {korisnik?.isOwner && (
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-amber-400 rounded-3xl p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 bg-amber-400 text-blue-950 rounded-2xl shadow-lg">
                    <Crown className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-wide text-white">👑 Admin Upravljačka Ploča</h3>
                    <p className="text-sm font-medium text-blue-200">Pregled statistike u stvarnom vremenu (iz Supabase baze)</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-400 text-blue-950 font-black px-4 py-1.5 rounded-full uppercase tracking-wider">Vlasnički pristup</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                <div className="bg-white/10 backdrop-blur border border-white/20 p-5 rounded-2xl shadow-md">
                  <span className="text-xs text-blue-200 uppercase font-black block mb-1">📦 Ukupno oglasa u bazi</span>
                  <span className="text-3xl sm:text-4xl font-black text-white">{oglasi.length}</span>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 p-5 rounded-2xl shadow-md">
                  <span className="text-xs text-blue-200 uppercase font-black block mb-1">⭐ Aktivnih promo postova</span>
                  <span className="text-3xl sm:text-4xl font-black text-amber-400">{promoOglasi.length}</span>
                </div>
                <div className="bg-white/10 backdrop-blur border border-white/20 p-5 rounded-2xl shadow-md">
                  <span className="text-xs text-blue-200 uppercase font-black block mb-1">👥 Registrirani korisnici</span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400">{registriraniKorisnici.length} / 20 (Gratis)</span>
                </div>
              </div>
            </div>
          )}

          {prikaziReelsMod ? (
            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl max-w-xl mx-auto relative border border-slate-200 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-rose-600 font-black">
                  <Flame className="w-7 h-7 animate-bounce" />
                  <span className="text-xl uppercase tracking-wider">Kupko Reels & Swipe Mode</span>
                </div>
                <button 
                  onClick={() => setPrikaziReelsMod(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-black"
                >
                  ✕ Zatvori Reels
                </button>
              </div>

              {oglasi.length === 0 ? (
                <p className="text-center py-20 text-slate-500 font-bold">Nema oglasa u bazi.</p>
              ) : (
                <div className="relative bg-slate-950 rounded-3xl overflow-hidden border shadow-2xl flex flex-col">
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
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow hover:bg-white transition"
                          >
                            <Heart className={`w-6 h-6 ${omiljeniIds.includes(currentOglas.id) ? "fill-red-500 text-red-500" : "text-slate-700"}`} />
                          </button>

                          <div className="absolute bottom-4 left-4 right-4 space-y-2">
                            <span className="text-3xl font-black text-amber-400">{currentOglas.cijena} €</span>
                            <h3 className="text-xl font-black text-white leading-snug line-clamp-2">{currentOglas.naslov}</h3>
                            <p className="text-sm text-slate-200 line-clamp-2 font-medium">{currentOglas.opis}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-900 flex gap-3">
                          <button
                            onClick={() => setOdabraniOglas(currentOglas)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl text-sm uppercase tracking-wider shadow"
                          >
                            Pogledaj detalje
                          </button>
                          
                          <button
                            onClick={() => setReelsIndex((prev) => prev + 1)}
                            className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black py-3.5 rounded-2xl text-sm uppercase tracking-wider shadow flex items-center justify-center gap-2"
                          >
                            <span>Sljedeći oglas ⏭️</span>
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
              {!prikaziSamoOmiljene && odabranaKategorija === "sve" && pojamPretrage === "" && prikaz !== "karta" && (
                <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-blue-900 text-amber-400 rounded-2xl font-black shadow">
                      <Flame className="w-5 h-5 fill-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900">Najposjećenije kategorije</h3>
                      <p className="text-xs text-slate-500 font-semibold">Pregled aktivnosti i broja aktivnih oglasa po kategorijama</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                    {SVE_KATEGORIJE.map((kat) => {
                      const count = oglasi.filter(o => o.kategorija === kat.id).length;
                      return (
                        <div
                          key={kat.id}
                          onClick={() => { setOdabranaKategorija(kat.id); setOdabranaPodkategorija("sve"); }}
                          className="bg-slate-50 hover:bg-blue-50 border border-slate-200 p-4 rounded-2xl cursor-pointer transition flex flex-col items-center text-center group shadow-sm hover:shadow-md"
                        >
                          <span className="text-3xl mb-2 group-hover:scale-110 transition">{kat.ikona}</span>
                          <span className="font-black text-slate-900 text-xs line-clamp-1">{kat.naziv}</span>
                          <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full mt-2">
                            {count} oglasa
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="bg-white p-5 rounded-3xl border border-slate-200 shadow-lg space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <h3 className="text-sm font-black uppercase text-slate-500 tracking-wider">Sve Kategorije na Kupku</h3>
                  
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5"><SlidersHorizontal className="w-4 h-4" /> Cijena (€):</span>
                    <input 
                      type="number" placeholder="Min" value={minCijena} onChange={(e) => setMinCijena(e.target.value)}
                      className="w-24 p-2 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50"
                    />
                    <span className="text-slate-400 font-bold">-</span>
                    <input 
                      type="number" placeholder="Max" value={maxCijena} onChange={(e) => setMaxCijena(e.target.value)}
                      className="w-24 p-2 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50"
                    />

                    <select 
                      value={odabranoStanje} onChange={(e) => setOdabranoStanje(e.target.value)}
                      className="p-2 rounded-xl border border-slate-300 text-sm bg-slate-50 font-bold text-slate-800"
                    >
                      <option value="sve">Sva stanja</option>
                      <option value="novo">Novo / Kao novo</option>
                      <option value="korišteno">Korišteno</option>
                    </select>

                    {(minCijena || maxCijena || odabranoStanje !== "sve") && (
                      <button onClick={() => { setMinCijena(""); setMaxCijena(""); setOdabranoStanje("sve"); }} className="text-sm text-red-600 font-black hover:underline ml-2">
                        Resetiraj
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => { setOdabranaKategorija("sve"); setOdabranaPodkategorija("sve"); }}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-black transition shadow-sm ${odabranaKategorija === "sve" ? "bg-blue-700 text-white shadow-md" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"}`}
                  >
                    Svi Oglasi
                  </button>
                  {SVE_KATEGORIJE.map((kat) => (
                    <button
                      key={kat.id}
                      onClick={() => { setOdabranaKategorija(kat.id); setOdabranaPodkategorija("sve"); }}
                      className={`px-5 py-2.5 rounded-2xl text-sm font-black flex items-center gap-2 transition shadow-sm ${odabranaKategorija === kat.id ? "bg-blue-700 text-white shadow-md" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"}`}
                    >
                      <span className="text-base">{kat.ikona}</span>
                      <span>{kat.naziv}</span>
                    </button>
                  ))}
                </div>

                {odabranaKategorija !== "sve" && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-black text-blue-900 uppercase mb-3">
                      Podkategorije za {SVE_KATEGORIJE.find((k) => k.id === odabranaKategorija)?.naziv}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setOdabranaPodkategorija("sve")}
                        className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition ${odabranaPodkategorija === "sve" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700 border"}`}
                      >
                        Sve podkategorije
                      </button>
                      {SVE_KATEGORIJE.find((k) => k.id === odabranaKategorija)?.podkategorije.map((pod) => (
                        <button
                          key={pod}
                          onClick={() => setOdabranaPodkategorija(pod)}
                          className={`px-3.5 py-1.5 rounded-xl text-sm font-bold transition ${odabranaPodkategorija === pod ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700 border hover:bg-blue-50"}`}
                        >
                          {pod}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              <section>
                <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-3xl shadow-lg border border-slate-200">
                  <h3 className="text-xl font-black text-slate-900">
                    {prikaziSamoOmiljene ? "Vaši omiljeni oglasi" : (prikaz === "karta" ? "Interaktivna Karta - Oglasi po županijama" : "Aktivni Oglasi iz Baze")} ({filtriraniOglasi.length})
                  </h3>
                  <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl border">
                    <button onClick={() => setPrikaz("grid")} className={`p-2.5 rounded-xl ${prikaz === "grid" ? "bg-white text-blue-700 shadow-md" : "text-slate-500"}`} title="Grid prikaz"><Grid className="w-5 h-5" /></button>
                    <button onClick={() => setPrikaz("list")} className={`p-2.5 rounded-xl ${prikaz === "list" ? "bg-white text-blue-700 shadow-md" : "text-slate-500"}`} title="Lista prikaz"><List className="w-5 h-5" /></button>
                    <button onClick={() => setPrikaz("karta")} className={`p-2.5 rounded-xl flex items-center gap-1 ${prikaz === "karta" ? "bg-white text-blue-700 shadow-md" : "text-slate-500"}`} title="Interaktivna karta"><Map className="w-5 h-5" /></button>
                  </div>
                </div>

                {prikaz === "karta" ? (
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200 space-y-6">
                    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-8 h-8 text-amber-400" />
                        <div>
                          <h4 className="font-black text-lg">Hrvatska - Pregled po županijama</h4>
                          <p className="text-xs text-blue-200">Kliknite na bilo koju županiju za brzi prikaz oglasa na toj lokaciji</p>
                        </div>
                      </div>
                      {odabranaZupanija !== "sve" && (
                        <button onClick={() => setOdabranaZupanija("sve")} className="bg-amber-400 text-blue-950 font-bold px-3.5 py-1.5 rounded-xl text-xs">
                          Poništi županiju (Prikaži sve)
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {ZUPANIJE.map((z) => {
                        const brojOglasauZupaniji = oglasi.filter(o => o.zupanija === z).length;
                        const jeOdabrana = odabranaZupanija === z;
                        return (
                          <div 
                            key={z}
                            onClick={() => setOdabranaZupanija(jeOdabrana ? "sve" : z)}
                            className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                              jeOdabrana ? "bg-blue-700 text-white border-blue-800 shadow-lg scale-102" : "bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800"
                            }`}
                          >
                            <span className="font-extrabold text-sm line-clamp-1">{z}</span>
                            <span className={`text-xs font-black mt-2 inline-block px-2.5 py-1 rounded-lg w-max ${jeOdabrana ? "bg-amber-400 text-blue-950" : "bg-blue-100 text-blue-900"}`}>
                              {brojOglasauZupaniji} oglasa 📍
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className={prikaz === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
                    {filtriraniOglasi.map((o) => {
                      const glavnaSlika = o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80";
                      return (
                        <div 
                          key={o.id}
                          onClick={() => setOdabraniOglas(o)}
                          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition flex flex-col justify-between group cursor-pointer relative"
                        >
                          <div className="relative">
                            <img src={glavnaSlika} alt={o.naslov} className="w-full h-60 object-cover group-hover:scale-105 transition" />
                            
                            {o.promoviran && (
                              <span className="absolute top-3.5 left-3.5 bg-amber-400 text-blue-950 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4" /> PROMO
                              </span>
                            )}

                            <button
                              onClick={(e) => toggleOmiljeni(e, o.id)}
                              className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur p-3 rounded-full shadow-lg hover:bg-white transition"
                            >
                              <Heart
                                className={`w-6 h-6 ${
                                  omiljeniIds.includes(o.id)
                                    ? "fill-red-500 text-red-500"
                                    : "text-slate-600"
                                }`}
                              />
                            </button>
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-semibold">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 text-blue-600" /> {o.zupanija} {o.grad ? `(${o.grad})` : ""}
                                </span>
                                <span>{o.datum}</span>
                              </div>
                              <h4 className="font-extrabold text-slate-900 text-lg mb-2 line-clamp-2 hover:text-blue-700 leading-snug">
                                {o.naslov}
                              </h4>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-3">
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-blue-700">{o.cijena} €</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => obnoviOglas(e, o.id)}
                                  title="Obnovi oglas"
                                  className="p-2.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 rounded-2xl transition shadow-sm"
                                >
                                  <RotateCw className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            {korisnik && !o.promoviran && (
                              <div className="mt-4 pt-4 border-t border-slate-100">
                                <button
                                  type="button"
                                  onClick={(e) => pokreniPromociju(e, o)}
                                  className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-black py-2.5 px-4 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
                                >
                                  <Sparkles className="w-4 h-4" /> Boostaj oglas (Iskoristi Promo)
                                </button>
                              </div>
                            )}

                            {mozeUreditiIliBrisati(o) && (
                              <div className="mt-2 pt-2 flex gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => pokreniUredivanje(e, o)}
                                  className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold py-2 px-4 rounded-2xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                  <Edit3 className="w-4 h-4" /> Uredi
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => obrisiOglas(e, o)}
                                  className="flex-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold py-2 px-4 rounded-2xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                  <Trash2 className="w-4 h-4" /> Izbriši
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>

      <footer className="bg-blue-950 text-slate-200 mt-20 border-t-4 border-amber-400 pt-12 pb-10 text-sm relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="font-black text-3xl tracking-tight text-white">KUP</span>
              <span className="font-black text-3xl tracking-tight text-amber-400">KO</span>
              <span className="text-amber-400 text-xs font-bold bg-amber-400/20 px-2 py-0.5 rounded ml-1 border border-amber-400/30">HR</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs mb-4">
              Kupko.hr je vodeći hrvatski besplatni oglasnik za brzu i sigurnu kupoprodaju (Supabase baza aktivna).
            </p>
            <p className="text-amber-400 font-extrabold text-xs">© 2026 Kupko.hr - Sva prava pridržana.</p>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-sm mb-3 tracking-wider text-amber-400">Pomoć i Korisnici</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><button type="button" onClick={() => alert("Kontakt: kupko.podrska@gmail.com")} className="hover:text-amber-400 transition">Kontakt i pomoć</button></li>
              <li><button type="button" onClick={() => alert("O nama: Kupko je prvi pravi hrvatski oglasnik.")} className="hover:text-amber-400 transition">O nama</button></li>
              <li>
                <button 
                  type="button"
                  onClick={() => {
                    if (!korisnik) {
                      alert("Morate biti prijavljeni da biste predali oglas!");
                      setPrikaziPrijavu(true);
                      return;
                    }
                    setPrikaziFormu(true);
                  }} 
                  className="hover:text-amber-400 transition text-amber-300 font-bold"
                >
                  Predaj oglas
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-sm mb-3 tracking-wider text-amber-400">Pravne Informacije</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><button type="button" onClick={() => setPrikaziUvjeteModal(true)} className="hover:text-amber-400 transition">Uvjeti korištenja</button></li>
              <li><button type="button" onClick={() => setPrikaziPrivatnostModal(true)} className="hover:text-amber-400 transition">Politika privatnosti</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-sm mb-3 tracking-wider text-amber-400">Sigurnost</h4>
            <p className="text-slate-300 text-xs">Potpuno sigurna kupoprodaja, provjereni korisnici i Supabase baza podataka.</p>
          </div>
        </div>
      </footer>

      {prikaziCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-950 text-white p-4 z-50 shadow-2xl border-t-2 border-amber-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm max-w-4xl">
            <span className="font-bold text-amber-400">🍪 Kolačići i Privatnost:</span> Kupko.hr koristi kolačiće radi osiguranja ispravnog rada stranice i analitike.
          </div>
          <div className="flex gap-2 shrink-0">
            <button type="button" onClick={prihvatiKolacice} className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase shadow">
              Prihvaćam sve
            </button>
          </div>
        </div>
      )}

      {prikaziUvjeteModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <button type="button" onClick={() => setPrikaziUvjeteModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-2 text-blue-900">
              <FileText className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">Uvjeti i pravila korištenja Kupko.hr</h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed font-medium">
              <p>Dobrodošli na Kupko.hr. Korištenjem našeg portala prihvaćate ove uvjete korištenja.</p>
            </div>
          </div>
        </div>
      )}

      {prikaziPrivatnostModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <button type="button" onClick={() => setPrikaziPrivatnostModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">Politika privatnosti (GDPR)</h2>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed font-medium">
              <p>Kupko.hr štiti vašu privatnost u skladu s GDPR-om.</p>
            </div>
          </div>
        </div>
      )}

      {prikaziUnosPodatakaModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button type="button" onClick={() => setPrikaziUnosPodatakaModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-2 text-slate-900">Moji osobni podaci</h2>
            <form onSubmit={spremiOsobnePodatke} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" required placeholder="Ime" value={korisnickiPodaci.ime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, ime: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold" />
                <input type="text" required placeholder="Prezime" value={korisnickiPodaci.prezime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, prezime: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold" />
              </div>
              <input type="text" required placeholder="Ulica i kućni broj" value={korisnickiPodaci.adresa} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, adresa: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold" />
              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-3.5 rounded-2xl uppercase text-sm">Spremi podatke</button>
            </form>
          </div>
        </div>
      )}

      {prikaziPlacanjePromo && oglasZaPromociju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button type="button" onClick={() => setPrikaziPlacanjePromo(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-2.5 text-amber-600">
              <Sparkles className="w-7 h-7" />
              <h2 className="text-xl font-black text-slate-900">Promocija Oglasa</h2>
            </div>
            <p className="text-sm text-slate-600 font-medium">Oglas: <strong className="text-slate-900">{oglasZaPromociju.naslov}</strong></p>
            <p className="text-xs text-blue-700 font-bold bg-blue-50 p-2 rounded-xl border">
              Cijena artikla: {oglasZaPromociju.cijena} € (Cijene promo paketa automatski prilagođene vrijednosti)
            </p>

            {korisnik && (korisnik.promoKrediti || 0) > 0 ? (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 text-center space-y-3">
                <p className="text-xs font-black text-amber-900 uppercase">
                  🌟 Imate {korisnik.promoKrediti} besplatni promo post na raspolaganju!
                </p>
                <button 
                  type="button"
                  onClick={iskoristiBesplatniBoost}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-black py-3.5 rounded-2xl text-xs uppercase shadow tracking-wider"
                >
                  Iskoristi besplatni promo post (0 €)
                </button>
              </div>
            ) : (
              <form onSubmit={potvrdiUplatuPromo} className="space-y-4">
                <label className="block text-xs font-black text-slate-700 uppercase">Odaberite paket promocije:</label>
                <div className="space-y-2">
                  {dohvatiPaketeZaOglas(oglasZaPromociju).map((paket) => (
                    <div 
                      key={paket.naziv}
                      onClick={() => setOdabraniPromoPaket(paket)}
                      className={`p-3.5 rounded-2xl border cursor-pointer flex justify-between items-center transition ${
                        odabraniPromoPaket?.naziv === paket.naziv 
                          ? "bg-blue-50 border-blue-600 ring-2 ring-blue-600" 
                          : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="font-bold text-sm text-slate-900">{paket.naziv}</span>
                      <span className="font-black text-blue-700">{paket.cijena} €</span>
                    </div>
                  ))}
                </div>
                <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider shadow-lg text-sm">
                  Plati {odabraniPromoPaket ? odabraniPromoPaket.cijena : dohvatiPaketeZaOglas(oglasZaPromociju)[0].cijena} €
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {prikaziFormu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button type="button" onClick={() => setPrikaziFormu(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            
            <h2 className="text-2xl font-black text-slate-900 mb-4">Predaj novi oglas u Supabase bazu</h2>

            <form onSubmit={rukujDodavanjemOglasa} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Naslov oglasa *</label>
                <input 
                  type="text" required placeholder="Npr. Stan, Auto, Bicikl..."
                  value={noviOglas.naslov} onChange={(e) => setNoviOglas({ ...noviOglas, naslov: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Cijena (€) *</label>
                  <input 
                    type="text" required placeholder="npr. 120"
                    value={noviOglas.cijena} onChange={(e) => setNoviOglas({ ...noviOglas, cijena: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Glavna Kategorija</label>
                  <select 
                    value={noviOglas.kategorija} 
                    onChange={(e) => {
                      const novaKat = e.target.value;
                      const prvaPod = SVE_KATEGORIJE.find((k) => k.id === novaKat)?.podkategorije[0] || "";
                      setNoviOglas({ ...noviOglas, kategorija: novaKat, podkategorija: prvaPod });
                    }}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm bg-white font-bold"
                  >
                    {SVE_KATEGORIJE.map((k) => (
                      <option key={k.id} value={k.id}>{k.ikona} {k.naziv}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Podkategorija</label>
                  <select 
                    value={noviOglas.podkategorija} onChange={(e) => setNoviOglas({ ...noviOglas, podkategorija: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm bg-white font-semibold"
                  >
                    {SVE_KATEGORIJE.find((k) => k.id === noviOglas.kategorija)?.podkategorije.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {noviOglas.kategorija === "auto-moto" && (
                <div className="bg-blue-50/70 p-4 rounded-3xl border border-blue-200 space-y-3">
                  <h4 className="text-xs font-black text-blue-900 uppercase flex items-center gap-1.5"><Car className="w-4 h-4" /> Specifikacije vozila</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Godište</label>
                      <input type="text" placeholder="npr. 2019" value={noviOglas.godiste} onChange={(e) => setNoviOglas({ ...noviOglas, godiste: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kilometri</label>
                      <input type="text" placeholder="npr. 145000" value={noviOglas.kilometri} onChange={(e) => setNoviOglas({ ...noviOglas, kilometri: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Snaga (kW)</label>
                      <input type="text" placeholder="npr. 140" value={noviOglas.snagaKw} onChange={(e) => setNoviOglas({ ...noviOglas, snagaKw: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gorivo</label>
                      <select value={noviOglas.gorivo} onChange={(e) => setNoviOglas({ ...noviOglas, gorivo: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-bold bg-white">
                        <option value="Dizel">Dizel</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Hibrid">Hibrid</option>
                        <option value="Električni">Električni</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mjenjač</label>
                      <select value={noviOglas.mjenjac} onChange={(e) => setNoviOglas({ ...noviOglas, mjenjac: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-bold bg-white">
                        <option value="Ručni">Ručni</option>
                        <option value="Automatski">Automatski</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {noviOglas.kategorija === "nekretnine" && (
                <div className="bg-emerald-50/70 p-4 rounded-3xl border border-emerald-200 space-y-3">
                  <h4 className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5"><Home className="w-4 h-4" /> Specifikacije nekretnine</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kvadratura (m²)</label>
                      <input type="text" placeholder="npr. 55" value={noviOglas.kvadratura} onChange={(e) => setNoviOglas({ ...noviOglas, kvadratura: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Broj soba</label>
                      <input type="text" placeholder="npr. 2" value={noviOglas.sobe} onChange={(e) => setNoviOglas({ ...noviOglas, sobe: e.target.value })} className="w-full p-3 rounded-xl border text-sm font-semibold bg-white" />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Županija</label>
                  <select
                    value={noviOglas.zupanija}
                    onChange={(e) => setNoviOglas({ ...noviOglas, zupanija: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm bg-white font-bold"
                  >
                    {ZUPANIJE.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Grad / Mjesto</label>
                  <input type="text" placeholder="Npr. Zagreb" value={noviOglas.grad} onChange={(e) => setNoviOglas({ ...noviOglas, grad: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Broj Mobitela *</label>
                  <input type="text" placeholder="091..." required value={noviOglas.telefon} onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" />
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={noviOglas.promoviran}
                    onChange={(e) => setNoviOglas({ ...noviOglas, promoviran: e.target.checked })}
                    className="rounded text-amber-500 w-5 h-5"
                  />
                  <span className="font-black text-amber-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Želim odmah promovirati ovaj oglas (Izdvoji na vrh)
                  </span>
                </label>
                {korisnik && (korisnik.promoKrediti || 0) > 0 && noviOglas.promoviran && (
                  <p className="text-xs text-amber-800 font-bold ml-7">
                    ✨ Automatski će se iskoristiti 1 vaš besplatni promo post! (Preostalo: {korisnik.promoKrediti})
                  </p>
                )}
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl border">
                <label className="block text-xs font-black text-slate-700 uppercase mb-2">Galerija slika i videa (Reels)</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-white cursor-pointer relative mb-3 hover:bg-slate-50 transition">
                  <input type="file" accept="image/*,video/*" multiple onChange={(e) => rukujVisestrukimUcitavanjemSlika(e, false)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <Upload className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-sm font-black text-slate-800">Odaberite slike ili videozapise s uređaja (Cloudinary)</p>
                </div>

                {noviOglas.slike.length > 0 && (
                  <div className="grid grid-cols-4 gap-2.5">
                    {noviOglas.slike.map((s, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden border h-20 shadow-sm bg-black">
                        {s.endsWith(".mp4") || s.includes("video") ? (
                          <video src={s} className="w-full h-full object-cover" />
                        ) : (
                          <img src={s} alt="Upload" className="w-full h-full object-cover" />
                        )}
                        <button type="button" onClick={() => setNoviOglas({ ...noviOglas, slike: noviOglas.slike.filter((_, i) => i !== idx) })} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <textarea rows={3} placeholder="Opis oglasa..." value={noviOglas.opis} onChange={(e) => setNoviOglas({ ...noviOglas, opis: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" />

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
                <div>
                  <h5 className="font-bold text-xs text-slate-800">Anti-Spam Provjera</h5>
                  <p className="text-xs text-slate-600 font-semibold">Koliko je: <strong className="text-slate-900">{sigurnosniKod.a} + {sigurnosniKod.b} = ?</strong></p>
                </div>
                <input
                  type="number" required placeholder="Rezultat"
                  value={sigurnosniKod.unos} onChange={(e) => setSigurnosniKod({ ...sigurnosniKod, unos: e.target.value })}
                  className="w-32 p-2.5 rounded-xl border border-slate-300 text-center font-black text-sm bg-white"
                />
              </div>

              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-4 rounded-2xl uppercase tracking-wider text-sm shadow-lg">
                Spremi u Supabase bazu podataka
              </button>
            </form>
          </div>
        </div>
      )}

      {korakVerifikacije && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl relative">
            <button type="button" onClick={() => setKorakVerifikacije(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black text-slate-900">Potvrdite vaš E-mail</h2>
            <p className="text-sm text-slate-600 font-medium">Poslali smo verifikacijski kod na: <strong className="text-slate-900">{privremeniEmail}</strong></p>
            <form onSubmit={potvrdiVerifikacijskiKod} className="space-y-3.5">
              <input 
                type="text" required maxLength={6} placeholder="Unesite kod" 
                value={uneseniKod} onChange={(e) => setUneseniKod(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-slate-300 text-center text-xl tracking-widest font-black bg-slate-50"
              />
              <button type="submit" className="w-full bg-blue-700 text-white font-black py-3.5 rounded-2xl uppercase text-sm shadow-lg">
                Potvrdi Kod i Dovrši Registraciju
              </button>
            </form>
          </div>
        </div>
      )}

      {prikaziZaboravljenuLozinku && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button type="button" onClick={() => { setPrikaziZaboravljenuLozinku(false); setKorakResetiranja(1); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-2 text-blue-700">
              <KeyRound className="w-6 h-6" />
              <h2 className="text-xl font-black text-slate-900">Oporavak lozinke</h2>
            </div>

            {korakResetiranja === 1 ? (
              <form onSubmit={pokreniZaboravljenuLozinku} className="space-y-4">
                <p className="text-xs text-slate-600 font-medium">Unesite e-mail adresu s kojom ste se registrirali.</p>
                <input 
                  type="email" required placeholder="vas.email@gmail.com"
                  value={zaboravljeniEmail} onChange={(e) => setZaboravljeniEmail(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
                />
                <button type="submit" className="w-full bg-blue-700 text-white font-black py-3.5 rounded-2xl uppercase text-sm shadow-md">
                  Pošalji kod za oporavak
                </button>
              </form>
            ) : (
              <form onSubmit={potvrdiResetLozinke} className="space-y-4">
                <p className="text-xs text-slate-600 font-medium">Unesite kod i novu lozinku.</p>
                <input 
                  type="text" required maxLength={6} placeholder="123456"
                  value={uneseniKodReset} onChange={(e) => setUneseniKodReset(e.target.value)}
                  className="w-full p-3 rounded-2xl border text-center tracking-widest font-black text-lg"
                />
                <input 
                  type="password" required placeholder="Nova lozinka"
                  value={novaLozinka} onChange={(e) => setNovaLozinka(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
                />
                <button type="submit" className="w-full bg-emerald-600 text-white font-black py-3.5 rounded-2xl uppercase text-sm shadow-md">
                  Spremi novu lozinku
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {prikaziUredivanje && oglasZaUrediti && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button type="button" onClick={() => setPrikaziUredivanje(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Uredi oglas u bazi</h2>

            <form onSubmit={rukujSpremanjemUredivanja} className="space-y-4">
              <input 
                type="text" required 
                value={oglasZaUrediti.naslov} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, naslov: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />
              <input 
                type="text" required 
                value={oglasZaUrediti.cijena} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, cijena: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />
              <textarea 
                rows={3}
                value={oglasZaUrediti.opis || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, opis: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />
              <button type="submit" className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl uppercase text-sm shadow-lg">
                Spremi Sve Promjene u Bazu
              </button>
            </form>
          </div>
        </div>
      )}

      {odabraniOglas && (
        <div 
          onClick={() => { setOdabraniOglas(null); setPrikaziFormuZaSlanjePoruke(false); }}
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border text-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl space-y-6 cursor-default"
          >
            <button type="button" onClick={() => { setOdabraniOglas(null); setPrikaziFormuZaSlanjePoruke(false); }} className="absolute top-4 right-4 bg-slate-100 p-2.5 rounded-full z-10 hover:bg-slate-200"><X className="w-6 h-6" /></button>
            
            <div className="relative rounded-3xl overflow-hidden max-h-80 bg-slate-900 flex items-center justify-center shadow-md">
              {odabraniOglas.slike && odabraniOglas.slike.length > 0 && (odabraniOglas.slike[0].endsWith(".mp4") || odabraniOglas.slike[0].includes("video")) ? (
                <video src={odabraniOglas.slike[0]} controls className="w-full h-80 object-cover" />
              ) : (
                <img 
                  src={odabraniOglas.slike && odabraniOglas.slike.length > 0 ? odabraniOglas.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} 
                  alt={odabraniOglas.naslov} 
                  className="w-full h-80 object-cover" 
                />
              )}
            </div>
            
            <div className="flex justify-between items-start border-b border-slate-200 pb-5">
              <div>
                <span className="text-xs bg-blue-100 text-blue-900 font-black px-3 py-1 rounded-xl uppercase tracking-wider mb-2 inline-block">
                  {odabraniOglas.kategorija}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">{odabraniOglas.naslov}</h2>
                <p className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-blue-600" /> {odabraniOglas.zupanija} • {odabraniOglas.datum}
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-black text-blue-700 block">{odabraniOglas.cijena} €</span>
              </div>
            </div>

            {odabraniOglas.kategorija === "auto-moto" && (odabraniOglas.godiste || odabraniOglas.kilometri || odabraniOglas.snagaKw) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-200 text-xs font-bold text-blue-950">
                {odabraniOglas.godiste && <div>📅 Godište: <span className="font-normal">{odabraniOglas.godiste}</span></div>}
                {odabraniOglas.kilometri && <div>🛣️ Kilometri: <span className="font-normal">{odabraniOglas.kilometri} km</span></div>}
                {odabraniOglas.snagaKw && <div>⚡ Snaga: <span className="font-normal">{odabraniOglas.snagaKw} kW</span></div>}
                {odabraniOglas.gorivo && <div>⛽ Gorivo: <span className="font-normal">{odabraniOglas.gorivo}</span></div>}
                {odabraniOglas.mjenjac && <div>⚙️ Mjenjač: <span className="font-normal">{odabraniOglas.mjenjac}</span></div>}
              </div>
            )}

            {odabraniOglas.kategorija === "nekretnine" && (odabraniOglas.kvadratura || odabraniOglas.sobe) && (
              <div className="grid grid-cols-2 gap-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950">
                {odabraniOglas.kvadratura && <div>🏠 Kvadratura: <span className="font-normal">{odabraniOglas.kvadratura} m²</span></div>}
                {odabraniOglas.sobe && <div>🚪 Sobe: <span className="font-normal">{odabraniOglas.sobe}</span></div>}
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-5 rounded-3xl shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase">
                <Bot className="w-5 h-5" /> Kupko AI Procjena Cijene i Tržišta
              </div>
              <p className="text-sm text-blue-100 font-semibold">
                {izracunajAiProcjenuZaOglas(odabraniOglas)}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-3xl border text-base leading-relaxed text-slate-800 font-medium">
              <p className="whitespace-pre-line">{odabraniOglas.opis || "Nema opisa."}</p>
            </div>

            <div className="bg-blue-50/80 p-5 rounded-3xl border flex items-center justify-between shadow-sm">
              <div>
                <span className="text-xs text-blue-600 uppercase font-black block">Oglašivač</span>
                <p className="font-black text-base text-blue-950 flex items-center gap-2 mt-0.5">
                  <User className="w-5 h-5 text-blue-700" /> {odabraniOglas.prodavac || "Korisnik"}
                </p>
              </div>
              <div className="text-right text-sm text-slate-700 font-bold">
                <span>📞 Tel: <strong className="text-slate-900">{odabraniOglas.telefon || "Dostupan na upit"}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {prikaziPrijavu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
            <button type="button" onClick={() => setPrikaziPrijavu(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Prijava na Kupko</h2>
            <form onSubmit={rukujPrijavom} className="space-y-3.5">
              <input 
                type="text" required placeholder="Korisničko ime (npr. admin)" 
                value={formaPrijava.korisnickoIme} onChange={(e) => setFormaPrijava({ ...formaPrijava, korisnickoIme: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />
              <input 
                type="password" required placeholder="Lozinka" 
                value={formaPrijava.lozinka} onChange={(e) => setFormaPrijava({ ...formaPrijava, lozinka: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />
              
              <div className="flex justify-end text-xs pt-1">
                <button 
                  type="button" 
                  onClick={() => { setPrikaziPrijavu(false); setPrikaziZaboravljenuLozinku(true); }}
                  className="text-blue-700 font-bold hover:underline"
                >
                  Zaboravili ste lozinku?
                </button>
              </div>

              <button type="submit" className="w-full bg-blue-700 text-white font-black py-3.5 rounded-2xl text-sm shadow-md mt-2">Prijavi se</button>
            </form>
          </div>
        </div>
      )}

      {prikaziRegistraciju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button type="button" onClick={() => setPrikaziRegistraciju(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-2 text-slate-900">Registracija na Kupko</h2>
            <p className="text-xs text-amber-600 font-black mb-4 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              🎁 Prvih 20 korisnika automatski dobiva 1 besplatni promo post!
            </p>
            
            <form onSubmit={rukujRegistracijom} className="space-y-4">
              <input 
                type="text" required placeholder="Korisničko ime" 
                value={formaRegistracija.ime} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, ime: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />
              <input 
                type="email" required placeholder="E-mail adresa" 
                value={formaRegistracija.email} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, email: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />
              <input 
                type="password" required placeholder="Lozinka" 
                value={formaRegistracija.lozinka} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, lozinka: e.target.value })}
                className="w-full p-3.5 rounded-2xl border text-sm font-semibold"
              />

              <div className="space-y-3 pt-2 text-xs font-semibold">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                  <input 
                    type="checkbox" required
                    checked={formaRegistracija.prihvacenaPrivatnost} 
                    onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvacenaPrivatnost: e.target.checked })}
                    className="mt-0.5 rounded text-blue-700 w-4 h-4"
                  />
                  <span>Prihvaćam Politiku privatnosti *</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                  <input 
                    type="checkbox" required
                    checked={formaRegistracija.prihvaceniUvjeti} 
                    onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvaceniUvjeti: e.target.checked })}
                    className="mt-0.5 rounded text-blue-700 w-4 h-4"
                  />
                  <span>Prihvaćam Uvjete i pravila korištenja *</span>
                </label>
              </div>

              <button type="submit" className="w-full bg-amber-400 text-blue-950 font-black py-3.5 rounded-2xl mt-3 text-sm shadow-md">
                Registriraj se i osvoji besplatni promo post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
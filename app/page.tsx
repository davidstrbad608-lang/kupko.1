"use client";

import React, { useState, useEffect } from "react";
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

const POCETNI_OGLASI = [
  // KUĆNI LJUBIMCI
  {
    id: 101,
    naslov: "Prekrasni štenci zlatnog retrivera - cijepljeni i čipirani",
    cijena: "450",
    kategorija: "kucni-ljubimci",
    podkategorija: "Psi",
    zupanija: "Zagrebačka",
    grad: "Velika Gorica",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80"],
    top: true,
    promoviran: true,
    datum: "Objavljeno danas u 11:00",
    opis: "U ponudi su prekrasni štenci zlatnog retrivera, očišćeni od parazita, cijepljeni, čipirani i s rodovnicom.",
    prodavac: "Petra Horvat",
    autorEmail: "petra@kupko.hr",
    telefon: "0919988776"
  },
  {
    id: 102,
    naslov: "Maine Coon mačići s rodovnicom",
    cijena: "700",
    kategorija: "kucni-ljubimci",
    podkategorija: "Mačke",
    zupanija: "Grad Zagreb",
    grad: "Zagreb",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Vrhunski Maine Coon mačići spremni za novi dom. Naučeni na pijesak, druželjubivi i razigrani.",
    prodavac: "Ivana Kovač",
    autorEmail: "ivana@kupko.hr",
    telefon: "0984433221"
  },
  {
    id: 103,
    naslov: "Akvarij 120L s opremom i ribicama",
    cijena: "150",
    kategorija: "kucni-ljubimci",
    podkategorija: "Akvaristika i ribice",
    zupanija: "Primorsko-goranska",
    grad: "Rijeka",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno prije 2 dana",
    opis: "Prodajem kompletno opremljen akvarij 120 litara s LED rasvjetom, filterom, grijačem i ribicama.",
    prodavac: "Marko Brkić",
    autorEmail: "marko@kupko.hr",
    telefon: "0951122334"
  },
  {
    id: 104,
    naslov: "Patuljasti zečići i kavez",
    cijena: "50",
    kategorija: "kucni-ljubimci",
    podkategorija: "Glodavci",
    zupanija: "Splitsko-dalmatinska",
    grad: "Split",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno danas",
    opis: "Preslatki patuljasti zečići s velikim kavezom, hranom i pojilicom.",
    prodavac: "Maja Delić",
    autorEmail: "maja@kupko.hr",
    telefon: "0917766554"
  },

  // AUTO MOTO
  {
    id: 1,
    naslov: "BMW Serija 3 320d Automatic M-Sport - Full Oprema",
    cijena: "18900",
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
    godiste: "2019",
    kilometri: "145000",
    snagaKw: "140",
    gorivo: "Dizel",
    mjenjac: "Automatski"
  },
  {
    id: 105,
    naslov: "Audi A4 2.0 TDI S-Line",
    cijena: "15500",
    kategorija: "auto-moto",
    podkategorija: "Osobna vozila",
    zupanija: "Istarska",
    grad: "Pula",
    stanje: "Korišteno",
    slike: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Odličan Audi A4, S-line interijer i exterijer, navigacija, Matrix svjetla.",
    prodavac: "Dino Radić",
    autorEmail: "dino@kupko.hr",
    telefon: "0923334455",
    godiste: "2018",
    kilometri: "165000",
    snagaKw: "110",
    gorivo: "Dizel",
    mjenjac: "Ručni"
  },
  {
    id: 106,
    naslov: "Yamaha MT-07 Motocikl",
    cijena: "6200",
    kategorija: "auto-moto",
    podkategorija: "Motocikli i skuteri",
    zupanija: "Splitsko-dalmatinska",
    grad: "Split",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno prije 3 dana",
    opis: "Yamaha MT-07 u savršenom stanju, nove gume, Akrapovič auspuh.",
    prodavac: "Luka Vukušić",
    autorEmail: "luka.v@kupko.hr",
    telefon: "0989988776",
    godiste: "2021",
    kilometri: "12000"
  },
  {
    id: 107,
    naslov: "VW Golf VII 1.6 TDI Bluemotion",
    cijena: "10900",
    kategorija: "auto-moto",
    podkategorija: "Osobna vozila",
    zupanija: "Varaždinska",
    grad: "Varaždin",
    stanje: "Korišteno",
    slike: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c351?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno danas",
    opis: "Mali potrošač, registriran cijelu godinu, servisna knjižica.",
    prodavac: "Stjepan Horvat",
    autorEmail: "stjepan@kupko.hr",
    telefon: "0915544332",
    godiste: "2016",
    kilometri: "189000",
    snagaKw: "81",
    gorivo: "Dizel",
    mjenjac: "Ručni"
  },

  // NEKRETNINE
  {
    id: 2,
    naslov: "Dvosoban luksuzan stan u novogradnji s garažom",
    cijena: "145000",
    kategorija: "nekretnine",
    podkategorija: "Stanovi - Prodaja",
    zupanija: "Splitsko-dalmatinska",
    grad: "Split - Žnjan",
    stanje: "Novo",
    slike: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Prekrasan stan u novogradnji, 55 m2, blizina mora i svih sadržaja.",
    prodavac: "Ana Marić",
    autorEmail: "ana@kupko.hr",
    telefon: "0981112223",
    kvadratura: "55",
    sobe: "2"
  },
  {
    id: 108,
    naslov: "Moderan trosoban stan u centru Zagreba",
    cijena: "230000",
    kategorija: "nekretnine",
    podkategorija: "Stanovi - Prodaja",
    zupanija: "Grad Zagreb",
    grad: "Zagreb - Centar",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"],
    top: false,
    promoviran: true,
    datum: "Objavljeno prije 2 dana",
    opis: "Vrhunski uređen stan u strogom centru, visoki stropovi, etažno plinsko grijanje.",
    prodavac: "Zoran Babić",
    autorEmail: "zoran@kupko.hr",
    telefon: "0912233445",
    kvadratura: "78",
    sobe: "3"
  },
  {
    id: 109,
    naslov: "Kuća s bazenom i pogledom na more - Opatija",
    cijena: "450000",
    kategorija: "nekretnine",
    podkategorija: "Kuće - Prodaja",
    zupanija: "Primorsko-goranska",
    grad: "Opatija",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"],
    top: true,
    promoviran: true,
    datum: "Objavljeno danas",
    opis: "Ekskluzivna kuća s grijanim bazenom, uređenom okućnicom i panoramskim pogledom.",
    prodavac: "Karmen Jurić",
    autorEmail: "karmen@kupko.hr",
    telefon: "0998877665",
    kvadratura: "220",
    sobe: "5"
  },
  {
    id: 110,
    naslov: "Zemljište za gradnju obiteljske kuće - Samobor",
    cijena: "65000",
    kategorija: "nekretnine",
    podkategorija: "Zemljišta",
    zupanija: "Zagrebačka",
    grad: "Samobor",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno prije 4 dana",
    opis: "Ravna građevinska parcela s pristupnim putem i svim priključcima uz rub parcele.",
    prodavac: "Branko Novak",
    autorEmail: "branko@kupko.hr",
    telefon: "0956677889",
    kvadratura: "850"
  },

  // ELEKTRONIKA
  {
    id: 3,
    naslov: "iPhone 15 Pro Max 256GB - Zapakiran s garancijom",
    cijena: "980",
    kategorija: "elektronika",
    podkategorija: "Mobiteli i oprema",
    zupanija: "Grad Zagreb",
    grad: "Zagreb - Centar",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno prije 2 sata",
    opis: "Mobitel je nekorišten, zapakiran u originalnoj kutiji s 2 godine službene garancije.",
    prodavac: "Luka Perić",
    autorEmail: "luka@kupko.hr",
    telefon: "0953334455"
  },
  {
    id: 111,
    naslov: "Samsung Galaxy S24 Ultra 512GB",
    cijena: "890",
    kategorija: "elektronika",
    podkategorija: "Mobiteli i oprema",
    zupanija: "Splitsko-dalmatinska",
    grad: "Split",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Kao nov, bez tragova korištenja, zaštitno staklo i maskica od prvog dana.",
    prodavac: "Josip Milić",
    autorEmail: "josip@kupko.hr",
    telefon: "0912211334"
  },
  {
    id: 112,
    naslov: "Gaming PC i7 RTX 4070 Ti 32GB RAM",
    cijena: "1450",
    kategorija: "elektronika",
    podkategorija: "Računala i komponente",
    zupanija: "Grad Zagreb",
    grad: "Zagreb",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80"],
    top: true,
    promoviran: true,
    datum: "Objavljeno danas",
    opis: "Vrhunsko moćno računalo za igranje najnovijih igara u 4K rezoluciji i rad u zahtjevnim programima.",
    prodavac: "Goran Šimić",
    autorEmail: "goran@kupko.hr",
    telefon: "0983322119"
  },
  {
    id: 113,
    naslov: "Sony PlayStation 5 Slim + 2 Kontrolera",
    cijena: "440",
    kategorija: "elektronika",
    podkategorija: "Konzole i igrice",
    zupanija: "Osječko-baranjska",
    grad: "Osijek",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Konzola je nova, zapakirana s računom i garancijom.",
    prodavac: "Filip Varga",
    autorEmail: "filip@kupko.hr",
    telefon: "0994455667"
  },

  // DOM I VRT
  {
    id: 4,
    naslov: "Kutna garnitura na razvlačenje - Moderna",
    cijena: "450",
    kategorija: "dom-vrt",
    podkategorija: "Namještaj",
    zupanija: "Primorsko-goranska",
    grad: "Rijeka",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno prije 3 dana",
    opis: "Prodajem udobnu kutnu garnituru dimenzija 280x180 cm. Korištena svega par mjeseci.",
    prodavac: "Martina Kovač",
    autorEmail: "martina@kupko.hr",
    telefon: "0997778899"
  },
  {
    id: 114,
    naslov: "Masivni drveni blagovaonski stol i 6 stolica",
    cijena: "380",
    kategorija: "dom-vrt",
    podkategorija: "Namještaj",
    zupanija: "Zagrebačka",
    grad: "Zaprešić",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno danas",
    opis: "Ručni rad, hrastovo drvo. Stol se može razvući.",
    prodavac: "Zvonimir Kralj",
    autorEmail: "zvonimir@kupko.hr",
    telefon: "0918899001",
    kvadratura: ""
  },
  {
    id: 115,
    naslov: "Robot usisavač Roborock S8 Pro Ultra",
    cijena: "680",
    kategorija: "dom-vrt",
    podkategorija: "Kućanski aparati",
    zupanija: "Grad Zagreb",
    grad: "Zagreb",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno prije 1 dan",
    opis: "Najbolji robot usisavač s automatskim pražnjenjem i pranjem krpa.",
    prodavac: "Sanja Pavić",
    autorEmail: "sanja@kupko.hr",
    telefon: "0958877665"
  },

  // SPORT I OPREMA
  {
    id: 5,
    naslov: "Cannondale brdski bicikl MTB 29'",
    cijena: "650",
    kategorija: "sport",
    podkategorija: "Bicikli i oprema",
    zupanija: "Istarska",
    grad: "Pula",
    stanje: "Korišteno",
    slike: ["https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&q=80"],
    top: false,
    promoviran: true,
    datum: "Objavljeno danas",
    opis: "Vrhunski bicikl s aluminijskim okvirom, Shimano oprema, hidraulične disk kočnice.",
    prodavac: "Davor Jurić",
    autorEmail: "davor@kupko.hr",
    telefon: "0915556677"
  },
  {
    id: 116,
    naslov: "Električni romobil Xiaomi Pro 2",
    cijena: "320",
    kategorija: "sport",
    podkategorija: "Bicikli i oprema",
    zupanija: "Grad Zagreb",
    grad: "Zagreb",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Romobil u odličnom stanju, domet do 45 km, očuvan i mažen.",
    prodavac: "Karlo Lončar",
    autorEmail: "karlo@kupko.hr",
    telefon: "0983344556"
  },
  {
    id: 117,
    naslov: "Set bućica i olimpijska šipka s utezima 100kg",
    cijena: "290",
    kategorija: "sport",
    podkategorija: "Fitness i teretana",
    zupanija: "Splitsko-dalmatinska",
    grad: "Split",
    stanje: "Novo",
    slike: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno prije 3 dana",
    opis: "Kompletna oprema za kućnu teretanu, gumirani utezi visoke kvalitete.",
    prodavac: "Bruno Blažević",
    autorEmail: "bruno@kupko.hr",
    telefon: "0916655443"
  },

  // OSTALO
  {
    id: 118,
    naslov: "Akustična gitara Fender s torbom i stalkom",
    cijena: "210",
    kategorija: "ostalo",
    podkategorija: "Glazbeni instrumenti",
    zupanija: "Zadarska",
    grad: "Zadar",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno danas",
    opis: "Odlična gitara za početnike i napredne svirače, top zvuk.",
    prodavac: "Nenad Šarić",
    autorEmail: "nenad@kupko.hr",
    telefon: "0952211443"
  },
  {
    id: 119,
    naslov: "Dječja kolica 3u1 Peg Perego",
    cijena: "350",
    kategorija: "ostalo",
    podkategorija: "Dječja oprema i igračke",
    zupanija: "Grad Zagreb",
    grad: "Zagreb",
    stanje: "Korišteno - Kao novo",
    slike: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80"],
    top: false,
    promoviran: false,
    datum: "Objavljeno jučer",
    opis: "Kvalitetna talijanska kolica 3u1 (košara, autosjedalica, sportski dio) s torbom.",
    prodavac: "Martina Novak",
    autorEmail: "martina.n@kupko.hr",
    telefon: "0914433221"
  }
];

export default function KupkoApp() {
  const [oglasi, setOglasi] = useState<any[]>(POCETNI_OGLASI);
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

  // TikTok / Reels / Swipe mod stanje
  const [prikaziReelsMod, setPrikaziReelsMod] = useState(false);
  const [reelsIndex, setReelsIndex] = useState(0);

  const [prikaz, setPrikaz] = useState("grid"); // "grid" | "list" | "karta"
  const [odabraniOglas, setOdabraniOglas] = useState<any>(null);
  
  const [prikaziFormu, setPrikaziFormu] = useState(false);
  const [prikaziPrijavu, setPrikaziPrijavu] = useState(false);
  const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);
  const [prikaziMeniKorisnika, setPrikaziMeniKorisnika] = useState(false);

  // Stanje za zaboravljenu lozinku
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
  const [tekstNovePoruke, setTekstNovePoruke] = useState("");
  const [prikaziFormuZaSlanjePoruke, setPrikaziFormuZaSlanjePoruke] = useState(false);

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

  const [korisnik, setKorisnik] = useState<{ ime: string; email: string; isOwner: boolean } | null>(null);
  
  const [formaPrijava, setFormaPrijava] = useState({ korisnickoIme: "", lozinka: "" });
  const [formaRegistracija, setFormaRegistracija] = useState({ 
    ime: "", email: "", lozinka: "", prihvacenaPrivatnost: false, prihvaceniUvjeti: false 
  });
  
  const [sigurnosniKod, setSigurnosniKod] = useState({ a: 3, b: 4, unos: "" });

  useEffect(() => {
    const lokalniOglasi = localStorage.getItem("kupko_oglasi_v27");
    if (lokalniOglasi) { try { setOglasi(JSON.parse(lokalniOglasi)); } catch (e) { console.error(e); } }
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
    generirajKôd();
  }, []);

  const generirajKôd = () => {
    const num1 = Math.floor(Math.random() * 8) + 1;
    const num2 = Math.floor(Math.random() * 8) + 1;
    setSigurnosniKod({ a: num1, b: num2, unos: "" });
  };

  const spremiOglase = (noviNiz: any) => {
    setOglasi(noviNiz);
    localStorage.setItem("kupko_oglasi_v27", JSON.stringify(noviNiz));
  };

  const spremiPoruke = (noviNizPoruka: any) => {
    setPoruke(noviNizPoruka);
    localStorage.setItem("kupko_poruke_v2", JSON.stringify(noviNizPoruka));
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

  const posaljiPorukuProdavacu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!korisnik) {
      alert("Morate biti prijavljeni da biste poslali poruku.");
      setPrikaziPrijavu(true);
      return;
    }
    if (!tekstNovePoruke.trim() || !odabraniOglas) return;

    const novaPoruka = {
      id: Date.now(),
      oglasId: odabraniOglas.id,
      oglasNaslov: odabraniOglas.naslov,
      primateljEmail: odabraniOglas.autorEmail || odabraniOglas.email || "prodavac@kupko.hr",
      primateljIme: odabraniOglas.prodavac || "Prodavač",
      posiljateljIme: korisnik.ime,
      posiljateljEmail: korisnik.email,
      tekst: tekstNovePoruke.trim(),
      datum: new Date().toLocaleString()
    };

    const azuriranePoruke = [novaPoruka, ...poruke];
    spremiPoruke(azuriranePoruke);
    setTekstNovePoruke("");
    setPrikaziFormuZaSlanjePoruke(false);
    alert("Poruka je uspješno poslana prodavaču!");
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
      ime: privremenoIme, email: privremeniEmail, lozinka: privremenaLozinka
    };

    const azuriraniBazaKorisnika = [...registriraniKorisnici, noviRegKorisnik];
    setRegistriraniKorisnici(azuriraniBazaKorisnika);
    localStorage.setItem("kupko_baza_korisnika", JSON.stringify(azuriraniBazaKorisnika));

    const aktivni = { ime: privremenoIme, email: privremeniEmail, isOwner: false };
    postaviKorisnika(aktivni);

    setKorakVerifikacije(false);
    setUneseniKod("");
    setFormaRegistracija({ ime: "", email: "", lozinka: "", prihvacenaPrivatnost: false, prihvaceniUvjeti: false });
    
    alert(`📧 [Simulacija E-maila za Dobrodošlicu na ${privremeniEmail}]:\n\n"Dobrodošli na Kupko, ${privremenoIme}!\nVaš račun je uspješno kreiran i potvrđen."`);
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

  const obrisiOglas = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni!"); return; }
    const jeAutor = (glas.autorEmail && glas.autorEmail.toLowerCase() === korisnik.email.toLowerCase()) || 
                    (glas.prodavac && glas.prodavac.toLowerCase() === korisnik.ime.toLowerCase());
    if (!jeAutor && !korisnik.isOwner) { alert("Nemate ovlasti brisati tuđi oglas!"); return; }
    if (confirm("Jeste li sigurni da želite obrisati oglas?")) {
      const noviOglasi = oglasi.filter((o) => o.id !== glas.id);
      spremiOglase(noviOglasi);
      setOdabraniOglas(null);
      alert("Oglas uspješno obrisan.");
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

  const pokreniPromociju = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni!"); return; }
    const jeAutor = (glas.autorEmail && glas.autorEmail.toLowerCase() === korisnik.email.toLowerCase()) || 
                    (glas.prodavac && glas.prodavac.toLowerCase() === korisnik.ime.toLowerCase());
    if (!jeAutor && !korisnik.isOwner) { alert("Nemate ovlasti!"); return; }
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
    
    const ciljaniMail = korisnik ? korisnik.email : "korisnik@kupko.hr";
    alert(`📧 [Simulacija E-mail Potvrde o Uplati na ${ciljaniMail}]:\n\n"Uspješno ste izvršili uplatu od 5.00 € za promidžbu Vašeg oglasa '${oglasZaPromociju.naslov}'. Oglas je sada istaknut na vrhu pretrage."`);
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
      return `Izuzetna prilika! Ova cijena je ${Math.round(prosjek - trenutna)} € niža od prosjeka kategorije (${prosjek} €).`;
    } else if (trenutna > prosjek * 1.15) {
      return `Cijena je nešto viša od prosjeka ove kategorije (${prosjek} €). Preporučuje se pregovaranje s prodavačem.`;
    } else {
      return `Fer cijena! Usklađena je s prosjekom tržišta za ovu kategoriju (~${prosjek} €).`;
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
    
    const cijenaNum = parseFloat(o.cijena || "0");
    const minNum = minCijena !== "" ? parseFloat(minCijena) : 0;
    const maxNum = maxCijena !== "" ? parseFloat(maxCijena) : Infinity;
    const odgovaraCijeni = cijenaNum >= minNum && cijenaNum <= maxNum;

    const odgovaraStanju = odabranoStanje === "sve" || (o.stanje && o.stanje.toLowerCase().includes(odabranoStanje.toLowerCase()));

    return odgovaraTrazilici && odgovaraKategoriji && odgovaraPodkategoriji && odgovaraZupaniji && odgovaraOmiljenima && odgovaraCijeni && odgovaraStanju;
  });

  const promoOglasi = oglasi.filter((o) => o.promoviran);

  const preporucenoLjubimci = oglasi.filter(o => o.kategorija === "kucni-ljubimci").slice(0, 3);
  const preporucenoAutoMoto = oglasi.filter(o => o.kategorija === "auto-moto").slice(0, 3);
  const preporucenoNekretnine = oglasi.filter(o => o.kategorija === "nekretnine").slice(0, 3);

  const mojePoruke = korisnik ? poruke.filter(p => p.primateljEmail.toLowerCase() === korisnik.email.toLowerCase() || p.posiljateljEmail.toLowerCase() === korisnik.email.toLowerCase()) : [];

  const mozeUreditiIliBrisati = (o: any) => {
    if (!korisnik) return false;
    if (korisnik.isOwner) return true;
    const jeAutorEmail = o.autorEmail && o.autorEmail.toLowerCase() === korisnik.email.toLowerCase();
    const jeAutorIme = o.prodavac && o.prodavac.toLowerCase() === korisnik.ime.toLowerCase();
    return jeAutorEmail || jeAutorIme;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-100/60 text-slate-900 font-sans flex flex-col justify-between relative overflow-x-hidden">
      
      <div className="relative z-10">
        {/* TOP KORISNIČKA TRAKA */}
        <div className="bg-blue-950 text-blue-200 text-sm py-2 px-4 shadow-sm relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="flex items-center gap-1.5 font-bold tracking-wide">
              <Shield className="w-4 h-4 text-emerald-400" />
              🇭🇷 Kupko.hr - Sigurni Hrvatski Oglasnik
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
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-900 z-50 overflow-hidden py-2 text-sm">
                      <div className="px-4 py-2.5 border-b bg-slate-50">
                        <span className="text-xs text-slate-500 uppercase font-black">Prijavljeni korisnik</span>
                        <p className="font-black text-slate-900 text-base">{korisnik.ime}</p>
                        <p className="text-xs text-blue-700 font-semibold">{korisnik.email}</p>
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
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziSanducicPoruka(true); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center justify-between">
                          <span className="flex items-center gap-2.5">
                            <MessageSquare className="w-4 h-4 text-indigo-600" /> Poruke
                          </span>
                          <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-black">{mojePoruke.length}</span>
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("Financije: Stanje Vašeg Kupko novčanika je 0.00 €."); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <Wallet className="w-4 h-4 text-amber-600" /> Financije
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); setPrikaziUnosPodatakaModal(true); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <Settings className="w-4 h-4 text-slate-700" /> Postavke (Moji podaci)
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("Nemate novih obavijesti sustava."); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <Bell className="w-4 h-4 text-rose-600" /> Obavijesti
                        </button>
                        <button onClick={() => { setPrikaziMeniKorisnika(false); alert("Česta pitanja: Kako predati oglas? Kako kupiti putem PayProtecta? Slobodno nas kontaktirajte."); }} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-100 flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 text-blue-600" /> Česta pitanja
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

        {/* HEADER */}
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
                  placeholder="Pretraži ponudu (npr. Zlatni retriver, BMW, Stan...)"
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
              {/* SWIPE / REELS MOD GUMB */}
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
                onClick={() => setPrikaziFormu(true)}
                className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition text-sm uppercase tracking-wider"
              >
                <PlusCircle className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden sm:inline">Predaj oglas</span>
              </button>
            </div>
          </div>
        </header>

        {/* 1. SEKTOR: PLAĆENI PROMO OGLASI */}
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

        {/* MAIN KATEGORIJE SELEKTOR I NAPREDNI FILTERI */}
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          
          {/* 👑 ADMIN UPRAVLJAČKA PLOČA (PRIKAZUJE SE SAMO ADMINU) */}
          {korisnik?.isOwner && (
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-2 border-amber-400 rounded-3xl p-6 text-white shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 bg-amber-400 text-blue-950 rounded-2xl shadow-lg">
                    <Crown className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-wide text-white">👑 Admin Upravljačka Ploča</h3>
                    <p className="text-sm font-medium text-blue-200">Pregled statistike u stvarnom vremenu (vidljivo samo tebi)</p>
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
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400">{registriraniKorisnici.length}</span>
                </div>
              </div>
            </div>
          )}

          {/* AKO JE UKLJUČEN TIKTOK / REELS MOD */}
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
                <p className="text-center py-20 text-slate-500 font-bold">Nema oglasa za prikaz.</p>
              ) : (
                <div className="relative bg-slate-950 rounded-3xl overflow-hidden border shadow-2xl flex flex-col">
                  {(() => {
                    const currentOglas = oglasi[reelsIndex % oglasi.length];
                    const slika = currentOglas.slike && currentOglas.slike.length > 0 ? currentOglas.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80";
                    return (
                      <div>
                        <div className="relative h-96 w-full bg-black">
                          <img src={slika} alt={currentOglas.naslov} className="w-full h-full object-cover" />
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

              {/* 3. SEKCIJA: PREPORUČENO PO KATEGORIJAMA */}
              {!prikaziSamoOmiljene && odabranaKategorija === "sve" && pojamPretrage === "" && prikaz !== "karta" && (
                <div className="space-y-6">
                  {preporucenoLjubimci.length > 0 && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                          <span>🐾</span> Kućni ljubimci
                        </h3>
                        <button onClick={() => setOdabranaKategorija("kucni-ljubimci")} className="text-sm font-bold text-blue-700 hover:underline">Pogledaj sve →</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {preporucenoLjubimci.map(o => (
                          <div key={o.id} onClick={() => setOdabraniOglas(o)} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex gap-4 cursor-pointer hover:shadow-md transition">
                            <img src={o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} alt={o.naslov} className="w-24 h-24 object-cover rounded-xl" />
                            <div className="flex flex-col justify-between py-1">
                              <h4 className="font-bold text-sm line-clamp-2 text-slate-900">{o.naslov}</h4>
                              <span className="font-black text-blue-700 text-base">{o.cijena} €</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {preporucenoAutoMoto.length > 0 && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                          <span>🚗</span> Preporučeno u kategoriji Auto Moto
                        </h3>
                        <button onClick={() => setOdabranaKategorija("auto-moto")} className="text-sm font-bold text-blue-700 hover:underline">Pogledaj sve →</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {preporucenoAutoMoto.map(o => (
                          <div key={o.id} onClick={() => setOdabraniOglas(o)} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex gap-4 cursor-pointer hover:shadow-md transition">
                            <img src={o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} alt={o.naslov} className="w-24 h-24 object-cover rounded-xl" />
                            <div className="flex flex-col justify-between py-1">
                              <h4 className="font-bold text-sm line-clamp-2 text-slate-900">{o.naslov}</h4>
                              <span className="font-black text-blue-700 text-base">{o.cijena} €</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {preporucenoNekretnine.length > 0 && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                          <span>🏠</span> Preporučeno u kategoriji Nekretnine
                        </h3>
                        <button onClick={() => setOdabranaKategorija("nekretnine")} className="text-sm font-bold text-blue-700 hover:underline">Pogledaj sve →</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {preporucenoNekretnine.map(o => (
                          <div key={o.id} onClick={() => setOdabraniOglas(o)} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex gap-4 cursor-pointer hover:shadow-md transition">
                            <img src={o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} alt={o.naslov} className="w-24 h-24 object-cover rounded-xl" />
                            <div className="flex flex-col justify-between py-1">
                              <h4 className="font-bold text-sm line-clamp-2 text-slate-900">{o.naslov}</h4>
                              <span className="font-black text-blue-700 text-base">{o.cijena} €</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* LISTA / KARTA OGLASA */}
              <section>
                <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-3xl shadow-lg border border-slate-200">
                  <h3 className="text-xl font-black text-slate-900">
                    {prikaziSamoOmiljene ? "Vaši omiljeni oglasi" : (prikaz === "karta" ? "Interaktivna Karta - Oglasi po županijama" : "Aktivni Oglasi")} ({filtriraniOglasi.length})
                  </h3>
                  <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl border">
                    <button onClick={() => setPrikaz("grid")} className={`p-2.5 rounded-xl ${prikaz === "grid" ? "bg-white text-blue-700 shadow-md" : "text-slate-500"}`} title="Grid prikaz"><Grid className="w-5 h-5" /></button>
                    <button onClick={() => setPrikaz("list")} className={`p-2.5 rounded-xl ${prikaz === "list" ? "bg-white text-blue-700 shadow-md" : "text-slate-500"}`} title="Lista prikaz"><List className="w-5 h-5" /></button>

<Map className="w-5 h-5" />
<button onClick={() => setPrikaz("karta")} className={`p-2.5 rounded-xl ${prikaz === "karta" ? "bg-white text-blue-700 shadow-md" : "text-slate-500"}`} title="Interaktivna karta"></button>
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

                    <div className="pt-4 border-t">
                      <h4 className="font-black text-base mb-4 text-slate-900">
                        Oglasi za odabranu lokaciju: <span className="text-blue-700">{odabranaZupanija === "sve" ? "Cijela Hrvatska" : odabranaZupanija}</span> ({filtriraniOglasi.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filtriraniOglasi.map((o) => {
                          const glavnaSlika = o.slike && o.slike.length > 0 ? o.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80";
                          return (
                            <div 
                              key={o.id}
                              onClick={() => setOdabraniOglas(o)}
                              className="bg-slate-50 rounded-3xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition flex flex-col justify-between group cursor-pointer"
                            >
                              <div className="relative h-48">
                                <img src={glavnaSlika} alt={o.naslov} className="w-full h-full object-cover group-hover:scale-105 transition" />
                              </div>
                              <div className="p-4 space-y-2">
                                <span className="text-xs text-blue-600 font-bold block">📍 {o.zupanija}</span>
                                <h4 className="font-extrabold text-slate-900 text-base line-clamp-2">{o.naslov}</h4>
                                <span className="text-xl font-black text-blue-700 block">{o.cijena} €</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
                                  onClick={(e) => obnoviOglas(e, o.id)}
                                  title="Obnovi oglas"
                                  className="p-2.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 rounded-2xl transition shadow-sm"
                                >
                                  <RotateCw className="w-5 h-5" />
                                </button>
                              </div>
                            </div>

                            {mozeUreditiIliBrisati(o) && (
                              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                                {!o.promoviran && (
                                  <button
                                    onClick={(e) => pokreniPromociju(e, o)}
                                    className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-black py-2.5 px-4 rounded-2xl text-xs transition flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
                                  >
                                    <Sparkles className="w-4 h-4" /> Plati Promo Oglas (5 €)
                                  </button>
                                )}
                                <div className="flex gap-2">
                                  <button
                                    onClick={(e) => pokreniUredivanje(e, o)}
                                    className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold py-2 px-4 rounded-2xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                                  >
                                    <Edit3 className="w-4 h-4" /> Uredi
                                  </button>
                                  <button
                                    onClick={(e) => obrisiOglas(e, o)}
                                    className="flex-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold py-2 px-4 rounded-2xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                                  >
                                    <Trash2 className="w-4 h-4" /> Izbriši
                                  </button>
                                </div>
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

      {/* FOOTER */}
      <footer className="bg-blue-950 text-slate-200 mt-20 border-t-4 border-amber-400 pt-12 pb-10 text-sm relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="font-black text-3xl tracking-tight text-white">KUP</span>
              <span className="font-black text-3xl tracking-tight text-amber-400">KO</span>
              <span className="text-amber-400 text-xs font-bold bg-amber-400/20 px-2 py-0.5 rounded ml-1 border border-amber-400/30">HR</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs mb-4">
              Kupko.hr je vodeći hrvatski besplatni oglasnik za brzu i sigurnu kupoprodaju.
            </p>
            <p className="text-amber-400 font-extrabold text-xs">© 2026 Kupko.hr - Sva prava pridržana.</p>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-sm mb-3 tracking-wider text-amber-400">Pomoć i Korisnici</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><button onClick={() => alert("Kontakt: podrskakupko@gmail.com")} className="hover:text-amber-400 transition">Kontakt i pomoć</button></li>
              <li><button onClick={() => alert("O nama: Kupko je prvi pravi hrvatski oglasnik.")} className="hover:text-amber-400 transition">O nama</button></li>
              <li><button onClick={() => setPrikaziFormu(true)} className="hover:text-amber-400 transition text-amber-300 font-bold">Predaj oglas</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-sm mb-3 tracking-wider text-amber-400">Pravne Informacije</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><button onClick={() => alert("Uvjeti korištenja su usklađeni sa zakonima RH.")} className="hover:text-amber-400 transition">Uvjeti korištenja</button></li>
              <li><button onClick={() => alert("Politika privatnosti štiti vaše podatke prema GDPR-u.")} className="hover:text-amber-400 transition">Politika privatnosti</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white uppercase text-sm mb-3 tracking-wider text-amber-400">Sigurnost</h4>
            <p className="text-slate-300 text-xs">Potpuno sigurna kupoprodaja i provjereni korisnici.</p>
          </div>
        </div>
      </footer>

      {/* MODAL: SANDUČIĆ PORUKA */}
      {prikaziSanducicPoruka && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setPrikaziSanducicPoruka(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-2.5 mb-4 text-indigo-700">
              <MessageSquare className="w-7 h-7" />
              <h2 className="text-2xl font-black text-slate-900">Vaš sandučić poruka</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6 font-medium">Pregledajte upite vezane uz vaše oglase ili poslane poruke prodavačima.</p>

            {mojePoruke.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-base font-bold text-slate-700">Nemate nijednu poruku u sandučiću.</p>
                <p className="text-sm text-slate-400 mt-1">Pošaljite upit s nekog oglasa da započnete razgovor.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mojePoruke.map((p) => (
                  <div key={p.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
                    <div className="flex justify-between items-start text-xs">
                      <div>
                        <span className="font-black text-indigo-900 text-sm block">{p.oglasNaslov}</span>
                        <span className="text-slate-500 font-semibold">Pošiljatelj: <strong>{p.posiljateljIme}</strong> ({p.posiljateljEmail})</span>
                      </div>
                      <span className="text-xs text-slate-400">{p.datum}</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border text-sm text-slate-800 font-medium">
                      <p>{p.tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: MOJI PODACI */}
      {prikaziUnosPodatakaModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziUnosPodatakaModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-2 text-slate-900">Moji osobni podaci</h2>
            <p className="text-sm text-slate-500 mb-6 font-medium">Molimo unesite vaše osobne podatke kako biste mogli predavati oglase i koristiti PayProtect uslugu.</p>

            <form onSubmit={spremiOsobnePodatke} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Ime *</label>
                  <input type="text" required placeholder="Ime" value={korisnickiPodaci.ime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, ime: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Prezime *</label>
                  <input type="text" required placeholder="Prezime" value={korisnickiPodaci.prezime} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, prezime: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Ulica i kućni broj *</label>
                <input type="text" required placeholder="npr. Ilica 10" value={korisnickiPodaci.adresa} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, adresa: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Grad *</label>
                  <input type="text" required placeholder="Grad" value={korisnickiPodaci.grad} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, grad: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Poštanski broj *</label>
                  <input type="text" required placeholder="10000" value={korisnickiPodaci.postanskiBroj} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, postanskiBroj: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Broj telefona / mobitela *</label>
                <input type="text" required placeholder="0912345678" value={korisnickiPodaci.telefon} onChange={(e) => setKorisnickiPodaci({ ...korisnickiPodaci, telefon: e.target.value })} className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold" />
              </div>

              <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider shadow-lg text-sm">
                Spremi podatke i nastavi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ODABIR NAČINA PLAĆANJA PROMO OGLASA */}
      {prikaziPlacanjePromo && oglasZaPromociju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button onClick={() => setPrikaziPlacanjePromo(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-2.5 text-amber-600">
              <Sparkles className="w-7 h-7" />
              <h2 className="text-xl font-black text-slate-900">Plaćanje Promo Oglasa</h2>
            </div>
            <p className="text-sm text-slate-600 font-medium">Istaknite oglas na sam vrh: <strong className="text-slate-900">{oglasZaPromociju.naslov}</strong></p>
            <p className="text-sm font-black text-blue-700 bg-blue-50 p-3.5 rounded-2xl border border-blue-100">Cijena promocije: <strong>5.00 €</strong> (vrijedi 7 dana)</p>

            <form onSubmit={potvrdiUplatuPromo} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-2">Odaberite način plaćanja:</label>
                <div className="space-y-2.5">
                  <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition ${odabraniNacinPlacanja === 'kartica' ? 'border-blue-600 bg-blue-50/60' : 'border-slate-200'}`}>
                    <input type="radio" name="placanje" value="kartica" checked={odabraniNacinPlacanja === 'kartica'} onChange={(e) => setOdabraniNacinPlacanja(e.target.value)} />
                    <CreditCard className="w-6 h-6 text-blue-700" />
                    <div>
                      <span className="block text-sm font-bold text-slate-900">Kreditna / Debitna kartica</span>
                      <span className="text-xs text-slate-500 font-medium">Visa, Mastercard, Maestro</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition ${odabraniNacinPlacanja === 'paypal' ? 'border-blue-600 bg-blue-50/60' : 'border-slate-200'}`}>
                    <input type="radio" name="placanje" value="paypal" checked={odabraniNacinPlacanja === 'paypal'} onChange={(e) => setOdabraniNacinPlacanja(e.target.value)} />
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                    <div>
                      <span className="block text-sm font-bold text-slate-900">PayPal</span>
                      <span className="text-xs text-slate-500 font-medium">Brzo i sigurno online plaćanje</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition ${odabraniNacinPlacanja === 'sms' ? 'border-blue-600 bg-blue-50/60' : 'border-slate-200'}`}>
                    <input type="radio" name="placanje" value="sms" checked={odabraniNacinPlacanja === 'sms'} onChange={(e) => setOdabraniNacinPlacanja(e.target.value)} />
                    <Phone className="w-6 h-6 text-emerald-600" />
                    <div>
                      <span className="block text-sm font-bold text-slate-900">SMS Poruka</span>
                      <span className="text-xs text-slate-500 font-medium">Pošaljite KUPKO na 12345 (5.00 €)</span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-black py-3.5 rounded-2xl uppercase tracking-wider shadow-lg text-sm">
                Plati 5.00 € i Aktiviraj Promo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PREDAJ OGLAS */}
      {prikaziFormu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziFormu(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            
            <h2 className="text-2xl font-black text-slate-900 mb-4">Predaj novi oglas na Kupku</h2>

            <form onSubmit={rukujDodavanjemOglasa} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Naslov oglasa *</label>
                <input 
                  type="text" required placeholder="Npr. Štenci zlatnog retrivera, Auto, Stan..."
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Stanje artikla</label>
                  <select value={noviOglas.stanje} onChange={(e) => setNoviOglas({ ...noviOglas, stanje: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm bg-white font-bold">
                    <option value="Novo">Novo</option>
                    <option value="Korišteno - Kao novo">Korišteno - Kao novo</option>
                    <option value="Korišteno">Korišteno</option>
                    <option value="Neispravno / za dijelove">Neispravno / za dijelove</option>
                  </select>
                </div>
              </div>

              {noviOglas.kategorija === "auto-moto" && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <p className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Car className="w-4 h-4" /> Detaljne specifikacije vozila (Godište, Kilometri, Snaga, Gorivo, Mjenjač)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Godište</label>
                      <input type="text" placeholder="npr. 2019" value={noviOglas.godiste} onChange={(e) => setNoviOglas({ ...noviOglas, godiste: e.target.value })} className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Kilometraža (km)</label>
                      <input type="number" placeholder="npr. 145000" value={noviOglas.kilometri} onChange={(e) => setNoviOglas({ ...noviOglas, kilometri: e.target.value })} className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Snaga (kW)</label>
                      <input type="number" placeholder="npr. 140" value={noviOglas.snagaKw} onChange={(e) => setNoviOglas({ ...noviOglas, snagaKw: e.target.value })} className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-semibold bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Gorivo</label>
                      <select value={noviOglas.gorivo} onChange={(e) => setNoviOglas({ ...noviOglas, gorivo: e.target.value })} className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-bold bg-white">
                        <option value="Dizel">Dizel</option>
                        <option value="Benzin">Benzin</option>
                        <option value="Hibrid">Hibrid</option>
                        <option value="Električni">Električni</option>
                        <option value="Plin">Plin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mjenjač</label>
                      <select value={noviOglas.mjenjac} onChange={(e) => setNoviOglas({ ...noviOglas, mjenjac: e.target.value })} className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-bold bg-white">
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
                  <input type="text" placeholder="Npr. Zagreb - Maksimir" value={noviOglas.grad} onChange={(e) => setNoviOglas({ ...noviOglas, grad: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Broj Mobitela *</label>
                  <input type="text" placeholder="091..." required value={noviOglas.telefon} onChange={(e) => setNoviOglas({ ...noviOglas, telefon: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" />
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-3xl border">
                <label className="block text-xs font-black text-slate-700 uppercase mb-2">Galerija slika</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-white cursor-pointer relative mb-3 hover:bg-slate-50 transition">
                  <input type="file" accept="image/*" multiple onChange={(e) => rukujVisestrukimUcitavanjemSlika(e, false)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  <Upload className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-sm font-black text-slate-800">Odaberite slike s uređaja</p>
                </div>

                {noviOglas.slike.length > 0 && (
                  <div className="grid grid-cols-4 gap-2.5">
                    {noviOglas.slike.map((s, idx) => (
                      <div key={idx} className="relative rounded-xl overflow-hidden border h-20 shadow-sm">
                        <img src={s} alt="Upload" className="w-full h-full object-cover" />
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
                Objavi Oglas
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VERIFIKACIJA KODA */}
      {korakVerifikacije && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
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

      {/* MODAL: ZABORAVLJENA LOZINKA */}
      {prikaziZaboravljenuLozinku && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button onClick={() => { setPrikaziZaboravljenuLozinku(false); setKorakResetiranja(1); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-2 text-blue-700">
              <KeyRound className="w-6 h-6" />
              <h2 className="text-xl font-black text-slate-900">Oporavak lozinke</h2>
            </div>

            {korakResetiranja === 1 ? (
              <form onSubmit={pokreniZaboravljenuLozinku} className="space-y-4">
                <p className="text-xs text-slate-600 font-medium">Unesite e-mail adresu s kojom ste se registrirali. Poslat ćemo vam kod za provjeru.</p>
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">E-mail adresa *</label>
                  <input 
                    type="email" required placeholder="vas.email@gmail.com"
                    value={zaboravljeniEmail} onChange={(e) => setZaboravljeniEmail(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
                  />
                </div>
                <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider text-sm shadow-md">
                  Pošalji kod za oporavak
                </button>
              </form>
            ) : (
              <form onSubmit={potvrdiResetLozinke} className="space-y-4">
                <p className="text-xs text-slate-600 font-medium">Unesite 6-znamenkasti kod koji vam je poslan na <strong>{zaboravljeniEmail}</strong> i novu lozinku.</p>
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">Verifikacijski kod *</label>
                  <input 
                    type="text" required maxLength={6} placeholder="123456"
                    value={uneseniKodReset} onChange={(e) => setUneseniKodReset(e.target.value)}
                    className="w-full p-3 rounded-2xl border border-slate-300 text-center tracking-widest font-black text-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">Nova lozinka *</label>
                  <input 
                    type="password" required placeholder="Nova lozinka"
                    value={novaLozinka} onChange={(e) => setNovaLozinka(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-2xl uppercase tracking-wider text-sm shadow-md">
                  Spremi novu lozinku
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: UREDI OGLAS */}
      {prikaziUredivanje && oglasZaUrediti && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziUredivanje(false)} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Uredi oglas i specifikacije</h2>

            <form onSubmit={rukujSpremanjemUredivanja} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Naslov oglasa *</label>
                <input 
                  type="text" required 
                  value={oglasZaUrediti.naslov} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, naslov: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Cijena (€) *</label>
                  <input 
                    type="text" required 
                    value={oglasZaUrediti.cijena} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, cijena: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Glavna Kategorija</label>
                  <select 
                    value={oglasZaUrediti.kategorija} 
                    onChange={(e) => {
                      const novaKat = e.target.value;
                      const prvaPod = SVE_KATEGORIJE.find((k) => k.id === novaKat)?.podkategorije[0] || "";
                      setOglasZaUrediti({ ...oglasZaUrediti, kategorija: novaKat, podkategorija: prvaPod });
                    }}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm bg-white font-bold"
                  >
                    {SVE_KATEGORIJE.map((k) => (
                      <option key={k.id} value={k.id}>{k.ikona} {k.naziv}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Županija</label>
                  <select
                    value={oglasZaUrediti.zupanija}
                    onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, zupanija: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm bg-white font-bold"
                  >
                    {ZUPANIJE.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Grad / Mjesto</label>
                  <input type="text" value={oglasZaUrediti.grad || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, grad: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Mobitel</label>
                  <input type="text" value={oglasZaUrediti.telefon || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, telefon: e.target.value })} className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Opis oglasa</label>
                <textarea 
                  rows={4} 
                  value={oglasZaUrediti.opis || ""} onChange={(e) => setOglasZaUrediti({ ...oglasZaUrediti, opis: e.target.value })} 
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold" 
                />
              </div>

              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl uppercase tracking-wider text-sm shadow-lg">
                Spremi Sve Promjene
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETALJI OGLASA */}
      {odabraniOglas && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl space-y-6">
            <button onClick={() => { setOdabraniOglas(null); setPrikaziFormuZaSlanjePoruke(false); }} className="absolute top-4 right-4 bg-slate-100 text-slate-700 p-2.5 rounded-full z-10 hover:bg-slate-200"><X className="w-6 h-6" /></button>
            
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden max-h-80 bg-slate-900 flex items-center justify-center shadow-md">
                <img 
                  src={odabraniOglas.slike && odabraniOglas.slike.length > 0 ? odabraniOglas.slike[0] : "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} 
                  alt={odabraniOglas.naslov} 
                  className="w-full h-80 object-cover" 
                />
              </div>
            </div>
            
            <div className="flex justify-between items-start border-b border-slate-200 pb-5">
              <div>
                <span className="text-xs bg-blue-100 text-blue-900 font-black px-3 py-1 rounded-xl uppercase tracking-wider mb-2 inline-block border border-blue-200">
                  {odabraniOglas.kategorija} • {odabraniOglas.podkategorija}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">{odabraniOglas.naslov}</h2>
                <p className="text-sm text-slate-500 mt-2 flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-blue-600" /> {odabraniOglas.zupanija} {odabraniOglas.grad ? `- ${odabraniOglas.grad}` : ""} • {odabraniOglas.datum}
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-black text-blue-700 block">{odabraniOglas.cijena} €</span>
              </div>
            </div>

            {/* KUPKO AI TRŽIŠNA ANALIZA */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-5 rounded-3xl shadow-lg space-y-2 border border-blue-800">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
                <Bot className="w-5 h-5" /> Kupko AI Procjena Cijene i Tržišta
              </div>
              <p className="text-sm text-blue-100 leading-relaxed font-semibold">
                {izracunajAiProcjenuZaOglas(odabraniOglas)}
              </p>
            </div>

            {/* SPECIFIKACIJE */}
            <div className="space-y-3">
              <h4 className="font-black text-xs uppercase text-slate-400 tracking-wider">Detaljne specifikacije artikla</h4>
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-sm">
                {odabraniOglas.godiste && (
                  <div className="bg-white p-3 rounded-2xl border shadow-xs">
                    <span className="text-slate-400 block text-xs uppercase font-bold">Godište</span>
                    <span className="font-black text-slate-900 text-base">{odabraniOglas.godiste} godište</span>
                  </div>
                )}
                {odabraniOglas.kilometri && (
                  <div className="bg-white p-3 rounded-2xl border shadow-xs">
                    <span className="text-slate-400 block text-xs uppercase font-bold">Kilometraža</span>
                    <span className="font-black text-slate-900 text-base">{odabraniOglas.kilometri} km</span>
                  </div>
                )}
                {odabraniOglas.gorivo && (
                  <div className="bg-white p-3 rounded-2xl border shadow-xs">
                    <span className="text-slate-400 block text-xs uppercase font-bold">Gorivo</span>
                    <span className="font-black text-slate-900 text-base">{odabraniOglas.gorivo}</span>
                  </div>
                )}
                {odabraniOglas.mjenjac && (
                  <div className="bg-white p-3 rounded-2xl border shadow-xs">
                    <span className="text-slate-400 block text-xs uppercase font-bold">Mjenjač</span>
                    <span className="font-black text-slate-900 text-base">{odabraniOglas.mjenjac}</span>
                  </div>
                )}
                {odabraniOglas.snagaKw && (
                  <div className="bg-white p-3 rounded-2xl border shadow-xs">
                    <span className="text-slate-400 block text-xs uppercase font-bold">Snaga motora</span>
                    <span className="font-black text-slate-900 text-base">{odabraniOglas.snagaKw} kW</span>
                  </div>
                )}
                {odabraniOglas.kvadratura && (
                  <div className="bg-white p-3 rounded-2xl border shadow-xs">
                    <span className="text-slate-400 block text-xs uppercase font-bold">Stambena površina</span>
                    <span className="font-black text-slate-900 text-base">{odabraniOglas.kvadratura} m²</span>
                  </div>
                )}
                {odabraniOglas.sobe && (
                  <div className="bg-white p-3 rounded-2xl border shadow-xs">
                    <span className="text-slate-400 block text-xs uppercase font-bold">Broj soba</span>
                    <span className="font-black text-slate-900 text-base">{odabraniOglas.sobe} soban</span>
                  </div>
                )}
                <div className="bg-white p-3 rounded-2xl border shadow-xs">
                  <span className="text-slate-400 block text-xs uppercase font-bold">Stanje</span>
                  <span className="font-black text-slate-900 text-base">{odabraniOglas.stanje || "Novo"}</span>
                </div>
              </div>
            </div>

            {/* OPIS OGLASA */}
            <div className="space-y-2">
              <h4 className="font-black text-xs uppercase text-slate-400 tracking-wider">Opis oglasnika / prodavača</h4>
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 text-base leading-relaxed text-slate-800 font-medium">
                <p className="whitespace-pre-line">{odabraniOglas.opis || "Nema unesenog opisa za ovaj artikl."}</p>
              </div>
            </div>

            {/* KARTICA PRODAVAČA */}
            <div className="bg-blue-50/80 p-5 rounded-3xl border border-blue-200 flex items-center justify-between shadow-sm">
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

            {/* SEKCIJA ZA SLANJE PORUKE PRODAVAČU */}
            <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-3xl space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5 text-indigo-950">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                  <h4 className="font-black text-base uppercase tracking-wide">Pošaljite poruku prodavaču</h4>
                </div>
                <button 
                  onClick={() => setPrikaziFormuZaSlanjePoruke(!prikaziFormuZaSlanjePoruke)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4.5 py-2.5 rounded-2xl text-xs transition shadow"
                >
                  {prikaziFormuZaSlanjePoruke ? "Zatvori obrazac" : "✉️ Napiši poruku"}
                </button>
              </div>

              {prikaziFormuZaSlanjePoruke && (
                <form onSubmit={posaljiPorukuProdavacu} className="space-y-3 pt-3 border-t border-indigo-200">
                  <textarea 
                    rows={3} required
                    placeholder="Poštovani, zainteresiran sam za Vaš oglas. Je li još uvijek dostupno?"
                    value={tekstNovePoruke} onChange={(e) => setTekstNovePoruke(e.target.value)}
                    className="w-full p-3.5 rounded-2xl border border-indigo-300 bg-white text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-blue-950 font-black py-3 rounded-2xl uppercase text-xs tracking-wider shadow-md">
                    Pošalji poruku prodavaču
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PRIJAVA */}
      {prikaziPrijavu && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setPrikaziPrijavu(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Prijava na Kupko</h2>
            <form onSubmit={rukujPrijavom} className="space-y-3.5">
              <input 
                type="text" required placeholder="Korisničko ime (npr. admin)" 
                value={formaPrijava.korisnickoIme} onChange={(e) => setFormaPrijava({ ...formaPrijava, korisnickoIme: e.target.value })}
                className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
              />
              <input 
                type="password" required placeholder="Lozinka" 
                value={formaPrijava.lozinka} onChange={(e) => setFormaPrijava({ ...formaPrijava, lozinka: e.target.value })}
                className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
              />
              <div className="flex justify-between items-center text-xs pt-1">
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

      {/* MODAL: REGISTRACIJA */}
      {prikaziRegistraciju && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border text-slate-900 rounded-3xl max-w-md w-full p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button onClick={() => setPrikaziRegistraciju(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-black mb-4 text-slate-900">Registracija na Kupko</h2>
            
            <form onSubmit={rukujRegistracijom} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Jedinstveno korisničko ime *</label>
                <input 
                  type="text" required placeholder="npr. ivan_zg" 
                  value={formaRegistracija.ime} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, ime: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">E-mail adresa (Obavezno) *</label>
                <input 
                  type="email" required placeholder="vas.email@gmail.com" 
                  value={formaRegistracija.email} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, email: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Lozinka *</label>
                <input 
                  type="password" required placeholder="Lozinka" 
                  value={formaRegistracija.lozinka} onChange={(e) => setFormaRegistracija({ ...formaRegistracija, lozinka: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-semibold"
                />
              </div>

              <div className="space-y-3 pt-3 border-t text-xs font-semibold">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                  <input 
                    type="checkbox" required
                    checked={formaRegistracija.prihvacenaPrivatnost} 
                    onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvacenaPrivatnost: e.target.checked })}
                    className="mt-0.5 rounded text-blue-700 w-4 h-4"
                  />
                  <span>Pročitao sam Politiku privatnosti *</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700">
                  <input 
                    type="checkbox" required
                    checked={formaRegistracija.prihvaceniUvjeti} 
                    onChange={(e) => setFormaRegistracija({ ...formaRegistracija, prihvaceniUvjeti: e.target.checked })}
                    className="mt-0.5 rounded text-blue-700 w-4 h-4"
                  />
                  <span>Potvrđujem da imam više od 16 godina te prihvaćam Uvjete i pravila korištenja *</span>
                </label>
              </div>

              <button type="submit" className="w-full bg-amber-400 text-blue-950 font-black py-3.5 rounded-2xl mt-3 text-sm shadow-md">
                Nastavi na Verifikaciju E-maila
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
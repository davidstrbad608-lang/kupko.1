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

// 70 DETALJNIH DEMO OGLASA (10 PO SVAKOJ OD 7 KATEGORIJA)
const DEMO_OGLASI = [
  // --- KUĆNI LJUBIMCI ---
  {
    id: 9001, naslov: "Zlatni retriver - štenci s rodovnicom", cijena: "650", kategorija: "kucni-ljubimci", podkategorija: "Psi", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Maksimir", stanje: "Novo", opis: "Vrhunski štenci zlatnog retrivera, cijepljeni, čipirani, s rodovnicom HKS-a i spremni za novi dom uz stručnu potporu uzgajivača.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0911234567", promoviran: false, top: false, datum: "Objavljeno danas u 10:00", pregledi: 45, isDemo: true, slike: ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80"]
  },
  {
    id: 9002, naslov: "Britanske kratkodlake mačke - slobodne za rezervaciju", cijena: "500", kategorija: "kucni-ljubimci", podkategorija: "Mačke", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Trstenik", stanje: "Novo", opis: "Prekrasni mali mačići čistokrvnih britanskih plavih mačaka. Očišćeni od parazita, naučeni na pijesak.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0923334455", promoviran: false, top: false, datum: "Objavljeno jučer", pregledi: 32, isDemo: true, slike: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80"]
  },
  {
    id: 9003, naslov: "Akvarij komplet 120L s opremom i ribicama", cijena: "180", kategorija: "kucni-ljubimci", podkategorija: "Akvaristika i ribice", zupanija: "Primorsko-goranska", grad: "Rijeka", adresa: "Trsat", stanje: "Korišteno", opis: "Prodajem kompletno uređen akvarij 120 litara s filtrom, grijačem, LED rasvjetom i šarenim ribicama.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0981112233", promoviran: false, top: false, datum: "Objavljeno prije 2 dana", pregledi: 19, isDemo: true, slike: ["https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=800&q=80"]
  },
  {
    id: 9004, naslov: "Kavez za papige i glodavce (veliki luksuzni)", cijena: "95", kategorija: "kucni-ljubimci", podkategorija: "Oprema za ljubimce", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Gornji Grad", stanje: "Novo", opis: "Prostrani kavez opremljen hranilicama, pojilicama i igračkama. Idealno za papige ili činčile.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0954445566", promoviran: false, top: false, datum: "Objavljeno prije 3 dana", pregledi: 12, isDemo: true, slike: ["https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&q=80"]
  },
  {
    id: 9005, naslov: "Tigrasti patuljasti zečići (spremni za preuzimanje)", cijena: "35", kategorija: "kucni-ljubimci", podkategorija: "Glodavci", zupanija: "Varaždinska", grad: "Varaždin", adresa: "Centar", stanje: "Novo", opis: "Uzgajivač prodaje pitome patuljaste zečiće naviknute na ljudsku ruku i maženje.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0997778899", promoviran: false, top: false, datum: "Objavljeno prije 4 dana", pregledi: 25, isDemo: true, slike: ["https://images.unsplash.com/photo-1535294441819-a1b695bb1c54?w=800&q=80"]
  },
  {
    id: 9006, naslov: "Ručno hranjeni papigici Nimfe", cijena: "60", kategorija: "kucni-ljubimci", podkategorija: "Ptice", zupanija: "Istarska", grad: "Pula", adresa: "Veruda", stanje: "Novo", opis: "Mlade nimfe, pitome, prilagođene za život u stanu s obitelji.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0915556677", promoviran: false, top: false, datum: "Objavljeno prije 5 dana", pregledi: 18, isDemo: true, slike: ["https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&q=80"]
  },
  {
    id: 9007, naslov: "Profesionalna torba i transporter za psa/mačku", cijena: "45", kategorija: "kucni-ljubimci", podkategorija: "Oprema za ljubimce", zupanija: "Zagrebačka", grad: "Velika Gorica", adresa: "Zagrebačka", stanje: "Novo", opis: "Kvalitetna torba za nošenje manjih kućnih ljubimaca u putovanjima i zrakoplovu.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0921113344", promoviran: false, top: false, datum: "Objavljeno prije 6 dana", pregledi: 22, isDemo: true, slike: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80"]
  },
  {
    id: 9008, naslov: "Hocu dom - udomljavanje spašenih mačića", cijena: "0", kategorija: "kucni-ljubimci", podkategorija: "Mačke", zupanija: "Zadarska", grad: "Zadar", adresa: "Relja", stanje: "Novo", opis: "Udruga za zaštita životinja poklanja u dobre ruke spašene i očišćene mačiće.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0982223344", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 88, isDemo: true, slike: ["https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800&q=80"]
  },
  {
    id: 9009, naslov: "Hrana za pse Premium 15kg (Super povoljno)", cijena: "42", kategorija: "kucni-ljubimci", podkategorija: "Oprema za ljubimce", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Tvrđa", stanje: "Novo", opis: "Nepotstupljena vreća super premium hrane za odrasle pse svih pasmina.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0919998877", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 15, isDemo: true, slike: ["https://images.unsplash.com/photo-1589927986062-0ef7777c0dc8?w=800&q=80"]
  },
  {
    id: 9010, naslov: "Terarij za gmazove i kornjače s grijačem", cijena: "110", kategorija: "kucni-ljubimci", podkategorija: "Ostalo - Kućni ljubimci", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Dubrava", stanje: "Korišteno", opis: "Stakleni terarij s UV lampom, grijačem i podlogom za bradate agame ili kornjače.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0953332211", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 29, isDemo: true, slike: ["https://images.unsplash.com/photo-1562232657-3f8d227b4b3b?w=800&q=80"]
  },

  // --- AUTO MOTO ---
  {
    id: 9021, naslov: "Volkswagen Golf VII 2.0 TDI DSG", cijena: "13500", kategorija: "auto-moto", podkategorija: "Osobna vozila", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Vukovarska", stanje: "Korišteno", opis: "Automobil u vrhunskom stanju, redovno servisiran u ovlaštenom servisu, nove gume, bez ulaganja.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0912223344", promoviran: true, top: true, datum: "Objavljeno danas", pregledi: 120, isDemo: true, godiste: "2018", kilometri: "145000", snagaKw: "110", gorivo: "Dizel", mjenjac: "Automatski", slike: ["https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80"]
  },
  {
    id: 9022, naslov: "BMW Serija 3 320d M-Paket", cijena: "18900", kategorija: "auto-moto", podkategorija: "Osobna vozila", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Spinut", stanje: "Korišteno", opis: "Tvornički M paket, panorama, kožna sjedala, navigacija Professional, registriran godinu dana.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0983332211", promoviran: false, top: false, datum: "Objavljeno jučer", pregledi: 95, isDemo: true, godiste: "2019", kilometri: "130000", snagaKw: "140", gorivo: "Dizel", mjenjac: "Automatski", slike: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"]
  },
  {
    id: 9023, naslov: "Yamaha MT-07 Motocikl 689ccm", cijena: "5800", kategorija: "auto-moto", podkategorija: "Motocikli i skuteri", zupanija: "Primorsko-goranska", grad: "Rijeka", adresa: "Riva", stanje: "Korišteno", opis: "Odličan naked motor, garažiran, nikad padano, stavljen Akrapovič auspuh.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0998887766", promoviran: false, top: false, datum: "Objavljeno prije 2 dana", pregledi: 64, isDemo: true, godiste: "2020", kilometri: "18000", snagaKw: "55", gorivo: "Benzin", mjenjac: "Ručni", slike: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80"]
  },
  {
    id: 9024, naslov: "Audi A4 Avant 2.0 TDI", cijena: "15200", kategorija: "auto-moto", podkategorija: "Osobna vozila", zupanija: "Varaždinska", grad: "Varaždin", adresa: "Kroata", stanje: "Korišteno", opis: "Matrix led svjetla, virtual cockpit, automatska dvozonska klima, odličan obiteljski karavan.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0914445566", promoviran: false, top: false, datum: "Objavljeno prije 3 dana", pregledi: 51, isDemo: true, godiste: "2018", kilometri: "160000", snagaKw: "110", gorivo: "Dizel", mjenjac: "Automatski", slike: ["https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80"]
  },
  {
    id: 9025, naslov: "Aluminijske felge 17 cola s ljetnim gumama", cijena: "350", kategorija: "auto-moto", podkategorija: "Auto dijelovi i oprema", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Jug 2", stanje: "Korišteno", opis: "Felge u dobrom stanju, razmak rupa 5x112, vozene dvije sezone.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0951234567", promoviran: false, top: false, datum: "Objavljeno prije 4 dana", pregledi: 30, isDemo: true, slike: ["https://images.unsplash.com/photo-1582592392723-57b1f6087799?w=800&q=80"]
  },
  {
    id: 9026, naslov: "Gumenjak 5 metara s vanbrodskim motorom 60KS", cijena: "8900", kategorija: "auto-moto", podkategorija: "Nautika i plovila", zupanija: "Zadarska", grad: "Zadar", adresa: "Borik", stanje: "Korišteno", opis: "Spreman za sezonu, trajno registrovan, tenda, inox ljestve, muzika.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0929991122", promoviran: false, top: false, datum: "Objavljeno prije 5 dana", pregledi: 77, isDemo: true, slike: ["https://images.unsplash.com/photo-1569263979104-865ab9cd8d57?w=800&q=80"]
  },
  {
    id: 9027, naslov: "Renault Clio 1.0 TCe (Kao nov)", cijena: "11200", kategorija: "auto-moto", podkategorija: "Osobna vozila", zupanija: "Istarska", grad: "Pula", adresa: "Šijana", stanje: "Novo", opis: "Kupljen u HR, prva vlasnica, garancija, Apple CarPlay, parking senzori i kamera.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0917773322", promoviran: false, top: false, datum: "Objavljeno prije 6 dana", pregledi: 42, isDemo: true, godiste: "2021", kilometri: "45000", snagaKw: "67", gorivo: "Benzin", mjenjac: "Ručni", slike: ["https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80"]
  },
  {
    id: 9028, naslov: "Mercedes-Benz C-Class 220d AMG Line", cijena: "22500", kategorija: "auto-moto", podkategorija: "Osobna vozila", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Tresnjevka", stanje: "Korišteno", opis: "Vrhunski paket opreme, ambijentalna rasvjeta, Burmester ozvučenje, panorama krov.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0984443322", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 110, isDemo: true, godiste: "2020", kilometri: "115000", snagaKw: "143", gorivo: "Dizel", mjenjac: "Automatski", slike: ["https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80"]
  },
  {
    id: 9029, naslov: "Skuter Piaggio Vespa Primavera 125ccm", cijena: "3400", kategorija: "auto-moto", podkategorija: "Motocikli i skuteri", zupanija: "Dubrovačko-neretvanska", grad: "Dubrovnik", adresa: "Lapad", stanje: "Korišteno", opis: "Legendarna vespa u savršenom stanju, malo vožena, idealna za gradske gužve.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0918889900", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 56, isDemo: true, godiste: "2021", kilometri: "9500", snagaKw: "8", gorivo: "Benzin", mjenjac: "Automatski", slike: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80"]
  },
  {
    id: 9030, naslov: "Krovni nosači i krovna kutija Thule 450L", cijena: "320", kategorija: "auto-moto", podkategorija: "Auto dijelovi i oprema", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Novi Zagreb", stanje: "Korišteno", opis: "Thule krovni box crni sjajni s univerzalnim nosačima za rubove krova.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0956665544", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 39, isDemo: true, slike: ["https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80"]
  },

  // --- NEKRETNINE ---
  {
    id: 9041, naslov: "Lijepi dvosobni stan u centru Zagreba 55m2", cijena: "165000", kategorija: "nekretnine", podkategorija: "Stanovi - Prodaja", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Zvonimirova", stanje: "Novo", opis: "Potpuno adaptiran i namješten stan na odličnoj lokaciji u blizini svih sadržaja i tramvaja.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0915554433", promoviran: true, top: true, datum: "Objavljeno danas", pregledi: 150, isDemo: true, kvadratura: "55", sobe: "2", slike: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"]
  },
  {
    id: 9042, naslov: "Moderan trosobni stan s pogledom na more", cijena: "240000", kategorija: "nekretnine", podkategorija: "Stanovi - Prodaja", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Žnjan", stanje: "Novo", opis: "Novogradnja blizu plaže, podno grijanje, klima u svakoj sobi, osigurano parking mjesto u garaži.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0987776655", promoviran: false, top: false, datum: "Objavljeno jučer", pregledi: 130, isDemo: true, kvadratura: "78", sobe: "3", slike: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"]
  },
  {
    id: 9043, naslov: "Kuća s okućnicom i bazenom u Istri", cijena: "380000", kategorija: "nekretnine", podkategorija: "Kuće - Prodaja", zupanija: "Istarska", grad: "Rovinj", adresa: "Kamen", stanje: "Novo", opis: "Kamena vila s bazenom, sunčalištem i uređenom okućnicom od 800m2. Uhodani turistički najam.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0913332211", promoviran: false, top: false, datum: "Objavljeno prije 2 dana", pregledi: 98, isDemo: true, kvadratura: "160", sobe: "4", slike: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"]
  },
  {
    id: 9044, naslov: "Dvosoban stan za najam u Rijeci (Trešnjevac)", cijena: "650", kategorija: "nekretnine", podkategorija: "Stanovi - Najam", zupanija: "Primorsko-goranska", grad: "Rijeka", adresa: "Brajda", stanje: "Korišteno", opis: "Iznajmljuje se uredan stan na duži period zaposlenim osobama ili studentima.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0925556677", promoviran: false, top: false, datum: "Objavljeno prije 3 dana", pregledi: 74, isDemo: true, kvadratura: "48", sobe: "2", slike: ["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80"]
  },
  {
    id: 9045, naslov: "Građevinsko zemljište blizu Varaždina 800m2", cijena: "45000", kategorija: "nekretnine", podkategorija: "Zemljišta", zupanija: "Varaždinska", grad: "Varaždin", adresa: "Gornji Kućan", stanje: "Novo", opis: "Ravna parcela pravilnog oblika uz asfaltiranu cestu, sva infrastruktura uz teren.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0958887766", promoviran: false, top: false, datum: "Objavljeno prije 4 dana", pregledi: 41, isDemo: true, kvadratura: "800", slike: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"]
  },
  {
    id: 9046, naslov: "Poslovni prostor u centru Osijeka 110m2", cijena: "1200", kategorija: "nekretnine", podkategorija: "Poslovni prostori", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Europska avenija", stanje: "Korišteno", opis: "Pogodno za ured, agenciju, ordinaciju ili tihu djelatnost. Veliki izlog prema ulici.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0911112233", promoviran: false, top: false, datum: "Objavljeno prije 5 dana", pregledi: 35, isDemo: true, kvadratura: "110", sobe: "4", slike: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"]
  },
  {
    id: 9047, naslov: "Vikendica s vinogradom u Zagorju", cijena: "55000", kategorija: "nekretnine", podkategorija: "Nekretnine za odmor", zupanija: "Krapinsko-zagorska", grad: "Zlatar", adresa: "Brezova", stanje: "Korišteno", opis: "Mirna lokacija s predivnim pogledom na brege, podrum, kuhinja, soba i natkrivena terasa.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0985554433", promoviran: false, top: false, datum: "Objavljeno prije 6 dana", pregledi: 48, isDemo: true, kvadratura: "60", sobe: "2", slike: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"]
  },
  {
    id: 9048, naslov: "Garaža u zatvorenom kompleksu (Zagreb - Trešnjevka)", cijena: "22000", kategorija: "nekretnine", podkategorija: "Garaže", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Krapinska", stanje: "Novo", opis: "Suha garaža srolo-vratima na daljinsko upravljanje, struja i rasvjeta u garaži.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0993332211", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 59, isDemo: true, kvadratura: "16", slike: ["https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80"]
  },
  {
    id: 9049, naslov: "Kuća za najam (Zagreb - Podsljeme)", cijena: "1500", kategorija: "nekretnine", podkategorija: "Kuće - Najam", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Mlinovi", stanje: "Novo", opis: "Luksuzna samostojeća kuća s okruženom šumom, kamin, 3 parkirna mjesta, mirna oaza.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0916665544", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 82, isDemo: true, kvadratura: "220", sobe: "5", slike: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"]
  },
  {
    id: 9050, naslov: "Novogradnja stan u Puli 62m2", cijena: "155000", kategorija: "nekretnine", podkategorija: "Novogradnja", zupanija: "Istarska", grad: "Pula", adresa: "Veruda", stanje: "Novo", opis: "Visokokvalitetna gradnja, protuprovalna vrata, inverter klima, useljivo odmah.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0954443322", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 67, isDemo: true, kvadratura: "62", sobe: "2", slike: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"]
  },

  // --- ELEKTRONIKA ---
  {
    id: 9061, naslov: "Apple iPhone 15 Pro Max 256GB Natural Titanium", cijena: "980", kategorija: "elektronika", podkategorija: "Mobiteli i oprema", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Centar", stanje: "Novo", opis: "Mobitel nov zapakiran, račun i garancija 2 godine, nikad korišten.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0919992211", promoviran: true, top: true, datum: "Objavljeno danas", pregledi: 180, isDemo: true, slike: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80"]
  },
  {
    id: 9062, naslov: "Gaming PC i7 13700KF / RTX 4070 Ti / 32GB RAM", cijena: "1450", kategorija: "elektronika", podkategorija: "Računala i komponente", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Smrdečac", stanje: "Novo", opis: "Vrhunsko računalo za 4K gaming i renderiranje, RGB kućište, brzi NVMe SSD 2TB.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0981119988", promoviran: false, top: false, datum: "Objavljeno jučer", pregledi: 115, isDemo: true, slike: ["https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80"]
  },
  {
    id: 9063, naslov: "Sony PlayStation 5 Slim + Dva kontrolera + FC24", cijena: "440", kategorija: "elektronika", podkategorija: "Konzole i igrice", zupanija: "Primorsko-goranska", grad: "Rijeka", adresa: "Kantrida", stanje: "Novo", opis: "Konzola nova u kutiji, s računom i važećom garancijom.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0992224455", promoviran: false, top: false, datum: "Objavljeno prije 2 dana", pregledi: 92, isDemo: true, slike: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80"]
  },
  {
    id: 9064, naslov: "Samsung 65 inch OLED 4K Smart TV", cijena: "1100", kategorija: "elektronika", podkategorija: "TV, Video i Audio", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Sjenjak", stanje: "Novo", opis: "Vrhunska slika, savršena crna boja, Dolby Atmos, zapakirano u original ambalaži.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0953331122", promoviran: false, top: false, datum: "Objavljeno prije 3 dana", pregledi: 60, isDemo: true, slike: ["https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80"]
  },
  {
    id: 9065, naslov: "Canon EOS R50 Mirrorless Fotoaparat + Objektiv", cijena: "680", kategorija: "elektronika", podkategorija: "Foto i video oprema", zupanija: "Varaždinska", grad: "Varaždin", adresa: "Korzo", stanje: "Novo", opis: "Odličan fotoaparat za početnike i vlogere, 4K video, RF-S 18-45mm objektiv.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0917778899", promoviran: false, top: false, datum: "Objavljeno prije 4 dana", pregledi: 44, isDemo: true, slike: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"]
  },
  {
    id: 9066, naslov: "MacBook Pro 16 M3 Pro / 18GB / 512GB", cijena: "2100", kategorija: "elektronika", podkategorija: "Računala i komponente", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Centar", stanje: "Novo", opis: "Najnoviji model prijenosnog računala u space black boji, HR tipkovnica, zapakirano.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0984441122", promoviran: false, top: false, datum: "Objavljeno prije 5 dana", pregledi: 83, isDemo: true, slike: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"]
  },
  {
    id: 9067, naslov: "Samsung Galaxy S24 Ultra 512GB Titanium", cijena: "1050", kategorija: "elektronika", podkategorija: "Mobiteli i oprema", zupanija: "Istarska", grad: "Pula", adresa: "Veruda", stanje: "Novo", opis: "Vrhunski android flagship, olovka S-Pen, AI funkcije, nekorišteno.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0912228877", promoviran: false, top: false, datum: "Objavljeno prije 6 dana", pregledi: 71, isDemo: true, slike: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"]
  },
  {
    id: 9068, naslov: "Nintendo Switch OLED Model White", cijena: "270", kategorija: "elektronika", podkategorija: "Konzole i igrice", zupanija: "Zadarska", grad: "Zadar", adresa: "Relja", stanje: "Korišteno", opis: "Konzola u odličnom stanju sa zaštitnim staklom, torbicom i dvije igre.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0926663322", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 53, isDemo: true, slike: ["https://images.unsplash.com/photo-1578303512597-81e6cc155b12?w=800&q=80"]
  },
  {
    id: 9069, naslov: "JBL PartyBox 310 Bluetooth Zvučnik", cijena: "390", kategorija: "elektronika", podkategorija: "TV, Video i Audio", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Dubrava", stanje: "Korišteno", opis: "Moćan zvuk i svjetlosni efekti, kotačići za lakši prijenos, baterija drži do 18 sati.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0951114455", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 69, isDemo: true, slike: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80"]
  },
  {
    id: 9070, naslov: "DJI Mini 4 Pro Drone + Fly More Combo", cijena: "850", kategorija: "elektronika", podkategorija: "Foto i video oprema", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Poljud", stanje: "Novo", opis: "Pametni dron s izbjegavanjem prepreka u svim smjerovima, RC 2 daljinski sa zaslonom.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0989998877", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 76, isDemo: true, slike: ["https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80"]
  },

  // --- DOM I VRT ---
  {
    id: 9081, naslov: "Kutna garnitura na razvlačenje (Moderni dizajn)", cijena: "650", kategorija: "dom-vrt", podkategorija: "Namještaj", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Vukovarska", stanje: "Novo", opis: "Udobna kutna garnitura presvučena kvalitetnom tkaninom otpornom na mrlje, sanduk za posteljinu.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0913334455", promoviran: true, top: true, datum: "Objavljeno danas", pregledi: 110, isDemo: true, slike: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"]
  },
  {
    id: 9082, naslov: "Bosch perilica posuđa Serie 4 (Samostojeća)", cijena: "350", kategorija: "dom-vrt", podkategorija: "Kućanski aparati", zupanija: "Primorsko-goranska", grad: "Rijeka", adresa: "Kozala", stanje: "Novo", opis: "Energetska klasa A, tihi rad, AquaStop zaštita od izljevanja vode, garancija.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0921112233", promoviran: false, top: false, datum: "Objavljeno jučer", pregledi: 65, isDemo: true, slike: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"]
  },
  {
    id: 9083, naslov: "Vrtna garnitura od ratana (stol + 6 stolica)", cijena: "420", kategorija: "dom-vrt", podkategorija: "Vrt i gradnja", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Bačvice", stanje: "Novo", opis: "Otporno na UV zračenje i vremenske uvjete, udobni jastuci uključeni u cijenu.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0987778899", promoviran: false, top: false, datum: "Objavljeno prije 2 dana", pregledi: 84, isDemo: true, slike: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"]
  },
  {
    id: 9084, naslov: "Set porculanskog posuđa za 12 osoba (60 komada)", cijena: "130", kategorija: "dom-vrt", podkategorija: "Posuđe i pribor", zupanija: "Varaždinska", grad: "Varaždin", adresa: "Centar", stanje: "Novo", opis: "Elegantni bijeli porculan sa zlatnim rubom, pogodno za pranje u perilici posuđa.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0952221144", promoviran: false, top: false, datum: "Objavljeno prije 3 dana", pregledi: 33, isDemo: true, slike: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80"]
  },
  {
    id: 9085, naslov: "Dizajnerska stropna LED rasvjeta / Luster", cijena: "95", kategorija: "dom-vrt", podkategorija: "Rasvjeta", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Gornji Grad", stanje: "Novo", opis: "Mogućnost podešavanja temperature boje svjetlosti daljinskim upravljačem.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0916667788", promoviran: false, top: false, datum: "Objavljeno prije 4 dana", pregledi: 41, isDemo: true, slike: ["https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80"]
  },
  {
    id: 9086, naslov: "Bračni krevet 160x200 s madracem", cijena: "380", kategorija: "dom-vrt", podkategorija: "Namještaj", zupanija: "Istarska", grad: "Pula", adresa: "Kaštanjer", stanje: "Novo", opis: "Tapecirani krevet s ortopedskim madracem i prostorom za odlaganje posteljine.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0983331144", promoviran: false, top: false, datum: "Objavljeno prije 5 dana", pregledi: 52, isDemo: true, slike: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"]
  },
  {
    id: 9087, naslov: "Samostojeći hladnjak s ledenicom NoFrost", cijena: "480", kategorija: "dom-vrt", podkategorija: "Kućanski aparati", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Dubrava", stanje: "Novo", opis: "Inverter kompresor, veliki kapacitet, inox dizajn otporan na otiske prstiju.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0914447788", promoviran: false, top: false, datum: "Objavljeno prije 6 dana", pregledi: 49, isDemo: true, slike: ["https://images.unsplash.com/photo-1571175420322-91a0a575a7b6?w=800&q=80"]
  },
  {
    id: 9088, naslov: "Motorna kosilica za travu s košarom", cijena: "260", kategorija: "dom-vrt", podkategorija: "Vrt i gradnja", zupanija: "Zadarska", grad: "Zadar", adresa: "Bili Brig", stanje: "Korišteno", opis: "Snažan benzinski motor, centralno podešavanje visine košnje, velika korpa.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0998881122", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 57, isDemo: true, slike: ["https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?w=800&q=80"]
  },
  {
    id: 9089, naslov: "Blagovaonski stol masivno drvo + 6 stolica", cijena: "520", kategorija: "dom-vrt", podkategorija: "Namještaj", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Maksimir", stanje: "Novo", opis: "Rastezljivi stol od hrastovog drveta visoke kvalitete izrade.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0915551122", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 63, isDemo: true, slike: ["https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80"]
  },
  {
    id: 9090, naslov: "Infracrvena sauna za dvije osobe", cijena: "1150", kategorija: "dom-vrt", podkategorija: "Ostalo - Dom i Vrt", zupanija: "Primorsko-goranska", grad: "Opatija", adresa: "Slatina", stanje: "Novo", opis: "Kanadska jela, keramički grijači, radio i bluetooth zvučnici, opuštanje kod kuće.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0982225566", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 80, isDemo: true, slike: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"]
  },

  // --- SPORT I OPREMA ---
  {
    id: 9101, naslov: "Specijalizirani brdski bicikl MTB 29 cola", cijena: "550", kategorija: "sport", podkategorija: "Bicikli i oprema", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Jarun", stanje: "Korišteno", opis: "Aluminijska rama, hidraulične disk kočnice, Shimano oprema, servisiran i spreman za vožnju.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0911239876", promoviran: true, top: true, datum: "Objavljeno danas", pregledi: 135, isDemo: true, slike: ["https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80"]
  },
  {
    id: 9102, naslov: "Električni romobil Xiaomi Mi Scooter Pro 2", cijena: "320", kategorija: "sport", podkategorija: "Bicikli i oprema", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Poljud", stanje: "Korišteno", opis: "Domet do 45 km, maksimalna brzina 25 km/h, očuvan s originalnim punjačem.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0984443355", promoviran: false, top: false, datum: "Objavljeno jučer", pregledi: 89, isDemo: true, slike: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80"]
  },
  {
    id: 9103, naslov: "Multifunkcionalna fitness sprava za kućnu teretanu", cijena: "480", kategorija: "sport", podkategorija: "Fitness i teretana", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Jug 2", stanje: "Novo", opis: "Sve vježbe za tijelo na jednom mjestu, utezi uključeni u cijenu (do 80kg).", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0953337788", promoviran: false, top: false, datum: "Objavljeno prije 2 dana", pregledi: 62, isDemo: true, slike: ["https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80"]
  },
  {
    id: 9104, naslov: "Profesionalni stolni nogomet (Kvalitetan masiv)", cijena: "290", kategorija: "sport", podkategorija: "Loptački sportovi", zupanija: "Varaždinska", grad: "Varaždin", adresa: "Kroata", stanje: "Korišteno", opis: "Tvrdo drvo, teleskopske šipke, stabilne noge, savršeno za zabavu u društvu.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0917774411", promoviran: false, top: false, datum: "Objavljeno prije 3 dana", pregledi: 40, isDemo: true, slike: ["https://images.unsplash.com/photo-1534158914592-062994fbe900?w=800&q=80"]
  },
  {
    id: 9105, naslov: "Ski oprema komplet: Skije Elan 160cm + Pancerice", cijena: "210", kategorija: "sport", podkategorija: "Zimski sportovi", zupanija: "Primorsko-goranska", grad: "Rijeka", adresa: "Trsat", stanje: "Korišteno", opis: "Servisirane skije spremne za snježnu sezonu, pancerice broj 42.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0921118899", promoviran: false, top: false, datum: "Objavljeno prije 4 dana", pregledi: 48, isDemo: true, slike: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80"]
  },
  {
    id: 9106, naslov: "Pribor za morski ribolov i štapovi (Komplet)", cijena: "160", kategorija: "sport", podkategorija: "Lov i ribolov", zupanija: "Zadarska", grad: "Zadarska", adresa: "Poluotok", stanje: "Novo", opis: "Kvalitetni teleskopski štapovi, role s najlonom i kutija s varalicama.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0995552233", promoviran: false, top: false, datum: "Objavljeno prije 5 dana", pregledi: 55, isDemo: true, slike: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"]
  },
  {
    id: 9107, naslov: "Podesiva bučica set 2x24kg (Brza promjena težine)", cijena: "190", kategorija: "sport", podkategorija: "Fitness i teretana", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Trešnjevka", stanje: "Novo", opis: "Jednostavnim okretanjem kotačića birate težinu od 2 do 24 kg po bučici.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0918883311", promoviran: false, top: false, datum: "Objavljeno prije 6 dana", pregledi: 73, isDemo: true, slike: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=80"]
  },
  {
    id: 9108, naslov: "SUP daska na napuhavanje (Stand Up Paddle 320cm)", cijena: "250", kategorija: "sport", podkategorija: "Ostalo - Sport", zupanija: "Istarska", grad: "Rovinj", adresa: "Centar", stanje: "Novo", opis: "Komplet s veslom, pumpom, ruksakom i sigurnosnim užetom za ljetne radosti.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0986664422", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 91, isDemo: true, slike: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"]
  },
  {
    id: 9109, naslov: "Košarkaška konstrukcija podesiva s obručem", cijena: "210", kategorija: "sport", podkategorija: "Loptački sportovi", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Dubrava", stanje: "Novo", opis: "Prijenosni koš za dvorište s bazom na punjenje vodom ili pijeskom.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0957771122", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 37, isDemo: true, slike: ["https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80"]
  },
  {
    id: 9110, naslov: "Glatka Yoga prostirka + Pilates loptu set", cijena: "40", kategorija: "sport", podkategorija: "Fitness i teretana", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Tvrđa", stanje: "Novo", opis: "Eko materijal, protuklizna podloga, idealno za vježbanje doma.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0913339988", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 28, isDemo: true, slike: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"]
  },

  // --- OSTALO / RAZNO ---
  {
    id: 9121, naslov: "Stara vintage gramofonska ploča kolekcija (50 kom)", cijena: "150", kategorija: "ostalo", podkategorija: "Kolekcionarstvo i antikviteti", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Ilica", stanje: "Korišteno", opis: "Rock i pop klasici iz 70-ih i 80-ih u dobrom stanju s omotima.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0912224411", promoviran: true, top: true, datum: "Objavljeno danas", pregledi: 95, isDemo: true, slike: ["https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800&q=80"]
  },
  {
    id: 9122, naslov: "Akustična gitara Fender + torba i štimer", cijena: "180", kategorija: "ostalo", podkategorija: "Glazbeni instrumenti", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Dioklecijanova", stanje: "Novo", opis: "Odličan zvuk, niska akcija žica, idealno za početnike i napredne svirače.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0985551144", promoviran: false, top: false, datum: "Objavljeno jučer", pregledi: 72, isDemo: true, slike: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80"]
  },
  {
    id: 9123, naslov: "Dječja kolica 3 u 1 (Kinderkraft s torbom)", cijena: "280", kategorija: "ostalo", podkategorija: "Dječja oprema i igračke", zupanija: "Primorsko-goranska", grad: "Rijeka", adresa: "Riva", stanje: "Novo", opis: "Komplet uključuje košaru, sportski dio i autosjedalicu (jaje) s adapterima.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0923338899", promoviran: false, top: false, datum: "Objavljeno prije 2 dana", pregledi: 68, isDemo: true, slike: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80"]
  },
  {
    id: 9124, naslov: "Enciklopedije i knjige komplet (12 knjiga)", cijena: "60", kategorija: "ostalo", podkategorija: "Knjige i literatura", zupanija: "Varaždinska", grad: "Varaždin", adresa: "Trg bana Jelačića", stanje: "Korišteno", opis: "Očuvana enciklopedija svijeta, bogato ilustrirana, tvrdi uvez.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0951113322", promoviran: false, top: false, datum: "Objavljeno prije 3 dana", pregledi: 31, isDemo: true, slike: ["https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&q=80"]
  },
  {
    id: 9125, naslov: "Električni električni piano / Klavijatura Yamaha", cijena: "410", kategorija: "ostalo", podkategorija: "Glazbeni instrumenti", zupanija: "Osječko-baranjska", grad: "Osijek", adresa: "Tvrđa", stanje: "Novo", opis: "Otežane tipke s osjećajem pravog klavira, razne instrumentalne boje i ritmovi.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0916662211", promoviran: false, top: false, datum: "Objavljeno prije 4 dana", pregledi: 50, isDemo: true, slike: ["https://images.unsplash.com/photo-1520523839896-5aa46627372b?w=800&q=80"]
  },
  {
    id: 9126, naslov: "Lego Technic Bugatti Bolide set (Zapakirano)", cijena: "115", kategorija: "ostalo", podkategorija: "Dječja oprema i igračke", zupanija: "Istarska", grad: "Pula", adresa: "Centar", stanje: "Novo", opis: "Original Lego set u originalnoj neotvorenoj kutiji, odličan poklon.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0987771199", promoviran: false, top: false, datum: "Objavljeno prije 5 dana", pregledi: 61, isDemo: true, slike: ["https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&q=80"]
  },
  {
    id: 9127, naslov: "Stari džepni sat Omega (Antikvitet)", cijena: "350", kategorija: "ostalo", podkategorija: "Kolekcionarstvo i antikviteti", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Kaptol", stanje: "Korišteno", opis: "Mehanički navijač u ispravnom stanju, pozlaćeno kućište, kolekcionarski primjerak.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0914449988", promoviran: false, top: false, datum: "Objavljeno prije 6 dana", pregledi: 88, isDemo: true, slike: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"]
  },
  {
    id: 9128, naslov: "Set romana poznatih svjetskih autora (10 knjiga)", cijena: "45", kategorija: "ostalo", podkategorija: "Knjige i literatura", zupanija: "Zadarska", grad: "Zadar", adresa: "Relja", stanje: "Novo", opis: "Popularni bestseleri u mekom uvezu, odlično očuvano.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0925553344", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 36, isDemo: true, slike: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80"]
  },
  {
    id: 9129, naslov: "Elektronički set bubnjeva s palicama", cijena: "490", kategorija: "ostalo", podkategorija: "Glazbeni instrumenti", zupanija: "Grad Zagreb", grad: "Zagreb", adresa: "Novi Zagreb", stanje: "Novo", opis: "Mrežaste opne za realističan odziv, ugrađeni moduli s ritmovima i mogućnost priključka slušalica.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0953335566", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 54, isDemo: true, slike: ["https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&q=80"]
  },
  {
    id: 9130, naslov: "Dječji automobil na akumulator (Daljinski upravljač)", cijena: "190", kategorija: "ostalo", podkategorija: "Dječja oprema i igračke", zupanija: "Splitsko-dalmatinska", grad: "Split", adresa: "Trstenik", stanje: "Novo", opis: "Auto s LED svjetlima, glazbom, kožnim sjedalom i roditeljskim daljinskim upravljačem.", prodavac: "Kupko Demo", autor_email: "admin@kupko.hr", telefon: "0981116677", promoviran: false, top: false, datum: "Objavljeno prije tjedan dana", pregledi: 79, isDemo: true, slike: ["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80"]
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
        setOglasi(DEMO_OGLASI);
      } else if (!data || data.length === 0) {
        setOglasi(DEMO_OGLASI);
      } else {
        const kombinirani = [...data, ...DEMO_OGLASI];
        setOglasi(kombinirani);
      }
    } catch (err) {
      console.error(err);
      setOglasi(DEMO_OGLASI);
    }
  };

  const otvoriDetaljeOglasa = async (o: any) => {
    const noviPregledi = (o.pregledi || 0) + 1;
    setOglasi(prev => prev.map(item => item.id === o.id ? { ...item, pregledi: noviPregledi } : item));
    setOdabraniOglas({ ...o, pregledi: noviPregledi });

    if (!o.isDemo) {
      try {
        await supabase.from('oglasi').update({ pregledi: noviPregledi }).eq('id', o.id);
      } catch (err) {
        console.error("Greška pri ažuriranju pregleda:", err);
      }
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

  const obnoviOglas = async (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni!"); return; }
    if (!mozeUreditiIliBrisati(glas)) { alert("Nemate ovlasti obnavljati tuđi oglas!"); return; }
    
    if (glas.isDemo) {
      alert("Demo oglasi se ne mogu obnavljati.");
      return;
    }

    const sad = new Date();
    const datumString = `Objavljeno danas u ${sad.getHours().toString().padStart(2, "0")}:${sad.getMinutes().toString().padStart(2, "0")}`;
    
    const { error } = await supabase
      .from('oglasi')
      .update({ datum: datumString, promoviran: true, top: true })
      .eq('id', glas.id);

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
    if (glas.isDemo) {
      return korisnik.isOwner;
    }
    if (glas.autor_email) {
      return glas.autor_email.toLowerCase() === korisnik.email.toLowerCase() || korisnik.isOwner;
    }
    return korisnik.isOwner;
  };

  const obrisiOglas = async (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni!"); return; }
    
    if (!mozeUreditiIliBrisati(glas)) { 
      alert("Nemate ovlasti brisati tuđi ili demo oglas!"); 
      return; 
    }

    if (glas.isDemo) {
      alert("Demo oglasi su zaključani i ne mogu se brisati.");
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
      alert("Nemate ovlasti uređivati tuđi ili demo oglas!"); 
      return; 
    }

    if (glas.isDemo) {
      alert("Demo oglasi se ne mogu uređivati.");
      return;
    }
    
    setOglasZaUrediti({ 
      ...glas, 
      slike: glas.slike || [] 
    });
    setPrikaziUredivanje(true);
  };

  const dohvatiPaketeZaOglas = (glas: any) => {
    return [
      { naziv: "Mini Boost (3 dana)", cijena: "3.00", stripeLink: "https://buy.stripe.com/3cI00igF7a5G33Adf3fEk00" },
      { naziv: "Standardni Boost (7 dana)", cijena: "5.00", stripeLink: "https://buy.stripe.com/8x27sK0G92De7jQ2ApfEk01" },
      { naziv: "Premium Paket (14 dana)", cijena: "10.00", stripeLink: "https://buy.stripe.com/7sYeVc60t2Deaw2a2RfEk02" },
      { naziv: "VIP Mega Boost (30 dana)", cijena: "20.00", stripeLink: "https://buy.stripe.com/5kQ28q74xfq0cEa3EtfEk03" }
    ];
  };

  const pokreniPromociju = (e: React.MouseEvent, glas: any) => {
    e.stopPropagation();
    if (!korisnik) { alert("Morate biti prijavljeni da biste mogli promovirati oglas!"); return; }
    if (glas.isDemo) { alert("Demo oglasi se ne mogu promovirati."); return; }
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

    if (odabraniPromoPaket.stripeLink) {
      window.location.href = odabraniPromoPaket.stripeLink;
      return;
    }

    let stripeLink = "https://buy.stripe.com/3cI00igF7a5G33Adf3fEk00";
    const cijenaPaketa = String(odabraniPromoPaket.cijena);

    if (cijenaPaketa.includes("5")) {
      stripeLink = "https://buy.stripe.com/8x27sK0G92De7jQ2ApfEk01";
    } else if (cijenaPaketa.includes("10")) {
      stripeLink = "https://buy.stripe.com/7sYeVc60t2Deaw2a2RfEk02";
    } else if (cijenaPaketa.includes("20")) {
      stripeLink = "https://buy.stripe.com/5kQ28q74xfq0cEa3EtfEk03";
    }

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
                    <button onClick={() => setPrikaz("karta")} className={`p-2 rounded-xl text-xs transition flex items-center gap-1 ${prikaz === "karta" ? "bg-white text-blue-600 shadow-sm font-bold" : "text-slate-500"}`} title="Karta"></button>
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
                               
                              {o.isDemo && (
                                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl shadow flex items-center gap-1">
                                  DEMO
                                </span>
                              )}

                              {o.promoviran && !o.isDemo && (
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
                                  {korisnik && mozeUreditiIliBrisati(o) && !o.isDemo && (
                                    <button
                                      type="button"
                                      onClick={(e) => obnoviOglas(e, o.id)}
                                      title="Obnovi oglas"
                                      className="p-2 bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-600 rounded-xl transition"
                                    >
                                      <RotateCw className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {korisnik && !o.promoviran && !o.isDemo && (
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
                                  {!o.isDemo && (
                                    <button
                                      type="button"
                                      onClick={(e) => pokreniUredivanje(e, o)}
                                      className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold py-2 px-3 rounded-xl text-[11px] transition flex items-center justify-center gap-1"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" /> Uredi
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={(e) => obrisiOglas(e, o)}
                                    className="flex-1 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold py-2 px-3 rounded-xl text-[11px] transition flex items-center justify-center gap-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> {o.isDemo && !korisnik?.isOwner ? "Zaključano" : "Izbriši"}
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
                  href="https://www.facebook.com/profile.php?id=61595502347266" 
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
                <li><button type="button" onClick={() => alert("Kontakt i podrška: kupko.podrska@gmail.com")} className="hover:text-amber-400 transition">Kontakt i podrška</button></li>
                <li><button type="button" onClick={() => alert("O nama: Kupko.hr je vodeći domaći oglasnik kreiran s ciljem spajanja kupaca i prodavača na siguran, brz i pouzdan način. Za sve upite obratite nam se na kupko.podrska@gmail.com.")} className="hover:text-amber-400 transition">O nama</button></li>
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
                <p>Korisnik je dužan unijeti točne podatke i pridržavati se zakona Republike Hrvatske prilikom objavljivanja oglasa. Strogo je zabranjeno oglašavanje neregistriranog uzgoja životinja suprotno Zakonu o zaštiti životinja.</p>
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
                <p>Prikupljamo samo nužne podatke za rad oglasnika i ne dijelimo ih s trećim stranama. Za sva pitanja obratite nam se putem e-maila: <strong>kupko.podrska@gmail.com</strong>.</p>
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

                {noviOglas.kategorija === "kucni-ljubimci" && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-900 font-medium space-y-1">
                    <span className="font-black block">⚠️ Važna pravila za kućne ljubimce:</span>
                    <p>Zabranjeno je oglašavanje štenaca/mačića bez registrirane uzgajivačnice i prodaja suprotno Zakonu o zaštiti životinja. Kupko.hr ne snosi odgovornost za prekršaje oglašivača.</p>
                  </div>
                )}

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
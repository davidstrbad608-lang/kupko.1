"use client";

import React from "react";
import { X, Share2, MapPin, BarChart2, Clock, Bot, User, Phone, Send, ShieldAlert, TrendingDown } from "lucide-react";

export default function DetaljiOglasaModal({
  odabraniOglas,
  zatvori,
  podjeliOglas,
  izracunajAiProcjenuZaOglas,
  korisnik,
  setOdabraniProdavacFilter,
  setTrenutnaStranica,
  noviTekstPoruke,
  setNoviTekstPoruke,
  posaljiPorukuProdavacu,
  setPrikaziModalPrijaveOglasa
}: any) {
  if (!odabraniOglas) return null;

  return (
    <div onClick={zatvori} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer">
      <div onClick={(e) => e.stopPropagation()} className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl space-y-5 cursor-default">
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button type="button" onClick={(e) => podjeliOglas(e, odabraniOglas)} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition text-slate-700" title="Podijeli oglas">
            <Share2 className="w-5 h-5" />
          </button>
          <button type="button" onClick={zatvori} className="bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden h-72 bg-slate-900 flex items-center justify-center">
          <img src={odabraniOglas.slike?.[0] || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80"} alt={odabraniOglas.naslov} className="w-full h-full object-cover" />
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
            Pregledan <strong className="text-blue-700">{odabraniOglas.pregledi || 1}</strong> puta
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

        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 rounded-2xl shadow-sm space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-black text-xs uppercase">
            <Bot className="w-4 h-4" /> Kupko AI Procjena Tržišta
          </div>
          <p className="text-xs text-blue-100 font-medium">{izracunajAiProcjenuZaOglas(odabraniOglas)}</p>
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
              src={`https://maps.google.com/maps?q=${encodeURIComponent((odabraniOglas.adresa ? odabraniOglas.adresa + ", " : "") + (odabraniOglas.grad ? odabraniOglas.grad + ", " : "") + odabraniOglas.zupanija + ", Hrvatska")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-[10px] text-blue-600 uppercase font-bold block">Prodavač</span>
            <p className="font-black text-sm text-blue-950 flex items-center gap-1.5 mt-0.5">
              <User className="w-4 h-4 text-blue-600" /> {odabraniOglas.prodavac || "Korisnik"}
            </p>
            {odabraniOglas.autor_email && (
              <button 
                onClick={() => { setOdabraniProdavacFilter(odabraniOglas.autor_email); zatvori(); setTrenutnaStranica(1); }}
                className="text-[11px] text-blue-600 font-bold underline hover:text-blue-800 mt-0.5 block"
              >
                Svi oglasi ovog prodavača
              </button>
            )}
          </div>
          <div className="text-right text-xs text-slate-700 font-bold">
            {odabraniOglas.telefon ? (
              <a 
                href={`tel:${odabraniOglas.telefon.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2.5 rounded-xl shadow transition text-xs"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>Nazovi: {odabraniOglas.telefon}</span>
              </a>
            ) : (
              <span>📞 <strong className="text-slate-900">Na upit</strong></span>
            )}
          </div>
        </div>

        {korisnik && korisnik.email !== odabraniOglas.autor_email && (
          <div className="border-t pt-4 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 space-y-2.5">
            <h5 className="text-[11px] font-black uppercase text-slate-600 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" /> Pošalji poruku / Ponudi nižu cijenu:
            </h5>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => {
                  const c = parseFloat(odabraniOglas.cijena) * 0.9;
                  setNoviTekstPoruke(`Pozdrav, nudim ${c.toFixed(2)} € za vaš oglas (${odabraniOglas.naslov}). Je li prihvatljivo?`);
                }}
                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold transition"
              >
                -10% ({Math.round(parseFloat(odabraniOglas.cijena || "0") * 0.9)} €)
              </button>
              <button 
                type="button"
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
              type="button"
              onClick={() => posaljiPorukuProdavacu(odabraniOglas.id, odabraniOglas.autor_email, odabraniOglas.naslov)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider transition shadow flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Pošalji poruku
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
  );
}
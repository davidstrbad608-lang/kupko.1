"use client";

import React from "react";
import { Flame, Heart } from "lucide-react";

export default function ReelsModal({
  prikazi,
  zatvori,
  oglasi,
  reelsIndex,
  setReelsIndex,
  otvoriDetaljeOglasa,
  toggleOmiljeni,
  omiljeniIds
}: any) {
  if (!prikazi) return null;

  return (
    <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl max-w-lg mx-auto relative border border-slate-200 overflow-hidden my-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-rose-600 font-black">
          <Flame className="w-6 h-6 animate-bounce" />
          <span className="text-lg uppercase tracking-wider">Kupko Reels & Swipe</span>
        </div>
        <button onClick={zatvori} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-black transition">
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
                  <img src={slika} alt={currentOglas.naslov} className="w-full h-full object-cover" />
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
                  <button onClick={() => otvoriDetaljeOglasa(currentOglas)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow transition">
                    Detalji
                  </button>
                  <button onClick={() => setReelsIndex((prev: number) => prev + 1)} className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow transition">
                    Sljedeći ⏭️
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
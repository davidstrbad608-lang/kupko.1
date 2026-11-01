"use client";

import React from "react";
import { X, MessageSquare, ArrowLeft, Send } from "lucide-react";

export default function SanducicModal({
  prikazi,
  zatvori,
  korisnik,
  poruke,
  aktivniChatEmail,
  otvoriChat,
  zatvoriChat,
  tekstOdgovoraInbox,
  setTekstOdgovoraInbox,
  posaljiOdgovor,
  oglasi,
  otvoriDetaljeOglasa
}: any) {
  if (!prikazi || !korisnik) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl max-h-[90vh] flex flex-col space-y-4">
        <button type="button" onClick={zatvori} className="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Sandučić poruka
        </h2>

        {!aktivniChatEmail ? (
          <div className="space-y-2.5 overflow-y-auto pr-1">
            {poruke.filter((p: any) => p.primatelj === korisnik.email || p.posiljatelj === korisnik.email).length === 0 ? (
              <p className="text-slate-400 text-xs py-8 text-center font-medium">Nemate aktivnih poruka.</p>
            ) : (
              Array.from(new Set(
                poruke
                  .filter((p: any) => p.primatelj === korisnik.email || p.posiljatelj === korisnik.email)
                  .map((p: any) => p.posiljatelj === korisnik.email ? p.primatelj : p.posiljatelj)
              )).map((sugovornik: any) => {
                const razgovorPoruke = poruke.filter((p: any) => (p.posiljatelj === sugovornik && p.primatelj === korisnik.email) || (p.posiljatelj === korisnik.email && p.primatelj === sugovornik));
                const zadnjaPoruka = razgovorPoruke.slice(-1)[0];
                const porukaSOglasom = razgovorPoruke.find((p: any) => p.oglasId && p.oglasId !== "chat");
                const vezaniOglas = porukaSOglasom ? oglasi.find((o: any) => String(o.id) === String(porukaSOglasom.oglasId)) : null;
                const nazivVezanogOglasa = vezaniOglas ? vezaniOglas.naslov : (porukaSOglasom?.oglasNaslov || "Opći upit");
                const imaNeprocitanih = poruke.some((p: any) => p.posiljatelj === sugovornik && p.primatelj === korisnik.email && p.procitano === false);

                return (
                  <div 
                    key={sugovornik} 
                    onClick={() => otvoriChat(sugovornik)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex justify-between items-center gap-3 ${
                      imaNeprocitanih ? "bg-amber-50 border-amber-300 shadow-sm" : "bg-slate-50 hover:bg-blue-50/50 border-slate-100"
                    }`}
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-xs text-slate-900">{sugovornik}</span>
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-lg truncate max-w-[240px]">
                          📦 Oglas: {nazivVezanogOglasa}
                        </span>
                        {imaNeprocitanih && <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Nova poruka!</span>}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 font-medium">{zadnjaPoruka?.tekst}</p>
                      <span className="text-[10px] text-slate-400 block">{zadnjaPoruka?.datum}</span>
                    </div>
                    <span className="bg-blue-600 text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-sm shrink-0">
                      Dopisuj se →
                    </span>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="flex flex-col flex-1 space-y-3 overflow-hidden">
            {(() => {
              const razgovorPoruke = poruke.filter((p: any) => (p.posiljatelj === korisnik.email && p.primatelj === aktivniChatEmail) || (p.posiljatelj === aktivniChatEmail && p.primatelj === korisnik.email));
              const porukaSOglasom = razgovorPoruke.find((p: any) => p.oglasId && p.oglasId !== "chat");
              const vezaniOglas = porukaSOglasom ? oglasi.find((o: any) => String(o.id) === String(porukaSOglasom.oglasId)) : null;
              const nazivVezanogOglasa = vezaniOglas ? vezaniOglas.naslov : porukaSOglasom?.oglasNaslov;

              return (
                <>
                  <div className="flex items-center justify-between border-b pb-2.5 flex-wrap gap-2">
                    <button type="button" onClick={zatvoriChat} className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Natrag na sve razgovore
                    </button>
                    <span className="text-xs font-bold text-slate-600">Sugovornik: <strong className="text-slate-900">{aktivniChatEmail}</strong></span>
                  </div>

                  {nazivVezanogOglasa && (
                    <div 
                      onClick={() => {
                        if (vezaniOglas) {
                          zatvori();
                          otvoriDetaljeOglasa(vezaniOglas);
                        }
                      }}
                      className={`bg-blue-50 border border-blue-200 p-3 rounded-2xl flex items-center justify-between gap-3 ${vezaniOglas ? "cursor-pointer hover:bg-blue-100/70 transition" : ""}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {vezaniOglas?.slike?.[0] && (
                          <img src={vezaniOglas.slike[0]} alt={nazivVezanogOglasa} className="w-11 h-11 rounded-xl object-cover shrink-0 border border-blue-200" />
                        )}
                        <div className="min-w-0">
                          <span className="text-[10px] font-black uppercase text-blue-600 block">Upit vezan uz oglas:</span>
                          <p className="text-xs font-black text-slate-900 truncate">{nazivVezanogOglasa}</p>
                          {vezaniOglas && <span className="text-[11px] font-extrabold text-blue-700">{vezaniOglas.cijena} €</span>}
                        </div>
                      </div>
                      {vezaniOglas && (
                        <span className="text-[10px] bg-blue-600 text-white font-black px-2.5 py-1.5 rounded-xl shrink-0">
                          Pogledaj oglas
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto space-y-2.5 p-3 bg-slate-50 rounded-2xl border border-slate-100 max-h-72">
                    {razgovorPoruke.map((p: any) => {
                      const jesamJa = p.posiljatelj === korisnik.email;
                      return (
                        <div key={p.id} className={`flex flex-col ${jesamJa ? "items-end" : "items-start"}`}>
                          <div className={`p-3 rounded-2xl max-w-[80%] text-xs font-semibold ${jesamJa ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"}`}>
                            {p.oglasNaslov && p.oglasId !== "chat" && (
                              <span className={`text-[9px] font-black uppercase block mb-1 pb-1 border-b ${jesamJa ? "text-amber-300 border-blue-500" : "text-blue-600 border-slate-100"}`}>
                                📦 Oglas: {p.oglasNaslov}
                              </span>
                            )}
                            <p>{p.tekst}</p>
                          </div>
                          <span className="text-[9px] text-slate-400 mt-1 px-1">{p.datum}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}

            <form onSubmit={posaljiOdgovor} className="flex gap-2 pt-1">
              <input 
                type="text" 
                required
                placeholder="Napišite poruku..." 
                value={tekstOdgovoraInbox}
                onChange={(e) => setTekstOdgovoraInbox(e.target.value)}
                className="flex-1 p-3 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:border-blue-600"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-black px-5 rounded-xl text-xs uppercase flex items-center gap-1.5 shadow transition">
                <Send className="w-3.5 h-3.5" /> Pošalji
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useMemo } from "react";
import moment from "moment";
import "moment/locale/pt-br";
import { Button } from "primereact/button";

/**
 * Exemplo de eventos. Use qualquer estrutura desde que tenha:
 * { id, title, start: Date, end: Date }
 */
const sampleEvents = [
  {
    id: 1,
    title: "Reunião de Sprint",
    start: moment().hour(10).minute(0).toDate(),
    end: moment().hour(12).minute(30).toDate(),
  },
  {
    id: 2,
    title: "Almoço com equipe",
    start: moment().hour(13).minute(30).toDate(),
    end: moment().hour(15).minute(0).toDate(),
  },
];

export default function WeekCalendar({ events = sampleEvents }) {
  /* ------------------------------------------------- helpers */
  const HOURS = Array.from({ length: 9 }, (_, i) => i); // 0‑23

  /* Inicializa a Semana e seta o inicio e o dim */
  const [reference, setReference] = useState(moment().startOf("week")); // domingo
  const startOfWeek = useMemo(
    () => moment(reference).startOf("week"),
    [reference]
  );
  const endOfWeek = useMemo(() => moment(reference).endOf("week"), [reference]);

  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => moment(startOfWeek).add(i, "day")),
    [startOfWeek]
  );

  /* navegação */
  const prevWeek = () =>
    setReference((prev) => moment(prev).subtract(1, "week"));
  const nextWeek = () => setReference((prev) => moment(prev).add(1, "week"));
  const today = () => setReference(moment());

  /* filtra eventos que caem nesta semana */
  const weeklyEvents = useMemo(
    () =>
      events.filter(
        (e) =>
          moment(e.start).isBetween(startOfWeek, endOfWeek, "day", "[]") ||
          moment(e.end).isBetween(startOfWeek, endOfWeek, "day", "[]")
      ),
    [events, startOfWeek, endOfWeek]
  );

  /* ------------------------------------------------- render */
  return (
    <section className="relative overflow-scroll">
      {/* CONTROLES */}
      <header className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">
          {startOfWeek.format("DD MMM")} – {endOfWeek.format("DD MMM YYYY")}
        </h2>
        <div className="flex gap-2">
          <Button
            icon="pi pi-angle-left"
            className="p-button-text"
            onClick={prevWeek}
          />
          <Button
            icon="pi pi-calendar"
            className="p-button-text"
            onClick={today}
          >
            Today
          </Button>
          <Button
            icon="pi pi-angle-right"
            className="p-button-text"
            onClick={nextWeek}
          />
        </div>
      </header>

      {/* GRID principal */}
      <div className="grid grid-cols-8 border-t border-gray-300 text-sm  min-w-220">
        {/* Coluna das HORAS */}
        <div className="border-r border-gray-300">
          {/* Cabeçalho das horas */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-300 py-1 text-center">
            <span className="block font-medium">Hours:</span>
            <span>Start at 08:00</span>
          </div>
          {HOURS.map((h) => {
            // Atualiza para começãr as 8 da manhã
            h = h + 8;

            return (
              <div
                key={h}
                className="h-14 pr-2 leading-7 text-gray-400 flex justify-end items-center"
              >
                {h.toString().padStart(2, "0")}:00
              </div>
            );
          })}
        </div>

        {/* 7 colunas de dias */}
        {days.map((day) => (
          <div
            key={day.format()}
            className="flex flex-col border-r last:border-r-0 border-gray-200"
          >
            {/* Cabeçalho do dia */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-300 py-1 text-center">
              <span className="block font-medium">{day.format("ddd")}</span>
              <span>{day.format("DD")}</span>
            </div>

            {/* Slots horários */}
            <div className="flex-1 relative">
              {HOURS.map((h) => (
                <div key={h} className="h-14 border-b border-gray-200"></div>
              ))}

              {/* Eventos do dia */}
              {weeklyEvents
                .filter((events) => moment(events.start).isSame(day, "day"))
                .map((ev) => {
                  const startH = moment(ev.start).hours();
                  const startM = moment(ev.start).minutes();
                  const endH = moment(ev.end).hours();
                  const endM = moment(ev.end).minutes();

                  const top = (startH - 8) * 56 + (startM / 60) * 56; // 56px = h-14
                  const height =
                    (endH - startH) * 56 + ((endM - startM) / 60) * 56;

                  return (
                    <div
                      key={ev.id}
                      className="absolute w-full px-1 bg-red-200 border-gray-200 border"
                      style={{ top, height }}
                    >
                      <div className="h-full rounded p-1 overflow-hidden font-bold">
                        {ev.title}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

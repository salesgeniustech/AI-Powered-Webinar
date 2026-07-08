/**
 * webinar-date.js
 *
 * Auto-fills the next upcoming webinar date/time on landing pages so nobody has
 * to manually edit HTML between webinars.
 *
 * Cadence: Every Wednesday at 11:00 AM Eastern (America/Toronto), starting
 * Wednesday June 10, 2026. Webinar duration assumed 60 minutes.
 *
 * Behaviour:
 *   - "Next webinar" = the next Wednesday 11:00 AM ET that has not yet started.
 *   - The current week's webinar stays displayed until it has *started*. After
 *     11:00 AM ET on a Wednesday, the page rolls forward to the next Wednesday.
 *   - If today is the Wednesday of a webinar BEFORE 11 AM ET, the page still
 *     shows today's date (good — that's the live show).
 *   - To skip a specific date (no webinar that week), add it to SKIP_DATES below
 *     in ISO format (e.g. "2026-07-01") and the script will roll past it.
 *
 * Usage in HTML:
 *   <span data-webinar-date></span>                  → "Wednesday, June 10, 2026"
 *   <span data-webinar-date="long"></span>           → "Wednesday, June 10 at 11:00 AM ET"
 *   <span data-webinar-date="short"></span>          → "Jun 10"
 *   <span data-webinar-date="iso"></span>            → "2026-06-10T15:00:00Z" (machine)
 *   <span data-webinar-day-of-week></span>           → "Wednesday"
 *   <span data-webinar-time></span>                  → "11:00 AM ET"
 *   <span data-webinar-countdown></span>             → "3 days from now"
 *
 * No dependencies. Drop this file in <head> with `defer` or at the end of <body>.
 */

(function () {
  'use strict';

  // ---------- CONFIG ----------
  const SERIES_START_ISO = '2026-06-10'; // First webinar in the series
  const WEBINAR_DAY = 3;                 // 0 = Sun, 3 = Wed
  const WEBINAR_HOUR_ET = 11;            // 11:00 AM Eastern
  const WEBINAR_DURATION_MIN = 60;
  const TIMEZONE = 'America/Toronto';    // Toronto is the canonical ET reference

  // Dates we intentionally skip — add as ISO strings (e.g. '2026-12-23' for a holiday)
  const SKIP_DATES = [
    // '2026-12-23', // example: skip Christmas week
  ];

  // ---------- HELPERS ----------

  /**
   * Returns the Date object representing the start of the *next* webinar in
   * the configured cadence, accounting for skip dates. The returned Date is in
   * the *user's local timezone* but represents 11 AM Eastern on that calendar
   * date — which is what we want for display.
   */
  function getNextWebinarDate(now = new Date()) {
    const seriesStart = etDateAt(SERIES_START_ISO, WEBINAR_HOUR_ET);

    // If we're before the series starts, just return the start.
    if (now < seriesStart) return seriesStart;

    // Walk forward from the series start in 7-day increments until we find one
    // that is either in the future or currently live (within duration window).
    let candidate = new Date(seriesStart);
    while (true) {
      const candidateEnd = new Date(candidate.getTime() + WEBINAR_DURATION_MIN * 60000);

      const isSkipped = SKIP_DATES.includes(toISODate(candidate));
      const hasEnded = now >= candidateEnd;

      if (!isSkipped && !hasEnded) return candidate;

      candidate = new Date(candidate.getTime() + 7 * 24 * 60 * 60000);
    }
  }

  /**
   * Returns a Date representing the given ISO calendar date at the given hour
   * in America/Toronto, expressed as a real timestamp.
   *
   * Implementation: build the date in UTC, then offset by the difference
   * between the requested timezone and UTC at that moment (handles DST).
   */
  function etDateAt(isoDate, hour) {
    const [y, m, d] = isoDate.split('-').map(Number);
    // First guess: treat the time as UTC
    const guess = new Date(Date.UTC(y, m - 1, d, hour, 0, 0));
    // Find the actual offset for America/Toronto on that date and correct
    const offsetMin = getTimezoneOffsetMinutes(guess, TIMEZONE);
    return new Date(guess.getTime() + offsetMin * 60000);
  }

  /**
   * Returns the offset in minutes that, added to a UTC-interpreted-as-ET time,
   * gives the correct UTC moment. DST-aware.
   */
  function getTimezoneOffsetMinutes(date, timeZone) {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
    const parts = dtf.formatToParts(date);
    const map = {};
    for (const p of parts) map[p.type] = p.value;
    const asUTC = Date.UTC(+map.year, +map.month - 1, +map.day,
                           +map.hour === 24 ? 0 : +map.hour, +map.minute, +map.second);
    return (date.getTime() - asUTC) / 60000;
  }

  function toISODate(date) {
    // Returns the ET calendar date (YYYY-MM-DD) for a given Date.
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(date);
  }

  // ---------- FORMATTERS ----------

  function formatLong(date) {
    const day = new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE, weekday: 'long', month: 'long', day: 'numeric',
    }).format(date);
    const time = new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE, hour: 'numeric', minute: '2-digit', hour12: true,
    }).format(date);
    return `${day} at ${time} ET`;
  }

  function formatDefault(date) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE, weekday: 'long', year: 'numeric',
      month: 'long', day: 'numeric',
    }).format(date);
  }

  function formatShort(date) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE, month: 'short', day: 'numeric',
    }).format(date);
  }

  function formatDayOfWeek(date) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE, weekday: 'long',
    }).format(date);
  }

  function formatTime(date) {
    const t = new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONE, hour: 'numeric', minute: '2-digit', hour12: true,
    }).format(date);
    return `${t} ET`;
  }

  function formatCountdown(date, now = new Date()) {
    const diffMs = date - now;
    if (diffMs <= 0) return 'live now';
    const minutes = Math.round(diffMs / 60000);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} from now`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} from now`;
    const days = Math.round(hours / 24);
    if (days === 1) return 'tomorrow';
    if (days < 7) return `${days} days from now`;
    if (days < 14) return 'next week';
    return `in ${days} days`;
  }

  // ---------- DOM PAINTING ----------

  function paintAll() {
    const next = getNextWebinarDate();

    document.querySelectorAll('[data-webinar-date]').forEach((el) => {
      const variant = el.getAttribute('data-webinar-date');
      if (variant === 'long') el.textContent = formatLong(next);
      else if (variant === 'short') el.textContent = formatShort(next);
      else if (variant === 'iso') el.textContent = next.toISOString();
      else el.textContent = formatDefault(next);
    });

    document.querySelectorAll('[data-webinar-day-of-week]').forEach((el) => {
      el.textContent = formatDayOfWeek(next);
    });

    document.querySelectorAll('[data-webinar-time]').forEach((el) => {
      el.textContent = formatTime(next);
    });

    document.querySelectorAll('[data-webinar-countdown]').forEach((el) => {
      el.textContent = formatCountdown(next);
    });

    // Expose the resolved date globally so other scripts (e.g. countdown timers,
    // Calendly defaults) can read it without recomputing.
    window.NEXT_WEBINAR = {
      date: next,
      iso: next.toISOString(),
      long: formatLong(next),
      default: formatDefault(next),
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paintAll);
  } else {
    paintAll();
  }
})();

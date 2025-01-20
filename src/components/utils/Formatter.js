export function createFormatter(timeZone) {
    return new Intl.DateTimeFormat("pl-PL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone
    });
}
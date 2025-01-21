export function createFormatter(timeZone) {
    return new Intl.DateTimeFormat("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone
    });
}
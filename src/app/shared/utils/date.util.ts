export function getHour(): string {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export function getMonth(): number {
    const date = new Date();
    return date.getMonth() + 1;
}

export function getYear(): number {
    const date = new Date();
    return date.getFullYear();
}

export function getDate(): string {
    const date = new Date();
    return date.toLocaleString("sv-SE", { timeZone: "America/Sao_Paulo" }).split(" ")[0];
}

export function getLastDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

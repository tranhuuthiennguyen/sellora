export class TimeZone {
  region: string;
  offset: number;

  public constructor(region: string) {
    this.region = region;
    this.offset = this.setOffSet();
  }

  private setOffSet(date = new Date()): number {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(
      date.toLocaleString("en-US", {
        timeZone: IANA_TIMEZONE_MAP[this.region],
      }),
    );

    const offSetMs = tzDate.getTime() - utcDate.getTime();

    return offSetMs / 3600000;
  }

  private decimalHoursToHHMM(decimalHours: number) {
    const absHours = Math.abs(Number(decimalHours));
    const sign = decimalHours < 0 ? "-" : "+";

    const hours = Math.floor(absHours);

    const minutes = Math.floor((absHours - hours) * 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${sign}${formattedHours}:${formattedMinutes}`;
  }

  public getFormattedString(): string {
    return `${this.decimalHoursToHHMM(this.offset)} | ${this.region}`;
  }
}

export const getAllTimeZones = (): TimeZone[] => {
  const tzList: TimeZone[] = [];
  for (const [key, value] of Object.entries(IANA_TIMEZONE_MAP)) {
    tzList.push(new TimeZone(key));
  }

  return tzList;
};

export const IANA_TIMEZONE_MAP: Record<string, string> = {
  "International Date Line West": "Etc/GMT+12",
  "American Samoa": "Pacific/Pago_Pago",
  "Midway Island": "Pacific/Midway",
  Hawaii: "Pacific/Honolulu",
  Alaska: "America/Anchorage",
  "Pacific Time (US & Canada)": "America/Los_Angeles",
  Tijuana: "America/Tijuana",
  Arizona: "America/Phoenix",
  Mazatlan: "America/Mazatlan",
  "Mountain Time (US & Canada)": "America/Denver",
  "Central America": "America/Guatemala",
  "Central Time (US & Canada)": "America/Chicago",
  Chihuahua: "America/Chihuahua",
  Guadalajara: "America/Mexico_City",
  "Mexico City": "America/Mexico_City",
  Monterrey: "America/Monterrey",
  Saskatchewan: "America/Regina",
  Bogota: "America/Bogota",
  "Eastern Time (US & Canada)": "America/New_York",
  "Indiana (East)": "America/Indiana/Indianapolis",
  Lima: "America/Lima",
  Quito: "America/Guayaquil",
  "Atlantic Time (Canada)": "America/Halifax",
  Caracas: "America/Caracas",
  Georgetown: "America/Guyana",
  "La Paz": "America/La_Paz",
  "Puerto Rico": "America/Puerto_Rico",
  Santiago: "America/Santiago",
  Newfoundland: "America/St_Johns",
  Brasilia: "America/Sao_Paulo",
  "Buenos Aires": "America/Argentina/Buenos_Aires",
  Montevideo: "America/Montevideo",
  Greenland: "America/Godthab",
  "Mid-Atlantic": "Etc/GMT+2",
  Azores: "Atlantic/Azores",
  "Cape Verde Is.": "Atlantic/Cape_Verde",
  Edinburgh: "Europe/London",
  Lisbon: "Europe/Lisbon",
  London: "Europe/London",
  Monrovia: "Africa/Monrovia",
  UTC: "Etc/UTC",
  Amsterdam: "Europe/Amsterdam",
  Belgrade: "Europe/Belgrade",
  Berlin: "Europe/Berlin",
  Bern: "Europe/Zurich",
  Bratislava: "Europe/Bratislava",
  Brussels: "Europe/Brussels",
  Budapest: "Europe/Budapest",
  Casablanca: "Africa/Casablanca",
  Copenhagen: "Europe/Copenhagen",
  Dublin: "Europe/Dublin",
  Ljubljana: "Europe/Ljubljana",
  Madrid: "Europe/Madrid",
  Paris: "Europe/Paris",
  Prague: "Europe/Prague",
  Rome: "Europe/Rome",
  Sarajevo: "Europe/Sarajevo",
  Skopje: "Europe/Skopje",
  Stockholm: "Europe/Stockholm",
  Vienna: "Europe/Vienna",
  Warsaw: "Europe/Warsaw",
  "West Central Africa": "Africa/Luanda",
  Zagreb: "Europe/Zagreb",
  Zurich: "Europe/Zurich",
  Athens: "Europe/Athens",
  Bucharest: "Europe/Bucharest",
  Cairo: "Africa/Cairo",
  Harare: "Africa/Harare",
  Helsinki: "Europe/Helsinki",
  Jerusalem: "Asia/Jerusalem",
  Kaliningrad: "Europe/Kaliningrad",
  Kyiv: "Europe/Kyiv",
  Pretoria: "Africa/Johannesburg",
  Riga: "Europe/Riga",
  Sofia: "Europe/Sofia",
  Tallinn: "Europe/Tallinn",
  Vilnius: "Europe/Vilnius",
  Baghdad: "Asia/Baghdad",
  Istanbul: "Europe/Istanbul",
  Kuwait: "Asia/Kuwait",
  Minsk: "Europe/Minsk",
  Moscow: "Europe/Moscow",
  Nairobi: "Africa/Nairobi",
  Riyadh: "Asia/Riyadh",
  "St. Petersburg": "Europe/Moscow",
  Volgograd: "Europe/Volgograd",
  Tehran: "Asia/Tehran",
  "Abu Dhabi": "Asia/Dubai",
  Baku: "Asia/Baku",
  Muscat: "Asia/Muscat",
  Samara: "Europe/Samara",
  Tbilisi: "Asia/Tbilisi",
  Yerevan: "Asia/Yerevan",
  Kabul: "Asia/Kabul",
  Almaty: "Asia/Almaty",
  Ekaterinburg: "Asia/Yekaterinburg",
  Islamabad: "Asia/Karachi",
  Karachi: "Asia/Karachi",
  Tashkent: "Asia/Tashkent",
  Chennai: "Asia/Kolkata",
  Kolkata: "Asia/Kolkata",
  Mumbai: "Asia/Kolkata",
  "New Delhi": "Asia/Kolkata",
  "Sri Jayawardenepura": "Asia/Colombo",
  Kathmandu: "Asia/Kathmandu",
  Astana: "Asia/Almaty",
  Dhaka: "Asia/Dhaka",
  Urumqi: "Asia/Urumqi",
  Rangoon: "Asia/Yangon",
  Bangkok: "Asia/Bangkok",
  Hanoi: "Asia/Ho_Chi_Minh",
  Jakarta: "Asia/Jakarta",
  Krasnoyarsk: "Asia/Krasnoyarsk",
  Novosibirsk: "Asia/Novosibirsk",
  Beijing: "Asia/Shanghai",
  Chongqing: "Asia/Shanghai",
  "Hong Kong": "Asia/Hong_Kong",
  Irkutsk: "Asia/Irkutsk",
  "Kuala Lumpur": "Asia/Kuala_Lumpur",
  Perth: "Australia/Perth",
  Singapore: "Asia/Singapore",
  Taipei: "Asia/Taipei",
  Ulaanbaatar: "Asia/Ulaanbaatar",
  Osaka: "Asia/Tokyo",
  Sapporo: "Asia/Tokyo",
  Seoul: "Asia/Seoul",
  Tokyo: "Asia/Tokyo",
  Yakutsk: "Asia/Yakutsk",
  Adelaide: "Australia/Adelaide",
  Darwin: "Australia/Darwin",
  Brisbane: "Australia/Brisbane",
  Canberra: "Australia/Sydney",
  Guam: "Pacific/Guam",
  Hobart: "Australia/Hobart",
  Melbourne: "Australia/Melbourne",
  "Port Moresby": "Pacific/Port_Moresby",
  Sydney: "Australia/Sydney",
  Vladivostok: "Asia/Vladivostok",
  Magadan: "Asia/Magadan",
  "New Caledonia": "Pacific/Noumea",
  "Solomon Is.": "Pacific/Guadalcanal",
  Srednekolymsk: "Asia/Srednekolymsk",
  Auckland: "Pacific/Auckland",
  Fiji: "Pacific/Fiji",
  Kamchatka: "Asia/Kamchatka",
  "Marshall Is.": "Pacific/Majuro",
  Wellington: "Pacific/Auckland",
  "Chatham Is.": "Pacific/Chatham",
  "Nuku'alofa": "Pacific/Tongatapu",
  Samoa: "Pacific/Apia",
  "Tokelau Is.": "Pacific/Fakaofo",
};

import moment from "moment";
import timezone from "moment-timezone";

export const DateHelper = (userZone: string) => {
  const fDate = moment().format();
  const fUtc = timezone.tz(fDate, userZone).format();
  const fZone = moment().tz(userZone).format("Z");
  const fDay = moment().format("LLLL");
  const fLocale = moment.locale("de");
  const fCurrentDate = moment().format("MM-DD-YYYY");
  const fCurrentDateTime = moment().format("DD/MM/YYYY HH:mm:ss a");
  const fUnix = moment().format("X");
  const fUnixMs = moment().format("x");
  const fDayLL = moment().format("LL");
  const fDayLLL = moment().format("LLL");
  const fUtcFormat = timezone.tz(fDate, userZone).format("YYYY-MM-DD h:mm:ss a");
  const utc = moment().utc();

  return {
    fDate,
    fUtc,
    fZone,
    fDay,
    fLocale,
    fCurrentDate,
    fCurrentDateTime,
    fUnix,
    fUnixMs,
    fDayLL,
    fDayLLL,
    fUtcFormat,
    utc
  };
};

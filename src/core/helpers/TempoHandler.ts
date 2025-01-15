
import { format } from "@formkit/tempo";

export class TempoHandler {

  date_now() {
    // const c = format({
    //   date: new Date(),
    //   format: "",
    //   tz: "America/Caracas",
    // });

    const c = format({
      date: new Date(),
      format: "YYYY-MM-DDTHH:mm:ssZ",
      tz: "America/Caracas",
    });
    return c;

  }

  date_short(date: string) {

    const l = format({
      date: date,
      format: "D MMM YYYY",
      tz: "America/Caracas",
    });
    return l;

  }

  date_complete(date: string) {

    const l = format({
      date: date,
      format: "D MMM YYYY - h:mm a",
      tz: "America/Caracas",
    });
    return l;

  }

}
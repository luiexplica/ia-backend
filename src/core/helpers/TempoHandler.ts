
import { format } from "@formkit/tempo";

export class TempoHandler {

    date_now() {
        return format({
            date: new Date(),
            format: "YYYY-MM-DD HH:mm:ss",
            tz: "America/Caracas",
        })
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
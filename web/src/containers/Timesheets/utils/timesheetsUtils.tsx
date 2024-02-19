import moment from "moment";

export const setDateInfo = (date: string | null | Date) => {
    var days: any = [];

    for (var i = 0; i <= 13; i++) {
        days.push(moment(date).add(i, 'days').format());
    }

    let start = new Date(days.slice(0, 1));
    let end = new Date(days.slice(13, 14));

    return {
        start,
        end
    }
}

export const setDateRange = (first_week: string | null | Date, last_week: string | null | Date) => {
    var startDate: string | null | Date = null;
    var endDate: string | null | Date = null;
    var divisibleBy = 14;

    function isCutOffCompleted(date: string | Date) {
        var diff = 0;
        var cutOffStart = "2020-06-15";
        diff = moment(date).diff(cutOffStart, "days");

        return diff % divisibleBy === 0 ? true : false;
    };

    var isPastCutoff = isCutOffCompleted(moment().startOf('isoWeek').format('YYYY-MM-DD'));

    if (first_week !== null) {
        startDate = first_week;
    } else {
        if (isPastCutoff === true) {
            startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
        } else {
            startDate = moment().startOf('isoWeek').add(-7, 'days').format('YYYY-MM-DD');
        }
    }

    if (last_week !== null) {
        endDate = last_week;
    } else {
        if (isPastCutoff === true) {
            endDate = moment().startOf('isoWeek').add(+13, 'days').format('YYYY-MM-DD');
        } else {
            endDate = moment().endOf('isoWeek').format('YYYY-MM-DD');
        }
    }

    return {
        startDate,
        endDate
    }
}

export const extraURL = (first_week: string | null | Date, path: string[], count: number) => {
    let previous_val: null | number = null;
    let next_val: null | number = null;

    if (path[3]) {
        var value: any = path[4];
        var val = Math.abs(value);

        for (let i = 1; i <= val; i++) {
            if (value > 0) {
                next_val = (i * 14);
            } else {
                previous_val = - (i * 14);
            }
        }

        if (first_week != null) {
            let moment_val = previous_val ? previous_val : next_val;

            return moment(first_week).add(moment_val, 'days').format('YYYY-MM-DD');
        }

        return null;

    } else {
        if (count > 0) {
            next_val = (count * 14);
        } else {
            previous_val = - (count * 14);
        }

        let moment_val = previous_val ? previous_val : next_val;

        return moment(first_week).add(moment_val, 'days').format('YYYY-MM-DD');
    }
}

export const convertDecimal = (time: number) => {
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);

    var compute_mins = (m / 60).toFixed(2);

    let hDisplay = h + parseFloat(compute_mins) + " hrs";

    return hDisplay;
}

export const convertTime = (time: number) => {
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";

    return hDisplay + mDisplay;
}
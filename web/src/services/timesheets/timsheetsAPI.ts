import axios from "axios";
import moment from "moment";

const fetchAxiosLogs = async (getWeek: string | Date | null) => {
    const weekStart = moment(getWeek).add(0, 'days').format('YYYY-MM-DD');

    let results: any = [];
    let dates: any = [];

    for (let i = 0; i <= 13; i++) {
        let day = moment(weekStart).add(i, 'days').format('YYYY-MM-DD');

        await axios(
            `https://desktime.com/api/v2/json/employees?apiKey=${process.env.REACT_APP_TIMESHEETS_API_KEY}&date=${day}&period=day`,
        ).then((res: any) => {
            const { data } = res;
            const employees = data.employees[day] ? Object.values(data.employees[day]) : '';

            if (employees) {
                results.push(employees);
            }
        });

        dates.push(day);
    }

    if (results.length) {
        const total_time = results.map((v: any, i: number) => {
            let arr: any = [];

            results[i].map((value: any, index: number) => {
                if (value.id !== 224944) {
                    arr.push(value.desktimeTime);
                }
            })

            return arr;
        });

        var sum: any = [];
        var maxlen = total_time[0].length;

        for (let i = 1; i < total_time.length; i++) {
            if (maxlen < total_time[i].length)
                maxlen = total_time[i].length;
        }

        for (let i = 0; i < maxlen; i++) {
            sum[i] = 0;
            for (let a = 0; a < total_time.length; a++) {
                if (typeof total_time[a][i] != 'undefined')
                    sum[i] += total_time[a][i];
            }
        }

        return {
            listDate: dates,
            data: results,
            total: sum
        }
    }
    
    return {
        listDate: dates
    };
}

const wrapPromise = (promise: any) => {
    let status = "pending";
    let result = "";
    let suspender = promise.then(
        (r: any) => {
            status = "success";
            result = r;
        },
        (e: any) => {
            status = "error";
            result = e;
        }
    );

    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            }

            return result;
        }
    };
};

export const createResource = (data: string | Date | null) => {
    return {
        employees: wrapPromise(fetchAxiosLogs(data)),
    };
}
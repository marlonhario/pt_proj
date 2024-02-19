import React from "react";
import moment from "moment";

interface Props {
    resource: any;
}

export const TimesheetsInfo: React.FC<Props> = ({ resource }) => {
    const dates = resource.employees.read().listDate;

    return (
        <div>
            <h5 className="bold-text" style={{ alignSelf: 'center', padding: 5, }}>
                {
                    moment(dates.slice(0, 1).toString()).format("MMMM Do, YYYY") + ' - ' + moment(dates.slice(13, 14).toString()).format("MMMM Do, YYYY")
                }
            </h5>
        </div>
    )
}
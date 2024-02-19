import React from "react";
import { Container } from "reactstrap";
import ReactTable from "./components/Table";

import {
  useGetLogsQuery,
  useGetAllLogsQuery,
  useGetLogsLazyQuery,
} from "../../generated/graphql";

export function SignalLog() {
  let [
    getLogs,
    { data, error, loading, refetch, networkStatus },
  ] = useGetLogsLazyQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  let {
    data: allLogs,
    error: allLogsError,
    loading: allLogsLoading,
    refetch: refetchAllLogs,
  } = useGetAllLogsQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }
  if (allLogs !== undefined) {
    console.log(allLogs.allLogs);
  }
  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (data) {
              refetch();
              refetchAllLogs();
            } else {
              getLogs();
            }
          }}
        >
          Run Signal System
        </button>
      </div>
      <div>
        <h4>Get all strategies</h4>
        {data !== undefined ? (
          <>
            {data.getLogs.signal_logs[0]
              .filter((item) => item !== "Strategy is null - Log #1")
              .map((item) => (
                <p>{item}</p>
              ))}
            <h4>Look for Signal</h4>
            {data.getLogs.signal_logs[1]
              .filter((item) => item !== "Strategy is null - Log #2")
              .map((item) => (
                <p>{item}</p>
              ))}
            <h4>Send true signal to trade system</h4>
            {data.getLogs.signal_logs[2].every(
              (item) => item === "No trades"
            ) ? (
              <div>No Trades</div>
            ) : (
              data.getLogs.signal_logs[2]
                .filter((item) => item !== "No trades")
                .map((item) => <p>{item}</p>)
            )}
          </>
        ) : (
          <>No data yet</>
        )}
      </div>
      <div>
        {allLogs !== undefined && allLogs.allLogs && (
          //   @ts-ignore
          <ReactTable
            data={allLogs.allLogs.map((item) => ({
              [`step1`]: JSON.stringify(item.signal_logs[0]),
              [`step2`]: JSON.stringify(item.signal_logs[1]),
              [`step3`]: JSON.stringify(item.signal_logs[2]),
              id: item.id,
            }))}
          />
        )}
      </div>
    </div>
  );
}

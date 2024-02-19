import React, { useContext } from "react";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";
import { useMeQuery } from "../../../generated/graphql";
import { ContextGenerateRun, ContextTime } from "../../../hooks/context/Context";
import usePaperTrading from "../../../services/graphQL/PaperTrading/usePaperTrading";
import useBaskets from "../../../services/graphQL/Baskets/useBaskets";

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SidebarContent: React.FC<Props> = ({ onClick }) => {
    const { timeState } = useContext(ContextTime);
    const { data } = useMeQuery();
    const { dataStrategies, loadingStrategies } = useBaskets();
    // const { paper_count } = usePaperTrading()
    const { generateRState } = useContext(ContextGenerateRun);

    let countBaskets: number;
    if (!loadingStrategies && dataStrategies) {
        countBaskets = dataStrategies.getStrategies.end;
    }

    return (
        <div className="sidebar__content">
            <ul className="sidebar__block">
                <SidebarCategory title="Home" icon="home">
                    <SidebarLink title="Technical Indicator" route="/pages/technical-indicator" onClick={onClick} />
                    <SidebarLink title="Alphavantage" route="/pages/alphavantage" onClick={onClick} />
                    <SidebarLink title="Alpaca" route="/pages/alpaca" onClick={onClick} />
                    <SidebarLink title="Stockcharts Demo" route="/pages/stockcharts-demo" onClick={onClick} />
                    <SidebarLink title="Back Testing" route="/pages/back-testing" onClick={onClick} />
                    <SidebarLink title="Market Detail" route="/pages/marketdetail" onClick={onClick} />
                    <SidebarLink title="Profile" route="/accounts/profile" onClick={onClick} />
                    <SidebarLink title="Mobile" route="/prospertogether/pages" onClick={onClick} />
                    <SidebarLink title="Indicator Module" route="/pages/indicator-module" onClick={onClick} />
                    <SidebarLink title="Time Zone" route="/pages/helper" onClick={onClick} />
                    <SidebarLink title="Drag and Drop" route="/pages/draggable" onClick={onClick} />
                    <SidebarLink title="Blockly" route="/pages/blockly" onClick={onClick} />
                    <SidebarLink title="Design Old" route="/pages/design" onClick={onClick} />
                </SidebarCategory>
                <SidebarCategory title="Strategies" icon="chart-bars" isCollapse={true}>
                    <SidebarLink title="Browse" route="/strategies/browse" onClick={onClick} />
                    <SidebarLink
                        title="Generate"
                        route="/strategies/generate"
                        onClick={onClick}
                        is_strat={generateRState.progress}
                        is_percent={true}
                        is_start={generateRState.start}
                    />
                    <SidebarLink title="Design" route="/strategies/design" onClick={onClick} />
                </SidebarCategory>
                <SidebarLink title="My Basket" icon="inbox" route="/basket" onClick={onClick} is_strat={countBaskets} />
                <SidebarLink
                    title="Paper Trading"
                    icon="file-empty"
                    route="/paper-trading"
                    onClick={onClick}
                    // is_strat={paper_count}
                />
                <SidebarLink title="Live Trading" icon="rocket" route="/live-trading" onClick={onClick} />
                <SidebarLink title="Share Strategies" icon="link" route="/share-strategies" onClick={onClick} />
                <SidebarCategory title="My Account" icon="user">
                    <SidebarLink title="Profile (edit)" route="/accounts/view" onClick={onClick} />
                    <SidebarLink title="Wallet" route="/accounts/wallet" onClick={onClick} />
                    <SidebarLink title="Banks" route="/banks" onClick={onClick} />
                    <SidebarLink title="Brokers" route="/pages/brokers" onClick={onClick} />
                </SidebarCategory>
                <SidebarCategory title="Admin" icon="warning" role={data?.me?.admin}>
                    <SidebarLink title="Signal Log" route={`/pages/signal-log`} onClick={onClick} role={data?.me?.admin} />
                    <SidebarLink title="Paper Trades" route={`/pages/paper-trades`} onClick={onClick} role={data?.me?.admin} />
                    <SidebarLink title="Timesheets" route={`/pages/timesheets/dates/${timeState.count}`} onClick={onClick} role={data?.me?.admin} />
                    <SidebarLink title="Markets" route="/pages/markets" onClick={onClick} />
                    <SidebarLink title="Users" route="/users/lis`ts" onClick={onClick} role={data?.me?.admin} />
                </SidebarCategory>
            </ul>
        </div>
    );
};

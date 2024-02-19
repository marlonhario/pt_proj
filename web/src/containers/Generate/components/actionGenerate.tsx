import { useContext, useState, useEffect } from "react";
import { ContextGenerate, ContextGenerateValidation } from "../../../hooks/context/Context";
import { useFetchStock } from "../../../services/graphQL/Design/useFetchStock";
import { DropdownGenerate, DropdownGenerate1 } from "../../../types/Generate";
import { generateData } from "../../../hooks/context/data/Generate/data";

export const ActionGenerate = () => {
    const { generateState, generateDispatch } = useContext(ContextGenerate);
    const { generateValidationState, generateValidationDispatch } = useContext(ContextGenerateValidation);
    const {
        symbol: { label: symbolValue },
        period: { value: periodValue },
        generate_max_entry,
        working_mins,
    } = generateState;
    const { generate_acceptance_data_list, complete_backtest_initial, in_sample_initial, out_sample_initial } = generateValidationState;

    const { complete_initial, in_sample_initial: insample_initial, out_sample_initial: outsample_initial } = generateData();

    const [progress, setProgress] = useState(0);
    const [start, setStart] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [trigger, setTrigger] = useState(false);

    const { fetchStockData } = useFetchStock();

    const handleChangeSymbol = (event: DropdownGenerate) => {
        generateDispatch({
            type: "CHANGE_SYMBOL",
            symbol: event,
        });
    };

    const handleChangePeriod = (event: DropdownGenerate) => {
        generateDispatch({
            type: "CHANGE_PERIOD",
            period: event,
        });
    };

    const handleWorkingMins = (event: React.ChangeEvent<HTMLInputElement>) => {
        generateDispatch({
            type: "WORKING_MINS",
            working_mins: event.currentTarget.value,
        });
    };

    const handleSearchBest = (event: DropdownGenerate) => {
        generateDispatch({
            type: "SEARCh_BEST",
            search_best: event,
        });
    };

    const handleOutSample = (event: DropdownGenerate) => {
        generateDispatch({
            type: "OUT_SAMPLE",
            out_sample: event,
        });
    };

    const handleMaxEntry = (event: DropdownGenerate1) => {
        generateDispatch({
            type: "MAX_ENTRY",
            generate_max_entry: event,
        });
    };

    const handleMaxExit = (event: DropdownGenerate1) => {
        generateDispatch({
            type: "MIN_ENTRY",
            generate_max_exit: event,
        });
    };

    const handleReset = () => {
        setProgress(0);
        setStart(0);
        setSeconds(0);
    };
    const handleToggle = async () => {
        setTrigger(!trigger);
        let max_entry: number = generate_max_entry.value;
        let rdm = Math.floor(Math.random() * max_entry + 1);
        let results = await fetch();
        console.log(results);
    };

    const fetch = async () => {
        return await fetchStockData(symbolValue, periodValue);
    };

    const handleAcceptanceCriteria = (event: any) => {
        const { name } = event.currentTarget;

        generate_acceptance_data_list.map((item: any) => {
            if (item.text === name) {
                complete_backtest_initial.push(item);
            }
        });

        generateValidationDispatch({
            type: "UPDATE_ACCEPTANCE_CRITERIA",
            complete_backtest_initial: complete_backtest_initial,
        });
    };

    const handleAcceptanceCriteria1 = (event: any) => {
        const { name } = event.currentTarget;

        generate_acceptance_data_list.map((item: any) => {
            if (item.text === name) {
                in_sample_initial.push(item);
            }
        });

        generateValidationDispatch({
            type: "UPDATE_ACCEPTANCE_CRITERIA1",
            in_sample_initial: in_sample_initial,
        });
    };

    const handleAcceptanceCriteria2 = (event: any) => {
        const { name } = event.currentTarget;

        generate_acceptance_data_list.map((item, index) => {
            if (item.text === name) {
                item.hidden = true;
                out_sample_initial.push(item);
            }
        });

        generateValidationDispatch({
            type: "UPDATE_ACCEPTANCE_CRITERIA2",
            out_sample_initial: out_sample_initial,
        });
    };

    const handleAcceptanceInput = (event) => {
        const { value, name } = event.currentTarget;

        complete_backtest_initial.map((item, key) => {
            if (item.text === name) {
                item.value = parseFloat(value);
            }

            return {
                ...item,
            };
        });
        generateValidationDispatch({
            type: "UPDATE_ACCEPTANCE_VALUE",
            complete_backtest_initial: complete_backtest_initial,
        });
    };

    const handleAcceptanceInput1 = (event) => {
        const { value, name } = event.currentTarget;

        in_sample_initial.map((item, key) => {
            if (item.text === name) {
                item.value = parseFloat(value);
            }

            return {
                ...item,
            };
        });

        generateValidationDispatch({
            type: "UPDATE_ACCEPTANCE_VALUE1",
            in_sample_initial: in_sample_initial,
        });
    };

    const handleAcceptanceInput2 = (event) => {
        const { value, name } = event.currentTarget;

        out_sample_initial.map((item, key) => {
            if (item.text === name) {
                item.value = parseFloat(value);
            }

            return {
                ...item,
            };
        });

        generateValidationDispatch({
            type: "UPDATE_ACCEPTANCE_VALUE2",
            out_sample_initial: out_sample_initial,
        });
    };

    const handleRefreshComplete = () => {
        generateValidationDispatch({
            type: "RESET_ACCEPTANCE_VALUE",
            complete_initial: complete_initial,
        });
    };

    const handleRefreshInSample = () => {
        generateValidationDispatch({
            type: "RESET_ACCEPTANCE_VALUE1",
            in_sample_initial: insample_initial,
        });
    };

    const handleRefreshOutSample = () => {
        generateValidationDispatch({
            type: "RESET_ACCEPTANCE_VALUE2",
            out_sample_initial: outsample_initial,
        });
    };

    const handleDeleteInput = (id: string) => {
        let data = complete_backtest_initial.filter(function (item: any) {
            return item.text !== id;
        });

        generateValidationDispatch({
            type: "DELETE_ACCEPTANCE_VALUE",
            complete_backtest_initial: data,
        });
    };

    const handleDeleteInput1 = (id: string) => {
        let data = in_sample_initial.filter(function (item: any) {
            return item.text !== id;
        });

        generateValidationDispatch({
            type: "DELETE_ACCEPTANCE_VALUE1",
            in_sample_initial: data,
        });
    };

    const handleDeleteInput2 = (id: string) => {
        let data = out_sample_initial.filter(function (item: any) {
            return item.text !== id;
        });

        generateValidationDispatch({
            type: "DELETE_ACCEPTANCE_VALUE2",
            out_sample_initial: data,
        });
    };

    useEffect(() => {
        if (!trigger) {
            return;
        }
        let current = start;
        let minutes = working_mins * 60;
        let timeoutTime = (minutes * 1000) / 100 / 2;
        if (progress >= 100) {
            setTrigger(false);
            return;
        }
        let increment = minutes / 100;

        const timeout = setTimeout(() => {
            current += Number(increment.toFixed(1));
            setStart(current);

            setProgress(progress + 1);
        }, timeoutTime);

        return () => {
            clearTimeout(timeout);
        };
    }, [trigger, start]);

    return {
        handleChangeSymbol,
        handleChangePeriod,
        handleWorkingMins,
        handleSearchBest,
        handleOutSample,
        handleMaxEntry,
        handleMaxExit,
        handleReset,
        handleToggle,
        progress,
        handleAcceptanceCriteria,
        handleAcceptanceCriteria1,
        handleAcceptanceCriteria2,
        handleAcceptanceInput,
        handleAcceptanceInput1,
        handleAcceptanceInput2,
        handleRefreshComplete,
        handleRefreshInSample,
        handleRefreshOutSample,
        handleDeleteInput,
        handleDeleteInput1,
        handleDeleteInput2,
    };
};

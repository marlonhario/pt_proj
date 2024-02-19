import { data } from "./../data";
export const RandomStrategies = () => {
    const { listATR, listADX, listAwesome, listMACD, staticSignal } = data();
    const randomEntry = (entry: number) => {
        const adxEntryData = [];
        const atrEntryData = [];
        const awesomeEntryData = [];
        const macdEntryData = [];

        for (let i = 0; i < entry; i++) {
            let indicator = listATR[Math.floor(Math.random() * listATR.length)];
            let adx: any;
            let atr: any;
            let awesome: any;
            let macd: any;

            if (indicator === "AO") {
                awesome = staticSignal[Math.floor(Math.random() * staticSignal.length) + 1];

                if (awesome) {
                    awesomeEntryData.push({
                        identification: indicator,
                        signal: awesome,
                        "levelLine-AO": generateRandomInteger(1, 100),
                        "fastPeriod-AO": generateRandomInteger(1, 50),
                        "slowPeriod-AO": generateRandomInteger(51, 100),
                        name: { label: "Awesome Oscillator", value: "AwesomeOscillator.json" },
                    });
                }
            } else {
                macd = staticSignal[Math.floor(Math.random() * staticSignal.length) + 1];

                if (macd) {
                    macdEntryData.push({
                        identification: indicator,
                        signal: macd,
                        "fastPeriod-MACD": generateRandomInteger(1, 50),
                        "slowPeriod-MACD": generateRandomInteger(51, 100),
                        "signalPeriod-MACD": generateRandomInteger(1, 100),
                        name: { label: "MACD", value: "MACD.json" },
                    });
                }
            }
        }

        if (awesomeEntryData.length > 0 || macdEntryData.length > 0) {
            const indicator = [...awesomeEntryData, ...macdEntryData];
            const entryLong = indicator.map((item, index) => {
                return {
                    ...item,
                    id: `idEntry${index}-long`,
                };
            });

            const entryShort = indicator.map((item, index) => {
                return {
                    ...item,
                    id: `idEntry${index}-short`,
                };
            });

            return {
                entryLong,
                entryShort,
            };
        }
    };

    const randomExit = (exit: number) => {
        const adxExitData = [];
        const atrExitData = [];
        const awesomeExitData = [];
        const macdExitData = [];

        for (let i = 0; i < exit; i++) {
            let y = listATR[Math.floor(Math.random() * listATR.length)];
            let adx: any;
            let atr: any;
            let awesome: any;
            let macd: any;

            if (y === "AO") {
                awesome = staticSignal[Math.floor(Math.random() * staticSignal.length)];

                awesomeExitData.push({
                    identification: y,
                    signal: awesome,
                    "levelLine-AO": generateRandomInteger(1, 100),
                    "fastPeriod-AO": generateRandomInteger(1, 50),
                    "slowPeriod-AO": generateRandomInteger(51, 100),
                    name: { label: "Awesome Oscillator", value: "AwesomeOscillator.json" },
                });
            } else {
                macd = staticSignal[Math.floor(Math.random() * staticSignal.length)];

                macdExitData.push({
                    identification: y,
                    signal: macd,
                    "fastPeriod-MACD": generateRandomInteger(1, 50),
                    "slowPeriod-MACD": generateRandomInteger(51, 100),
                    "signalPeriod-MACD": generateRandomInteger(1, 100),
                    name: { label: "MACD", value: "MACD.json" },
                });
            }
        }

        if (awesomeExitData.length > 0 || macdExitData.length > 0) {
            const indicator = [...awesomeExitData, ...macdExitData];

            const exitLong = indicator.map((item, index) => {
                return {
                    ...item,
                    id: `idExit${index}-long`,
                };
            });

            const exitShort = indicator.map((item, index) => {
                return {
                    ...item,
                    id: `idExit${index}-short`,
                };
            });

            return {
                exitLong,
                exitShort,
            };
        }
    };

    const generateRandomInteger = (min, max) => {
        return Math.floor(min + Math.random() * (max + 1 - min));
    };

    return {
        randomEntry,
        randomExit,
    };
};

export const SMA = async (period, stockData) => {
	const filterStocks = {};
	let sumMidPoint = 0;

	// Temporary sorting
	const sortData = stockData.sort(function (a, b) {
		return (b["Time"] > a["Time"]) ? 1 : ((b["Time"] < a["Time"]) ? -1 : 0);
	});

	sortData.forEach((stock, index) => {
		let getMidPoint = 0;
		const rangeData = sortData.slice(index, index + period);

		if (rangeData.length === period) {
			rangeData.forEach((stck) => {
				getMidPoint = ((stck.High + stck.Low) / 2);
				sumMidPoint += getMidPoint;
			})
			filterStocks[stock.Time] = (sumMidPoint / period);
			sumMidPoint = 0;
			getMidPoint = 0;
		} else {
			filterStocks[stock.Time] = null;
		}
	})

	console.log(filterStocks, "filterStocks")
	return filterStocks;
}
import { SMA } from '../helpers/SMA';

export const MA = async (options: any, stockData: any) => {
  const sma = SMA(options["period"], stockData);


}
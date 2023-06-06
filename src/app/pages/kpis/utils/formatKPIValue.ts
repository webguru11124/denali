import { KpiValueFormat } from 'app/api/kpis/types';
import format from 'format-number';

const formatKPIValue = (number: number, props?: KpiValueFormat) => {
  if (!props) return number;

  return format({
    prefix: props?.prependUnit || undefined,
    suffix: props?.appendUnit || undefined,
    integerSeparator: props?.thousandsSeperator,
    decimal: props?.decimalsSeperator,
    padRight: props?.decimalsCount,
    truncate: props?.decimalsCount,
  })(number);
};

export default formatKPIValue;

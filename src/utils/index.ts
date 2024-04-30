import dayjs from 'dayjs';
export const getAmount = (bills, payType) => {
  return bills.reduce((pre, cur) => {
    if (cur.payType === payType) {
      pre += cur.amount;
      return pre;
    } else {
      return pre;
    }
  }, 0);
};

export const transferData = (bills) => {
  return bills.reduce((pre, cur) => {
    const date = dayjs(cur.ctime).format('YYYY-MM-DD');
    const fIndex =
      pre && pre.length && pre.findIndex((one) => one.date == date);
    if (pre && pre.length && fIndex > -1) {
      pre[fIndex].bills.push(cur);
    } else if (fIndex == -1) {
      pre.push({
        date,
        bills: [cur],
      });
    }
    if (pre.length == 0) {
      pre.push({
        date,
        bills: [cur],
      });
    }
    return pre;
  }, []);
};

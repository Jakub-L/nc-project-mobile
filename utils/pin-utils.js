const convertIsoDate = (isoDate) => {
  const pattern = /(.*)T(.*)\./;
  const [, date, time] = pattern.exec(isoDate) || [];
  return date && time ? `${date} at ${time}` : '';
};

export { convertIsoDate };

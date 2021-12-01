exports.handler = async (context, event, callback) => {
  const storeNumberMap = Runtime.getAssets()["/storeNumberMap.json"].open;
  const storeNumbers = JSON.parse(storeNumberMap());

  const { trackingNumber } = event;

  const localDID = storeNumbers.find((s) => s.trackingNumber == trackingNumber);
  if (localDID) {
    callback(null, { matched: true, localDID });
  } else {
    callback(null, { matched: false });
  }
};

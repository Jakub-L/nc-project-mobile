function relativePhotoDirectionsFromPhone(phoneLat, phoneLong, pins, heading) {
  const locations = [];
  const relativeDirections = [];
  const relativeDirectionsLessThan100m = [];

  console.log(phoneLat, phoneLong);

  //sort pins into array of pin_id, longitude and lattitude
  pins.forEach(pin => {
    const pinLocation = {
      pin_id: pin.pin_id,
      latitude: pin.latitude,
      longitude: pin.longitude
    };

    locations.push(pinLocation);
  });

  locations.forEach(location => {
    //conversion of units

    const photoLat = location.latitude;
    const photoLong = location.longitude;

    const earthRadiusm = 6371000;

    function degreesToRadians(degrees) {
      return (degrees * Math.PI) / 180;
    }

    const dLat = degreesToRadians(photoLat - phoneLat);
    const dLon = degreesToRadians(photoLong - phoneLong);

    const phoneLatR = degreesToRadians(phoneLat);
    const photoLatR = degreesToRadians(photoLat);
    const phoneLongR = degreesToRadians(phoneLong);
    const photoLongR = degreesToRadians(photoLong);

    //DISTANCE between phone and photo

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(phoneLatR) *
        Math.cos(photoLatR);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancem = earthRadiusm * c;

    //ANGLE of photo from true north

    const x = Math.cos(photoLatR) * Math.sin(photoLongR - phoneLongR);
    const y =
      Math.cos(phoneLatR) * Math.sin(photoLatR) -
      Math.sin(phoneLatR) *
        Math.cos(photoLatR) *
        Math.cos(phoneLongR - photoLongR);
    let angle = (Math.atan2(x, y) * 180) / Math.PI;
    angle < 0 ? (angle += 360) : angle;
    //   console.log(angle, "<--- angle from true north");

    //relative distance from phone to photo

    const angleRads = degreesToRadians(angle);
    const headingRads = degreesToRadians(heading);

    const forward = distancem * Math.cos(angleRads - headingRads);
    const right = distancem * Math.sin(angleRads - headingRads);
    const relativeDirection = { forward: forward, right: right };

    relativeDirections.push(relativeDirection);

    if (distancem < 100) relativeDirectionsLessThan100m.push(relativeDirection);
  });

  console.log(
    relativeDirectionsLessThan100m.length,
    "<---array of pins with less than 100m"
  );

  return relativeDirectionsLessThan100m;
}

export default relativePhotoDirectionsFromPhone;

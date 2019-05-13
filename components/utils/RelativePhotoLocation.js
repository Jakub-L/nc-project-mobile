function relativePhotoDirectionsFromPhone(phoneLat, phoneLong, pins, heading) {
  //   let heading = 0;
  //   let phoneLat = "39.099912";
  //   let phoneLong = "-94.581213";
  //   let lat2 = "38.627089";
  //   let lon2 = "-90.200203";

  //sort pins into array of pin_id, longitude and lattitude

  const locations = [];
  const relativeDirections = [];

  pins.forEach(pin => {
    const pinLocation = {
      pin_id: pin.pin_id,
      latitude: pin.latitude,
      longitude: pin.longitude
    };

    locations.push(pinLocation);
  });

  //conversion of units

  let lat2 = locations[0].latitude;
  let lon2 = locations[0].longitude;

  const earthRadiusm = 6371000;

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  const dLat = degreesToRadians(lat2 - phoneLat);
  const dLon = degreesToRadians(lon2 - phoneLong);

  phoneLat = degreesToRadians(phoneLat);
  lat2 = degreesToRadians(lat2);
  phoneLong = degreesToRadians(phoneLong);
  lon2 = degreesToRadians(lon2);

  //DISTANCE between phone and photo

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(phoneLat) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancem = earthRadiusm * c;
  //   console.log(distancem, "<--- distance from phone to photo");

  //ANGLE of photo from true north

  const x = Math.cos(lat2) * Math.sin(lon2 - phoneLong);
  const y =
    Math.cos(phoneLat) * Math.sin(lat2) -
    Math.sin(phoneLat) * Math.cos(lat2) * Math.cos(phoneLong - lon2);
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

  console.log(relativeDirections, "<--- relatve directions from phone screen");

  return relativeDirections;
}

export default relativePhotoDirectionsFromPhone;

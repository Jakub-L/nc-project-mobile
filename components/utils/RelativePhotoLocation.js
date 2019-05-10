function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function relativePhotoDirectionsFromPhone() {
  let heading = 0;
  let lat1 = "39.099912";
  let lon1 = "-94.581213";
  let lat2 = "38.627089";
  let lon2 = "-90.200203";

  const earthRadiusm = 6371000;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);
  lon1 = degreesToRadians(lon1);
  lon2 = degreesToRadians(lon2);

  //DISTANCE between phone and photo

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancem = earthRadiusm * c;
  console.log(distancem, "<--- distance from phone to photo");

  //ANGLE of photo from true north

  const x = Math.cos(lat2) * Math.sin(lon2 - lon1);
  const y =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2);
  let angle = (Math.atan2(x, y) * 180) / Math.PI;
  angle < 0 ? (angle += 360) : angle;
  console.log(angle, "<--- angle from true north");

  //relative distance from phone to photo

  const angleRads = degreesToRadians(angle);
  const headingRads = degreesToRadians(heading);

  const forward = distancem * Math.cos(angleRads - headingRads);
  const right = distancem * Math.sin(angleRads - headingRads);

  const relativeDirections = { forward: forward, right: right };
  console.log(relativeDirections, "<--- relatve directions from phone screen");

  return relativeDirections;
}

relativePhotoDirectionsFromPhone();

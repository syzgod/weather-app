const getDirection = (apiCtx: any) => {
  let deg: number | string = Math.floor(apiCtx.wind.deg);
  switch (true) {
    case deg >= 360 && deg <= 21:
      deg = 'N';
      break;
    case deg >= 22 && deg <= 44:
      deg = 'NNE';
      break;
    case deg >= 45 && deg <= 66:
      deg = 'NE';
      break;
    case deg >= 67 && deg <= 89:
      deg = 'ENE';
      break;
    case deg >= 90 && deg <= 111:
      deg = 'E';
      break;
    case deg >= 112 && deg <= 134:
      deg = 'ESE';
      break;
    case deg >= 135 && deg <= 156:
      deg = 'SE';
      break;
    case deg >= 157 && deg <= 179:
      deg = 'SSE';
      break;
    case deg >= 180 && deg <= 201:
      deg = 'S';
      break;
    case deg >= 202 && deg <= 224:
      deg = 'SSW';
      break;
    case deg >= 225 && deg <= 246:
      deg = 'SW';
      break;
    case deg >= 247 && deg <= 269:
      deg = 'WSW';
      break;
    case deg >= 270 && deg <= 291:
      deg = 'W';
      break;
    case deg >= 292 && deg <= 314:
      deg = 'WNW';
      break;
    case deg >= 315 && deg <= 336:
      deg = 'NW';
      break;
    case deg >= 337 && deg <= 359:
      deg = 'NNW';
      break;
    default:
      deg = 'no data';
  }
  return deg;
};

export default getDirection;

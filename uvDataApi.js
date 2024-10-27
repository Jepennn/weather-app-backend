import axios from "axios";
import dotenv from "dotenv";

//Imorting the so we can get codinates to get the UV index
import { getCordinates } from "./weatherDataApi.js";

dotenv.config();

async function getUvIndex(place) {
  const API_KEY = process.env.OPENUV_API_KEY;
  // Getting coordinates
  const { lat, lon } = await getCordinates(place);
  const URL = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`;

  //Preparing the headers for the request
  const headers = {
    "x-access-token": API_KEY,
    "Content-Type": "application/json",
  };

  //Setting the request options
  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  // Fetching the data from the API
  const response = await axios.get(URL, requestOptions);

  //washing the data
  const uvIndexData = {
    uvIndex: response.data.result.uv.toFixed(1),
    uvMax: response.data.result.uv_max.toFixed(1),
  };
  return uvIndexData;
}

export { getUvIndex };

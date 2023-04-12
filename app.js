const axios = require("axios");
const querystring = require("querystring");

const JWT_BASE_URL = "";
const USER_AUTH_BASE_URL = "";
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const VERSION = "2.5.1";
let token;

const getJwtAuthorization = (clientId, clientSecret) => {
  return null;
};

const main = async () => {
  const biometricPayload = {
    faceBytes: "",
    palmBytes: "",
  };

  const credentials = {
    client_id: "",
    client_secret: "",
    grant_type: "client_credentials",
  };

  let url;
  let requestBody;
  let headers;

  try {
    if (token != null && token !== "") {
      // Token exists, authenticate user
      url = USER_AUTH_BASE_URL;
      requestBody = querystring.stringify(biometricPayload);
      headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      // Get Bearer Token
      url = JWT_BASE_URL;
      requestBody = querystring.stringify(credentials);
      headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      };
    }

    const response = await axios.post(url, requestBody, { headers });

    console.log("Response status code:", response.status);
    console.log("Response body:", response.data);
  } catch (error) {
    console.log("Error calling API:", error.message);
  }
};

main();

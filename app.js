const fetch = require('node-fetch');

const CLIENT_ID = "";
const SECRET = "";
const TENANT_ID = "";
const JWT_BASE_URL = "";
const VERSION = "2.5.1";

class ApiClient {
  constructor() {
    this._httpClient = new fetch.FetchClient();
    this._jsonOptions = { "method": "POST", "headers": { "Content-Type": "application/json" }};
    this._token = null;
  }
  
  async getToken() {
    const postContent = {
      client_id: CLIENT_ID,
      client_secret: SECRET,
      tenant_id: TENANT_ID,
      content_type: "grant_access"
    };
    
    const response = await this._httpClient.post(JWT_BASE_URL, this._jsonOptions, JSON.stringify(postContent));
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const content = await response.json();
    
    // return content;
    return content.toString();
  }
  
  async postAsync(url, postContent) {
    if (!this._token) {
      this._httpClient.setDefaultHeaders({"Authorization": `Bearer ${this._token}`});
    }
    
    const response = await this._httpClient.post(url, this._jsonOptions, postContent);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const content = await response.json();
    
    return content;
  }
}

class AuthenticateUserService {
  constructor(apiClient) {
    this._apiClient = apiClient;
  }
  
  async authenticateAsync(authUrl, payload) {
    const postContent = JSON.stringify(payload);
    const response = await this._apiClient.postAsync(authUrl, postContent);
    return response;
  }
}

class UserAccount {
  constructor() {
    this.accountUuid = "";
  }
}

class BiometricPayload {
  constructor() {
    this.faceBytes = "";
    this.palmBytes = "";
  }
}

async function main() {
  const apiClient = new ApiClient();
  const authService = new AuthenticateUserService(apiClient);
  const USER_AUTHENTICATION_BASE_URL = "";
  
  const payload = new BiometricPayload();
  payload.faceBytes = "";
  payload.palmBytes = "";
  
  const accountUuid = await authService.authenticateAsync(USER_AUTHENTICATION_BASE_URL, payload);
  console.log(`Account Uuid - ${accountUuid.accountUuid}`);
}

main();

// === Fetch api method additional logging ===

// Development use only (remove in production)

if (process.env.NODE_ENV === "development")
{
  const baseFetchMethod = global.fetch;

  global.fetch = async (...args): Promise<Response> => {

    const response = await baseFetchMethod(...args);

    // Request logging
    try {
      let reqUrl;
      let reqHttpMethod;
      let reqBody;
      let reqMode;
      let reqHeaders;
      let reqCredentials;

      const reqInput = args[0];
      const reqInit = args[1];

      reqUrl = (typeof reqInput === "string") ? reqInput : reqInput.toString();
      reqHttpMethod = (reqInit?.method) ? reqInit.method : "GET"; // default fetch http method if unspecified

      if (reqInit) {
        reqBody = reqInit.body?.toString();
        reqMode = reqInit.mode;
        reqHeaders = JSON.stringify(reqInit.headers);
        reqCredentials = reqInit.credentials;
      }

      console.log("\n=================");
      console.log("--- Request ---");
      console.log(`Url: ${reqUrl}`);
      console.log(`Method: ${reqHttpMethod}`);
      if (reqBody) console.log(`Body: ${reqBody}`);
      if (reqMode) console.log(`Mode: ${reqMode}`);
      if (reqHeaders) console.log(`Headers: ${reqHeaders}`);
      if (reqCredentials) console.log(`Credentials: ${reqCredentials}`);
    }
    catch (error) {
      console.log(`Error while logging the fetch request. Error message: ${
        (error instanceof Error) ? error.message : "Undefined"
        }`
      );
    }

    // Response logging
    console.log("--- Response ---");
    process.stdout.write("Status Code: ");
    console.log(response.status);
    process.stdout.write("Status Text: ");
    console.log(response.statusText);
    console.log("=================\n");

    return response;
  }
}

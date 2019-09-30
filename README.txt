here is the simple local server tool to save the postman response.
following endpoints



localhost:3000/{{filenamehere}}/jsontocsv to save the JSON response in CSV formate


localhost:3000/save here is the endpoint to store data in json formate.



Set the first request prescript as below


postman.clearEnvironmentVariable("launchData");
postman.setEnvironmentVariable('configname',  data.configname);


And test as below:

tests["Status code is 200"] = responseCode.code === 200;

var allLaunches = JSON.parse(responseBody);

postman.setEnvironmentVariable('launchData', JSON.stringify(allLaunches));
postman.setEnvironmentVariable('fileName',  request.url.split('/')[1]);    *this only in case json data save.*

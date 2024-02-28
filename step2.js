const fs = require('fs');
const axios = require('axios');

function cat (path)
{
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      // handle possible error
      console.error(`Error reading ${path}`,err);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    console.log(`file contents: ${data}`);
  });

}

if (process.argv.length !== 3) {
  console.error('Usage: node step1.js <file-path>');
} 
else 
{
  const filePath = process.argv[2];
  if (filePath.includes("http:"))
  {
    webCat(filePath)
  }
  else {
    cat(filePath);
  }
 
}

function webCat(url)
{
  axios.get(url)
  .then(function(resp) {
    console.log(resp.data.slice(0, 80), '...');
  })
  .catch(function (err)
  {
    console.error(`Error fetching ${url}`);
    console.error(`Error: Request failed with status code  ${err.response.status}`);
    
  })
  ;

}
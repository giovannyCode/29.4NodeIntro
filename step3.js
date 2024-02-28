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

 
  if (process.argv.length>4)
  {
    if (process.argv[2]== "--out" && process.argv[4].includes("http:") )
    {
      webCatWrite(`./${process.argv[3]}`, process.argv[4])
  
    }
    else
    {
      catWrite(process.argv[4],  process.argv[3])
    }
    
  }
  else 
    {
       const filePath = process.argv[2];
      if (filePath.includes("http:"))
      {
        webCat(filePath)
      }
      else 
      {
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

function catWrite(path, filename)
{

  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      // handle possible error
      console.error(`Error reading ${path}`,err);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    
    fs.writeFile(filename, data, "utf8", function(err) {
      if (err) {
        console.error(`Couldn't write ${filename}\n`,err);
        process.exit(1);
      }
      console.log(`no output, but ${filename} contains contents of ${path}`);
    });
    
   

  });

}

function webCatWrite(path, filename)
{

  axios.get(filename)
  .then(function(resp) {
    const content = `${resp.data.slice(0, 300)} ...`;

  fs.writeFile(path, content, "utf8", function(err) {
  if (err) {
    console.error(`Couldn't write ${path} `,err);
    process.exit(1);
  }
  console.log("# no output, but new.txt contains google's HTML");
});
// file won't have been written yet at this point
      })
  .catch(function (err)
  {
    console.error(`Error fetching ${filename}`);
    console.error(`Error: Request failed with status code  ${err.response.status}`);
    
  })
  ;
 


}
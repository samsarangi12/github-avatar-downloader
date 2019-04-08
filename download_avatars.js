var request = require('request');
var fs = require('fs');
var githubToken = require('./secrets.js');

console.log('Welcome to the Github Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + githubToken.GITHUB_TOKEN
    }
  }

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    var outputData = [];
    var outputDataUser = [];
    for (var i = 0; i < data.length; i++) {
      outputData.push(data[i].avatar_url)
      outputDataUser.push(data[i].login)
    }
   cb(err, outputData, outputDataUser)
  })

}

function downloadImageByURL(url, filePath) {
  for (var i = 0; i < url.length; i++) {
    request.get(url[i])
           .on('error', function(err) {
              throw err
            })
           .on('response', function(response) {
              console.log("Download status: ", response.statusCode)
            })
           .pipe(fs.createWriteStream('./avatars/' + filePath[i] + '.jpg'));
  }

}


getRepoContributors("jquery", "jquery", function(err, result, user) {
  console.log("Errors:", err);
  console.log("Result:", result);
  downloadImageByURL(result, user);
});



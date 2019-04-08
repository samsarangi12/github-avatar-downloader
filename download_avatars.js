var request = require('request');
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
    for (var i = 0; i < data.length; i++) {
      outputData.push(data[i].avatar_url)
    }
    cb(err, outputData)
  })
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});



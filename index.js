#!/usr/bin/env node

/* global require module process */

var execSync = require("child_process").execSync,
    fadedProgressbar = require("faded-progressbar"),
    GitHubApi = require("github"),
    github = new GitHubApi({
        debug: true,
        protocol: "https",
        host: "api.github.com",
        headers: {
            "user-agent": "git-getter"
        },
        Promise: require('bluebird'),
        followRedirects: false,
        timeout: 5000
    }),
    arguments = process.argv,
    username = arguments[2];

github.repos.getForUser({
    username: username,
    type: "owner"
}, function(err, res) {
    var sourceRepos = res.filter(function (r) {
        return !r.fork;
    }).slice(0, 3);

    console.log("" + sourceRepos.length + " repositories found");

    var downloadProcess = fadedProgressbar.newProcess("Downloading repositories", sourceRepos.length);

    downloadProcess.start();
    
    sourceRepos.forEach(function (r, i) {
        execSync("git clone " + r.clone_url, {
            stdio: [0, 1, 2]
        });
        downloadProcess.updateProgress(i + 1);
    });
});

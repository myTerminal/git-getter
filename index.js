#!/usr/bin/env node

/* global require module process */

var execSync = require('child_process').execSync,
    fadedProgressbar = require('faded-progressbar'),
    GitHubApi = require('github'),
    github = new GitHubApi({
        protocol: 'https',
        host: 'api.github.com',
        headers: {
            'user-agent': 'git-getter'
        },
        Promise: require('bluebird'),
        followRedirects: false,
        timeout: 5000
    }),
    args = process.argv,
    username = args[2],
    addResults = function (link, results, onDone) {
        github.getNextPage(link, null, function (err, res) {
            if (res.data.length == 30) {
                addResults(res, results.concat(res.data), onDone);
            } else {
                onDone(results.concat(res.data));
            }
        })
    },
    downloadRepos = function (repos) {
        var sourceRepos = repos.filter(r => !r.fork),
            downloadProcess;

        console.log('' + sourceRepos.length + ' repositories found');

        downloadProcess = fadedProgressbar.newProcess('Downloading repositories', sourceRepos.length);
        downloadProcess.start();

        sourceRepos.forEach((r, i) => {
            execSync('git clone ' + r.clone_url, {
                stdio: [0, 1, 2]
            });
            downloadProcess.updateProgress(i + 1);
        });
    };

github.repos.getForUser(
    {
        username: username,
        type: 'owner'
    },
    function(err, res) {
        addResults(res, res.data, downloadRepos);
    }
);

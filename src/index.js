#!/usr/bin/env node

/* global require process */

const { execSync } = require('child_process');
const fadedProgressbar = require('faded-progressbar');
const GitHubApi = require('github');
const Promise = require('bluebird');

const github = new GitHubApi({
    protocol: 'https',
    host: 'api.github.com',
    headers: {
        'user-agent': 'git-getter'
    },
    Promise,
    followRedirects: false,
    timeout: 5000
});
const args = process.argv;
const username = args[2];

const addResults = (link, results, onDone) => {
    github.getNextPage(
        link,
        null,
        (err, res) => {
            if (res.data.length === 30) {
                addResults(res, results.concat(res.data), onDone);
            } else {
                onDone(results.concat(res.data));
            }
        }
    );
};

const downloadRepos = repos => {
    const sourceRepos = repos.filter(r => !r.fork);

    console.log(`${sourceRepos.length} repositories found`);

    const downloadProcess = fadedProgressbar.newProcess('Downloading repositories', sourceRepos.length);
    downloadProcess.start();

    sourceRepos.forEach(
        (r, i) => {
            execSync(
                `git clone ${r.clone_url}`,
                {
                    stdio: [0, 1, 2]
                }
            );
            downloadProcess.updateProgress(i + 1);
        }
    );
};

github.repos.getForUser(
    {
        username: username,
        type: 'owner'
    },
    (err, res) => {
        addResults(res, res.data, downloadRepos);
    }
);

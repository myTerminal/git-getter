#!/usr/bin/env node

/* global require process */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const fadedProgressbar = require('faded-progressbar');
const GitHubApi = require('github');
const Promise = require('bluebird');
const { argv } = require('yargs');

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

// Extract arguments
const {
    username,
    targetPath = '.',
    ssh: useSSH
} = argv;

// Validate whether a username was supplied
if (!username) {
    console.log('Please provide the username!');
    process.exit();
}

// Validate the supplied directory, if any
if (!fs.existsSync(targetPath) || !fs.lstatSync(targetPath).isDirectory()) {
    console.log('Please provide a valid path!');
    process.exit();
}

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
        (
            {
                name,
                clone_url: cloneUrl,
                ssh_url: sshUrl
            },
            i
        ) => {
            execSync(
                `git clone ${useSSH ? sshUrl : cloneUrl} ${path.join(targetPath, name)}`,
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

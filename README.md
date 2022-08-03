# git-getter

[![npm version](https://badge.fury.io/js/git-getter.svg)](https://badge.fury.io/js/git-getter)
[![npm downloads](https://img.shields.io/npm/dt/git-getter.svg)](https://www.npmjs.com/package/git-getter)
[![License](https://img.shields.io/github/license/myTerminal/ample-alerts.svg)](https://opensource.org/licenses/MIT)  
[![Build Status](https://travis-ci.org/myTerminal/git-getter.svg?branch=master)](https://travis-ci.org/myTerminal/git-getter)
[![Code Climate](https://codeclimate.com/github/myTerminal/git-getter.png)](https://codeclimate.com/github/myTerminal/git-getter)
[![js-myterminal-style](https://img.shields.io/badge/code%20style-myterminal-blue.svg)](https://www.npmjs.com/package/eslint-config/myterminal)
[![Coverage Status](https://img.shields.io/coveralls/myTerminal/git-getter.svg)](https://coveralls.io/r/myTerminal/git-getter?branch=master)  
[![NPM](https://nodei.co/npm/git-getter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/git-getter/)

A utility to get all repositories for a specific user/organization

## Installation

*git-getter* is available on *Npm*. You can install it globally with a simple command.

    npm install -g git-getter

## How to Use

Run `git-getter` from the command line and provide the name of the user you want the projects to be cloned from and the directory you want them to be placed in.

    git-getter --username <user> [--targetPath <path>] [--ssh]

The `targetPath` is optional, not supplying which will clone projects to the current directory.

For example, running

    git-getter --username myTerminal --targetPath ~/_repositories

will download all the repositories owned by the user *myTerminal* on GitHub at *~/_repositories*.

The optional switch `--shh` can be used to clone projects using `ssh`. Note that this needs an SSH key to be present on the system.

## To-do

* Download repositories for an organization
* Integration with GitLab

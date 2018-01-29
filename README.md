# git-getter

[![npm version](https://badge.fury.io/js/git-getter.svg)](https://badge.fury.io/js/git-getter)
[![npm downloads](https://img.shields.io/npm/dt/git-getter.svg)](https://www.npmjs.com/package/git-getter)  
[![Build Status](https://travis-ci.org/myTerminal/git-getter.svg?branch=master)](https://travis-ci.org/myTerminal/git-getter)
[![Code Climate](https://codeclimate.com/github/myTerminal/git-getter.png)](https://codeclimate.com/github/myTerminal/git-getter)
[![Package Quality](http://npm.packagequality.com/shield/git-getter.svg)](http://packagequality.com/#?package=git-getter)
[![Coverage Status](https://img.shields.io/coveralls/myTerminal/git-getter.svg)](https://coveralls.io/r/myTerminal/git-getter?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/myTerminal/git-getter/badges/score.svg)](https://www.bithound.io/github/myTerminal/git-getter)
[![bitHound Code](https://www.bithound.io/github/myTerminal/git-getter/badges/code.svg)](https://www.bithound.io/github/myTerminal/git-getter)  
[![Dependency Status](https://david-dm.org/myTerminal/git-getter.svg)](https://david-dm.org/myTerminal/git-getter)
[![devDependency Status](https://david-dm.org/myTerminal/git-getter/dev-status.svg)](https://david-dm.org/myTerminal/git-getter#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/git-getter/peer-status.svg)](https://david-dm.org/myTerminal/git-getter#info=peerDependencies)  
[![License](https://img.shields.io/badge/LICENSE-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)  
[![NPM](https://nodei.co/npm/git-getter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/git-getter/)

A utility to get all repositories for a specific user/organization

## Installation

*git-getter* is available on *Npm*. You can install it globally with a simple command.

    npm install -g git-getter

## How to Use

Run `git-getter` from the command line passing it the name of the user for which you want to download all the repositories.

For example, running

    git-getter myTerminal

will download all the repositories owned by the user *myTerminal* on GitHub at the current path.

## Dependencies

* [github](https://www.npmjs.com/package/github)
* [bluebird](https://www.npmjs.com/package/bluebird)
* [faded-progressbar](https://www.npmjs.com/package/faded-progressbar)

## To-do

* Option to download repositories at a given path
* Download repositories for an organization
* Integration with GitLab

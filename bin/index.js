#!/usr/bin/env node
"use strict";var execSync=require("child_process").execSync,fadedProgressbar=require("faded-progressbar"),GitHubApi=require("github"),github=new GitHubApi({debug:!0,protocol:"https",host:"api.github.com",headers:{"user-agent":"git-getter"},Promise:require("bluebird"),followRedirects:!1,timeout:5e3}),args=process.argv,username=args[2];github.repos.getForUser({username:username,type:"owner"},function(e,r){var o,s=r.data.filter(function(e){return!e.fork});console.log(s.length+" repositories found"),(o=fadedProgressbar.newProcess("Downloading repositories",s.length)).start(),s.forEach(function(e,r){execSync("git clone "+e.clone_url,{stdio:[0,1,2]}),o.updateProgress(r+1)})});
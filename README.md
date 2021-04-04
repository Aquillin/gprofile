# gprofile
A command line tool for using git with multiple user profiles.
Intended for anybody who uses ssh and manages multiple git accounts on a single computer.

## Installation (Production Version)
Run `npm install -g gprofile` to globally install this CLI. Once installed you can access it via `gprofile` in the command line.

## Running in Development
After cloning this repository run `yarn gprofile [...args]` or `npm run gprofile [...args]`
If you're not using yarn you should install it... [Here are some instructions](https://yarnpkg.com/getting-started/install)

## Commands
Note, all git profile username + email pairings are stored in a local JSON file on your machine unencrypted.

`gprofile create -u <username> -e <email>` - Creates a git profile with a username corresponding to a github username and an email corresponding to a contact email.
`gprofile update <old_username> [-u <username>] [-e <email>]` - Updates either the username, email or both for a git profile.
`gprofile remove -u <username>` - Deletes a git profile from the local data store.
`gprofile use -u <username>` - Updates the git config `user.name` and `user.email` to match the profile you selected.
`gprofile list` - Lists all current git profiles stored by `gprofile`.
`gprofile` `gprofile help` - Lists all of the above commands and their parameters.
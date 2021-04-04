# gprofile
A command line tool for using git with multiple user profiles.
Intended for anybody who uses ssh and manages multiple git accounts on a single computer.

## Commands
Note, all username + email pairings are stored in a local JSON file on your machine unencrypted.
The commands were made using [commander](https://www.npmjs.com/package/commander).

`gprofile create -u <username> -e <email>` - Creates a git profile with a git username + email pairing.
`gprofile update <old_username> [-u <username>] [-e <email>]` - Updates either the username, email or both for an old user profile. 
`gprofile remove -u <username>` - Deletes a git profile from the local data store.
`gprofile use -u <username>` - Updates the git config `user.name` and `user.email` to match for the username you selected.
`gprofile list` - Lists all current profiles in existance.
`gprofile` `gprofile help` - Lists all of the above commands and their parameters.
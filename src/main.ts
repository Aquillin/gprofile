#!/usr/bin/env node
import commander = require('commander');
import inquirer = require('inquirer');
import { execSync } from 'child_process';
import Store, { GProfileStore } from './data.store';
import TextUtils from './util/Text.util';

import chalk = require('chalk');

const program = new commander.Command();

function validateUsername(username: string) {
    if (!username.includes('.')) return true;
    else {
        invalidUsername();
        process.exit(-1);
    }
}

function invalidUsername() {
    console.log(
        chalk.redBright.bold(
            `ERROR: Invalid username provided! Usernames must not include the "." character.`
        )
    );
}

type CreateCommandOptions = { username: string; email: string };
program
    .command('create')
    .description('Create a new git profile.')
    .requiredOption('-u --username <username>')
    .requiredOption('-e --email <email>')
    .action(function ({ username, email }: CreateCommandOptions) {
        validateUsername(username);
        Store.merge({ profiles: { [username]: { username, email } } });
        console.log(`${chalk.greenBright("✔")} Git profile created with username ${chalk.greenBright.bold(username)} and email ${chalk.blueBright.bold(email)}`);
    });

type RemoveCommandOptions = { username: string };
program
    .command('remove')
    .description('Remove a git profile referenced via username.')
    .requiredOption('-u --username <username>')
    .action(function ({ username }: RemoveCommandOptions) {
        validateUsername(username);
        Store.removeVal(`profiles.${username}`);
        console.log(
            chalk.redBright.bold(
                `Successfully removed the "${username}" git profile.`
            )
        );
    });

type UpdateCommandOptions = { username?: string; email?: string };
program
    .command('update <old_name>')
    .description('Update the username or email for a git profile.')
    .option('-u --username <username>')
    .option('-e --email <email>')
    .action(function (
        old_name: string,
        { username, email }: UpdateCommandOptions
    ) {
        validateUsername(old_name);
        const updateObject: UpdateCommandOptions = {};
        if (username !== undefined) updateObject.username = username;
        if (email !== undefined) updateObject.email = email;

        Store.merge({
            profiles: { [old_name]: updateObject },
        });
        if (username !== undefined)
            console.log(
                chalk.greenBright.bold(
                    `✔ Successfully updated username to ${updateObject.username} for ${old_name}`
                )
            );
        if (email !== undefined)
            console.log(
                chalk.blueBright.bold(
                    `✔ Successfully updated email to ${updateObject.email} for ${old_name}`
                )
            );
    });

program
    .command('list')
    .option('--full')
    .description('List all git profiles using username.')
    .action(function (options: { full: boolean }) {
        const profiles = Store.getVal<GProfileStore['profiles']>('profiles');
        if (profiles) {
            console.log(chalk.yellowBright('Git Profiles (key: username - email)'));
            console.log(chalk.yellowBright('Use --full to reveal full usernames + emails.'));
            if (options.full) {
                for (let key in profiles) {
                    const profile = profiles[key];
                    const usernameText = chalk.greenBright.bold(profile.username);
                    const emailText = chalk.blueBright(profile.email);
                    console.log(`${key}: ${usernameText} - ${emailText}`);
                }
            } else {
                for (let key in profiles) {
                    const profile = profiles[key];
                    const visibleAmt = 2;
                    const usernameText = chalk.greenBright.bold(
                        TextUtils.censor(profile.username, visibleAmt)
                    );
                    const emailText = chalk.blueBright(
                        TextUtils.censor(profile.email, 0)
                    );
                    console.log(`${TextUtils.censor(key, visibleAmt)}: ${usernameText} - ${emailText}`);
                }
            }
        }
    });

program
    .command('use <profile>')
    .description('Use a profile as your current git profile')
    .action((username: string) => {
        validateUsername(username);
        const profile = Store.getVal<GProfileStore['profiles']['']>(
            `profiles.${username}`
        );
        if (profile) {
            execSync(`git config user.name ${profile.username}`);
            execSync(`git config user.email ${profile.email}`);

            console.log(
                chalk.greenBright.bold(
                    'Git username and email successfully updated!'
                )
            );
        } else {
            console.log(chalk.redBright(`No profile with the key ${username} exists. A profile's key is the list of characters before the ":" in `) + '"gprofile list"');
        }
    });

program.parse(process.argv);

# Discord bot - mBot

- Discord bot with a variety of server moderating commands, an economy system, and games to play. 

- Created using Node.js, Discord.js, MongoDB, hosted with Heroku.

# Commands

## General Commands

### !help

- Directly messages you with a list of commands m-bot can perform 

![help](https://user-images.githubusercontent.com/27537005/114728472-1eb13e00-9d0d-11eb-8cd7-61caceeb0a3d.png)

### !serverinfo

- Displays information about the current server you're in

![serverInfo](https://user-images.githubusercontent.com/27537005/114728475-1eb13e00-9d0d-11eb-9fb8-580a0a05cde7.png)

### !userinfo

- Displays the user account's information

![userInfo](https://user-images.githubusercontent.com/27537005/114728476-1eb13e00-9d0d-11eb-831f-c3e117d1e2b0.png)

## Game Commands

### !dice <dice #> <bet amount>

- Play dice, winners get a 6x payout

![dice](https://user-images.githubusercontent.com/27537005/114728478-1f49d480-9d0d-11eb-8e80-45e448a6aff9.png)
![dice2](https://user-images.githubusercontent.com/27537005/114728468-1e18a780-9d0d-11eb-8808-f900606fee50.png)

### !cf <h or t> <bet amount>

- Do a coinflip, bet on heads or tails and get a 2x payout

![coinflip](https://user-images.githubusercontent.com/27537005/114729652-2de4bb80-9d0e-11eb-86f2-168340eb01f5.png)

## Economy Commands

### !coins or !coins <@user>

- Check how many coins you have in your wallet OR check how many coins another user has in the server

![coins](https://user-images.githubusercontent.com/27537005/114728477-1eb13e00-9d0d-11eb-9959-79a8f720130d.png)

### !donate <amount> <@user>

- Feeling generous? Donate a selected amount of coins to another user in the server

![donate](https://user-images.githubusercontent.com/27537005/114731887-16a6cd80-9d10-11eb-8775-8ed322b8a6dd.png)

## Server Moderation Commands (For admins)

### !kick <@user>

- Kick a selected user from the server

![kick](https://user-images.githubusercontent.com/27537005/114728473-1eb13e00-9d0d-11eb-8bb6-ef3beabd4eff.png)

### !report <@user> <reason>

- Reports a user for inappropriate actions

![report](https://user-images.githubusercontent.com/27537005/114728474-1eb13e00-9d0d-11eb-9d9e-b4d6646a7a87.png)

### !purge <# msgs to be cleared>

- Clears a select amount of messages in the server

![purge](https://user-images.githubusercontent.com/27537005/114730828-35f12b00-9d0f-11eb-9c44-6c1b6196eb3b.png)

### !ban <@user>

- Bans a selected user from the server

![ban](https://user-images.githubusercontent.com/27537005/114731201-89fc0f80-9d0f-11eb-93a1-abbc482f741f.png)
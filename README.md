# Disco Byngo
> Play music bingo with your friends using your own Spotify Playlists

This is my first somewhat larger project. Disco Byngo allows you to play musical bingo with your friends using your very own Spotify Playlists.
It requires you to log into Spotify using OAuth2.0 and gives you access to all your personal playlists and playlists saved. It is a work-in-progress sideproject, so you you might stumble upon some bugs.

## Features
* Unlimited playlists
* Unlimited songs
* Automatic bingo card generator
* Host options
* Bingo-validity checker
* Private game rooms
* Everything is done in a real-time online multiplayer environment

## Challenges
* Keeping the websocket connection alive on mobile phones turned out to be very difficult as mobile phone connections automatically close when users lock their screen. 
> **Solution**: Close connection when screen is locked, reopen a websocket connection upon re-opening screen. Send all up-to-date room info to the user.

## Demo
https://discobyngo.com

## Libraries used
* ReactJS
* Node/Express
* Socket.io
* Spotify Web API

## Hosting
* **Frontend:** Netlify
* **Backend:** Heroku

# faceitdemodownloader
Simple faceit demo downloader written by fredmatix.
It is intended to be run with node. you can run it "npm run start" after you copied the package.json and installed its dependencies listed in there!
It can also serve as a service on Linux

faceitAPIKey - get it from https://developers.faceit.com/docs/auth/api-keys 

Features:
- set a desired folder for your demos
- limit the amount of demos to download.
- download demos for multiple users at once
- set the download interval and run it as a service!
- works with every demomanager (doesnt touch the modify timestamp of the files!)

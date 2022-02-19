# CS:GO Faceit Demo Downloader
Simple faceit demo downloader for your CS:GO stats tracking experience or analysis.
Can also serve as a service on Linux

It is intended to be run with node on ubuntu. you can run it with "npm run start" after you copied the package.json and installed its dependencies listed in there!
Example: (npm install axios)
It uses curl, wget, gzip and rsync. make sure you have them installed!

A faceit API key is needed - get it from https://developers.faceit.com/docs/auth/api-keys 

Features:
- set a desired folder for your demos
- limit the amount of demos to download.
- download demos for multiple users at once
- set the download interval and run it as a service!
- works with every demomanager (doesnt touch the modify timestamp of the files!)

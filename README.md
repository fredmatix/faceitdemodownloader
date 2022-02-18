# faceitdemodownloader
Simple faceit demo downloader written by fredmatix.
It is intended to be run with "npm run start" and can also serve as a service on Linux

faceitAPIKey - get it from https://developers.faceit.com/docs/auth/api-keys 

tempFolder - Where should the .gz files get stored to? (they get deleted afterwards)

demoFolder - Demos get written in the yyyy-mm-dd-hh-mm${demoSuffix} format in this folder and need to stay there.
or they will get written again if they are in the scope of the ${demoAmount}

demoSuffix - Edit the ending of your files. Please provide .dem in the end

demoAmount - Match history gets queryied from the newest to the oldest declared by the amount

demoServer - Edit only if it ever really changes or is different depending of your region!
Check by manually downloading a demo from a game of yours and copy the downloadlink.

playerListUrl - Provide Semicolon(;) separated list with usernames to download demos from eg. guy1;guy2;guy3
omit any semicolon in the end of the line. if theres only guy1 then just write guy1

downloadInterval - Set your download interval in minutes here. eg. 5;

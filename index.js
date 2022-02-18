// Simple faceit demo downloader written by fredmatix
// It is intended to be run with "npm run start" and can also serve as a service on Linux
// Check the Edit Section below to understand how it works

// Edit Section //
// faceitAPIKey - get it from https://developers.faceit.com/docs/auth/api-keys 
const faceitAPIKey = "";
// tempFolder - Where should the .gz files get stored to? (they get deleted afterwards)
const tempFolder = "";
// demoFolder - Demos get written in the yyyy-mm-dd-hh-mm${demoSuffix} format in this folder and need to stay there.
// or they will get written again if they are in the scope of the ${demoAmount}
const demoFolder = "";
// demoSuffix - Edit the ending of your files. Please provide .dem in the end
const demoSuffix = "-faceit.dem"
// demoAmount - Match history gets queryied from the newest to the oldest declared by the amount
const demoAmount = "5";
// demoServer - Edit only if it ever really changes or is different depending of your region!
// Check by manually downloading a demo from a game of yours and copy the downloadlink.
const demoServer = "https://demos-europe-west2.faceit-cdn.net/csgo/";
// playerListUrl - Provide Semicolon(;) separated list with usernames to download demos from eg. guy1;guy2;guy3
// omit any semicolon in the end of the line. if theres only guy1 then just write guy1
const playerListUrl = "someplayers.txt";
// downloadInterval - Set your download interval in minutes here. eg. 5;
const downloadInterval = 5;
// End Edit Section //

const fs = require("fs-extra");
const axios = require("axios");
const { exec } = require("child_process");

const playersList = fs.readFileSync(playerListUrl, "utf-8");
const playerArray = playersList.split(";");
const functionInterval = downloadInterval * 60 * 1000;

const download = async () => {
  const playerIDArray = [];

  for (let i = 0; i < playerArray.length; i++) {
    try {
      const result = await axios.get(
        `https://open.faceit.com/data/v4/players?nickname=${playerArray[i]}`,
        {
          headers: {
            Authorization: `Bearer ${faceitAPIKey}`,
            accept: "application/json",
          },
        }
      );
      const matchId = await axios.get(
        `https://open.faceit.com/data/v4/players/${result.data.player_id}/history?game=csgo&offset=0&limit=${demoAmount}`,
        {
          headers: {
            Authorization: `Bearer ${faceitAPIKey}`,
            accept: "application/json",
          },
        }
      );
      matchId.data.items.forEach((match) => {
          const timestamp = `${match.started_at}`;
          const formattedTime=new Date(timestamp * 1000).toISOString().slice(-24).replace(/\D/g,'-').slice(0, 16);
          exec(
            `curl -I ${demoServer}${match.match_id}-1-1.dem.gz`,
            (error, stdout, stderr) => {
              if (stdout.includes("application/octet-stream")) {
                const demoFile = `${demoFolder}/${formattedTime}${demoSuffix}`
                fs.access(demoFile, fs.F_OK, (err) => {
                    if (!err) {
                          console.log(`${demoFile} already exists!`)
                              return
                              }
                else{
                  console.log(`downloading ${demoFile}`)
                exec(
                  `wget -nc -q -O ${tempFolder}/${match.match_id}-1-1.dem.gz ${demoServer}${match.match_id}-1-1.dem.gz`,
                  (error, stdout, stderr) => {
                    exec(
                      `yes n | gzip -kdN ${tempFolder}/${match.match_id}-1-1.dem.gz ${tempFolder}/`,
                      (error, stdout, stderr) => {
                        exec(
                          `rsync -ptD ${tempFolder}/${match.match_id}-1-1.dem ${demoFolder}/${formattedTime}${demoSuffix} && rm ${tempFolder}/${match.match_id}-1-1.dem.gz && rm ${tempFolder}/${match.match_id}-1-1.dem`,
                          (error, stdout, stderr) => {}
                        );
                      }
                    );
                  }
                )};
             }) }
            }
          );
      });
    } catch (error) {
      console.log(error.response);
    }
  }
};
download();
setInterval(download, functionInterval);

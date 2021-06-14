var Twit = require("twit");

var T = new Twit({
  consumer_key: "KvD71beW7Gy1vkD3u0uXYStnr",
  consumer_secret: "jAdpS1FP0wMjG5pcz7UqULM1DlsngfnWoZDx6F7wj4anb7iYxq",
  access_token: "1404311165308526593-3C6YPTvguxqMvWyFKVzRooG7fKPRin",
  access_token_secret: "VyW54yWrWPKPloIQoL6EXOzgLlbNs3ff64b4i3AHj5gMp",
});

const sendMessageTo = "AshishT89553405";

// GET ALL THE FOLLOWERS FOR YOUR ACCOUNT

T.get("followers/list", function (err, data, response) {
  if (!err) {
    // FIND IF THE USER YOU WANT TO MESSAGE TO, IS YOUR FOLLOWER
    const recepient = data.users.filter((x) => x.screen_name == sendMessageTo);
    if (!recepient.length) {
      throw new Error("User is not your follower");
    }

    const { name, id_str } = recepient[0];

    var params = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: id_str },
          message_data: {
            text: `Hello ${name} Your OTP is:  12345`,
          },
        },
      },
    };

    // IF THE USER IS IN YOUR FOLLOWERS LIST, SEND A MESSAGE TO HIM/HER
    T.post(
      "direct_messages/events/new",
      params,
      function (err, data, response) {
        if (err) {
          return console.log("Somethign went wrong", err);
        }

        console.log("MESSAGE SENT SUCCESSFULLY");
      }
    );
  }
});

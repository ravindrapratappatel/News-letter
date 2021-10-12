const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require('https');

const app = express();
app.use(express.static("Public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  console.log(fname, lname, email);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const Jsondata=JSON.stringify(data);
  const url="https://usX.api.mailchimp.com/3.0/lists/yourlist_id";
  const option={
      method: "POST",
      auth: "Username:api_id"
  }
  
 const request= https.request(url, option, function(response)
  {
 //  response.on('data', function (data){
  //     console.log(JSON.parse(data));
  // })
  if(response.statusCode===200)
  {
      res.sendFile(__dirname+'/success.html');
  }
  else{
      res.sendFile(__dirname+'/failur.html');
  }
  })

  request.write(Jsondata);
  request.end();
  
});

app.post('/failure', function(req, res)
{
res.redirect('/');
})
app.post('/back', function(req, res)
{
res.redirect('/');
})
app.listen(process.env.PORT ||3000, function () {
  console.log("Server started");
});
 
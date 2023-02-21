require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));

const { Onfido, Region, OnfidoApiError } = require("@onfido/api");
const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  region: Region.EU,
});

app.get("/", (req, res) => {
  res.render("form");
});

let workflowRunId;
let webhookPayload;

app.post("/submit", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const workflowId = req.body.workflowId;

    const applicant = await onfido.applicant.create({
      firstName: firstName,
      lastName: lastName,
    });
    const applicantId = applicant.id;

    const generateSdkToken = await onfido.sdkToken.generate({
      applicantId: applicantId,
      referrer: "*://*/*",
    });

    const workflowRun = await onfido.workflowRun.create({
      applicantId: applicant.id,
      workflowId: workflowId,
    });

    workflowRunId = workflowRun.id;

    res.render("index", {
      sdkToken: generateSdkToken,
      workflowRunId: workflowRunId,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/verifyDetails", async (req, res) => {
  try {
    console.log(workflowRunId);
    const workflowRunObject = await onfido.workflowRun.find("a2f7d5fc-b324-47d3-94a6-a01722038b48");
    console.log(workflowRunObject);
    const addressParts = workflowRunObject.output.addressLine1.split(",");
    const [road, town, city] = workflowRunObject.output.addressLine1
      .split(",")
      .map((str) => {
        return str
          .trim()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
      });
    const transformedData = {
      firstName:
        workflowRunObject.output.firstName.charAt(0).toUpperCase() +
        workflowRunObject.output.firstName.slice(1).toLowerCase(),
      lastName:
        workflowRunObject.output.lastName.charAt(0).toUpperCase() +
        workflowRunObject.output.lastName.slice(1).toLowerCase(),
      dob: workflowRunObject.output.dob,
      road: road,
      town: town,
      city: city,
      postcode: workflowRunObject.output.addressLine2,
    };

    res.render("verify-details", transformedData);
  } catch (error) {
    if (error instanceof OnfidoApiError) {
      console.log(error.message);
      console.log(error.type);
      console.log(error.isClientError());
    } else {
      console.log(error.message);
    }
  }
});

app.get("/extractingData", (req, res) => {
  res.render("extracting-data");
});


/* app.post('/webhook', (req, res) => {
  const payload = req.body;
  let road = "";
  let town = "";
  let city = "";
  if (payload.payload.resource.output.address_line_1) {
    const addressParts = payload.payload.resource.output.address_line_1.split(",");
    [road, town, city] = addressParts.map((str) => {
      return str
        .trim()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    });
  }
  const transformedData = {
    firstName:
      payload.payload.resource.output.first_name.charAt(0).toUpperCase() +
      payload.payload.resource.output.first_name.slice(1).toLowerCase(),
    lastName:
      payload.payload.resource.output.last_name.charAt(0).toUpperCase() +
      payload.payload.resource.output.last_name.slice(1).toLowerCase(),
    dob: payload.payload.resource.output.dob,
    road: road,
    town: town,
    city: city,
    postcode: payload.payload.resource.output.address_line_2,
  }
  console.log(payload.payload.resource.output.address_line_1);
  // handle the webhook event
  res.render("verify-details", transformedData);
});
*/

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

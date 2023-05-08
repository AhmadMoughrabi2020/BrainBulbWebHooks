import dialogflow from "dialogflow";
import { v4 as uuidv4 } from "uuid";
// import private_key from "../utils/erp-system-382922-51892776d554.json" assert { type: "json" };
const myUUID = uuidv4();

const projectId = "erp-system-382922"; // Replace with your project ID
const privateKeyFile = "./utils/erp-system-382922-51892776d554.json"; // Replace with the path to your private key file

const sessionClient = new dialogflow.SessionsClient({
  projectId,
  keyFilename: privateKeyFile,
});

async function detectIntent(message, sessionId) {
  const sessionPath = sessionClient.sessionPath(projectId, sessionId || myUUID);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en-US",
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return result;
}

export default { detectIntent };

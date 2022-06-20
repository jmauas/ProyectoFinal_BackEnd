import twilio from "twilio";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

const client = twilio(process.env.SID_TWILIO, process.env.TOKEN_TWILIO);

export const sms = async (body, to) => {
  try {
    const message = {
      body: body,
      from: `+${process.env.SMS_ADMIN}`,
      to: `+${to}`,
    };
    const response = await client.messages.create(message);
    logger.info(response);
  } catch (error) {
    logger.error(error);
  }
}

export const wp = async (body, to, att) => {
  try {
    const message = {
      body: body,
      from: `whatsapp:+${process.env.WP_ADMIN}`,
      to: `whatsapp:+${to}`
    };
    if (att!='') {
      message.mediaUrl= [att]
    };
    const response = await client.messages.create(message);
    logger.info(response);
  } catch (error) {
    logger.error(error);
  }
}

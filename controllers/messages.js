import { normalizeMsg } from './normalizr.js';
import {servicePostMessage, serviceGetMessages} from "../services/servicesMessages.js"


const postMessage = async (msg) => {
    try {
        await servicePostMessage(msg);
        return true
        
    } catch (error) {
        throw new Error(error);
    }
}

const getMessages  = async () => {
    try {
        const messages = await serviceGetMessages()
        
        return normalizeMsg(messages);
    } catch (error) {
        throw new Error(error);
    }
}

export { postMessage, getMessages };

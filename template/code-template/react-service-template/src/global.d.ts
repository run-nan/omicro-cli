import {Bus} from "@runnan/obvious"; // eslint-disable-line

declare global {
    interface Window {
        Bus: {
            [name: string]: Bus
        };
    }
}

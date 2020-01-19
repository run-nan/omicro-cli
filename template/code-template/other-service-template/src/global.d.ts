import {Bus} from "@runnan/obvious/lib/socket"; // eslint-disable-line

declare global {
    interface Window {
        Bus: {
            [name: string]: Bus
        };
    }
}
import type { DescriptionType, Page } from "./common.types"

export interface ForProfessionalsPage extends Page {
    "description": {
        "type": DescriptionType;
        "content": {
            "partner_zone": PartnerZone;
            "architect_zone": ArchitectZone;
        }
    }
}

export type ArchitectZone = {
    "title": string;
    "section_1": ArchitectZoneSection1;
    "section_2": ArchitectZoneSection2;
    "section_3": ArchitectZoneSection3;
}

export type PartnerZone = {
    "title": string;
    "section_1": PartnerZoneSection1;
    "section_2": PartnerZoneSection2;
    "section_3": PartnerZoneSection3;
};

export type ArchitectZoneSection1 = {
    "left": {
        "text": string[];
    },
    "right": {
        "title": string;
        "text": string[];
    }
}
export type ArchitectZoneSection2 = {
    "left": {
        "title": string;
        "items": string[];
        "phone": string;
        "email": string;
    },
    "right": {
        "title": string;
        "button": string;
        "path": string;
        "image": string;
    }
}

export type ArchitectZoneSection3 = {
    "box_1": {
        "title": string;
        "text": string;
        "button": string;
        "link": string;
    },
    "box_2": {
        "title": string;
        "text": string;
        "button": string;
        "link": string;
    },
    "box_3": {
        "title": string;
        "text": string;
        "button": string;
        "link": string;
    },
    "box_4": {
        "title": string;
        "text": string;
        "button": string;
        "link": string;
    },
}

export type PartnerZoneSection1 = {
    "left": {
        "title": string;
        "text": string;
    },
    "right": {
        "title": string;
        "text": string;
    }
}

export type PartnerZoneSection2 = {
    "left": {
        "title": string;
        "text": string;
        "button": string;
        "path": string;
    },
    "right": {
        "title": string;
        "text": string;
        "button": string;
        "path": string;
    }
}

export type PartnerZoneSection3 = {
    "left": string;
    "right": string;
}
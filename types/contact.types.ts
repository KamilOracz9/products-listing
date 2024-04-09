import type { DescriptionType, Page } from "./common.types"

export interface ContactPage extends Page {
    "description": {
        "type": DescriptionType,
        "content": {
            "contact": {
                "image": string;
                "office": {
                    "name": string;
                    "address": {
                        "street": string;
                        "postcode": string;
                        "city": string;
                        "gps": string;
                    };
                    "contact": {
                        "phone": string;
                        "email": string;
                    };
                    "numbers": {
                        "nip": {
                            "label": string;
                            "value": string;
                        },
                        "krs": {
                            "label": string;
                            "value": string;
                        },
                        "regon": {
                            "label": string;
                            "value": string;
                        }
                    };
                    "button_map": string;
                };
                "logistic": {
                    "name": string;
                    "address": {
                        "street": string;
                        "postcode": string;
                        "city": string;
                        "gps"?: string;
                    }
                }
            };
            "departments": Department[];
            "sales": Sales[];
            "export": {
                "title": string;
                "text": string;
                "image": string;
                "items": [];
            };
        };
        "departments": {
            "title": string;
            "phone": string[];
            "email": string[];
            "icon": string;
        }[];
        "sales": {
            "options": {
                "value": Number;
                "label": string;
            }[];
            "items": {
                "name": string;
                "image": string;
                "title": string;
                "phone": string;
                "email": string;
                "regions": Number[];
            }[];
        };
        "export": {
            "items": {
                "name": string;
                "image": string;
                "title": string;
                "phone": string;
                "email": string;
            }[];
        }
    }
}

export type Employee = {
    "name": string;
    "image": string;
    "title": string;
    "phone": string[];
    "email": string[];
    "info": string;
}

export type ExportDepartment = {
    "title": string;
    "text": string;
    "image": string;
    "items": Employee[];
}

export type Sales = {
    "title": string;
    "text"?: string;
    "options": [];
    "items": Employee[];
}

export type Department = {
    "title": string;
    "phone": string[];
    "email": string[];
    "icon": string;
}
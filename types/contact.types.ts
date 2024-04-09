import type { DescriptionType, Page } from "./common.types"

export interface ContactPage extends Page {
    "description": {
        "type": DescriptionType,
        "content": {
            "contact": {
                "image": String;
                "office": {
                    "name": String;
                    "address": {
                        "street": String;
                        "postcode": String;
                        "city": String;
                        "gps": String;
                    };
                    "contact": {
                        "phone": String;
                        "email": String;
                    };
                    "numbers": {
                        "nip": {
                            "label": String;
                            "value": String;
                        },
                        "krs": {
                            "label": String;
                            "value": String;
                        },
                        "regon": {
                            "label": String;
                            "value": String;
                        }
                    };
                    "button_map": String;
                };
                "logistic": {
                    "name": String;
                    "address": {
                        "street": String;
                        "postcode": String;
                        "city": String;
                        "gps"?: String;
                    }
                }
            };
            "departments": {
                "title": String;
                "phone": String[];
                "email": String[];
                "icon": String;
            }[];
            "sales": {
                "title": String;
                "text"?: String;
                "options": [];
                "items": [];
            };
            "export": {
                "title": String;
                "text": String;
                "image": String;
                "items": [];
            };
        };
        "departments": {
            "title": String;
            "phone": String[];
            "email": String[];
            "icon": String;
        }[];
        "sales": {
            "options": {
                "value": Number;
                "label": String;
            }[];
            "items": {
                "name": String;
                "image": String;
                "title": String;
                "phone": String;
                "email": String;
                "regions": Number[];
            }[];
        };
        "export": {
            "items": {
                "name": String;
                "image": String;
                "title": String;
                "phone": String;
                "email": String;
            }[];
        }
    }
}
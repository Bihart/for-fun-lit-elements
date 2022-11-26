import { LitElement } from "lit";
import { homeIcon, nextIcon, prevIcon } from "./paginator";

export class Icon extends LitElement {
    static properties = {
        name: { type: String },
    };

    static icons = new Map([homeIcon, prevIcon, nextIcon]);

    render() {
        const icon = Icon.icons.get(this.name);
        return icon ? icon : "";
    }
}

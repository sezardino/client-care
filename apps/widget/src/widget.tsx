/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDom from "react-dom/client";
import {
  FeedbackWidget,
  FeedbackWidgetProps,
} from "./components/widgets/feedback";

const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class FeedbackWidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const root = ReactDom.createRoot(this.shadowRoot!);
    root.render(<FeedbackWidget {...(props as FeedbackWidgetProps)} />);
  }

  getPropsFromAttributes() {
    const props: Record<string, any> = {};
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default FeedbackWidgetWebComponent;

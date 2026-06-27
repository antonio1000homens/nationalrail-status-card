import {
  html,
} from "lit";

import EditorForm from '@marcokreeft/ha-editor-formbuilder';
import { FormControlType } from '@marcokreeft/ha-editor-formbuilder/dist/interfaces.js';
import { getEntitiesByDomain } from '@marcokreeft/ha-editor-formbuilder/dist/utils/entities.js';


function filterTrainEntities(_hass, items) {
  return items.filter(item => {
    return item.value.startsWith("sensor.train_schedule");
  });
}

export default class NationalrailStatusCardEditor extends EditorForm {

  static get properties() {
    return { _hass: {}, _config: {} };
  }

  setConfig(config) {
    this._config = config;
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    return this.renderForm([
      { controls: [{ label: "Entity", configValue: "entity", type: FormControlType.Dropdown, items: filterTrainEntities(this._hass, getEntitiesByDomain(this._hass, "sensor")) }] },
      { controls: [{ label: "Number of trains to shown", configValue: "limit", type: FormControlType.Textbox }] },
      { controls: [{ label: "Base font size", configValue: "font_size", type: FormControlType.Textbox }] },
      { controls: [{ label: "Heading font size", configValue: "heading_font_size", type: FormControlType.Textbox }] },
      { controls: [{ label: "Train font size", configValue: "train_font_size", type: FormControlType.Textbox }] },
      { controls: [{ label: "Details font size", configValue: "details_font_size", type: FormControlType.Textbox }] },
    ])
  };
}

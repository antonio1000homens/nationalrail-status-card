import {
  LitElement,
  html,
} from "lit";

import style from './style.js';

import NationalrailStatusCardEditor from './index-editor.js';
import { destinationPresent, parseToTime, status } from './utils.js';

const cardName = 'nationalrail-status-card';
const editorName = cardName + '-editor';
customElements.define(editorName, NationalrailStatusCardEditor);

class NationalrailStatusCard extends LitElement {
  static properties = {
    attributes: {}
  };

  static styles = style;
  static getConfigElement() {
    return document.createElement(editorName);
  }
  set hass(hass) {
    this._hass = hass;
    this.updateProperties();
  }

  // required
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this._config = config;
    this.updateProperties();
  }
  updateProperties() {
    if (!this._config || !this._hass) {
      return;
    }

    const entity = this._config.entity;
    const entityIndex = entity?.entity ?? entity;
    if (!entityIndex) {
      return;
    }

    const hassentity = this._hass.states[entityIndex]
    this.attributes = hassentity.attributes;
  }
  render() {
    let trains = this.attributes?.trains ?? [];
    if (this._config?.limit) {
      let limit = 0;
      if (typeof this._config.limit === 'number') {
        limit = this._config.limit;
      }
      else if (typeof this._config.limit === "string") {
        limit = parseInt(this._config.limit);
      }
      if (limit > 0) {
        trains = trains.slice(0, limit);
      }
    }
    let items = html`
    <h3>No trains scheduled</h3>
    `
    if (trains && trains.length > 0) {
      items = trains.map(this.renderTrain);
    }
    const styleVariables = this.getStyleVariables();
    return html`<ha-card>
      <div id="content">
      <div id="nationalrail-status" style=${styleVariables}>
      <h2>${this.attributes?.station}</h2>
      ${items}
      </div>
      </div>
    </ha-card>`
  }


  renderTrain(train) {
    const scheduled = parseToTime(train.scheduled);
    return html`
    <div class="train">
      <div class="top-heading">
        <div class="scheduled-container">
          <span class="scheduled">${scheduled}</span>
          <span class="scheduled-status">${status(train)}</span>
        </div>
        <div class="platform-container">
          <span class="platform-label">Platform </span>
          <span class="platform">${train.platform ?? "-"}</span>
        </div>
      </div>
      <h3 
        id="station-heading-0" 
        tabindex="-1">
        <span class="terminus">${train.terminus}</span>
      </h3>
      <h4>Calling at ${train.destinations.map(dest => destinationPresent(dest, train.expected)).join(", ")}</h4 >
    </div >
      `
  }

  getStyleVariables() {
    const mappings = [
      ["font_size", "--nationalrail-card-font-size"],
      ["heading_font_size", "--nationalrail-card-heading-font-size"],
      ["train_font_size", "--nationalrail-card-train-font-size"],
      ["status_font_size", "--nationalrail-card-status-font-size"],
      ["details_font_size", "--nationalrail-card-details-font-size"]
    ];
    return mappings
      .map(([configKey, cssVariable]) => {
        const value = this.normalizeSize(this._config?.[configKey]);
        return value ? `${cssVariable}: ${value};` : "";
      })
      .join("");
  }

  normalizeSize(value) {
    if (value === undefined || value === null || value === "") {
      return "";
    }
    if (typeof value === "number") {
      return `${value}px`;
    }
    const trimmed = value.trim();
    if (/^\d+(\.\d+)?$/.test(trimmed)) {
      return `${trimmed}px`;
    }
    return trimmed;
  }

}



customElements.define(cardName, NationalrailStatusCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: cardName,
  name: 'Nationalrail Status Card',
  description: 'Card showing the status of the London Underground lines',
});

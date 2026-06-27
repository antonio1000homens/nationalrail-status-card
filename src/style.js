

import { css } from 'lit';

const style = css`
#nationalrail-status {
  padding:16px;
  font-size: var(--nationalrail-card-font-size, var(--ha-font-size-m, 14px));
}
.train {
  display:flex;
  flex-direction:column;
  padding:5px;
  border:1px white solid;
  border-radius: 5px;
  margin: 2px 0px;
  font-size: var(--nationalrail-card-train-font-size, 1em);
}
.top-heading {
  display:flex;
  flex-direction:row;
  flex-basis:100%;
  margin-bottom:5px;
}
.scheduled-container {
  display:flex;
  flex-basis:100%;
}
.scheduled-status {
  padding-left: 5px;
  font-size: var(--nationalrail-card-status-font-size, 1em);
}
.platform-container {
  display:flex;
}
.platform-label {
  padding-right: 5px;
}
.details {
  margin-top:5px;
}
h3, h4 {
  margin:0;
}
h2 {
  font-size: var(--nationalrail-card-heading-font-size, 1.5em);
}
h3 {
  font-size: var(--nationalrail-card-train-heading-font-size, 1.15em);
}
h4 {
  font-size: var(--nationalrail-card-details-font-size, .95em);
  font-style: italic;
  font-weight: 500;
}
.peturbed {
color: #ff4141;
}
.warning {
color: #f3f345;
}
.good {
color: #52ff52;
}
`;

export default style;

# rollup-plugin-css-import

A Rollup.js plugin to import css files into web components.  

## Installation

```bash
npm install --save-dev robhicks/rollup-plugin-css-import
```

## Usage

Add the following code to your project's `rollup.config.js`:

```js
import css from 'rollup-plugin-css-import';

export default {
  entry: 'index.js',
  plugins: [
    css(),
  ]
};
```

### in JS

```js
import css from './component.css';

class MyComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<style>${css}</style><div></div>`;
  }

  static get observedAttributes() {
    return [];
  }
}

customElements.define('my-component', MyComponent);

export { MyComponent };
```

## License

MIT

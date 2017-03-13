import path from 'path';

import compileStylus    from 'stylus';
import { createFilter } from 'rollup-pluginutils';

/**
 * rollup-plugin-css-import
 * @param {Object} options
 *   @param {Array || String} include, exclude - A minimatch pattern, or an array of minimatch patterns of including ID, or excluding ID (optional)
 *   @param {Boolean} sourceMap - If true is specified, source map to be embedded in the output CSS (default is true)
 *   @param {Function} fn - A function invoked with the Stylus renderer (it will be passed to use() function of the Stylus)
 *   @param {Function || String} output - Output destination (optional)
 *   @param {Function} identName - names of css classes
 * @return {Object} rollup plugin with transform function
 */
function rollupPluginCssImport(options = {}) {
  const filter = createFilter(options.include, options.exclude)
  const fn = options.fn
  const sourceMap = options.sourceMap !== false

  /* output */
  const outputFile     = typeof options.output === 'string'
  const outputFunction = typeof options.output === 'function'

  /* ident */
  const identFunction = typeof options.identName === 'function'

  let customObject = {}
  let allCss = new Set()

  return {
    transform: async (code, id) => {
      if (!filter(id) || path.extname(id) !== '.css')
        return null

      const localIdentName =
        !sourceMap && identFunction
        ? options.identName(process.cwd(), id, customObject)
        : path.relative(process.cwd(), id)

      /* compile stylus syntax to css */
      const style = compileStylus(code)

      style.set('filename', localIdentName)

      if (sourceMap)
        style.set('sourcemap', { inline: true })

      if (fn)
        style.use(fn)

      const css = await style.render();

      return {
        code: `export default ${JSON.stringify(css.toString())}`,
        map: { mappings: '' },
      }
    },
  }
}

export default rollupPluginCssImport

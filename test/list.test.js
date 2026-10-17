const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

function node(tag) {
  return {
    tag,
    children: [],
    attrs: {},
    textContent: '',
    firstChild: null,
    open: false,
    appendChild(child) { this.children.push(child); this.firstChild = this.children[0]; },
    setAttribute(k, v) { this.attrs[k] = v; },
    classList: { toggle() { panel.open = !panel.open; } }
  };
}

const panel = node('div');
const ctx = { document: { createElement: node, getElementById: () => panel } };
vm.createContext(ctx);
for (const f of ['../js/catalog.js', '../demo/list.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, f), 'utf8'), ctx);
}
const catalog = vm.runInContext('CATALOG', ctx);

const root = ctx.buildCatalogList(catalog, ctx.document);
const links = root.children.filter(c => c.tag === 'div').map(c => c.children[0]);
assert.strictEqual(links.length, catalog.length, 'every catalog video gets a row');
links.forEach((link, i) => {
  assert.ok(catalog.some(v => v.url === link.attrs.href && v.label === link.textContent), 'row ' + i + ' links its own video');
  assert.strictEqual(link.attrs.rel, 'noopener noreferrer');
  assert.strictEqual(link.attrs.target, '_blank');
});
const headings = root.children.filter(c => c.tag === 'h2').map(h => h.textContent);
assert.deepStrictEqual(headings, ['Space (22)', 'Sea (21)', 'Landscape (42)', 'Cityscape (30)'], 'rows are grouped by category with counts');

const hostile = ctx.buildCatalogList([{ url: 'http://x/a.mov', label: '<img src=x onerror=alert(1)>', description: '<b>d</b>', category: 'sea' }], ctx.document);
assert.strictEqual(hostile.children[1].children[0].textContent, '<img src=x onerror=alert(1)>', 'labels are set as text, never as markup');

ctx.toggleCatalogList();
assert.strictEqual(panel.open, true, 'the first toggle opens the list');
assert.strictEqual(panel.children.length, 1, 'the list is built once on first open');
ctx.toggleCatalogList();
assert.strictEqual(panel.open, false);
assert.strictEqual(panel.children.length, 1, 'closing and reopening does not rebuild it');

console.log('list tests passed');

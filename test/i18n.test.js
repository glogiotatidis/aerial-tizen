// SPDX-FileCopyrightText: 2026 Jean
// SPDX-License-Identifier: MIT
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

function load(language) {
  const ctx = { navigator: { language } };
  vm.createContext(ctx);
  const file = path.join(__dirname, '../js/i18n.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
  return ctx;
}

const settings = fs.readFileSync(path.join(__dirname, '../js/settings.js'), 'utf8');
const labels = Array.from(settings.matchAll(/label: '([^']+)'/g), m => m[1]);
assert.ok(labels.length > 10);

assert.strictEqual(load('en-US').t('Category'), 'Category');
assert.strictEqual(load('pt-BR').t('Category'), 'Categoria');
assert.strictEqual(load('es-ES').t('Category'), 'Categoría');
assert.strictEqual(load('de-DE').t('Category'), 'Category');
assert.strictEqual(load('pt-BR').t('Could not reach {0}. URL not updated.', 'http://x'), 'Não foi possível acessar http://x. URL não alterada.');
assert.strictEqual(load('en').t('Could not reach {0}. URL not updated.', 'http://x'), 'Could not reach http://x. URL not updated.');

for (const lang of ['pt', 'es']) {
  const ctx = load(lang);
  const table = vm.runInContext('TRANSLATIONS', ctx)[lang];
  for (const label of labels) assert.ok(table[label], lang + ' lacks "' + label + '"');
}
console.log('i18n: ok');

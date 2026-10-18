// SPDX-FileCopyrightText: 2026 Jean
// SPDX-License-Identifier: MIT
var TRANSLATIONS = {
  pt: {
    'All': 'Todos', 'Space': 'Espaço', 'Sea': 'Mar', 'Landscape': 'Paisagem', 'Cityscape': 'Cidade',
    'Show Description': 'Mostrar descrição', 'On': 'Ligado', 'Off': 'Desligado',
    'Description Timer': 'Tempo da descrição', 'Video Order': 'Ordem dos vídeos',
    'Shuffle': 'Aleatória', 'Sequential': 'Sequencial', 'Menu Theme': 'Tema do menu',
    'Dark': 'Escuro', 'Light': 'Claro', 'Category': 'Categoria',
    'Use custom server': 'Usar servidor próprio', 'Yes': 'Sim', 'No': 'Não',
    'Settings stored in': 'Ajustes salvos em', 'Files location': 'Local dos arquivos',
    'testing…': 'testando…',
    'Could not reach custom server. Test failed.': 'Não foi possível acessar o servidor. O teste falhou.',
    'Enter files location URL': 'Digite a URL dos arquivos',
    'Could not reach {0}. URL not updated.': 'Não foi possível acessar {0}. URL não alterada.'
  },
  es: {
    'All': 'Todos', 'Space': 'Espacio', 'Sea': 'Mar', 'Landscape': 'Paisaje', 'Cityscape': 'Ciudad',
    'Show Description': 'Mostrar descripción', 'On': 'Activado', 'Off': 'Desactivado',
    'Description Timer': 'Tiempo de la descripción', 'Video Order': 'Orden de los vídeos',
    'Shuffle': 'Aleatorio', 'Sequential': 'Secuencial', 'Menu Theme': 'Tema del menú',
    'Dark': 'Oscuro', 'Light': 'Claro', 'Category': 'Categoría',
    'Use custom server': 'Usar servidor propio', 'Yes': 'Sí', 'No': 'No',
    'Settings stored in': 'Ajustes guardados en', 'Files location': 'Ubicación de los archivos',
    'testing…': 'probando…',
    'Could not reach custom server. Test failed.': 'No se pudo acceder al servidor. La prueba falló.',
    'Enter files location URL': 'Introduce la URL de los archivos',
    'Could not reach {0}. URL not updated.': 'No se pudo acceder a {0}. URL sin cambios.'
  }
};

function t(text, arg) {
  var lang = ((typeof navigator !== 'undefined' && navigator.language) || 'en').slice(0, 2);
  var table = TRANSLATIONS[lang];
  var out = (table && table[text]) || text;
  return arg === undefined ? out : out.replace('{0}', arg);
}

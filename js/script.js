
function copyToClipboard() {
    const code = document.getElementById('code');
    const range = document.createRange();
    range.selectNode(code);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

const mainItems = document.querySelectorAll(
    '.main-item'
  );
  
  mainItems.forEach((mainItem) => {
    mainItem.addEventListener('click', () => {
      mainItem.classList.toggle(
        'main-item--open'
      );
    })
  });
  
  // LIVE CODE EDITOR
const livePreviewFrame = document.getElementById('live-preview');
const htmlEditor = document.getElementById('html');
const cssEditor = document.getElementById('css');

function initializeLivePreview() {
    livePreviewFrame.contentWindow.document.body.innerHTML = '';
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'live-preview-style');
    livePreviewFrame.contentWindow.document.head.appendChild(styleElement);
}

function updateLiveHTMLPreview(codeEditors) {
    livePreviewFrame.contentWindow.document.body.innerHTML = codeEditors.html.getValue();
}

function updateLiveCSSPreview(codeEditors) {
    const styleElement = livePreviewFrame.contentWindow.document.getElementById('live-preview-style');
    styleElement.innerHTML = codeEditors.css.getValue();
}

function initializeCodeEditors() {
    function getDefaultOptions(object) {
        const defaultOptions = {
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'panda-syntax'
        };
        if (object) {
            const keys = Object.keys(object);
            for (const key of keys) {
                defaultOptions[key] = object[key];
            }
        }
        return defaultOptions;
    }

    const codeEditors = {
        html: CodeMirror(htmlEditor, getDefaultOptions({
            mode: 'text/html',
            value: '',
        })),
        css: CodeMirror(cssEditor, getDefaultOptions({
            mode: 'css',
            value: '',
            extraKeys: { 'Ctrl-Space': 'autocomplete' },
            hintOptions: {
                completeSingle: false,
                closeOnUnfocus: false
            }
        })),
    };
    return codeEditors;
}

function setupLivePreviewStudio() {
    const codeEditors = initializeCodeEditors();

    CodeMirror.on(codeEditors.html, 'change', () => {
        updateLiveHTMLPreview(codeEditors);
    });

    CodeMirror.on(codeEditors.css, 'change', () => {
        updateLiveCSSPreview(codeEditors);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLivePreview();
    setupLivePreviewStudio();
});
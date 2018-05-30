import { Converter } from 'showdown';

export function dateFormat(time) {
    if (!time) {
        return "";
    }
    let date = new Date(parseInt(time));
    return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

let markdown = new Converter();
markdown.setOption('headerLevelStart', true);
markdown.setOption('simplifiedAutoLink', true);
markdown.setOption('tables', true);
markdown.setOption('tablesHeaderId', true);
markdown.setOption('strikethrough', true);
markdown.setOption('tasklists', true);
markdown.setOption('openLinksInNewWindow', true);
markdown.setOption('ghCodeBlocks', true);
markdown.setOption('smoothLivePreview', true);
export function toHTML(markdownText) {
    return markdown.makeHtml(markdownText);
}
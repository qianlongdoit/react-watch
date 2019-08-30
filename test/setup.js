import {JSDOM} from 'jsdom';

if (typeof document === 'undefined') {
    const {window} = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
}
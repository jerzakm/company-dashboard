import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('pl', () => import('./pl.json'));
// en, en-US and pt are not available yet

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});

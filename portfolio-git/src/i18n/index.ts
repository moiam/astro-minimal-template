import english from './english.json'
import spanish from './spanish.json'


export const languages = {
  es: 'es',
  en: 'en',
};
export const getI18N = ({
	currentLocale = 'es',
}: {
	currentLocale: string | undefined;
}) => {
	if (currentLocale === languages.en) return {...spanish, ...english};
	return spanish;
};
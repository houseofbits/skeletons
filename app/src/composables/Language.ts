import { ref } from "vue";
import TranslationsService, { Language } from "../services/TranslationsService";

const selectedLanguage = ref<Language>(Language.EN);
const translationService = new TranslationsService([
    Language.EN,
    Language.LV,
]);


export function useLanguage() {
    function selectLanguage(language: Language) {
        selectedLanguage.value = language;
    }

    async function loadTranslations(files: string[]) {
        return await translationService.loadTranslations(files);
    }

    function translate(key: string) {
        return translationService.translate(key, selectedLanguage.value);
    }

    return {
        selectedLanguage,
        selectLanguage,
        loadTranslations,
        translate
    }
}
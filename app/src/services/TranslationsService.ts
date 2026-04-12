import HttpService from '@src/services/HttpService';

const Language = {
    EN: 'en',
    DE: 'de',
    RU: 'ru',
    LV: 'lv',
} as const;

type Language = (typeof Language)[keyof typeof Language];

export { Language };

export type TranslationData = {
    [key: string]: Record<Language, string>;
}

export default class TranslationsService {
    languages: Language[] = [];
    translations: TranslationData = {};
    translationFiles: string[] = [];

    constructor(languages: Language[]) {
        this.languages = languages;

    }

    async loadTranslations(files: string[]) {
        this.translationFiles = files;
        this.reloadTranslations();
    }

    async reloadTranslations() {
        const httpService = new HttpService();
        this.translations = {};

        this.translationFiles.forEach(async (file) => {
            try {
                const data = await httpService.get(file);
                this.mergeTranslations(data);
            } catch (e: any) {
                console.error("Error loading translations from " + file + ": " + e.message);
            }
        });
    }

    translate(key: string, language: Language): string {
        if (this.translations[key] && this.translations[key][language]) {
            return this.translations[key][language];
        }

        return key;
    }

    hasTranslation(key: string, language: Language): boolean {
        return !!(this.translations[key] && this.translations[key][language]);
    }

    private mergeTranslations(newData: unknown) {
        if (typeof newData !== 'object' || newData === null) {
            throw new Error("Invalid translation data format");
        }

        for (const [key, value] of Object.entries(newData)) {
            if (typeof value !== 'object' || value === null) {
                continue;
            }

            this.addTranslation(key, value as Record<Language, string>);
        }
    }

    private addTranslation(key: string, translations: Record<Language, string>) {
        if (!this.translations[key]) {
            this.translations[key] = {} as Record<Language, string>;
        }

        for (const lang of this.languages) {
            if (lang in translations) {
                this.translations[key][lang] = translations[lang];
            }
        }
    }
}
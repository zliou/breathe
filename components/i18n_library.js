export default class I18nLibrary {
  library = {
    exhale: {
      en: "Exhale",
      es: "Exhalar",
      fr: "Exhaler",
      pt: "Expire",
      zh: "呼氣",
    },
    hold: {
      en: "Hold",
      es: "Contener",
      fr: "Retenir",
      pt: "Conter",
      zh: "屏住",
    },
    inhale: {
      en: "Inhale",
      es: "Inhalar",
      fr: "Inhaler",
      pt: "Inalar",
      zh: "吸入",
    },
    hlToLanguage: {
      "en": "English",
      "es": "Español",
      "fr": "Français",
      "pt": "Português",
      "zh": "中文",
    },
    languageList: ["en", "es", "fr", "pt", "zh"],
  };

  getLibrary() {
    return this.library;
  }
}

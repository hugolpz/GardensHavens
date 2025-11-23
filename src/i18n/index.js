import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      gardenSpecies: 'Gardens Havens',
      settings: 'Settings',
      backToGallery: 'Back to Gallery',
      visibilitySettings: 'Visibility Settings',
      visibilityDescription: 'Choose which information to display on species cards',
      showTaxonImage: 'Taxon image',
      showTaxonRange: 'Taxon range',
      showConservationStatus: 'Conservation status',
      settingsSaved: 'Settings are automatically saved',
      wikimediaIntegration: 'Wikimedia Integration',
      wikimediaDescription: 'Enter your Wikimedia username to load custom species lists',
      wikimediaUsername: 'Wikimedia Username',
      wikimediaUsernamePlaceholder: 'Enter your username (e.g., Yug)',
      inputWikimediaUsername: 'Input your Wikimedia username',
    },
    fr: {
      gardenSpecies: 'Jardins Refuges',
      settings: 'Paramètres',
      backToGallery: 'Retour à la galerie',
      visibilitySettings: 'Paramètres de visibilité',
      visibilityDescription: 'Choisissez les informations à afficher sur les cartes des espèces',
      showTaxonImage: 'Image du taxon',
      showTaxonRange: 'Aire de répartition du taxon',
      showConservationStatus: 'Statut de conservation',
      settingsSaved: 'Les paramètres sont enregistrés automatiquement',
      wikimediaIntegration: 'Intégration Wikimedia',
      wikimediaDescription:
        "Entrez votre nom d'utilisateur Wikimedia pour charger des listes d'espèces personnalisées",
      wikimediaUsername: "Nom d'utilisateur Wikimedia",
      wikimediaUsernamePlaceholder: "Entrez votre nom d'utilisateur (ex: Yug)",
    },
    es: {
      gardenSpecies: 'Jardines Refugios',
      settings: 'Configuración',
      backToGallery: 'Volver a la galería',
      visibilitySettings: 'Configuración de visibilidad',
      visibilityDescription: 'Elija qué información mostrar en las tarjetas de especies',
      showTaxonImage: 'Imagen del taxón',
      showTaxonRange: 'Rango del taxón',
      showConservationStatus: 'Estado de conservación',
      settingsSaved: 'La configuración se guarda automáticamente',
      wikimediaIntegration: 'Integración Wikimedia',
      wikimediaDescription:
        'Ingrese su nombre de usuario de Wikimedia para cargar listas de especies personalizadas',
      wikimediaUsername: 'Nombre de usuario de Wikimedia',
      wikimediaUsernamePlaceholder: 'Ingrese su nombre de usuario (ej: Yug)',
      inputWikimediaUsername: 'Ingrese su nombre de usuario de Wikimedia',
    },
    zh: {
      gardenSpecies: '花园庇护所',
      settings: '设置',
      backToGallery: '返回画廊',
      visibilitySettings: '可见性设置',
      visibilityDescription: '选择在物种卡片上显示哪些信息',
      showTaxonImage: '分类群图像',
      showTaxonRange: '分类群范围',
      showConservationStatus: '保护状态',
      settingsSaved: '设置会自动保存',
      wikimediaIntegration: '维基媒体集成',
      wikimediaDescription: '输入您的维基媒体用户名以加载自定义物种列表',
      wikimediaUsername: '维基媒体用户名',
      wikimediaUsernamePlaceholder: '输入您的用户名 (例如: Yug)',
      inputWikimediaUsername: '输入您的维基媒体用户名',
    },
  },
})

export default i18n

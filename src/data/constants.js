export const datalist = [
  { binomial: 'Canis lupus familiaris' },
  { binomial: 'Felis catus' },
  { binomial: 'Pica pica' },
  { binomial: 'Podarcis muralis' },
  { binomial: 'Quercus robur' },
  { binomial: 'Prunus avium' },
  { binomial: 'Poa pratensis' },
  { binomial: 'Taraxacum officinale' },
]

// Re-export category functionality from centralized location
export {
  validCategories,
  getCategoryColor,
  getCategoryEmoji,
  getCategoryBackgroundColor,
  getCategoryInfo,
} from '@/utils/assessCategory.js'

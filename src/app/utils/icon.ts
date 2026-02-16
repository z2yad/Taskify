import { PREDEFINED_CATEGORIES } from "@/interfaces/category";

export function getCategoryIcon(name: string) {
  if (PREDEFINED_CATEGORIES[name])
    return PREDEFINED_CATEGORIES[name]
  return {
    name: name,
    icon: 'hash',
    color: '',
    isCustomIcon: true
  }
}

export function getIcon(icon: string) {
  return icon;
}
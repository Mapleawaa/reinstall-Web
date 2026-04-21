import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as simpleIcons from 'simple-icons'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getSimpleIcon(slug, size = 24) {
  const icon = simpleIcons.getSimpleIcon(slug)
  if (!icon) return null
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${icon.path}</svg>`
}

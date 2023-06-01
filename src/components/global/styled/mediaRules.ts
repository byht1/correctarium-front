const size = {
  mobile: '375px',
  mobileM: '767.98px',
  tablet: '768px',
  desktop: '1024px',
}

export const device = {
  mobile: `@media (min-width: ${size.mobile})`,
  mobileM: `@media (max-width: ${size.mobileM})`,
  tablet: `@media (min-width: ${size.tablet})`,
  desktop: `@media (min-width: ${size.desktop})`,
}

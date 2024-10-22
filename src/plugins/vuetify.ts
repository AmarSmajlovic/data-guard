import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const icons = {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi,
  },
}

export const vuetify = createVuetify({
  components: { ...components, VDateInput },
  directives,
  icons,
  theme: {
    defaultTheme: 'dark',
  },
})

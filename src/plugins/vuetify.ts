import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  theme: {
    defaultTheme: localStorage.getItem('theme') || 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#1976D2',
          secondary: '#424242',
          green: '#4CAF50',
          yellow: '#FFEB3B',
          red: '#F44336'
        }
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#90CAF9',
          secondary: '#EEEEEE',
          green: '#81C784',
          yellow: '#FFF176',
          red: '#EF5350'
        }
      }
    }
  }
})

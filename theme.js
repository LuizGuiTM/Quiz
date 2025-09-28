const theme = {
  colors: {
    primary: '#4C6EF5',       // Azul vibrante
    secondary: '#748FFC',     // Azul mais claro
    success: '#51CF66',       // Verde
    error: '#FA5252',         // Vermelho
    warning: '#FFD43B',       // Amarelo
    background: '#F8F9FA',    // Fundo claro
    surface: '#FFFFFF',       // Branco
    text: {
      primary: '#212529',     // Texto escuro
      secondary: '#495057',   // Texto cinza
      disabled: '#ADB5BD',    // Texto desabilitado
      onPrimary: '#FFFFFF',   // Texto sobre cor primária
    },
    border: '#DEE2E6',        // Borda clara
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  shape: {
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      full: 9999,
    }
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
    },
    caption: {
      fontSize: 14,
    },
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
};

export default theme;
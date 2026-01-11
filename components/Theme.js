import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export default class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.isDarkMode = this.isDarkMode.bind(this);
    this.mediaQueryThemeChanged = this.mediaQueryThemeChanged.bind(this);
    this.darkModeMatcher = undefined;

    this.state = {
      theme: 'light',
      toggleTheme: this.toggleTheme,
    };
  }

  componentDidMount() {
    this.darkModeMatcher = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (this.darkModeMatcher) {
      this.darkModeMatcher.addEventListener('change', this.mediaQueryThemeChanged);

      this.setState(() => ({
        theme: this.isDarkMode() ? 'dark' : 'light',
      }));
    }
  }

  componentWillUnmount() {
    if (this.darkModeMatcher) {
      this.darkModeMatcher.removeEventListener('change', this.mediaQueryThemeChanged);
    }
  }

  isDarkMode() {
    return this.darkModeMatcher && this.darkModeMatcher.matches;
  }

  mediaQueryThemeChanged(e) {
    if (!document.body.classList.contains('light') && !document.body.classList.contains('dark')) {
      this.setState(() => ({
        theme: e.matches ? 'dark' : 'light',
      }));
    }
  }

  toggleTheme(e) {
    e.preventDefault();
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.remove(this.state.theme);
    document.body.classList.add(newTheme);
    this.setState(() => ({
      theme: newTheme,
    }));
  }

  render() {
    return <ThemeContext.Provider value={this.state}>{this.props.children}</ThemeContext.Provider>;
  }
}

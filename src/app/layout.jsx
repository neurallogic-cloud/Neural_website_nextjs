import { ThemeProvider } from '../context/ThemeContext';
import './globals.css';

export const metadata = {
  title: 'NeuralLogic - AI Solutions for Business',
  description: 'Empowering businesses with cutting-edge AI and machine learning solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased dark:bg-gray-900 dark:text-white transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

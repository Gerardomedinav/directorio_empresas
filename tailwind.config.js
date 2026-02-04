import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
// Importamos flyonui de la forma que Laravel 12/Vite espera
import flyonui from 'flyonui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        // Cambiamos esta ruta para ser más precisos con el JS de FlyonUI
        './node_modules/flyonui/dist/js/*.js' 
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        forms, 
        flyonui // Probamos dejando solo este, que ya incluye el plugin necesario
    ],
};
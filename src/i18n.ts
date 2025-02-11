import { createI18n } from 'vue-i18n';

export default createI18n({
    locale: 'ru',
    legacy: false,
    messages: {
      en: {
        app: {
            mapIsAssembled: 'The map is assembled',
            mapIsNotAssembled: 'The map is not assembled correctly',
            congratulation: 'Congratulations!',
            error: 'Error!'
        },
        header: {
            country: 'Country',
            scale: 'Scale',
            help: 'Help',
            language: 'Language',
            collect: 'Collect',
            stir: 'Stir',
            check: 'Check',
            areYouSure: 'Are you sure?',
            begin: 'Begin',
            finish: 'Finish',
        },
        modal: {
            confirm: {
                cancel: 'cancel',
                confirm: 'ok'
            }
        },
      },
      ru: {
        app: {
            mapIsAssembled: 'Карта собрана',
            mapIsNotAssembled: 'Карта собрана не верно',
            congratulation: 'Поздравляем!',
            error: 'Ошибка!'
        },
        header: {
            country: 'Страна',
            scale: 'Масштаб',
            help: 'Помощь',
            language: 'Язык',
            collect: 'Собрать',
            stir: 'Размешать',
            check: 'Проверить',
            areYouSure: 'Вы уверены?',
            begin: 'Начать',
            finish: 'Закончить',
        },
        modal: {
            confirm: {
                cancel: 'отмена',
                confirm: 'ок'
            }
        },
      }
    }
});
/**
 * 关于全局的设置服务
 */

// import ChangeLang from '../event/language';
// import System from '../store/system';
// import I18n from './I18n';

const systemServer = {};
// Object.defineProperty(systemServer, 'lang', {
//   set(value) {
//     if (value !== this.__lang) {
//       this.__lang = value;
//       I18n.i18n.locale = value;
//       ChangeLang.$emit('change');
//       System.upLanguage();
//     }
//   },
//   get() {
//     return this.__lang;
//   }
// });
export default systemServer;

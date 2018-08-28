import Container from './Bootstrap/stylesheets/BsContainer';
import Row from './Bootstrap/stylesheets/BsRow';
import Col from './Bootstrap/stylesheets/BsCol';

export const Layout = {
    Container,
    Row,
    Col
}

export const Button = () =>
    import ( /* webpackChunkName: "mdc-button" */ '@cube/button/button.vue')
export const Card = () =>
    import ( /* webpackChunkName: "mdc-card" */ './material/card/')
export const Textfield = () =>
    import ( /* webpackChunkName: "mdc-textfield" */ './material/textfield/index.vue')
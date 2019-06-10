import 'assets/vendor/bootstrap.min.css';

let render = () => {
    const styles = import('./assets/styles/app.css')
        .then(() => {
            const App = require('./app');
        })
};

render();

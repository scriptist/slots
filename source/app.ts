declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

require('./styles/app.scss');

import Slots from './Slots';

const elm = document.createElement('div');
elm.className = 'slots';
document.body.appendChild(elm);

new Slots(elm, [
    require('./img/mike.png'),
    require('./img/andre.png'),
    require('./img/berman.png'),
    require('./img/dan.png'),
    require('./img/jeremy.png'),
    require('./img/mitch.png'),
]);

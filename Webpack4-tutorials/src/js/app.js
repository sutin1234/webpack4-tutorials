import * as moment from 'moment'
import * as Modernizr from '../../modernizr';
import * as Detectizr from 'modernizr-detectizr/libs/modernizr-detectizr.min'


import { test, hello, summry } from '../es6/es6';
import func from '../es6/es2015';
import { Person } from '../es6/classes'
import '../js/images'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)
dom.i2svg();



let p = new Person('thinny');
//p.sayName();


console.log(func.onSave())
import {sayHelloTo} from './modules/mod1';
import {sayHelloTo2} from './modules/mod2';
import {CommonService} from '../common/service';

CommonService.url = 'ffff';
console.log(CommonService.getUrl());
const result1 = sayHelloTo('Jason');
console.log(CommonService.getUrl());
const result2 = sayHelloTo2('Jason');
console.log(CommonService.getUrl());



console.log(result1, result2);
import {CommonService} from '../../common/service';


export function sayHelloTo(name) {
  CommonService.url = 'mod1';
  const toSay = `Hello, ${name}!`;

  return toSay;
}
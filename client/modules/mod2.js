import {CommonService} from '../../common/service';


export function sayHelloTo2(name) {
  CommonService.url = 'mod2';
  const toSay = `Hello2, ${name}!`;

  return toSay;
}
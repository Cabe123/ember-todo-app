import { helper } from '@ember/component/helper';

export function compareListId([arg1, arg2]) {
  return arg1.trim() === arg2.trim();
}

export default helper(compareListId);

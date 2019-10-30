import db from '../db';
import { UserModule } from '../modules';

export default {
  User: UserModule.userService(db.getRepository(UserModule.User)),
};

export interface IServices {
  User: UserModule.IUserServices;
}

import httpStatus from 'http-status';
import { Request } from 'express';
import { User } from '../models/core/index';
import ApiError from '../utils/ApiError';


interface UserBody {
  name: string;
  username: string;
  avatar: string;
  dob: Date;
  description?: string;
  gender?: boolean;
  email: string;
  password: string;
  role: string;
  isEmailVerified?: boolean;
}

/**
 * Create a user
 * @param {Request} req
 * @returns {Promise<User>}
 */
const createUser = async (req: Request) => {
  // Kiểm tra email đã tồn tại chưa
  if (await User.isEmailTaken(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // default iamge
  const url = 'https://firebasestorage.googleapis.com/v0/b/appmusic1611.appspot.com/o/1726477235613_gojo.jpg?alt=media';

  const userBody: UserBody = {
    name: req.body.name,
    username: req.body.username,
    avatar: url,
    dob: req.body.dob,
    description: req.body.description,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    isEmailVerified: req.body.isEmailVerified,
  };

  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter: any, options: any): Promise<any> => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {string} id
 * @returns {Promise<User>}
 */
const getUserById = async (id: string) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {string} userId
 * @param {Partial<UserBody>} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId: string, updateBody: Partial<UserBody>) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {string} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};

import axios from 'axios';
// import { Platform } from 'react-native';

const url = 'https://link-book-app.herokuapp.com/api';

// Because of genymotion we need to change the url here
// http://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator
// if (Platform.OS !== 'ios') {
//   url = 'http://10.0.3.2:3000/api';
// } else {
//   url = 'http://localhost:3000/api';
// }

axios.defaults.baseURL = url;

class LinkBook {
  async fetchPublicArticles(userId) {
    try {
      const { data } = await axios.get(`/articles/${userId}`);
      return data.articles;
    } catch (error) {
      throw error;
    }
  }

  async fetchMyArticles(userId) {
    try {
      const { data } = await axios.get(`/users/${userId}/articles`);
      return data.articles;
    } catch (error) {
      throw error;
    }
  }

  async addArticle(articleUrl, userId, isPublic, collectionName) {
    try {
      const res = await axios.post(`/users/${userId}/articles/new`, { articleUrl, isPublic, collectionName });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async fetchMyCollections(userId) {
    try {
      const { data } = await axios.get(`/users/${userId}/collections`);
      return data.collections;
    } catch (error) {
      throw error;
    }
  }
}

class UserApi {
  constructor() {
    this.path = '/users';
  }

  async login(args) {
    try {
      const { data } = await axios.post(`${this.path}/auth0`, args);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

const User = new UserApi();
const LinkBookAPI = new LinkBook();

export {
  User,
  LinkBookAPI,
};

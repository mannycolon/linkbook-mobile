import axios from 'axios';
// import { Platform } from 'react-native';
// // Because of genymotion we need to change the url here
// // http://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator
// let url;
// if (Platform.OS !== 'ios') {
//   url = 'http://10.0.3.2:5000/api';
// } else {
//   url = 'http://localhost:5000/api';
// }

const url = 'https://link-book-app.herokuapp.com/api';

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

  async fetchMyArticles(userId, token) {
    try {
      const { data } = await axios.get(`/users/${userId}/articles`, { headers: { Authorization: token } });
      return data.articles;
    } catch (error) {
      throw error;
    }
  }

  async addArticle(articleUrl, userId, isPublic, collectionNames, token) {
    try {
      const res = await axios.post(
        `/users/${userId}/articles/new`,
        { articleUrl, isPublic, collectionNames },
        { headers: { Authorization: token } }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async fetchMyCollections(userId, token) {
    try {
      const { data } = await axios.get(`/users/${userId}/collections`, { headers: { Authorization: token } });
      return data.collections;
    } catch (error) {
      throw error;
    }
  }

  async deleteCollection(userId, collectionName, token) {
    try {
      const res = await axios.post(
        `/collections/${userId}/delete`,
        { collectionName },
        { headers: { Authorization: token } }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateArticleCollectionNames(userId, collectionNames, articleId, token) {
    try {
      const res = await axios.post(
        `/collections/${userId}/update`,
        { collectionNames, articleId },
        { headers: { Authorization: token } }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async changeArticlePrivacy(isPublic, userId, articleId, token) {
    try {
      const res = await axios.post(
        `/articles/${userId}/update/privacy`,
        { articleId, isPublic },
        { headers: { Authorization: token } }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async addArticlesToCollection(userId, articleIds, collectionName, token) {
    try {
      const res = await axios.post(
        `/collections/${userId}/update/add`,
        { articleIds, collectionName },
        { headers: { Authorization: token } }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async removeArticlesFromCollection(userId, articleIds, collectionName, token) {
    try {
      const res = await axios.post(
        `/collections/${userId}/update/remove`,
        { articleIds, collectionName },
        { headers: { Authorization: token } }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateCollectionNameText(oldCollectionName, newCollectionName, userId, token) {
    try {
      const res = await axios.post(
        `/collections/${userId}/update/name`,
        { oldCollectionName, newCollectionName },
        { headers: { Authorization: token } }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteArticle(userId, articleId, token) {
    try {
      const res = await axios.delete(`/articles/${userId}/${articleId}/delete`, { headers: { Authorization: token } });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateArticleReadSetting(userId, articleId, isRead, token) {
    try {
      const res = await axios.post(
        `/articles/${userId}/update/read`,
        { articleId, isRead },
        { headers: { Authorization: token } }
      );
      return res;
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

  async deleteAccount(userId, token) {
    try {
      const res = await axios.delete(
        `${this.path}/delete`,
        { userId },
        { headers: { Authorization: token } }
      );
      return res;
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

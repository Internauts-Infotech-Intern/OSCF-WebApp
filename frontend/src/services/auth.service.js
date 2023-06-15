// const API_URL = "http://3.109.184.63:10001/api/auth/";
const API_URL = process.env.REACT_APP_API_URL+"/api/auth/";

class AuthService {
  loginService(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        // credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          credential: credential,
        }),
      };
      fetch(API_URL + "login", options)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log("response in login arrive : ", res);
          if (res.status == 1) {
            var userDetails = {
              _id: res.user._id,
              username: res.user.username,
              email: res.user.email,
              picture: res.user.picture,
              emailVarified: res.user.emailVarified,
              phoneVarified: res.user.phoneVarified,
            };
            if (res.user.admin) {
              userDetails["admin"] = true;
            } else {
              userDetails["admin"] = false;
            }
            console.log("response in login arrive userDetails : ", userDetails);
            localStorage.setItem("user", JSON.stringify(userDetails));
            resolve(userDetails);
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.log("erre : ", e);
        });
    });
  }
  signInService(credential) {
    console.log(credential);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        // credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          credential: credential,
        }),
      };
      fetch(API_URL + "signup", options)
        .then((response) => {
          console.log("fetch then response :", response);
          return response.json();
        })
        .then((res) => {
          console.log("response in login arrive : ", res);
          if (res.status == 1) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.log("erre : ", e);
        });
    });
  }

  emailVarificationg(email) {
    console.log(email);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        // credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
        }),
      };
      fetch(API_URL + "emailvarification/generate", options)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log("emailvarification/generate || responce : ", res);
          if (res.status == 1) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.log("erre : ", e);
          const res = {
            status: 5,
          };
          reject(res);
        });
    });
  }
  emailVarificationv(email, otp) {
    console.log(email);
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        // credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      };
      fetch(API_URL + "emailvarification/varify", options)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log("emailvarification/varify || responce : ", res);
          if (res.status == 1) {
            var user = JSON.parse(localStorage.getItem("user"));
            user.emailVarified = true;
            localStorage.setItem("user", JSON.stringify(user));
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.log("emailvarification/varify || error : ", e);
          const res = {
            status: 5,
          };
          reject(res);
        });
    });
  }
  updateUsername(user, username) {
    return new Promise(function (resolve, reject) {
      const options = {
        method: "POST",
        // credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          user: user,
          username: username,
        }),
      };
      fetch(API_URL + "update/username", options)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log("update/username || responce : ", res);
          if (res.status == 1) {
            var user = JSON.parse(localStorage.getItem("user"));
            user.username = username;
            localStorage.setItem("user", JSON.stringify(user));
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((e) => {
          console.log("update/username || error : ", e);
          const res = {
            status: 5,
          };
          reject(res);
        });
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getCurrentUserId() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return currentUser._id;
  }
  getUserToken() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    return currentUser.token;
  }
}
export default new AuthService();

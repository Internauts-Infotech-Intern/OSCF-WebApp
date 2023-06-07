import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../context/createcontext";
import generalProfileImage from "../../images/blank-profile-picture.png";
import authService from "../../services/auth.service";
export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  console.log("/profile user : ", user);

  const [massege, setMassege] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(null);
  const [userReady, setUserReady] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState("");


  function saveUserDetails() {

    if (username != user.username) {
      if (loading) {
        return;
      }
      authService.updateUsername(user, username).then((response) => {
        var tmp = user;
        tmp.username = username;
        setUser(tmp);
        alert("username is updated");
      }).catch((error) => {
        alert("username is updated");
        console.log("update username error : ",error);
      })
    } else  if(username ==  user.username){
      alert("username is updated");
    }

  }

  function varifyEmail() {
    if (loading) {
      return;
    }
    setLoading(true);
    authService.emailVarificationg(user.email)
      .then((res) => {
        console.log(
          "emailvarification g || res: ", res.status);
        alert("otp is successfulyy");
        setLoading(false);
        setIsOtpSent(true);
      })
      .catch((error) => {
        var resMessage;
        if (error.status == 0) {
          resMessage =
            "otp sent falied";
        } else if (error.status == 5) {
          resMessage = "error while sending request";
        } else {
          resMessage = "unhandled status arrive";
        }
        setLoading(false);
      });
  }
  function varifyEmailOtp() {
    if (loading) {
      return;
    }
    authService.emailVarificationv(user.email, otp)
      .then((res) => {
        console.log(
          "emailvarification g || res: ", res.status);
        alert("otp is Varified");
        setIsOtpSent(false)
        setOtp("");
        var tmp = user;
        tmp.emailVarified = true;
        setUser(tmp);
      })
      .catch((error) => {
        var resMessage;
        if (error.status == 0) {
          alert("otp varified falied");
        } else if (error.status == 5) {
          alert("error while sending opt for varifivation");
        } else {
          alert("unhandled status arrive");
        }
        setOtp("");
      });
  }

  return (
    <div className="">
      {userReady ? (
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  alt="profile image"
                  className="rounded-circle "
                  width={150}
                  height={150}
                  src={user.picture != "#" ? user.picture : generalProfileImage}
                />
                <span className="font-weight-bold">{username}</span>
                <span className="text-black-50">{user.email}</span>
              </div>
            </div>
            <div className="col-md-5 ">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Display Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <div className="">
                      <label className="labels">Email ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={user.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div
                      type="text"
                      onClick={() => {
                        if (!user.emailVarified) {
                          varifyEmail();
                        }
                      }}
                      className={user.emailVarified ? "form-control btn mt-4 btn-success" : "form-control btn-danger btn mt-4"}
                    >{user.emailVarified ? "varified" : "varify"}</div>
                  </div>
                </div>
                {isOtpSent ? <div className="row mt-2">
                  <div className="col">
                    <label className="labels">enter otp here</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-3">
                    <div
                      onClick={() => {
                        varifyEmailOtp();
                      }}
                      className="form-control btn mt-4 btn-success"
                    >send otp</div>
                  </div>
                </div> : <></>}

                <div className="row mt-2">
                  <div className="col">
                    <label className="labels">Phone number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={user.phone}
                      placeholder="phone munber"
                      pattern="[0-9]{11}"
                      required
                    />
                  </div>
                  {/* <div className="col-3">
                    <div
                      type="text"
                      className={user.phoneVarified ? "form-control btn mt-4 btn-success" : "form-control btn-danger btn mt-4"}
                    >{user.phoneVarified ? "varified" : "varify"}</div>
                  </div> */}
                </div>

                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => {
                      saveUserDetails();
                    }}
                  >
                    Save Profile
                  </button>
                </div>
                {massege && (
                  <div className="form-group">
                    <div
                      className={`alert  ${updateFlag ? "alert-success" : "alert-danger"
                        } `}
                      role="alert"
                    >
                      {massege}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3>please login firt</h3>
      )}
    </div>
  );
}

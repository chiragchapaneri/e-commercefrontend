import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Userapi } from "../services/User";
export function Signup() {
  const history = useHistory();
  const [useremail, setuseremail] = useState("");
  const [statelist, setStatelist] = useState([]);
  const [uniquestate, setUniqueState] = useState([]);
  const [password, setpassword] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [flate_name, setflate_name] = useState("");
  const [nearby, setnearby] = useState("");
  const [mno, setmno] = useState("");
  const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [validfirstname, setvalidfirstname] = useState("");
  const [validlastaname, setvalidlastname] = useState("");
  const [validcity, setvalidcity] = useState("");
  const [validstate, setvalidstate] = useState("");
  const [validflate_name, setvalidflate_name] = useState("");
  const [validnearby, setvalidnearby] = useState("");
  const [validmno, setvalidmno] = useState("");
  const [validuseremail, setvaliduseremail] = useState("");
  const [validpassword, setvalidpassword] = useState("");
  const [validpasswordlength, setvalidpasswordlength] = useState("");
  const [validfile, setvalidfile] = useState("");
  const [uniqueemail, setuniqueemail] = useState("");
  const [uniquemno, setuniquemno] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const valid = checkvalidation();

    if (valid === true) {
      try {
        const api = new Userapi();
        const headers = { "Content-Type": "multipart/form-data" };
        const apidata = new FormData();
        apidata.append("image1", selectedFile);
        apidata.append("firstname", firstname);
        apidata.append("lastname", lastname);
        apidata.append("mno", mno);
        apidata.append("flate_name", flate_name);
        apidata.append("city", city);
        apidata.append("state", state);
        apidata.append("email", useremail);
        apidata.append("password", password);
        apidata.append("nearby", nearby);
        const data = await api.signup(apidata, headers);

        if (data.status === 200) {
          // history.push("/login");
        }
      } catch (er) {
        setuniqueemail(er.response.data.email);
        setuniquemno(er.response.data.mno);
      }
    }
  };

  const checkvalidation = () => {
    if (
      firstname === "" ||
      lastname === "" ||
      city === "" ||
      state === "" ||
      mno.length < 10 ||
      flate_name === "" ||
      nearby === "" ||
      useremail === "" ||
      password === "" ||
      password.length < 8 ||
      !selectedFile ||
      !useremail.match(format) ||
      (selectedFile.type !== "image/jpeg" && selectedFile.type !== "image/png")
    ) {
      firstname === ""
        ? setvalidfirstname("first name is require")
        : setvalidfirstname("");
      lastname === ""
        ? setvalidlastname("last name is require")
        : setvalidlastname("");

      city === "" ? setvalidcity("city is require") : setvalidcity("");
      state === "" ? setvalidstate("state is require") : setvalidstate("");
      flate_name === ""
        ? setvalidflate_name("flate_name")
        : setvalidflate_name("");

      nearby === "" ? setvalidnearby("nearby is require") : setvalidnearby("");
      mno === ""
        ? setvalidmno("Mobile No is require")
        : mno !== "" && mno.length < 10
        ? setvalidmno("Mobile No is must be 10 chatecter long")
        : setvalidmno("");
      useremail === ""
        ? setvaliduseremail("email is require")
        : !useremail.match(format)
        ? setvaliduseremail("enter valid email")
        : setvaliduseremail("");
      password === ""
        ? setvalidpassword("enter pasword")
        : password.length < 8
        ? setvalidpassword("pasword must be 8 chatecter long")
        : setvalidpassword("");

      !selectedFile
        ? setvalidfile("user profile is require")
        : selectedFile.type === "image/jpeg" ||
          selectedFile.type === "image/png"
        ? setvalidfile("")
        : setvalidfile("user profile must be in jpeg/png formate");
    } else {
      setvalidfirstname("");
      setvalidlastname("");
      setvalidflate_name("");
      setvalidmno("");
      setvaliduseremail("");
      setvalidpassword("");
      setvalidfile("");
      setvalidcity("");
      setvalidstate("");
      setvalidnearby("");
      return true;
    }
  };

  useEffect(async () => {
    const apicall = new Userapi();
    const { data } = await apicall.getState();
    if (data) {
      const uniquestate = [...new Set(data.state.map((item) => item.state))];
      setUniqueState(uniquestate);
      setStatelist(data.state);
    }
  }, []);
  return (
    <section className="vh-100 my-2">
      <div className="container-fluid bg-white">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center ">
                <label className="lead fw-normal mb-0 me-3">Signup</label>
              </div>
              <div className="divider d-flex align-items-center my-2"></div>
              <div className="form-outline mb-3">
                {validfirstname && (
                  <label className=" text-danger">{validfirstname}</label>
                )}
                <input
                  type="text"
                  name="firstname"
                  className="form-control form-control-md"
                  placeholder="Enter Firstname"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </div>

              <div className="form-outline mb-3">
                {validlastaname && (
                  <label className=" text-danger">{validlastaname}</label>
                )}
                <input
                  type="text"
                  name="lastname"
                  className="form-control form-control-md"
                  placeholder="Enter Lastname"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="form-outline mb-3">
                {uniquemno && (
                  <label className=" text-danger">{uniquemno}</label>
                )}
                {validmno && <label className=" text-danger">{validmno}</label>}
                <input
                  type="text"
                  name="mno"
                  className="form-control form-control-md"
                  placeholder="Enter Mobile NO"
                  value={mno}
                  onChange={(e) => setmno(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="form-outline mb-3">
                {validflate_name && (
                  <label className=" text-danger">{validflate_name}</label>
                )}
                <input
                  type="text"
                  name="flate_name"
                  className="form-control form-control-md"
                  placeholder="Enter Flate Name/Socity Name"
                  value={flate_name}
                  onChange={(e) => setflate_name(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="form-outline mb-3">
                {validnearby && (
                  <label className=" text-danger">{validnearby}</label>
                )}
                <input
                  type="text"
                  name="nearby"
                  className="form-control form-control-md"
                  placeholder="Enter Near location"
                  value={nearby}
                  onChange={(e) => setnearby(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="form-outline mb-3">
                {validcity && (
                  <label className=" text-danger">{validcity}</label>
                )}
                <div className="row">
                  <div className="form-group">
                    <select
                      className="form-select"
                      placeholder="Country"
                      onChange={(e) => setstate(e.target.value)}
                    >
                      <option>Select state</option>
                      {uniquestate.map((data, index) => (
                        <option key={index}>{data} </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-outline mb-3">
                {validstate && (
                  <label className=" text-danger">{validstate}</label>
                )}
                <div className="row">
                  <div className="form-group">
                    <select
                      className="form-select"
                      placeholder="city"
                      onChange={(e) => setcity(e.target.value)}
                    >
                      <option>Select city</option>
                      {statelist.map(
                        (data, index) =>
                          data.state === state && (
                            <option key={index}>{data.city} </option>
                          )
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-outline mb-3">
                {uniqueemail && (
                  <label className=" text-danger">{uniqueemail}</label>
                )}
                {validuseremail && (
                  <label className=" text-danger">{validuseremail}</label>
                )}
                <input
                  type="email"
                  name="useremail"
                  className="form-control form-control-md"
                  placeholder="Enter Email"
                  value={useremail}
                  onChange={(e) => setuseremail(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="form-outline mb-3">
                {validpassword && (
                  <label className=" text-danger">{validpassword}</label>
                )}
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-md"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {validfile && <label className=" text-danger">{validfile}</label>}
              <div className="form-outline mb-3">
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-dark btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={(e) => onSubmit(e)}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

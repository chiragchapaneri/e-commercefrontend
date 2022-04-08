import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Userapi } from "../services/User";

export function Profile() {
  const history = useHistory();

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
  const [useremail, setuseremail] = useState("");
  const [profile, setprofile] = useState("");
  const [statelist, setStatelist] = useState([]);
  const [uniquestate, setUniqueState] = useState([]);
  const [userprofile, setUserprofile] = useState([]);
  const { id } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    const valid = checkvalidation();

    if (valid === true) {
      try {
        const api = new Userapi();

        const apidata = new FormData();
        apidata.append("image1", selectedFile);
        apidata.append("firstname", firstname);
        apidata.append("lastname", lastname);
        apidata.append("mno", mno);
        apidata.append("flate_name", flate_name);
        apidata.append("city", city);
        apidata.append("id", id);

        apidata.append("nearby", nearby);
        const data = await api.profile(apidata, localStorage.token);

        if (data.status === 200) {
          setUserprofile(data);
        }
      } catch (er) {
        console.log(er);
      }
    }
  };

  const checkvalidation = () => {
    if (
      firstname === "" ||
      lastname === "" ||
      // city === "" ||
      mno.length === "" ||
      mno.length < 10 ||
      flate_name === "" ||
      nearby === ""
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
        ? setvalidflate_name("Address Line 1 is require")
        : setvalidflate_name("");

      nearby === ""
        ? setvalidnearby("Address Line 2 is require")
        : setvalidnearby("");
      mno === ""
        ? setvalidmno("Mobile No is require")
        : mno !== "" && mno.length < 10
        ? setvalidmno("Mobile No is must be 10 chatecter long")
        : setvalidmno("");
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
    const { data } = await apicall.getDetails(id, localStorage.token);
    if (data) {
      setfirstname(data.firstname);
      setlastname(data.lastname);
      setnearby(data.nearby);
      setcity(data.city);
      setmno(data.mno);
      setflate_name(data.flate_name);
      setcity(data.city);
      setprofile(data.image);
    }
  }, [userprofile]);

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                src={profile && profile}
                className="rounded-circle"
                width={200}
              />

              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <form>
              <div className="d-flex flex-row align-items-center justify-content-center ">
                <p className="lead fw-normal mb-0 me-3">Profile</p>
              </div>
              <div className=" d-flex align-items-center my-4"></div>
              <div className="form-outline mb-3">
                <input
                  type="text"
                  name="firstname"
                  className="form-control form-control-md"
                  placeholder="Enter Firstname"
                  value={firstname}
                  autoComplete="off"
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </div>
              {validfirstname && (
                <p className=" text-danger">{validfirstname}</p>
              )}
              <div className="form-outline mb-3">
                <input
                  type="text"
                  name="lastname"
                  className="form-control form-control-md"
                  placeholder="Enter Lastname"
                  value={lastname}
                  required
                  autoComplete="off"
                  onChange={(e) => setlastname(e.target.value)}
                  // autoComplete="off"
                />
              </div>
              {validlastaname && (
                <p className=" text-danger">{validlastaname}</p>
              )}
              <div className="form-outline mb-3">
                <input
                  type="text"
                  name="mno"
                  className="form-control form-control-md"
                  placeholder="Enter Mobile NO"
                  value={mno}
                  required
                  autoComplete="off"
                  onChange={(e) => setmno(e.target.value)}
                  // autoComplete="off"
                />
              </div>
              {uniquemno && <p className=" text-danger">{uniquemno}</p>}
              {validmno && <p className=" text-danger">{validmno}</p>}
              <div className="form-outline mb-3">
                <input
                  type="text"
                  name="flate_name"
                  className="form-control form-control-md"
                  placeholder="Enter Flate Name/Socity Name"
                  value={flate_name}
                  required
                  autoComplete="off"
                  onChange={(e) => setflate_name(e.target.value)}
                  // autoComplete="off"
                />
              </div>
              {validflate_name && (
                <p className=" text-danger">{validflate_name}</p>
              )}
              <div className="form-outline mb-3">
                <input
                  type="text"
                  name="nearby"
                  className="form-control form-control-md"
                  placeholder="Enter Near location"
                  value={nearby}
                  required
                  autoComplete="off"
                  onChange={(e) => setnearby(e.target.value)}
                  // autoComplete="off"
                />
              </div>
              {validnearby && <p className=" text-danger">{validnearby}</p>}

              {/* <div className="form-outline mb-3">
                <div className="row">
                  <div className="form-group">
                    <select
                      className="form-select"
                      placeholder="Country"
                     autoComplete="off"    onChange={(e) => setstate(e.target.value)}
                    >
                      <option>Select state</option>
                      {uniquestate.map((data, index) => (
                        <option key={index}>{data} </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}
              {validcity && <p className=" text-danger">{validcity}</p>}

              <div className="form-outline mb-3">
                <input
                  type="file"
                  name="file"
                  autoComplete="off"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>

              {validfile && <p className=" text-danger">{validfile}</p>}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="button"
                  className="btn btn-dark btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  onClick={(e) => onSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

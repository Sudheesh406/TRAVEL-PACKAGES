import axios from "../../../axios";
import { useEffect, useState } from "react";
import Listing from "../../CommonComponents/ListingComponents/Listings";
import { useNavigate } from "react-router-dom";

function AdminUserListing() {
  const [userList, setUserList] = useState();
  const [Props, setProps] = useState("null");
  const navigate = useNavigate()
  
  useEffect(() => {
    async function DisplayAllUser() {
      const token = localStorage.getItem("token");
      try {
        let { data } = await axios.get("/Admin/UserDetails", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (data) {
          setUserList(data.result);
          setProps("userList");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    }
    DisplayAllUser();
  }, []);

  const HandleAcess = async (id) => {
    const token = localStorage.getItem("token");
    try {
      let { data } = await axios.post(
        "/Admin/UserAcess",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      let updatedUser = data.result;
      if (updatedUser) {
        setUserList((prevList) =>
          prevList.map((user) =>
            user._id === updatedUser._id
              ? { ...user, acess: updatedUser.acess }
              : user
          )
        );
      }
    } catch (error) {
      console.error("Error handling access change", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">USER DETAILS</h1>
          <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 flex text-lg items-center gap-2"
      >
        ← Back
      </button>
        </div>
      </header>
      <Listing Data={userList} Props={Props} HandleAcess={HandleAcess} />
      
    </div>
  );
}

export default AdminUserListing;

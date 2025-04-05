import axios from "../../../axios";
import { useEffect, useState } from "react";

function AdminOperatorListing() {
  const [operatorList, setOperatorList] = useState();

  useEffect(() => {
    async function DisplayAllOperator() {
      const token = localStorage.getItem("token");
      try {
        let { data } = await axios.get("/Admin/OperatorDetails", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (data) {
            setOperatorList(data.result);
        }
      } catch (error) {
        console.error("Error fetching operator details", error);
      }
    }
    DisplayAllOperator();
  }, []);

  const HandleAcess = async (id) => {
    const token = localStorage.getItem("token");
    try {
      let { data } = await axios.post(
        "/Admin/OperatorAcess",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      let updatedUser = data.result;
      if (updatedUser) {
        setOperatorList((prevList) =>
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
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">OPERRATOR DETAILS</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operator Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Operator Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Access
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {operatorList &&
                    operatorList.map((ope, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ope.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ope.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ope.acess ? "Active" : "Inactive"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className={`w-28 px-4 py-2 text-sm text-center rounded-lg text-white transition duration-300 ${
                                ope.acess
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                            onClick={() => HandleAcess(ope._id)}
                          >
                            {ope.acess ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminOperatorListing;

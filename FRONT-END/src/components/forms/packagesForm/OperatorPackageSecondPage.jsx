import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPackageSecondForm, clearPackageSecondForm } from "../../../redux/forms/package/packageSecondFormSlice";
import axios from '../../../axios';
import { setCompany } from "../../../redux/company/companySlice";

function PackageSecondPage() {
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let company = useSelector((state) => state.company.company);

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        let token = localStorage.getItem("token");
        let { data } = await axios.get("/Company/getCompany", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (data) {
          if (!company) {
            company = data.result.data;
          }
          dispatch(setCompany(data.result.data));
        }
      } catch (error) {}
    }
    fetchCompanyDetails();
  }, []);

  const [data, setData] = useState({
    vehicleSeatNumber: "",
    vehicleNumber: "",
    vehicleRCBook: "",
    drivingLicenceNumber: "",
    contactNumber: "",
    vegFood: false,
    nonVegFood: false,
    isAvailable: false,
    Date: "",
    company: company?._id,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const isFormValid =
    data.vehicleSeatNumber &&
    data.vehicleNumber &&
    data.contactNumber;

  const packageSecondForm = useSelector((state) => state.packageSecondForm.packageSecondForm);
  const packageForm = useSelector((state) => state.packageForm.packageForm);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!data.vehicleSeatNumber) newErrors.vehicleSeatNumber = "Seat number is required";
    if (!data.vehicleNumber) newErrors.vehicleNumber = "Vehicle number is required";
    if (!data.contactNumber) newErrors.contactNumber = "Contact number is required";
    if (!data.Date) newErrors.Date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const mergedObj = { ...file, ...data };
    const formData = new FormData();

    Object.keys(mergedObj).forEach((key) => {
      if (key === 'images' && Array.isArray(mergedObj[key])) {
        mergedObj[key].forEach((image) => {
          formData.append('images', image);
        });
      } else if (typeof mergedObj[key] === 'object') {
        formData.append(key, JSON.stringify(mergedObj[key]));
      } else {
        formData.append(key, mergedObj[key]);
      }
    });

    try {
      const token = localStorage.getItem("token");
      let result = await axios.post('/Package/newPackage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      if (result) {
        navigate('/OperatorDashboard');
      }
    } catch (error) {
      console.error("error found in package posting", error);
    }
  };

  const handleBack = () => {
    dispatch(setPackageSecondForm(data));
    navigate("/OperatorPackageFirstPage");
  };

  useEffect(() => {
    if (packageForm && packageForm.images.length > 0) {
      const convertedFiles = packageForm.images.map((image) => {
        return new File([image.data], image.name, {
          type: image.type,
          lastModified: image.lastModified,
        });
      });
      setFile((prev) => ({
        ...prev,
        ...packageForm,
        images: convertedFiles,
      }));
    }
  }, [packageForm]);

  useEffect(() => {
    if (packageSecondForm) {
      setData(packageSecondForm);
    }
  }, [packageSecondForm]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Vehicle Package Details</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Seat Number</label>
            <input
              type="number"
              name="vehicleSeatNumber"
              value={data.vehicleSeatNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.vehicleSeatNumber && (
              <p className="text-sm text-red-500">{errors.vehicleSeatNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={data.vehicleNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.vehicleNumber && (
              <p className="text-sm text-red-500">{errors.vehicleNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="number"
              name="contactNumber"
              value={data.contactNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.contactNumber && (
              <p className="text-sm text-red-500">{errors.contactNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="vegFood"
                checked={data.vegFood}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Veg Food Available</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="nonVegFood"
                checked={data.nonVegFood}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Non-Veg Food Available</label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={data.isAvailable}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Package Available</label>
            </div>

            <div className="flex flex-col">

              <div className="flex items-center gap-2">
            <label className="ml-2 text-sm text-gray-700">Plan</label>
                <input
                  type="Date"
                  name="Date"
                  value={data.Date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="h-10 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              {errors.Date && (
                <p className="text-sm text-red-500 mt-1">{errors.Date}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageSecondPage;

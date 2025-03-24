import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setPackageForm,clearPackageForm,} from "../../../redux/packageFormSlice";

const getPreviewUrl = (file) => {
  if (file) {
    return URL.createObjectURL(file);
  }
  return null;
};

function PackageFirstPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    numberOfVisit: "",
    locations: {
      country: "",
      state: "",
      city: "",
    },
    images: [],
    category: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
            
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "name" ? value.toUpperCase() : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileObjects = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        data: file, 
      }));
  
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileObjects],
      }));
  
      console.log(fileObjects);
    }
  };
  

  const packageForm = useSelector((state) => state.packageForm.packageForm);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPackageForm(formData));
    navigate("/PackageSecondPage");
  };

  useEffect(() => {
    if (packageForm) {
      setFormData(packageForm);
    }
  }, [packageForm]);

  useEffect(() => {
    const isValid =
      formData.name.trim() &&
      formData.description.trim() &&
      formData.price.trim() &&
      formData.duration.trim() &&
      formData.numberOfVisit.trim() &&
      formData.locations.country.trim() &&
      formData.locations.state.trim() &&
      formData.locations.city.trim() &&
      formData.images.length>0 &&
      formData.category.trim();

    setIsFormValid(isValid);
  }, [formData]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Package Details
        </h2>
        <form className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Package Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration (days)"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="number"
            name="numberOfVisit"
            value={formData.numberOfVisit}
            onChange={handleChange}
            placeholder="Number of Visits"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          ></textarea>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="locations.country"
              value={formData.locations.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="locations.state"
              value={formData.locations.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="locations.city"
              value={formData.locations.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Image Upload */}
          <div className="border border-gray-300 p-4 rounded-lg bg-gray-50">
            <label className="block text-gray-600 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              onChange={handleImageChange}
            />
            <div className="flex flex-wrap gap-2">
              {formData.images.length > 0 &&
                formData.images.map((elem, index) => (
                  <img
                    key={index}
                    src={getPreviewUrl(elem.data)}
                    alt="Uploaded preview"
                    className="mt-2 w-40 h-40 object-cover rounded-lg"
                  />
                ))}
            </div>
          </div>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="">Select a category</option>
            <option value="Adventure">Adventure</option>
            <option value="Students-Basic">Students-Basic</option>
            <option value="Family">Family</option>
            <option value="Students-Advance">Students-Advance</option>
            <option value="Culture">Culture</option>
          </select>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full p-3 mt-4 rounded-lg text-white font-semibold ${
              isFormValid
                ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default PackageFirstPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Calendar,
  ChevronDown,
  Download,
  Users,
  Users2,
  Bell,
  Settings,
  Box
} from 'lucide-react';
import CustomSelect from '../../../components/ui/CustomSelect';


const stateCityMap = {
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Anand", "Gandhinagar", "Navsari"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Shivamogga"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Kolhapur", "Solapur"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Alwar"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"]
};

const InputField = ({ label, placeholder, type = "text", required = false }) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-[13px] font-bold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300 placeholder:font-medium shadow-sm group-hover:border-gray-300"
      />
      {type === 'date' && <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />}
    </div>
  </div>
);

const SelectField = ({ label, options, required = false, placeholder, value, onChange, disabled }) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-[13px] font-bold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <CustomSelect
      options={options}
      value={value || ""}
      onChange={onChange ? (val) => onChange({ target: { value: val } }) : () => { }}
      disabled={disabled}
      className="w-full"
    />
  </div>
);


const TextAreaField = ({ label, placeholder, required = false, value, onChange }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[13px] font-bold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      placeholder={placeholder}
      rows={3}
      value={value}
      onChange={onChange}
      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-gray-300 placeholder:font-medium shadow-sm hover:border-gray-300 resize-none"
    />
  </div>
);

const AddCandidate = ({ onBack }) => {
  const [presentAddress, setPresentAddress] = useState({
    state: "",
    city: ""
  });
  const [permanentAddress, setPermanentAddress] = useState({
    state: "",
    city: ""
  });
  const [isSameAddress, setIsSameAddress] = useState(false);

  const states = Object.keys(stateCityMap);

  const handleStateChange = (type, state) => {
    if (type === 'present') {
      setPresentAddress({ state, city: "" });
      if (isSameAddress) {
        setPermanentAddress({ state, city: "" });
      }
    } else {
      setPermanentAddress(prev => ({ ...prev, state, city: "" }));
    }
  };

  const handleSameAddressChange = (e) => {
    const checked = e.target.checked;
    setIsSameAddress(checked);
    if (checked) {
      setPermanentAddress({ ...presentAddress });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Navbar Integration */}
      <div className="hidden lg:flex justify-between items-center bg-white p-4 -mx-8 -mt-8 mb-8 border-b border-gray-100">
        <div className="flex items-center gap-2 pl-4">
          <h2 className="text-sm font-bold text-gray-700">Admin Dashboard</h2>
        </div>
        <div className="flex items-center gap-4 pr-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0052cc] text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-100 hover:bg-blue-700 transition-colors">
            <Download size={14} />
            Download Excel
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-xs font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users size={14} />
            Staff Form
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 text-xs font-medium hover:bg-gray-50 rounded-lg transition-colors">
            <Users2 size={14} />
            Worker Form
          </button>
          <div className="flex items-center gap-2 ml-2 pl-4 border-l border-gray-100">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings size={18} />
            </button>
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right">
                <p className="text-[11px] font-bold text-gray-800">Mr. Vimal Patel</p>
                <p className="text-[9px] text-gray-400">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-100">
                M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-all font-bold text-sm group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to candidates
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Add Candidate</h1>
        </div>
        <div className="h-px w-full bg-blue-100 border-dotted border-b" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step 1 of 4</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 sm:p-10 space-y-12 max-w-5xl">
        {/* Personal Details */}
        <section className="space-y-8">
          <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField label="Position Applied For" placeholder="Add Position" />
            <InputField label="Interview Date" placeholder="dd-mm-yyyy" type="date" />
            <InputField label="Full Name" placeholder="Add Name" />
            <SelectField label="Gender" required options={["Male", "Female", "Other"]} placeholder="Select or type manually to add..." />
            <InputField label="Date Of Birth" placeholder="dd-mm-yyyy" type="date" />
            <SelectField label="Blood Group" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} placeholder="Select or type manually to add..." />
            <SelectField label="Religion" options={["Hindu", "Muslim", "Sikh", "Christian", "Other"]} placeholder="Select religion..." />
            <InputField label="Caste" placeholder="Add Cast" />
            <InputField label="Email Id" placeholder="username@gmail.com" type="email" />
            <InputField label="Phone No." placeholder="978762453" />
            <InputField label="Emergency Contact Person Name" placeholder="Add Name" />
            <InputField label="Emergency Contact Person Mobile Number" placeholder="978762453" />
            <SelectField label="Nationality" options={["Indian", "American", "British", "Other"]} placeholder="Select or type manually to add..." />
            <InputField label="Mother Tongue" placeholder="e.g. Gujarati, Hindi, Marathi" />
          </div>
        </section>

        {/* Present Address */}
        <section className="space-y-8">
          <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Present Address</h3>
          <div className="space-y-6">
            <TextAreaField label="Present Address" required placeholder="Add Present Address" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <SelectField
                label="State"
                options={states}
                placeholder="Select state..."
                value={presentAddress.state}
                onChange={(e) => handleStateChange('present', e.target.value)}
              />
              <SelectField
                label="City"
                options={presentAddress.state ? stateCityMap[presentAddress.state] : []}
                placeholder={presentAddress.state ? "Select city..." : "Select state first..."}
                value={presentAddress.city}
                onChange={(e) => setPresentAddress(prev => ({ ...prev, city: e.target.value }))}
                disabled={!presentAddress.state}
              />
              <InputField label="Pin Code" placeholder="Add Pin Code" />
            </div>
          </div>
        </section>

        {/* Permanent Address */}
        <section className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-4">Permanent Address</h3>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={isSameAddress}
                onChange={handleSameAddressChange}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-bold text-gray-500 group-hover:text-gray-700">Same as present address</span>
            </label>
          </div>
          <div className="space-y-6">
            <TextAreaField label="Permanent Address" required placeholder="Add Permanent Address" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <SelectField
                label="State"
                options={states}
                placeholder="Select state..."
                value={permanentAddress.state}
                onChange={(e) => handleStateChange('permanent', e.target.value)}
                disabled={isSameAddress}
              />
              <SelectField
                label="City"
                options={permanentAddress.state ? stateCityMap[permanentAddress.state] : []}
                placeholder={permanentAddress.state ? "Select city..." : "Select state first..."}
                value={permanentAddress.city}
                onChange={(e) => setPermanentAddress(prev => ({ ...prev, city: e.target.value }))}
                disabled={!permanentAddress.state || isSameAddress}
              />
              <InputField label="Pin Code" placeholder="Add Pin Code" />
              <InputField label="Father Name" placeholder="Add Name" />
              <InputField label="Mother Name" placeholder="Add Name" />
              <SelectField label="Marital Status" options={["Single", "Married", "Divorced"]} placeholder="Select or type manually to add..." />
              <InputField label="Number of Children" placeholder="Add Number" type="number" />
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex justify-end items-center gap-4 pt-10 border-t border-gray-50">
          <button
            onClick={onBack}
            className="px-8 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            Back
          </button>
          <button className="px-10 py-2.5 bg-[#0052cc] text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100">
            Next
          </button>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest pt-12">
        <Box size={14} />
        System Ledger · Recruitment Intake
      </div>
    </div>
  );
};

export default AddCandidate;

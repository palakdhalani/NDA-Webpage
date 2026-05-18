import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ChevronDown, 
  Upload, 
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  Briefcase,
  FileText,
  Phone
} from 'lucide-react';
import CustomSelect from '../../../components/ui/CustomSelect';
import SignatureCanvas from 'react-signature-canvas';

const stateCityMap = {
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Anand", "Gandhinagar", "Navsari", "Morbi", "Nadiad", "Porbandar", "Mehsana", "Bhuj", "Patan", "Valsad", "Bharuch", "Amreli", "Palanpur"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kadapa", "Anantapur", "Eluru", "Ongole", "Chittoor", "Machilipatnam"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Naharlagun", "Roing", "Tezu"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur", "Tinsukia", "Sivasagar", "Bongaigaon"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Bihar Sharif", "Ara", "Begusarai", "Katihar"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Jagdalpur", "Raigarh", "Ambikapur", "Rajnandgaon"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Canacona"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar", "Rohtak", "Karnal", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Kullu", "Hamirpur", "Bilaspur"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Shivamogga", "Davanagere", "Ballari", "Tumakuru", "Udupi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur", "Alappuzha", "Kollam", "Palakkad", "Malappuram"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Satna", "Rewa", "Dewas", "Ratlam"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Jalgaon", "Akola", "Latur", "Sangli"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri", "Balasore", "Berhampur", "Baripada"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Alwar", "Bharatpur", "Sikar", "Pali"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Vellore", "Thoothukudi", "Tirunelveli", "Kanchipuram"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Adilabad", "Mahbubnagar", "Ramagundam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Noida", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Jhansi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Haldwani", "Roorkee", "Nainital", "Rudrapur", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling", "Kharagpur", "Malda", "Haldia"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Dwarka", "Rohini", "Karol Bagh"],
  "Chandigarh": ["Chandigarh"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"]
};

const AddWorker = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    workerName: '',
    fatherName: '',
    motherName: '',
    interviewDate: '',
    email: '',
    education: '',
    department: '',
    designation: '',
    presentAddress: '',
    presentState: '',
    presentCity: '',
    presentPin: '',
    sameAsPresent: false,
    permanentAddress: '',
    permanentState: '',
    permanentCity: '',
    permanentPin: '',
    motherTongue: '',
    dob: '',
    expectedJoining: '',
    experience: '',
    currentSalary: '',
    expectedSalary: '',
    phone: '',
    workType: '',
    remarks: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const sigCanvas = useRef();

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const states = Object.keys(stateCityMap);


  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add Worker</h1>
            <p className="text-xs font-bold text-gray-400 mt-0.5">Same form as Worker QR - submit to add new worker</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 lg:p-12 space-y-12">
          
          {/* Worker Details */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-[#0066cc] rounded-full" />
              <h2 className="text-lg font-bold text-gray-900 tracking-tight uppercase">Worker Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  Worker's Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="workerName"
                  placeholder="Add Name"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Father's Name</label>
                <input 
                  type="text" 
                  name="fatherName"
                  placeholder="Add Father's Name"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mother's Name</label>
                <input 
                  type="text" 
                  name="motherName"
                  placeholder="Add Mother's Name"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Interview Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="interviewDate"
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email ID</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="email@example.com"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Education</label>
                <CustomSelect 
                options={['10th', '12th', 'Graduate', 'ITI - Fitter', 'ITI - Electrician', 'ITI - Welder']}
                  value={formData.education} 
                  onChange={(val) => setFormData(prev => ({ ...prev, education: val }))} 
                  placeholder="Select Education"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="department"
                  placeholder="Type Department"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="designation"
                  placeholder="Add Designation"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
          </section>

          {/* Present Address */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-[#0066cc] rounded-full" />
              <h2 className="text-lg font-bold text-gray-900 tracking-tight uppercase">Present Address</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  Present Address <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="Add Present Address"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 min-h-[100px] resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">State</label>
                  <CustomSelect 
                    options={states} 
                    value={formData.presentState} 
                    onChange={(val) => setFormData(prev => ({ ...prev, presentState: val, presentCity: '' }))} 
                    placeholder="Select state..."
                  />

                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <CustomSelect 
                    options={formData.presentState ? stateCityMap[formData.presentState] : []} 
                    value={formData.presentCity} 
                    onChange={(val) => setFormData(prev => ({ ...prev, presentCity: val }))} 
                    placeholder={formData.presentState ? "Select city..." : "Select state first"}
                    disabled={!formData.presentState}
                  />


                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pin Code</label>
                  <input 
                    type="text" 
                    placeholder="Pin Code"
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Permanent Address */}
          <section className="space-y-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-[#0066cc] rounded-full" />
                <h2 className="text-lg font-bold text-gray-900 tracking-tight uppercase">Permanent Address</h2>
              </div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 transition-colors">Same as present address</span>
              </label>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea 
                  placeholder="Add Permanent Address"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 min-h-[100px] resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">State</label>
                  <CustomSelect 
                    options={states} 
                    value={formData.permanentState} 
                    onChange={(val) => setFormData(prev => ({ ...prev, permanentState: val, permanentCity: '' }))} 
                    placeholder="Select state..."
                  />

                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">City</label>
                  <CustomSelect 
                    options={formData.permanentState ? stateCityMap[formData.permanentState] : []} 
                    value={formData.permanentCity} 
                    onChange={(val) => setFormData(prev => ({ ...prev, permanentCity: val }))} 
                    placeholder={formData.permanentState ? "Select city..." : "Select state first"}
                    disabled={!formData.permanentState}
                  />

                </div>


                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Pin Code</label>
                  <input 
                    type="text" 
                    placeholder="Pin Code"
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Mother Tongue</label>
                  <CustomSelect 
                    options={['Gujarati', 'Hindi', 'English']} 
                    value={formData.motherTongue} 
                    onChange={(val) => setFormData(prev => ({ ...prev, motherTongue: val }))} 
                    placeholder="Select Language"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date Of Birth</label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Expected Date of Joining</label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Experience</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 2 Years 8 Months"
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Current Salary</label>
                  <input 
                    type="text" 
                    placeholder="Add Amount"
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Expected Salary</label>
                  <input 
                    type="text" 
                    placeholder="Add Amount"
                    className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    Phone No. <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <CustomSelect 
                      options={['+91', '+1', '+44']} 
                      value={formData.countryCode || '+91'} 
                      onChange={(val) => setFormData(prev => ({ ...prev, countryCode: val }))} 
                      className="min-w-[80px]"
                    />
                    <input 
                      type="text" 
                      placeholder="978762453"
                      className="flex-1 bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Work Type</label>
                  <CustomSelect 
                    options={['Full Time', 'Part Time', 'Contract']} 
                    value={formData.workType} 
                    onChange={(val) => setFormData(prev => ({ ...prev, workType: val }))} 
                    placeholder="Select Work Type"
                  />
                </div>

              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Remarks</label>
                <textarea 
                  placeholder="Add Remarks"
                  className="w-full bg-gray-50/30 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 min-h-[100px] resize-none"
                />
              </div>
            </div>
          </section>

          {/* Documents */}
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-[#0066cc] rounded-full" />
              <h2 className="text-lg font-bold text-gray-900 tracking-tight uppercase">Documents</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  Photo <span className="text-red-500">*</span>
                </label>
                <label className="block border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center hover:border-blue-400 transition-all group cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleInputChange({ target: { name: 'photo', value: e.target.files[0], type: 'file' } })} />
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                    <p className="text-xs font-bold text-gray-400">Click to upload or drag and drop</p>
                  </div>
                </label>

                <p className="text-[10px] text-gray-400 leading-tight">Accepted: .jpg, .jpeg, .png, .gif, .webp, .bmp, .tiff, .svg, .heic, .heif, .ico, image/* (Max: 50MB)</p>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Resume</label>
                <label className="block border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center hover:border-blue-400 transition-all group cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,.odt,.rtf,.txt,.jpg,.jpeg,.png,.webp,.heic,.heif" onChange={(e) => handleInputChange({ target: { name: 'resume', value: e.target.files[0], type: 'file' } })} />
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                    <p className="text-xs font-bold text-gray-400">Click to upload or drag and drop</p>
                  </div>
                </label>

                <p className="text-[10px] text-gray-400 leading-tight">Accepted: .pdf, .doc, .docx, .odt, .rtf, .txt, .jpg, .jpeg, .png, .webp, .heic, .heif (Max: 50MB)</p>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Aadhar</label>
                <label className="block border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center hover:border-blue-400 transition-all group cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.rtf,.csv,.txt,.odt,.ods,.odp,.jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.svg,.heic,.heif" onChange={(e) => handleInputChange({ target: { name: 'aadhar', value: e.target.files[0], type: 'file' } })} />
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                    <p className="text-xs font-bold text-gray-400">Click to upload or drag and drop</p>
                  </div>
                </label>

                <p className="text-[10px] text-gray-400 leading-tight">Accepted: .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .csv, .txt, .odt, .ods, .odp, .jpg, .jpeg, .png, .gif, .webp, .bmp, .tiff, .svg, .heic, .heif (Max: 50MB)</p>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">PAN</label>
                <label className="block border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center hover:border-blue-400 transition-all group cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.rtf,.csv,.txt,.odt,.ods,.odp,.jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.svg,.heic,.heif" onChange={(e) => handleInputChange({ target: { name: 'pan', value: e.target.files[0], type: 'file' } })} />
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={24} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                    <p className="text-xs font-bold text-gray-400">Click to upload or drag and drop</p>
                  </div>
                </label>

                <p className="text-[10px] text-gray-400 leading-tight">Accepted: .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .rtf, .csv, .txt, .odt, .ods, .odp, .jpg, .jpeg, .png, .gif, .webp, .bmp, .tiff, .svg, .heic, .heif (Max: 50MB)</p>
              </div>
            </div>
          </section>

          {/* Digital Signature */}
          <section className="space-y-8 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-[#0066cc] rounded-full" />
              <h2 className="text-lg font-bold text-gray-900 tracking-tight uppercase">Digital Signature <span className="text-red-500">*</span></h2>
            </div>
            
            <div className="space-y-4">
              <div className="w-full bg-white border border-gray-100 rounded-[2rem] h-[250px] relative overflow-hidden shadow-inner group">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-20 transition-opacity">
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Sign here</p>
                </div>
                <SignatureCanvas 
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{className: 'w-full h-full absolute inset-0 z-10 cursor-crosshair'}}
                  onEnd={() => {
                    setFormData(prev => ({ ...prev, signature: sigCanvas.current.getCanvas().toDataURL('image/png') }))
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-400 italic">Please sign above</p>
                <button 
                  onClick={clearSignature}
                  className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Clear Signature
                </button>
              </div>
            </div>

          </section>

          {/* Action Button */}
          <div className="pt-8 border-t border-gray-50 flex justify-end gap-4">
            <button 
              onClick={onBack}
              className="px-10 py-4 bg-white border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all uppercase tracking-widest"
            >
              Back
            </button>
            <button 
              onClick={() => onSubmit(formData)}
              className="px-10 py-4 bg-[#0066cc] text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest"
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWorker;

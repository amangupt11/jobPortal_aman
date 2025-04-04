import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const UpdateJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("requirements", input.requirements);
    formData.append("salary", input.salary);
    formData.append("location", input.location);
    formData.append("jobType", input.jobType);
    formData.append("experience", input.experience);
    formData.append("position", input.position);
    try {
      setLoading(true);
      console.log("formdata...",params.id);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const jobData = async()=>{
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    setInput({
        title: singleJob?.title || "",
        description: singleJob?.description || "",
        requirements: singleJob?.requirements || "",
        salary: singleJob?.salary || "",
        location: singleJob?.location || "",
        jobType: singleJob?.jobType || "",
        experience: singleJob?.experienceLevel || "",
        position: singleJob?.position || 0, 

    })
  },[singleJob])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <select name="location"  value={input.location} onChange={changeEventHandler} className="w-full p-2 border rounded-lg">
                <option value="" disabled selected>
                  Select a Location
                </option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurugram">Gurugram</option>
              </select>
            </div>
            <div>
              <Label>Job Type</Label>
              <select name="jobType"  value={input.jobType} onChange={changeEventHandler} className="w-full p-2 border rounded-lg">
                <option value={""} disabled selected>
                  None
                </option>
                <option value={"Full Time"}>Full Time</option>
                <option value={"Part Time"}>Part Time</option>
                <option value={"Remote"}>Remote</option>
              </select>
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update 
            </Button>
          )}
        
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;

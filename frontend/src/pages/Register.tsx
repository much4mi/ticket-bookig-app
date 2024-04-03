import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as Apiclient from "../Api-client";
import { useAppContext } from "../contexts/Appcontext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const {showToast} =useAppContext();
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  
  const mutation = useMutation(Apiclient.register, {
    onSuccess: () => {
      showToast({message:"registration  successful", type:"SUCCESS"})
      navigate("/")
        
    },
    onError: (error: Error) => {
      showToast({message: error.message, type:"ERROR"});
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 mt-10" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold text-center">Create Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type='password'
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", { required: "This field is required", minLength: { value: 8, message: "Password must be at least 8 characters long" } })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type='password'
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Field is Required";
              } else if (val !== watch('password')) {
                return "Passwords do not match";
              }
              return true;
            }
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex justify-start">
        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
          Create Account
        </button>
      </span>
    </form>
  );
}

export default Register;
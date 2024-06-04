
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiclient from "../Api-client";
import { useAppContext } from "../contexts/Appcontext";
import { useNavigate } from "react-router-dom";

export type SigninFormData = {
  email: string;
  password: string;
};

const Signin = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient =useQueryClient();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninFormData>();
  const mutation = useMutation(apiclient.signin, {
    onSuccess: async () => {
      showToast({ message: "Sign in successful!", type: "success" });
      await queryClient.invalidateQueries("validateToken")
      navigate(location.state?.form?.pathname || "/");
    },
    onError: async (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

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
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <div className="flex justify-end"> 
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Log In
        </button>
      </div>
      <span className="text-sm mt-2"> 
        Not registered?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Create an account here 
        </Link>
      </span>
    </form>
  );
};

export default Signin;

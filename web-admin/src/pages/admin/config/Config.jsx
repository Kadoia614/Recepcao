import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useProfile } from "@Context/profile/ProfileContext";
import { useToast } from "@Context/toast/ToastContext";

import { Divider } from "primereact/divider";

const Config = () => {
  const {
    register,
    control,
    handleSubmit,
  } = useForm({
    password: "",
    new_password: "",
    confirm_password: "",
  });

  const { showToast } = useToast();
  const { user } = useProfile()

  // Submissão do formulário
  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (data.new_password != data.confirm_password) {
        showToast(
          "error",
          "Erro",
          "The two pass need be equal!"
        );
        return
      }

      alert("Funfou");
    } catch (error) {
      showToast(
        "error",
        "Erro",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="w-full bg-background rounded-md p-4 flex justify-center margin-auto">
      <div className="bg-white w-full max-w-120 rounded-md flex items-center flex-col p-8">
        <div className="bg-white shadow-2xl h-30 w-30 sm:h-40 sm:w-40 rounded-full"></div>
        <Divider />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col">
            <label className="font-medium">Username</label>
            <InputText value={user?.name} disabled />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Password</label>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">*</span>
              <Password {...register("password")} feedback={false} toggleMask />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">New Password</label>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">*</span>
              <Controller
                name="new_password"
                control={control}
                rules={{ required: "Mandatory" }}
                render={({ field }) => (
                  <Password
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    feedback={true}
                    toggleMask
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Confirm Password</label>
            <div className="p-inputgroup flex-1">
              <span className="p-inputgroup-addon">*</span>
              <Controller
                name="confirm_password"
                control={control}
                rules={{ required: "Mandatory" }}
                render={({ field }) => (
                  <Password
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                    feedback={false}
                    toggleMask
                  />
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="Salvar"
              className="btn-primary w-full"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Config;

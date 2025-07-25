import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useToast } from "@Context/toast/ToastContext";

import { useForm, Controller } from "react-hook-form";

import { useUsers } from "@Context/users/UsersContext";
import { postUser } from "@API/User";
import { use, useEffect } from "react";

const rolesOption = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

const UserModal = ({ data, visible, onHide }) => {
  const { showToast } = useToast();
  const { addUsers, userTarget } = useUsers();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      uuid: null,
      first_name: "",
      last_name: "",
      role: "",
      email: "",
      password: "",
      cpf: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    const { newUser, message } = await postUser(data);
    addUsers(newUser);
    showToast("success", "success", message || "Created succefull");
  };

  const handleClose = () => {
    reset();
    onHide();
  };

  const submitForm = async (data) => {
    try {
      await onSubmit(data);
      handleClose();
    } catch (error) {
      showToast(
        "error",
        "Error",
        error.response?.data?.message || error.message
      );
      return;
    }
  };

  useEffect(() => {
    if (userTarget) {
      reset({
        first_name: userTarget.first_name,
        last_name: userTarget.last_name,
        role: userTarget.role,
        email: userTarget.email,
        cpf: userTarget.cpf,
      });
    }
  }, [userTarget, reset]);

  return (
    <Dialog
      header="Cadastro de Usuário"
      visible={visible}
      style={{ width: "30rem" }}
      onHide={handleClose}
      modal
      className="p-fluid"
    >
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">
        <div>
          <label className="font-medium">Primeiro Nome</label>
          <InputText {...register("first_name", { required: "Obrigatório" })} />
          {errors.first_name && (
            <small className="text-red-500">{errors.first_name.message}</small>
          )}
        </div>

        <div>
          <label className="font-medium">Sobrenome</label>
          <InputText {...register("last_name", { required: "Obrigatório" })} />
          {errors.last_name && (
            <small className="text-red-500">{errors.last_name.message}</small>
          )}
        </div>

        <div>
          <label className="font-medium">Função</label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Obrigatório" }}
            render={({ field }) => (
              <Dropdown
                {...field}
                onChange={(e) => field.onChange(e.value)}
                options={rolesOption}
                optionLabel="label"
                placeholder="Selecione a função"
                className={errors.role ? "p-invalid" : ""}
              />
            )}
          />
          {errors.role && (
            <small className="text-red-500">{errors.role.message}</small>
          )}
        </div>

        <div>
          <label className="font-medium">E-mail</label>
          <InputText
            type="email"
            {...register("email", { required: "Obrigatório" })}
          />
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </div>

        <div>
          <label className="font-medium">Senha</label>
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>

        <div>
          <label className="font-medium">CPF</label>
          <InputMask
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            {...register("cpf", { required: "Obrigatório" })}
          />
          {errors.cpf && (
            <small className="text-red-500">{errors.cpf.message}</small>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            label="Cancel"
            severity="secondary"
            onClick={() => handleClose(false)}
            type="button"
          />
          <Button label="Save" className="btn-primary" type="submit" />
        </div>
      </form>
    </Dialog>
  );
};

export default UserModal;

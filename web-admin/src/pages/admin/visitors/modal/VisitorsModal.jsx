import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@Context/toast/ToastContext";
import { useVisitors } from "@Context/visitors/VisitorsContext";
import { useEffect } from "react";

import { postVisitor, putVisitor } from "@Service/Visitor";

const VisitorsModal = ({ visible, onHide }) => {
  const { showToast } = useToast();
  const { addVisitors, visitorTarget, setVisitorTarget, updateVisitor } =
    useVisitors();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      uuid: null,
      name: "",
      photo: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (visitorTarget) {
      reset({
        uuid: visitorTarget.uuid,
        name: visitorTarget.name || "",
        photo: visitorTarget.photo || "",
        waring: visitorTarget.waring || "secure",
        cpf: visitorTarget.cpf || "",
        email: visitorTarget.email || "",
        phone:  visitorTarget.phone || "",
        address: visitorTarget.address || "",
        city: visitorTarget.city || "",
        state: visitorTarget.state || "",
        zipCode: visitorTarget.zipCode || "",
      });
    } else {
      reset({
        uuid: null,
        name: "",
        cpf: "",
        photo: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  }, [visitorTarget, reset]);

  const onSubmit = async (data) => {
    try {
      if (visitorTarget) {
        const { message, visitor } = await putVisitor(data, data.uuid);
        updateVisitor(visitor);
        showToast("success", "Sucesso", message || "Atualizado com sucesso");
      } else {
        const { visitor, message } = await postVisitor(data);
        addVisitors(visitor);
        showToast("success", "Sucesso", message || "Criado com sucesso");
      }
      handleClose();
    } catch (error) {
      showToast(
        "error",
        "Erro",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleClose = () => {
    setVisitorTarget(null);
    reset();
    onHide();
  };

  return (
    <Dialog
      header={visitorTarget ? "Editar Visitante" : "Cadastro de Visitante"}
      visible={visible}
      style={{ width: "30rem" }}
      onHide={handleClose}
      modal
      className="p-fluid"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Nome */}
        <div>
          <label className="font-medium">Nome</label>
          <InputText
            {...register("name", { required: "Obrigatório" })}
            disabled={!!visitorTarget}
          />
          {errors.name && (
            <small className="text-red-500">{errors.name.message}</small>
          )}
        </div>

        {/* CPF */}
        <div>
          <label className="font-medium">CPF</label>
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="999.999.999-99"
                placeholder="***.***.***-**"
                className={errors.cpf ? "p-invalid" : ""}
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value}
                disabled={!!visitorTarget}
              />
            )}
          />
          {errors.cpf && (
            <small className="text-red-500">{errors.cpf.message}</small>
          )}
        </div>

        {/* Foto */}
        <div>
          <label className="font-medium">Foto (URL)</label>
          <InputText {...register("photo")} placeholder="URL da foto" />
        </div>

        {/* E-mail */}
        <div>
          <label className="font-medium">E-mail</label>
          <InputText
            type="email"
            {...register("email")}
            placeholder={"E-mail"}
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="font-medium">Telefone</label>
          <InputText
            {...register("phone")}
            placeholder={"Telefone"}
          />
        </div>

        {/* Endereço */}
        <div>
          <label className="font-medium">Endereço</label>
          <InputText
            {...register("address")}
            placeholder={"Endereço"}
          />
        </div>

        {/* Cidade */}
        <div>
          <label className="font-medium">Cidade</label>
          <InputText
            {...register("city")}
            placeholder={"Cidade"}
          />
        </div>

        {/* Estado */}
        <div>
          <label className="font-medium">Estado</label>
          <InputText
            {...register("state")}
            placeholder={"Estado"}
          />
        </div>

        {/* CEP */}
        <div>
          <label className="font-medium">CEP</label>
          <InputText  
            {...register("zipCode")}
            placeholder={"CEP"}
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            label="Cancelar"
            severity="secondary"
            onClick={handleClose}
            type="button"
          />
          <Button label="Salvar" className="btn-primary" type="submit" />
        </div>
      </form>
    </Dialog>
  );
};

export default VisitorsModal;

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import { useToast } from "@Context/toast/ToastContext";
import { useVisitors } from "@Context/visitors/VisitorsContext";

import { postVisitor, putVisitor } from "@Service/Visitor";
import { Tooltip } from "primereact/tooltip";
import UploadFile from "./UploadFile";

const VisitorsModal = ({ visible, onHide }) => {
  const [CEP, setCEP] = useState("");
  const [photoBase64, setPhotoBase64] = useState(null);

  const { showToast } = useToast();
  const { addVisitors, visitorTarget, setVisitorTarget, updateVisitor } =
    useVisitors();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
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
    },
    mode: "onBlur",
  });

  // Preenche formulário em caso de edição
  useEffect(() => {
    if (visitorTarget) {
      reset({
        uuid: visitorTarget.uuid,
        name: visitorTarget.name || "",
        photo: visitorTarget.photo || "",
        waring: visitorTarget.waring || "secure",
        cpf: visitorTarget.cpf || "",
        email: visitorTarget.email || "",
        phone: visitorTarget.phone || "",
        address: visitorTarget.address || "",
        city: visitorTarget.city || "",
        state: visitorTarget.state || "",
        zipCode: visitorTarget.zipCode || "",
      });
    } else {
      reset();
    }
  }, [visitorTarget, reset]);

  // Autopreenche endereço via ViaCEP
  useEffect(() => {
    if (CEP.length === 8) {
      fetch(`https://viacep.com.br/ws/${CEP}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setValue("address", data.logradouro || "");
            setValue("city", data.localidade || "");
            setValue("state", data.uf || "");
            setValue("zipCode", data.cep || "");
          } else {
            showToast("error", "Erro", "CEP não encontrado");
          }
        })
        .catch((err) => {
          showToast("error", "Erro", "Erro ao buscar CEP: " + err.message);
        });
    }
  }, [CEP, setValue]);

  useEffect(()=>{
    setValue("photo", photoBase64 || "")
    alert(photoBase64)
  }, [photoBase64])

  const onSubmit = async (data) => {
    try {
      if (visitorTarget) {
        const { message, visitor } = await putVisitor(data, data.uuid);
        updateVisitor(visitor);
        showToast("success", "Sucesso", message || "Visitante atualizado");
      } else {
        const { visitor, message } = await postVisitor(data);
        addVisitors(visitor);
        showToast("success", "Sucesso", message || "Visitante criado");
      }
      handleClose();
    } catch (err) {
      showToast("error", "Erro", err.response?.data?.message || err.message);
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
      onHide={handleClose}
      modal
      className="p-fluid w-3xl"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row flex-wrap sm:gap-4 gap-2"
      >
        {/* Upload de Foto */}
        <div className="w-full sm:w-[50%] m-auto">
          <label className="font-medium">Foto</label>
  
          <UploadFile setPhotoBase64={setPhotoBase64} />
        </div>

        {/* Nome */}
        <div className="md:w-[57%] sm:w-[48.5%] w-full">
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
        <div className="md:w-[40%] sm:w-[48.5%] w-full">
          <label className="font-medium">CPF</label>
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                mask="999.999.999-99"
                placeholder="***.***.***-**"
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

        {/* Email */}
        <div className="md:w-[48.5%] sm:w-[60%] w-full">
          <label className="font-medium">E-mail</label>
          <InputText type="email" {...register("email")} />
        </div>

        {/* Telefone */}
        <div className="md:w-[48.5%] sm:w-[37%] w-full">
          <label className="font-medium">Telefone</label>
          <InputText {...register("phone")} />
        </div>

        <Divider />

        {/* CEP */}
        <div className="sm:w-[30%] w-[80%]">
          <label className="font-medium">CEP</label>
          <InputText
            onChange={(e) => setCEP(e.target.value)}
            maxLength={8}
            placeholder="CEP"
          />
        </div>

        {/* Endereço */}
        <div className="sm:w-[67%] w-full">
          <label className="font-medium">Endereço</label>
          <InputText {...register("address")} disabled />
        </div>

        {/* Cidade */}
        <div className="sm:w-[48.5%] w-full">
          <label className="font-medium">Cidade</label>
          <InputText {...register("city")} disabled />
        </div>

        {/* Estado */}
        <div className="sm:w-[48.5%] w-full">
          <label className="font-medium">Estado</label>
          <InputText {...register("state")} disabled />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-2 mt-4 w-full">
          <Button
            type="button"
            label="Cancelar"
            severity="secondary"
            className="w-[50%]"
            onClick={handleClose}
          />
          <Button
            type="submit"
            label="Salvar"
            className="btn-primary w-[50%]"
          />
        </div>
      </form>
    </Dialog>
  );
};

export default VisitorsModal;

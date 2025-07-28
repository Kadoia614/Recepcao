import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { deleteUser } from "@Service/User";

import { useUsers } from "@Context/users/UsersContext";
import { useVisitors } from "@Context/visitors/VisitorsContext";

import { useToast } from "@Context/toast/ToastContext";

const VisitorsDeleteModal = ({ visible, onHide }) => {
  const { showToast } = useToast();
  // Context to manage user data
  const { visitorTarget, setVisitorTarget, removeVisitor } = useVisitors();

  // Submissão do formulário
  const onConfirm = async () => {
    try {
      const { message } = await deleteUser(userTarget.uuid);
      // Remove user from context
      removeVisitor(visitorTarget.uuid);
      showToast("success", "Sucesso", message || "Deleted successfully");

      handleClose();
    } catch (error) {
      showToast(
        "error",
        "Erro",
        error.response?.data?.message || error.message
      );
    }
  };

  // Fecha modal e reseta o target
  const handleClose = () => {
    setVisitorTarget(null);
    onHide();
  };

  return (
    <Dialog
      header="Excluir Usuário"
      visible={visible}
      style={{ width: "25rem" }}
      onHide={onHide}
      modal
      className="p-fluid"
    >
      <div className="mb-4">
        <p>
          Are you sure you want to delete the Visitor? <b>{visitorTarget?.name}</b>
          ?
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          label="Cancelar"
          severity="secondary"
          onClick={handleClose}
          type="button"
        />
        <Button
          label="Excluir"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={onConfirm}
        />
      </div>
    </Dialog>
  );
};

export default VisitorsDeleteModal;

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { deleteVisitor } from "@Service/Visitor";

import { useVisitors } from "@Context/visitors/VisitorsContext";
import { useToast } from "@Context/toast/ToastContext";

const VisitorsDeleteModal = ({ visible, onHide }) => {
  const { showToast } = useToast();
  // Context to manage user data
  const { visitorTarget, setVisitorTarget, removeVisitor } = useVisitors();

  // Submissão do formulário
  const onConfirm = async () => {
    try {
      const { message } = await deleteVisitor(visitorTarget.uuid);
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

  const header = (
    <div className="flex items-center gap-3">
      <i className="pi pi-trash text-2xl text-red-500" />
      <span className="text-xl font-bold text-red-500">Delete User?</span>
    </div>
  );

  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width: "25rem" }}
      onHide={onHide}
      modal
      className="p-fluid w-xl"
    >
      <div className="mb-4">
        <p>
          Are you sure you want to delete the Visitor{" "}
          <b>{visitorTarget?.name}</b>?
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

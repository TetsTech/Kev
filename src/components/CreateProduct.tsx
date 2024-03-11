import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  nome: string;
  preco: string;
  marca: string;
}

const CreateProduct: React.FC<ModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({ nome: '', preco: '', marca: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onRequestClose();
     
  };

  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      
  }}

  return (

    <div>
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Formulário Modal"
      style={customModalStyles}
    >
      <h1>Criar produto</h1>
      <form className='ModalForm'>

          <input
            className='ModalFormName'
            type="text"
            placeholder='Nome'
            value={formData.nome}
            onChange={(e) => handleInputChange(e, 'nome')}
          />

        <br />
          <input
            className='ModalFormPrice'
            type="text"
            placeholder='Preço'
            value={formData.preco}
            onChange={(e) => handleInputChange(e, 'preco')}
          />

        <br />


          <input
            className='ModalFormBrand'
            aria-label='Marca'
            type="text"
            placeholder='Marca'
            value={formData.marca}
            onChange={(e) => handleInputChange(e, 'marca')}
          />

        <br />
        <button className='Confirm' type="button" onClick={handleSubmit} >
          Confirmar
        </button>
      </form>
    </Modal>
    </div>
  );
};

export default CreateProduct;

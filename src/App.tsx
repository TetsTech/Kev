import React, { useState } from 'react';
import CreateProduct from './components/CreateProduct';
import Title from './components/Title';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotifyError() {
  toast.error("Erro ao criar o produto, tente novamente", {
    position: "bottom-right",
    autoClose: 5000,
    theme: "colored",
  });}

  function Notify() {
    toast.success("Produto Criado com sucesso!", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
    });}

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const handleFormSubmit = (formData: any) => {
    // Convertendo o valor de 'preco' para um número inteiro
    formData.preco = parseInt(formData.preco, 10);

    // Construindo o objeto de dados a ser enviado no corpo da requisição
    const data = {
      name: formData.nome,
      price: formData.preco,
      brand: formData.marca,
    };

    // Construindo a URL da API
    const apiUrl = 'https://6288144910e93797c1564f40.mockapi.io/api/v1/product';

    // Enviando os dados para a API no corpo da requisição POST
    axios.post(apiUrl, data)
      .then(response => {
        console.log('Resposta da API:', response.data);
        console.log(formData.nome, formData.preco, formData.marca);
        Notify();
      })
      .catch(error => {
        console.error('Erro ao enviar dados para a API:', error);
        console.log(formData.nome, formData.preco, formData.marca);
      NotifyError();

      });

    // Feche o modal após enviar os dados
    closeModal();
  };
  
  return (
    <div>
      <ToastContainer position="bottom-right"/>
    <div>
      <Title />
      <button onClick={openModal} className='AdcProductButton'>Adicionar Produto</button>
      <CreateProduct isOpen={isModalOpen} onRequestClose={closeModal} onSubmit={handleFormSubmit} />
      <Outlet />
    </div>
    </div>

  );
};


export default App;

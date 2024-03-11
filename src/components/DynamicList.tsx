import { useState, useEffect } from 'react';
import EditProduct from './EditProduct';
import axios from 'axios';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function NotifyErrorGet() {
  toast.error("Erro ao buscar dados da API, verifique sua conexão!", {
    position: "bottom-right",
    autoClose: 5000,
    theme: "colored",
  });}

  function NotifyErrorPatch() {
    toast.error("Erro ao atualizar produto, preencha todos os campos!", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
    });}
    function NotifyErrorDelete() {
      toast.error("Erro ao excluir produto, tente novamente!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
      });}

  function NotifySucessPatch() {
    toast.success("Produto Atualizado com sucesso!", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
    });}

  function NotifySucessDelete() {
    toast.success("Produto Excluido com sucesso!", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "colored",
    });}
  

const DynamicList = () => {
  const [Products, setProducts] = useState<any[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const GetProducts = async () => {
    try {
      const response = await axios.get('https://6288144910e93797c1564f40.mockapi.io/api/v1/product');
      const productsData = response.data;

      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      NotifyErrorGet();
    }
  };

  const openModal = (selectedProductId: number) => {
    setProductId(selectedProductId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (formData: any) => {
    formData.preco = parseInt(formData.preco, 10);

    const config = {
      "id": productId,
      "name": formData.nome,
      "price": formData.preco,
      "brand": formData.marca,
    };

    const apiUrl = `http://6288144910e93797c1564f40.mockapi.io/api/v1/product/${productId}`;
    axios.put(apiUrl, config)
      .then(response => {
        console.log('Resposta da API:', response.data);
        console.log(formData.nome, formData.preco, formData.marca, productId);
        NotifySucessPatch();
      })
      .catch(error => {
        console.error('Erro ao enviar dados para a API:', error);
        console.log(formData.nome, formData.preco, formData.marca);
        NotifyErrorPatch();
      });

    closeModal(),
    GetProducts();
  };

  const deleteProduct = (productIdToDelete: number) => {
    const apiUrl = `http://6288144910e93797c1564f40.mockapi.io/api/v1/product/${productIdToDelete}`;
    axios.delete(apiUrl)
      .then(response => {
        console.log('Resposta da API:', response.data);
        console.log(productIdToDelete);
        NotifySucessDelete();

      })
      .catch(error => {
        console.error('Erro ao excluir produto na API:', error);
        NotifyErrorDelete();
      }),
      GetProducts(); 
  
  
  

  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <> <ToastContainer position="bottom-right"/>
      <div className="Container">
        {Products.map((product) => (
          <div className="Card" key={product.id}>
            <img className="ImageProduct" src={product.image} alt={`Product ${product.id}`} />
            <p className='ProductName'>{product.name}</p>
            <p className='BrandName'>{product.brand}</p>
            <p className='ProductPrice'>R$ {product.price}</p>
            <button onClick={() => openModal(product.id)} className='Edit'>Editar</button>
            <button onClick={() => deleteProduct(product.id)} className='Remove'>X Remover</button>
            <EditProduct isOpen={isModalOpen} onRequestClose={closeModal} onSubmit={handleFormSubmit} />
          </div>
        ))}
      </div>
      </>
  );
};

export default DynamicList;

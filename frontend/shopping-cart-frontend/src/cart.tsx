import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart: React.FC = () => {

    const [itemName, setItemName] = useState<string>('');
    const [cartItems, setCartItems] = useState<string[]>([]);
    const [showItems, setShowItems] = useState<boolean>(false);
    const [removedItem, setRemovedItem] = useState<string | null>(null); // 
    const [error, setError] = useState<string | null>(null);

  
    const fetchCartItems = async () => {
        try {
            const response = await fetch('/cart/list');
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            const data = await response.json();
            console.log('Dados recebidos da API:', data);

            if (Array.isArray(data.cart)) {
                const items = data.cart.map((item: { item: string }) => item.item);
                setCartItems(items);
                setError(null); 
            } else {
                console.error('Formato inesperado de dados:', data);
                setError('Formato inesperado de dados.');
            }
        } catch (error) {
            console.error('Erro ao buscar itens do carrinho:', error);
            setError('Erro ao buscar itens do carrinho.');
        }
    };

    
    useEffect(() => {
        fetchCartItems();
    }, []);


    const handleAddItem = async () => {
        if (itemName.trim() === '') return;

        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item: itemName }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item');
            }

            setItemName(''); 
            await fetchCartItems(); 
            toast.success(`Item ${itemName} adicionado ao carrinho!`); 
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            setError('Erro ao adicionar item.');
        }
    };

   
    const handleUndo = async () => {
        try {
            const response = await fetch('/cart/remove', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to remove last item');
            }

            const data = await response.json();
            const removedItemName = data.removedItem; 
            setRemovedItem(removedItemName);
            await fetchCartItems();  

            toast.success(`Item "${removedItemName.item}" removido do carrinho!`,);  
        } catch (error) {
            console.error('Erro ao remover o último item:', error);
            setError('Erro ao remover o último item.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Carrinho de Compras</h2>
            <div className="mb-6">
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Nome do item"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex flex-col space-y-4 mb-6">
                <button
                    onClick={handleAddItem}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Adicionar Item
                </button>
                <button
                    onClick={() => setShowItems(!showItems)}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                    {showItems ? 'Ocultar Itens' : 'Mostrar Todos os Itens'}
                </button>
                <button
                    onClick={handleUndo}
                    disabled={cartItems.length === 0}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
                >
                    Desfazer
                </button>
            </div>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            {showItems && (
                <div className="border-t border-gray-300 pt-4">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Itens no Carrinho:</h3>
                    <ul className="list-disc list-inside pl-5">
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <li key={index} className="text-gray-700">{item}</li>
                            ))
                        ) : (
                            <li className="text-gray-700">Nenhum item no carrinho</li>
                        )}
                    </ul>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Cart;

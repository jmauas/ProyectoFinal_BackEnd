import React, { createContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'


export const CarritoContext = createContext();
const init = JSON.parse(localStorage.getItem('carrito')) || [];
const CarritoProvider = ( {children} ) => {
  
    const [carrito, setCarrito] = useState(init);
     
    const addToCarrito = (item) => {
      setCarrito( [...carrito, item] );
      animarCarro(); 
    }
    
    const removeItem = (itemId) => {
      const nuevoCarrito = carrito.filter( (prod) => prod._id !== itemId)
      setCarrito( nuevoCarrito );
      animarCarro(); 
    }

    const cambiarCant = (itemId, nuevaCant) => {
       nuevaCant = Number(nuevaCant)
      let nuevoCarrito = carrito;
      for (let i of nuevoCarrito) {
        if (i._id === itemId) {
            if (nuevaCant > i.stock) {
                i.cantidad = i.stock;
              } else if (nuevaCant <= 0) {
                i.cantidad = 1;
              } else {
                i.cantidad = nuevaCant;
            }
        }
      }
      setCarrito([...nuevoCarrito]);
      animarCarro();        
    }   

    const animarCarro = () => {
      let car = document.getElementById('carritoAnimar');
      if (car != null) {
        car.classList.remove('animate__animated');
        car.classList.remove('animate__bounce');
        setTimeout(function()	{
          car.classList.add('animate__animated');
          car.classList.add('animate__bounce');
        }, 50);
      }
    }
  
    const calcularCantidad = () => {
      return carrito.reduce( (acc, prod) => acc + Number(prod.cantidad), 0 )
    }

    const calcularTotal = () => {
      return carrito.reduce( (acc, prod) => acc + Number(prod.cantidad) * Number(prod.precio), 0)
    }
    const estaEnCarrito = (itemId) => {
      return carrito.some( (prod) => prod.id === itemId)
    }
  
    const vaciarCarrito = (pregunta) => {
      if (pregunta) {
        Swal.fire({
            title: "Confirmación",
            text: "Se Van a Eliminar Todos los Productos del Carrito",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: "Sí, Eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: 'red',
              cancelButtonColor: 'gray',
          })
          .then(resultado => {
              if (resultado.value) {
                // Hicieron click en "Sí"
                setCarrito([]);
                Swal.fire({
                  position: 'center',
                  icon: 'info',
                  title: 'Carrito Vaciado.',
                  showConfirmButton: false,
                  timer: 1500
                })
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'El Carrito No se Eliminó.',
                  showConfirmButton: false,
                  timer: 1500
                })
                  
              }
          });
      } else {
        setCarrito([]);
      }
    }
    
    useEffect(()=>{
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])
  
    return (
        <CarritoContext.Provider value={ {
            carrito,
            addToCarrito,
            removeItem,
            cambiarCant,
            calcularCantidad,
            vaciarCarrito,
            estaEnCarrito,
            calcularTotal
        }}>
            {children}
        </CarritoContext.Provider>
    )
}
export default CarritoProvider; 
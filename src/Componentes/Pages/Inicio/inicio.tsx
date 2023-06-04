 import React from 'react'
 import './inicio.css'

 export const Inicio = () => {
   return (
    <>
       <h1>Inicio</h1>
       <div>
       <h2 className='arriba'>¿Te imaginas reunir todo sobre los gatos en una sola página web y disfrutar de cada artículo sobre estos adorables felinos domésticos?</h2>
      <main id='init'>
      <figure id="container">
          <img id='image' src="https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_640.jpg" alt="" />
          <div id='parrafos'>
        <p style={{ fontSize: '20px' }}>Te invitamos a que sigas con nosotros y nos hagas compañía tal y como hacen nuestras queridas mascotas en casa, su hogar. ¡Bienvenido y a disfrutar!</p>
        <p style={{ fontSize: '20px' }}>En este gran blog tienes la mejor información de los gatos en cada sección, para que puedas ampliar tus conocimientos y reconocer las distintas características de los gatos y sus curiosidades de los gatos.</p>
        <p style={{ fontSize: '20px' }}>En esta página aprenderemos a bastante cosas de las que veremos de manera general en esta página y despues más especifico en las demás páginas</p>
        </div>
      </figure>
      </main>
      <div id='abajo'>
      <h2>Información sobre razas de gatos</h2>
      <p style={{ fontSize: '20px' }}>Descubre las diferentes razas de gatos y aprende sobre sus características distintivas, personalidades y requisitos de cuidado.</p>
      <img id='img1' src="https://tse2.mm.bing.net/th?id=OIP.HxkAObfbF56TXQ8l2dc9ogHaFI&pid=Api&P=0&h=180" alt="" />
      <h2>Consejos para el cuidado de gatos</h2>
      <p style={{ fontSize: '20px' }}>Aprende cómo cuidar adecuadamente a tu gato, desde la alimentación y el aseo hasta la creación de un entorno seguro y estimulante.</p>
      <ol>
        <li style={{ fontSize: '20px' }}>Alimentación y dieta balanceada</li>
        <li style={{ fontSize: '20px' }}>Higiene y aseo regular</li>
        <li style={{ fontSize: '20px' }}>Proporcionar un rascador para que afilen sus uñas</li>
        <li style={{ fontSize: '20px' }}>Ofrecer juguetes interactivos para estimular su mente</li>
      </ol>
      <img id='img2' src="https://tse1.mm.bing.net/th?id=OIP.fa0NAY3swWXQmYKk4cZVbQHaE7&pid=Api&rs=1&c=1&qlt=95&w=148&h=98" alt="" />
      </div>
    </div>
    </>   
   )
}

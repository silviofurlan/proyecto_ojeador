export default function Home() {
  const foto_de_basedatos = '5cd5d8fd-cdf8-4639-97c6-d7d6e02c46af.jpg';

  return (
    <div>
      <h1>Home!</h1>

      <figure>
        <img
          src={`http://localhost:4000/fotos/${foto_de_basedatos}`}
          alt='Foto'
        />
      </figure>
    </div>
  );
}

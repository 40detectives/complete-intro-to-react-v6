import { Link } from "react-router-dom";

const Pet = ({ id, name, animal, breed, images, location }) => {
  let hero = "http:pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="">
      <div className="">
        <img src={hero} alt={name} />
      </div>
      <div className="">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
